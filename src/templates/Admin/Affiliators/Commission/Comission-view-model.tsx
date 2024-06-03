/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import {
  useInvoiceFindManyQuery,
  QueryMode,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";

interface ICommissionProps {}

export interface TableRow {
  idOrder?: any;
  namaKelas?: any;
  pembeli?: any;
  affiliasi?: any;
  totalKomisi: any;
  status: any;
  badgeColor: any;
}

const useCommisionData = (
  skipPage: number,
  takePage: number,
  status: any,
  searchComission: string,
  orderBy: SortOrder
) => {
  // const numTakePage = Number(takePage);

  // const getVariables = (
  //   skipPage: number,
  //   takePage: number,
  //   status: any,
  //   orderBy: SortOrder
  // ) => {
  //   let variables: any = {
  //     take: numTakePage,
  //     orderBy: [
  //       {
  //         createdAt: orderBy,
  //       },
  //     ],
  //     where: {
  //       status: {
  //         equals: status,
  //       },
  //     },
  //   };

  //   // Add skip property when status is empty
  //   if (!status) {
  //     variables = {
  //       ...variables,
  //       skip: skipPage,
  //     };
  //   }

  //   if (status === "") {
  //     variables = {
  //       take: takePage,
  //       skip: skipPage,
  //       orderBy: [
  //         {
  //           createdAt: orderBy,
  //         },
  //       ],
  //       where: {
  //         status: {
  //           equals: null,
  //         },
  //       },
  //     };
  //   }

  //   if (searchComission) {
  //     variables = {
  //       ...variables,
  //       where: {
  //         order: {
  //           is: {
  //             enrollment: {
  //               every: {
  //                 student: {
  //                   is: {
  //                     user: {
  //                       is: {
  //                         name: {
  //                           contains: searchComission,
  //                           mode: QueryMode.Insensitive,
  //                         },
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     };
  //   }

  //   return variables;
  // };

  // let variables: any = {
  //   take: numTakePage,
  //   orderBy: [
  //     {
  //       createdAt: orderBy,
  //     },
  //   ],
  //   where: {
  //     status: {
  //       equals: status,
  //     },
  //   },
  // };

  // // Add skip property when status is empty
  // if (!status) {
  //   variables = {
  //     ...variables,
  //     skip: skipPage,
  //   };
  // }

  // if (status === "") {
  //   variables = {
  //     take: numTakePage,
  //     skip: skipPage,
  //     orderBy: [
  //       {
  //         createdAt: orderBy,
  //       },
  //     ],
  //     where: {
  //       status: {
  //         equals: null,
  //       },
  //     },
  //   };
  // }

  const { data, loading, error } = useInvoiceFindManyQuery({
    variables: {
      take: parseInt(takePage.toString()),
      skip: skipPage,
      orderBy: {
        createdAt: orderBy,
      },
      where: {
        status: {
          equals: status == "all" ? null : status,
        },
        order: {
          is: {
            enrollment: {
              every: {
                course: {
                  is: {
                    title: {
                      contains: searchComission,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const [commissionData, setComissionData] = useState<TableRow[]>([]);

  useEffect(() => {
    if (data && data.invoiceFindMany) {
      const commissionData = data.invoiceFindMany.map((invoice: any) => ({
        idOrder: invoice.orderId,
        namaKelas: invoice.order?.enrollment?.map(
          (title: any) => title.course.title
        ),
        pembeli: invoice.order?.enrollment?.map(
          (name: any) => name.course.enrollments[0].student.user.name
        ),
        affiliasi: invoice.order?.enrollment?.map(
          (name: any) =>
            name.course.enrollments[0].student.user.affiliator.user.name
        ),
        totalKomisi: invoice.amount,
        status: invoice.status,
        badgeColor:
          invoice.status === "FULLPAID"
            ? "success"
            : invoice.status === "CANCELLED"
            ? "danger"
            : "warning",
      }));
      setComissionData(commissionData);
    }
  }, [data]);

  const calculateTotalPage = () => {
    return Math.ceil((commissionData.length ?? 0) / takePage);
  };

  return { commissionData, loading, error, calculateTotalPage };
};

export const formatToIDR = (amount: string) => {
  return parseInt(amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export const breadcrumbs = [
  {
    title: "Manajemen Komisi",
    path: "/admin/affiliate/commission",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Semua Komisi",
    path: "#",
    isSeparator: true,
    isActive: true,
  },
];

const useComissionViewModel = ({}: ICommissionProps) => {
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [status, setStatus] = useState<any>(null);
  const [isCustomTake, setIsCustomTake] = useState(false);
  const [searchCommission, setSearchComission] = useState("");

  const { commissionData, loading, error, calculateTotalPage } =
    useCommisionData(skipPage, takePage, status, searchCommission, orderBy);

  return {
    isCustomTake,
    setIsCustomTake,
    orderBy,
    setOrderBy,
    takePage,
    setTakePage,
    skipPage,
    setSkipPage,
    status,
    setStatus,
    commissionData,
    loading,
    error,
    calculateTotalPage,
    setSearchComission,
  };
};

export default useComissionViewModel;
