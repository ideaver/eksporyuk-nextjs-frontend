import { useState, useEffect } from "react";
import { QueryResult } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  useNotificationFindManyQuery,
  QueryMode,
  NotificationFindManyQuery,
  useInstantWithdrawalRequestFindManyQuery,
  InstantWithdrawalRequestFindManyQuery,
  useInstantWithdrawalRequestResponseOneMutation,
} from "@/app/service/graphql/gen/graphql";
import {
  SortOrder,
  CompletionStatusEnum,
  InstantWithdrawalRequestEnum,
} from "@/app/service/graphql/gen/graphql";

export const breadcrumbs = [
  {
    title: "Semua Notifikasi",
    path: "/admin/notifications",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: ".",
    isSeparator: true,
    isActive: true,
  },
];

// Date formatter
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDay();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

// Time formatter
export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} WIB`;
};

const useCheckbox = (
  notificationFindMany: QueryResult<NotificationFindManyQuery>
) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (notificationFindMany.data?.notificationFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (notificationFindMany.data?.notificationFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [notificationFindMany.data?.notificationFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(notificationFindMany.data?.notificationFindMany)
        ? notificationFindMany.data?.notificationFindMany?.map((item) => ({
            id: item.id,
            value: !selectAll,
          }))
        : []
    );
  };

  return {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
  };
};

// Pagination
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [findSkip, setFindSkip] = useState(0);
  const [findTake, setFindTake] = useState(10);
  const notifLength = useNotificationFindManyQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFindSkip((page - 1) * findTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (notifLength.data?.notificationFindMany?.length ?? 0) / findTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    notifLength,
  };
};

const useWithdrawalPagination = () => {
  const [currentWithdrawalPage, setCurrenWithdrawalPage] = useState(1);
  const [findWithdrawalSkip, setFindWithdrawalSkip] = useState(0);
  const [findWithdrawalTake, setFindWithdrawalTake] = useState(10);
  const withdrawalLength = useInstantWithdrawalRequestFindManyQuery();

  const handleWithdrawalPageChange = (page: number) => {
    setCurrenWithdrawalPage(page);
    setFindWithdrawalSkip((page - 1) * findWithdrawalTake);
  };

  const calculateTotalWithdrawalPage = () => {
    return Math.ceil(
      (withdrawalLength.data?.instantWithdrawalRequestFindMany?.length ?? 0) / findWithdrawalTake
    );
  };
  return {
    currentWithdrawalPage,
    setCurrenWithdrawalPage,
    findWithdrawalSkip,
    setFindWithdrawalSkip,
    findWithdrawalTake,
    setFindWithdrawalTake,
    handleWithdrawalPageChange,
    calculateTotalWithdrawalPage,
    withdrawalLength,
  };
};

const useNotificationsViewModel = () => {
  const {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    notifLength,
  } = usePagination();
  const {
    currentWithdrawalPage,
    setCurrenWithdrawalPage,
    findWithdrawalSkip,
    setFindWithdrawalSkip,
    findWithdrawalTake,
    setFindWithdrawalTake,
    handleWithdrawalPageChange,
    calculateTotalWithdrawalPage,
  } = useWithdrawalPagination();

  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchNotification, setSearchNotification] = useState<string>("");
  const [dateOrderBy, setDateOrderBy] = useState<string>("asc");
  const [completionStatus, setCompletionStatus] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<string | number>("notification");
  const [searchWithdrawal, setSearchWithdrawal] = useState<string | null>();
  const [withdrawalStatus, setWithdrawalStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  // Querying process
  const notificationFindMany = useNotificationFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: [
        {
          createdAt: dateOrderBy === "asc" ? SortOrder.Asc : SortOrder.Desc,
        },
      ],
      where: {
        OR: [
          {
            user: {
              is: {
                name: {
                  contains: searchNotification,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            title: {
              contains: searchNotification,
              mode: QueryMode.Insensitive,
            },
          },
        ],
        onCompletionStatus: {
          equals: completionStatus,
        },
      },
    },
  });

  const instantWithdrawalRequestFindMany = useInstantWithdrawalRequestFindManyQuery({
    variables: {
      take: parseInt(findWithdrawalTake.toString()),
      skip: findWithdrawalSkip,
      orderBy: [
        {
          updatedAt: dateOrderBy === "desc" ? SortOrder.Asc : SortOrder.Desc,
        }
      ],
      where: {
        OR: [
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: searchWithdrawal,
                      mode: QueryMode.Insensitive,
                    },
                  }
                }
              }
            }
          },
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    email: {
                      contains: searchWithdrawal,
                      mode: QueryMode.Insensitive,
                    },
                  }
                }
              }
            }
          }
        ],
        status: {
          equals: withdrawalStatus,
        }
      }
    }
  });

  // Mutation
  const [updateStatusWithdrawalRequest] = useInstantWithdrawalRequestResponseOneMutation();

  const onUpdateStatusWithdrawal = async (status: any, withdrawalId: number) => {
    setLoading(true);

    try {
      await updateStatusWithdrawalRequest({
        variables: {
          data: {
            status: {
              set: status,
            },
            responseBy: {
              connect: {
                id: session?.user.id,
              }
            }
          },
          where: {
            id: withdrawalId,
          }
        }
      });
      await instantWithdrawalRequestFindMany.refetch();
      router.refresh();
    } catch (error) {
      console.error("Failed to update withdrawal status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Checkbox stuff
  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(notificationFindMany);

  return {
    takePage,
    setTakePage,
    skipPage,
    setSkipPage,
    searchNotification,
    setSearchNotification,
    calculateTotalPage,
    notificationFindMany,
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    setDateOrderBy,
    setCompletionStatus,
    currentPage,
    handlePageChange,
    findTake,
    setFindTake,
    instantWithdrawalRequestFindMany,
    selectedTable,
    setSelectedTable,
    setSearchWithdrawal,
    calculateTotalWithdrawalPage,
    currentWithdrawalPage,
    handleWithdrawalPageChange,
    setFindWithdrawalTake,
    findWithdrawalTake,
    setWithdrawalStatus,
    onUpdateStatusWithdrawal,
    loading,
  };
};

export default useNotificationsViewModel;
