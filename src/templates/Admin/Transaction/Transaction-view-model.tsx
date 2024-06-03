import {
  QueryMode,
  SortOrder,
  TransactionCategoryEnum,
  TransactionStatusEnum,
  useAdminFindTransactionLengthQuery,
  useAdminFindTransactionManyQuery,
  useExportDataTransactionMutation,
} from "@/app/service/graphql/gen/graphql";
import { changeTransactionLoading } from "@/features/reducers/transaction/transactionReducer";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const breadcrumbs = [
  {
    title: "Manajemen Transaction",
    path: "/admin/transaction",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const useDropdownTransaction = () => {
  const statusDropdownOption = [
    { value: "all", label: "Semua Status" },
    { value: TransactionStatusEnum.Cancelled, label: "Cancelled" },
    { value: TransactionStatusEnum.Completed, label: "Completed" },
    { value: TransactionStatusEnum.Failed, label: "Failed" },
    { value: TransactionStatusEnum.Pending, label: "Pending" },
    { value: TransactionStatusEnum.Processing, label: "Processing" },
    { value: TransactionStatusEnum.Processing, label: "Processing" },
  ];
  const categoryDropdownOption = [
    { value: "all", label: "Semua Jenis Transaksi" },
    { value: TransactionCategoryEnum.Comission, label: "Commision" },
    { value: TransactionCategoryEnum.Order, label: "Order" },
    { value: TransactionCategoryEnum.Reconcile, label: "Reconcile" },
    { value: TransactionCategoryEnum.Redeeming, label: "Redeeming" },
    { value: TransactionCategoryEnum.Referring, label: "Referring" },
    { value: TransactionCategoryEnum.Refund, label: "Refund" },
    { value: TransactionCategoryEnum.Topup, label: "Topup" },
    { value: TransactionCategoryEnum.Withdrawal, label: "Withdrawal" },
  ];
  return { statusDropdownOption, categoryDropdownOption };
};

const usePagination = ({
  transactionTake,
  transactionSkip,
  transactionFindCategory,
  transactionFindSearch,
  transactionFindStatus,
  setTransactionSkip,
  setTransactionTake,
}: {
  transactionTake: number;
  transactionSkip: number;
  transactionFindSearch: string;
  transactionFindStatus: TransactionStatusEnum | "all";
  transactionFindCategory: TransactionCategoryEnum | "all";
  setTransactionSkip: Dispatch<SetStateAction<number>>;
  setTransactionTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const transactionLength = useAdminFindTransactionLengthQuery({
    variables: {
      where: {
        OR: [
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        bill_title: {
                          contains: transactionFindSearch,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
            transactionCategory: {
              equals:
                transactionFindCategory === "all"
                  ? null
                  : transactionFindCategory,
            },
            status: {
              equals:
                transactionFindStatus === "all" ? null : transactionFindStatus,
            },
          },
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        sender_name: {
                          contains: transactionFindSearch,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
            transactionCategory: {
              equals:
                transactionFindCategory === "all"
                  ? null
                  : transactionFindCategory,
            },
            status: {
              equals:
                transactionFindStatus === "all" ? null : transactionFindStatus,
            },
          },
        ],
      },
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTransactionSkip((page - 1) * transactionTake);
    // if (currentPage >= 2) {
    //   setArticleFindSkip(0);
    // }
  };
  const length: number | undefined =
    transactionLength.data?.adminFindManyTransaction?.length;

  const calculateTotalPage = () => {
    return Math.ceil((length as number) / transactionTake);
  };
  return {
    currentPage,
    calculateTotalPage,
    transactionLength,
    handlePageChange,
  };
};

const useTransactionViewModel = () => {
  const [transactionSkip, setTransactionSkip] = useState<number>(0);
  const [transactionTake, setTransactionTake] = useState<number>(100);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const dispatch = useDispatch();

  const [transactionFindSearch, setTransactionFindSearch] =
    useState<string>("");
  const [transactionFindStatus, setTransactionFindStatus] = useState<
    TransactionStatusEnum | "all"
  >("all");
  const [transactionFindCategory, setTransactionFindCategory] = useState<
    TransactionCategoryEnum | "all"
  >("all");

  const transactionFindMany = useAdminFindTransactionManyQuery({
    variables: {
      skip: transactionSkip,
      take: parseInt(transactionTake.toString()),
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        bill_title: {
                          contains: transactionFindSearch,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
            transactionCategory: {
              equals:
                transactionFindCategory === "all"
                  ? null
                  : transactionFindCategory,
            },
            status: {
              equals:
                transactionFindStatus === "all" ? null : transactionFindStatus,
            },
          },
          {
            payment: {
              is: {
                invoice: {
                  is: {
                    paymentForGateway: {
                      is: {
                        sender_name: {
                          contains: transactionFindSearch,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                },
              },
            },
            transactionCategory: {
              equals:
                transactionFindCategory === "all"
                  ? null
                  : transactionFindCategory,
            },
            status: {
              equals:
                transactionFindStatus === "all" ? null : transactionFindStatus,
            },
          },
        ],
      },
    },
  });

  const {
    calculateTotalPage,
    transactionLength,
    handlePageChange,
    currentPage,
  } = usePagination({
    transactionFindCategory,
    transactionFindSearch,
    transactionTake,
    transactionFindStatus,
    transactionSkip,
    setTransactionSkip,
    setTransactionTake,
  });

  const { statusDropdownOption, categoryDropdownOption } =
    useDropdownTransaction();

  const [downloadReportDate, setDownloadReportDate] = useState<any>([
    new Date(),
    new Date(),
  ]);

  const [exportDataTransaction] = useExportDataTransactionMutation();

  const formatWIB = (createdAt: string): string => {
    const date = new Date(createdAt);

    const wibOffset = 7 * 60 * 60 * 1000;
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const wibDate = new Date(utcDate.getTime() + wibOffset);
    return format(wibDate, "kk:mm") + " WIB";
  };

  useEffect(() => {
    dispatch(changeTransactionLoading(false));
  }, [dispatch]);

  const handleLoadingExportChange = (value: boolean) => {
    dispatch(changeTransactionLoading(value));
  };

  return {
    orderBy,
    setOrderBy,
    handleLoadingExportChange,
    exportDataTransaction,
    downloadReportDate,
    transactionFindMany,
    transactionTake,
    transactionSkip,
    transactionFindSearch,
    transactionFindStatus,
    transactionFindCategory,
    setDownloadReportDate,
    setTransactionSkip,
    setTransactionTake,
    setTransactionFindCategory,
    setTransactionFindSearch,
    setTransactionFindStatus,
    statusDropdownOption,
    categoryDropdownOption,
    calculateTotalPage,
    transactionLength,
    handlePageChange,
    currentPage,
    formatWIB,
  };
};

export default useTransactionViewModel;
