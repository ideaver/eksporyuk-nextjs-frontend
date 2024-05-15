/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import { useInvoiceFindManyQuery, QueryMode } from "@/app/service/graphql/gen/graphql";

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

const useCommisionData = (skipPage: number, takePage: number, status: any, searchComission: string) => {
  const numTakePage = Number(takePage);

  const getVariables = (skipPage: number, takePage: number, status: any) => {
    let variables: any = {
      take: numTakePage,
      where: {
        status: {
          equals: status,
        }
      }
    };
  
    // Add skip property when status is empty
    if (!status) {
      variables = {
        ...variables,
        skip: skipPage,
      }
    }
  
    if (status === "") {
      variables = {
        take: takePage,
        skip: skipPage,
        where: {
          status: {
            equals: null,
          }
        }
      }
    }

    if (searchComission) {
      variables = {
        ...variables,
        where: {
          order: {
            is: {
              enrollment: {
                every: {
                  student: {
                    is: {
                      user: {
                        is: {
                          name: {
                            contains: searchComission,
                            mode: QueryMode.Insensitive,
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return variables;
  }

  let variables: any = {
    take: numTakePage,
    where: {
      status: {
        equals: status,
      }
    }
  };

  // Add skip property when status is empty
  if (!status) {
    variables = {
      ...variables,
      skip: skipPage,
    }
  }

  if (status === "") {
    variables = {
      take: numTakePage,
      skip: skipPage,
      where: {
        status: {
          equals: null,
        }
      }
    }
  }

  const { data, loading, error } = useInvoiceFindManyQuery({
    variables: getVariables(skipPage, numTakePage, status),
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
        badgeColor: invoice.status === "FULLPAID" ? "success" : invoice.status === "CANCELLED" ? "danger" : "warning",
      }));
      setComissionData(commissionData);
    }
  }, [data]);
  
  const calculateTotalPage = () => {
    return Math.ceil(
      (commissionData.length ?? 0) / takePage
    )
  };

  return { commissionData, loading, error, calculateTotalPage };
}

export const formatToIDR = (amount: string) => {
  return parseInt(amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export const breadcrumbs = [
  {
    title: "Manajemen Produk",
    path: "#",
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
  const [status, setStatus] = useState<any>(null);
  const [searchCommission, setSearchComission] = useState("");

  const { commissionData, loading, error, calculateTotalPage } = useCommisionData(skipPage, takePage, status, searchCommission);

  return { takePage, setTakePage, skipPage, setSkipPage, status, setStatus, commissionData, loading, error, calculateTotalPage, setSearchComission};
};

export default useComissionViewModel;
