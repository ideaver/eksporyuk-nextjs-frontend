import {
  useAffiliatorFindManyQuery,
  AffiliatorFindManyQuery,
  QueryMode,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { useState, useEffect } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Affiliator",
    path: "/admin/affiliate/affiliator",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Affiliator",
    path: ".",
    isSeparator: true,
    isActive: true,
  },
];

export const dateFormatter = (dateStr: string) => {
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

const useCheckbox = (
  affiliatorFindMany: QueryResult<AffiliatorFindManyQuery>
) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (affiliatorFindMany.data?.affiliatorFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (affiliatorFindMany.data?.affiliatorFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [affiliatorFindMany.data?.affiliatorFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(affiliatorFindMany.data?.affiliatorFindMany)
        ? affiliatorFindMany.data?.affiliatorFindMany?.map((item) => ({
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

const useAffiliatorViewModel = () => {
  const [takePage, setTakePage] = useState<any>(100);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchAffiliator, setSearchAffiliator] = useState<string>("");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  // Querying process
  const affiliatorFindMany = useAffiliatorFindManyQuery({
    variables: {
      take: Number(takePage),
      skip: skipPage,
      orderBy: [
        {
          updatedAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            user: {
              is: {
                name: {
                  contains: searchAffiliator,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                email: {
                  contains: searchAffiliator,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            id: {
              contains: searchAffiliator,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
  });

  // Calculating total page
  const calculateTotalPage = () => {
    return Math.ceil(
      (affiliatorFindMany.data?.affiliatorFindMany?.length ?? 0) / takePage
    );
  };

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(affiliatorFindMany);

  return {
    orderBy,
    setOrderBy,
    affiliatorFindMany,
    selectAll,
    checkedItems,
    handleSelectAllCheck,
    handleSingleCheck,
    takePage,
    setTakePage,
    skipPage,
    setSkipPage,
    calculateTotalPage,
    searchAffiliator,
    setSearchAffiliator,
  };
};

export default useAffiliatorViewModel;
