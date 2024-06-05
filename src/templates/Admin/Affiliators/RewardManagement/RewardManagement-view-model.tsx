import { QueryResult } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  useRewardsCatalogFindManyQuery,
  RewardsCatalogFindManyQuery,
  QueryMode,
  SortOrder,
  useRewardsCatalogDeleteOneMutation,
  useRewardsCatalogDeleteManyMutation,
} from "@/app/service/graphql/gen/graphql";

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

// Pagination
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [findSkip, setFindSkip] = useState(0);
  const [findTake, setFindTake] = useState(10);
  const rewardsLength = useRewardsCatalogFindManyQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFindSkip((page - 1) * findTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (rewardsLength.data?.rewardsCatalogFindMany?.length ?? 0) / findTake
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
    rewardsLength,
  };
};

const useRewardManagementViewModel = () => {
  const {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    rewardsLength,
  } = usePagination();

  const router = useRouter();

  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchRewards, setSearchRewards] = useState<string>("");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  // Graphql
  const [rewardCatalogDeleteOneMutation] = useRewardsCatalogDeleteOneMutation();
  const [rewardCatalogDeleteManyMutation] = useRewardsCatalogDeleteManyMutation();

  const handleRewardCatalogDeleteOneMutation = async (rewardId: number) => {
    const data = await rewardCatalogDeleteOneMutation({
      variables: {
        where: {
          id: Number(rewardId)
        }
      }
    });

    return data;
  }

  const handleRewardCatalogDeleteManyMutation = async (rewardIds: number[]) => {
    const data = await rewardCatalogDeleteManyMutation({
      variables: {
        where: {
          id: {
            in: rewardIds,
          }
        }
      }
    });

    return data;
  };

  // Query data
  const rewardsCatalogFindMany = useRewardsCatalogFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        title: {
          contains: searchRewards,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  // Mutate data
  const onDeleteOne = async (rewardId: number) => {
    try {
      const data = await handleRewardCatalogDeleteOneMutation(rewardId);
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      router.refresh();
    }
  };

  const onDeleteMany = async (rewardIds: number[]) => {
    try {
      const data = await handleRewardCatalogDeleteManyMutation(rewardIds);
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      router.refresh();
    }
  };

  // Calculating total page
  // const calculateTotalPage = () => {
  //   return Math.ceil(
  //     (rewardsCatalogFindMany.data?.rewardsCatalogFindMany?.length ?? 0) /
  //       takePage
  //   );
  // };

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
    handleSelectAllCheck,
    setOrderBy,
    onDeleteOne,
    onDeleteMany,
    currentPage,
    handlePageChange,
    setFindTake,
    findTake,
  };
};

export default useRewardManagementViewModel;
