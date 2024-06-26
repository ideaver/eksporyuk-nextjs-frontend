import { ApolloError, QueryResult } from "@apollo/client";
import { useState } from "react";

import {
  useActivityFindManyQuery,
  ActivityFindManyQuery,
  SortOrder,
  usePlatformSettingFindFirstQuery,
  usePlatformSettingUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";

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

// Format into time
export const formatRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

  if (minutes < 1) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }
};

// Randomly generated IP Address (delete later)
export const genRandomIP = () => {
  const getRandomOctet = () => Math.floor(Math.random() * 256);
  return `${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}`;
};

// Pagination
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [findSkip, setFindSkip] = useState(0);
  const [findTake, setFindTake] = useState(10);
  const activityLength = useActivityFindManyQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFindSkip((page - 1) * findTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (activityLength.data?.activityFindMany?.length ?? 0) / findTake
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
    activityLength,
  };
};

const useActivityViewModel = () => {
  const {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    activityLength,
  } = usePagination();

  const router = useRouter();

  // Local states
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  // social media forum state
  const [facebookCommunities, setFacebookCommunities] = useState<
    string | undefined | null
  >("");
  const [whatsappCommunities, setWhatsappCommunities] = useState<
    string | undefined | null
  >("");
  const [telegramCommunities, setTelegramCommunities] = useState<
    string | undefined | null
  >("");
  const [instagramCommunities, setInstagramCommunities] = useState<
    string | undefined | null
  >("");
  const [youtubeCommunities, setYoutubeCommunities] = useState<
    string | undefined | null
  >("");
  const [tiktokCommunities, setTiktokCommunities] = useState<
    string | undefined | null
  >("");
  const [isLoadingPlatformSetting, setIsLoadingPlatformSetting] =
    useState(false);
  const [swalProps, setSwalProps] = useState({});

  // Query data...
  const activityFindMany = useActivityFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
    },
  });

  // Platform social media forum setting
  const platformSetting = usePlatformSettingFindFirstQuery({
    onCompleted: (values) => {
      setFacebookCommunities(
        values.platformSettingFindFirst?.facebookCommunities
      );
      setInstagramCommunities(
        values.platformSettingFindFirst?.instagramCommunities
      );
      setTelegramCommunities(
        values.platformSettingFindFirst?.telegramCommunities
      );
      setWhatsappCommunities(
        values.platformSettingFindFirst?.whatsappCommunities
      );
      setYoutubeCommunities(
        values.platformSettingFindFirst?.youtubeCommunities
      );
      setTiktokCommunities(values.platformSettingFindFirst?.tiktokCommunities);
    },
  });

  // Update platform social media forum setting
  const [platformSettingUpdateOne] = usePlatformSettingUpdateOneMutation();

  const handlePlatformSettingUpdateOne = async () => {
    setIsLoadingPlatformSetting(true);
    try {
      const response = await platformSettingUpdateOne({
        variables: {
          where: {
            id: 1,
          },
          data: {
            facebookCommunities: {
              set: facebookCommunities,
            },
            instagramCommunities: {
              set: instagramCommunities,
            },
            telegramCommunities: {
              set: telegramCommunities,
            },
            whatsappCommunities: {
              set: whatsappCommunities,
            },
            youtubeCommunities: {
              set: youtubeCommunities,
            },
            tiktokCommunities: {
              set: tiktokCommunities,
            },
          },
        },
      });
      setFacebookCommunities(
        response.data?.platformSettingUpdateOne?.facebookCommunities
      );
      setInstagramCommunities(
        response.data?.platformSettingUpdateOne?.instagramCommunities
      );
      setTelegramCommunities(
        response.data?.platformSettingUpdateOne?.telegramCommunities
      );
      setWhatsappCommunities(
        response.data?.platformSettingUpdateOne?.whatsappCommunities
      );
      setTiktokCommunities(
        response.data?.platformSettingUpdateOne?.tiktokCommunities
      );
      setWhatsappCommunities(
        response.data?.platformSettingUpdateOne?.youtubeCommunities
      );
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "Social Media Forum Diupdate",
        icon: "success",
        confirmButtonText: "OK",
      });
      // await platformSetting.refetch();
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoadingPlatformSetting(false);
      // router.reload();
    }
  };

  return {
    setTiktokCommunities,
    tiktokCommunities,
    setYoutubeCommunities,
    youtubeCommunities,
    swalProps,
    setSwalProps,
    setIsLoadingPlatformSetting,
    isLoadingPlatformSetting,
    handlePlatformSettingUpdateOne,
    facebookCommunities,
    setFacebookCommunities,
    instagramCommunities,
    setInstagramCommunities,
    telegramCommunities,
    setTelegramCommunities,
    whatsappCommunities,
    setWhatsappCommunities,
    findTake,
    orderBy,
    setOrderBy,
    currentPage,
    setCurrentPage,
    setFindSkip,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    activityLength,
    activityFindMany,
  };
};

export default useActivityViewModel;
