import { QueryResult } from "@apollo/client";
import { useState, useEffect } from "react";

import {
  useRewardsCatalogFindManyQuery,
  RewardsCatalogFindManyQuery,
  QueryMode,
} from "@/app/service/graphql/gen/graphql";

export const rewardsData = [
  {
    id: 1,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 2,
    imageUrl: "path/to/image2.jpg",
    name: "Kelas Bimbingan EksporYuk",
    price: "2.000 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 3,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 4,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Tutup",
  },
  {
    id: 5,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 6,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Tutup",
  },
  {
    id: 7,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 8,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Tutup",
  },
  {
    id: 9,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 10,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
  },
  {
    id: 11,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka",
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
  rewardsCatalogFindMany: QueryResult<RewardsCatalogFindManyQuery>
) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (rewardsCatalogFindMany.data?.rewardsCatalogFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (rewardsCatalogFindMany.data?.rewardsCatalogFindMany ?? []).map(
        (item) => ({
          id: item.id,
          value: false,
        })
      )
    );
  }, [rewardsCatalogFindMany.data?.rewardsCatalogFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(rewardsCatalogFindMany.data?.rewardsCatalogFindMany)
        ? rewardsCatalogFindMany.data?.rewardsCatalogFindMany?.map((item) => ({
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

const useRewardManagementViewModel = () => {
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchRewards, setSearchRewards] = useState<string>("");

  // Query data
  const rewardsCatalogFindMany = useRewardsCatalogFindManyQuery({
    variables: {
      take: Number(takePage),
      skip: skipPage,
      where: {
        title: {
          contains: searchRewards,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  // Calculating total page
  const calculateTotalPage = () => {
    return Math.ceil(
      (rewardsCatalogFindMany.data?.rewardsCatalogFindMany?.length ?? 0) /
        takePage
    );
  };

  const breadcrumbs = [
    {
      title: "Reward Affiliasi",
      path: "/admin/affiliate/reward",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Semua Reward Affiliasi",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(rewardsCatalogFindMany);

  return {
    breadcrumbs,
    rewardsCatalogFindMany,
    calculateTotalPage,
    takePage,
    setTakePage,
    skipPage,
    setSkipPage,
    searchRewards,
    setSearchRewards,
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck
  };
};

export default useRewardManagementViewModel;
