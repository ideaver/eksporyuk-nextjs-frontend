import { useState, useEffect } from "react";
import { QueryResult } from "@apollo/client";

import {
  useNotificationFindManyQuery,
  QueryMode,
  NotificationFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import {
  SortOrder,
  CompletionStatusEnum,
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

  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchNotification, setSearchNotification] = useState<string>("");
  const [dateOrderBy, setDateOrderBy] = useState<string>("asc");
  const [completionStatus, setCompletionStatus] = useState<any>(null);

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
  };
};

export default useNotificationsViewModel;
