import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  AnnouncementTypeEnum,
  MaterialPromotionPlatformTypeEnum,
  QueryMode,
  SortOrder,
  useAnnouncementDeleteOneMutation,
  useAnnouncementFindLengthQuery,
  useAnnouncementFindManyQuery,
  useArticleCategoryFindManyQuery,
  useArticleDeleteOneMutation,
  useArticleFindLengthQuery,
  useArticleFindManyQuery,
  useMaterialPromotionPlatformDeleteOneMutation,
  useMaterialPromotionPlatformFindLengthQuery,
  useMaterialPromotionPlatformFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { GroupBase, OptionsOrGroups } from "react-select";
import { format } from "date-fns";

export const breadcrumbs = [
  {
    title: "Menejemen Artikel",
    path: "/admin/articles",
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

const usePagination = ({
  articleFindTake,
  articleFindSkip,
  articleFindSearch,
  articleFindStatus,
  setArticleFindSkip,
  setArticleFindTake,
  articleFindCategory,
}: {
  articleFindTake: number;
  articleFindSkip: number;
  articleFindSearch: string;
  articleFindStatus: string;
  articleFindCategory: number;
  setArticleFindSkip: Dispatch<SetStateAction<number>>;
  setArticleFindTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const articleLength = useArticleFindLengthQuery({
    variables: {
      where: {
        OR: [
          {
            title: {
              contains: articleFindSearch,
              mode: QueryMode.Insensitive,
            },
            isActive: {
              equals:
                articleFindStatus === "true"
                  ? true
                  : articleFindStatus === "false"
                  ? false
                  : null,
            },
            category: {
              some: {
                id: {
                  equals:
                    articleFindCategory === 0 ? null : articleFindCategory,
                },
              },
            },
          },
          {
            createdByAdmin: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: articleFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
            isActive: {
              equals:
                articleFindStatus === "true"
                  ? true
                  : articleFindStatus === "false"
                  ? false
                  : null,
            },
            category: {
              some: {
                id: {
                  equals:
                    articleFindCategory === 0 ? null : articleFindCategory,
                },
              },
            },
          },
        ],
      },
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setArticleFindSkip((page - 1) * articleFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (articleLength.data?.articleFindMany?.length ?? 0) / articleFindTake
    );
  };

  return {
    currentPage,
    calculateTotalPage,
    articleLength,
    handlePageChange,
    setCurrentPage,
  };
};

const usePaginationAnnouncement = ({
  articleFindTake,
  articleFindSkip,
  articleFindSearch,
  setArticleFindSkip,
  setArticleFindTake,
}: {
  articleFindTake: number;
  articleFindSkip: number;
  articleFindSearch: string;
  setArticleFindSkip: Dispatch<SetStateAction<number>>;
  setArticleFindTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPageAnnouncement, setCurrentPageAnnouncement] = useState(1);

  const announcementLength = useAnnouncementFindLengthQuery({
    variables: {
      where: {
        OR: [
          {
            title: {
              contains: articleFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
  });

  const handlePageChangeAnnouncement = (page: number) => {
    setCurrentPageAnnouncement(page);
    setArticleFindSkip((page - 1) * articleFindTake);
  };

  const calculateTotalPageAnnouncement = () => {
    return Math.ceil(
      (announcementLength.data?.announcementFindMany?.length ?? 0) /
        articleFindTake
    );
  };

  return {
    currentPageAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
    handlePageChangeAnnouncement,
    setCurrentPageAnnouncement,
  };
};

const usePaginationMaterialPromotion = ({
  articleFindTake,
  articleFindSkip,
  articleFindSearch,
  setArticleFindSkip,
  setArticleFindTake,
}: {
  articleFindTake: number;
  articleFindSkip: number;
  articleFindSearch: string;
  setArticleFindSkip: Dispatch<SetStateAction<number>>;
  setArticleFindTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPageMaterialPromotion, setCurrentPageMaterialPromotion] =
    useState(1);

  const materialPromotionLength = useMaterialPromotionPlatformFindLengthQuery({
    variables: {
      where: {
        OR: [
          {
            title: {
              contains: articleFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
  });

  const handlePageChangeMaterialPromotion = (page: number) => {
    setCurrentPageMaterialPromotion(page);
    setArticleFindSkip((page - 1) * articleFindTake);
  };

  const calculateTotalPageMaterialPromotion = () => {
    return Math.ceil(
      (materialPromotionLength?.data?.materialPromotionPlatformFindMany
        ?.length ?? 0) / articleFindTake
    );
  };

  return {
    currentPageMaterialPromotion,
    calculateTotalPageMaterialPromotion,
    materialPromotionLength,
    handlePageChangeMaterialPromotion,
    setCurrentPageMaterialPromotion,
  };
};

export const useCategoriesDropdown = () => {
  const getCategory = useArticleCategoryFindManyQuery({
    variables: {
      where: {},
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>
  ) {
    const result =
      getCategory.data?.articleCategoryFindMany?.map((category) => ({
        value: category.id,
        label: category.name.toLocaleLowerCase(),
      })) ?? [];
    await getCategory.refetch({
      skip: prevOptions.length,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    result.unshift({ value: 0, label: "Semua Kategori" });

    return {
      options: result,
      hasMore: false,
    };
  }

  return { loadOptions };
};

const useArticleViewModel = () => {
  const [articleFindSkip, setArticleFindSkip] = useState(0);
  const [articleFindTake, setArticleFindTake] = useState(10);

  const [articleFindSearch, setArticleFindSearch] = useState("");
  const [articleFindStatus, setArticleFindStatus] = useState("all");
  const [articleFindCategory, setArticleFindCategory] = useState(0);
  const [announcementFindType, setAnnouncementFindType] = useState<
    AnnouncementTypeEnum | "all"
  >("all");
  const [articleOrderBy, setArticleOrderBy] = useState<SortOrder>(
    SortOrder.Desc
  );
  const [materialPromotionFindType, setMaterialPromotionFindType] = useState<
    MaterialPromotionPlatformTypeEnum | "all"
  >("all");
  const [selectedTable, selectTable] = useState("article");

  const articleFindMany = useArticleFindManyQuery({
    variables: {
      take: parseInt(articleFindTake.toString()),
      skip: articleFindSkip,
      orderBy: [
        {
          createdAt: articleOrderBy,
        },
      ],
      where: {
        OR: [
          {
            title: {
              contains: articleFindSearch,
              mode: QueryMode.Insensitive,
            },
            isActive: {
              equals:
                articleFindStatus === "true"
                  ? true
                  : articleFindStatus === "false"
                  ? false
                  : null,
            },
            category: {
              some: {
                id: {
                  equals:
                    articleFindCategory === 0 ? null : articleFindCategory,
                },
              },
            },
          },
          {
            createdByAdmin: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: articleFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
            isActive: {
              equals:
                articleFindStatus === "true"
                  ? true
                  : articleFindStatus === "false"
                  ? false
                  : null,
            },
            category: {
              some: {
                id: {
                  equals:
                    articleFindCategory === 0 ? null : articleFindCategory,
                },
              },
            },
          },
        ],
      },
    },
  });

  const [articleDeleteOne] = useArticleDeleteOneMutation();

  const announcementFindMany = useAnnouncementFindManyQuery({
    variables: {
      take: parseInt(articleFindTake.toString()),
      skip: articleFindSkip,
      orderBy: {
        createdAt: articleOrderBy,
      },
      where: {
        OR: [
          {
            title: {
              contains: articleFindSearch,
              mode: QueryMode.Insensitive,
            },
            type: {
              equals:
                announcementFindType === "all" ? null : announcementFindType,
            },
          },
          {
            createdByAdmin: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: articleFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
            type: {
              equals:
                announcementFindType === "all" ? null : announcementFindType,
            },
          },
        ],
      },
    },
  });
  const [announcementDeleteOne] = useAnnouncementDeleteOneMutation();

  const materialPromotionFindMany = useMaterialPromotionPlatformFindManyQuery({
    variables: {
      take: parseInt(articleFindTake.toString()),
      skip: articleFindSkip,
      orderBy: {
        createdAt: articleOrderBy,
      },
      where: {
        OR: [
          {
            title: {
              contains: articleFindSearch,
              mode: QueryMode.Insensitive,
            },
            type: {
              equals:
                materialPromotionFindType === "all"
                  ? null
                  : materialPromotionFindType,
            },
          },
          {
            createdByAdmin: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: articleFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },

            type: {
              equals:
                materialPromotionFindType === "all"
                  ? null
                  : materialPromotionFindType,
            },
          },
        ],
      },
    },
  });
  const [materialPromotionDeleteOne] =
    useMaterialPromotionPlatformDeleteOneMutation();

  const {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    articleLength,
  } = usePagination({
    articleFindTake,
    articleFindSkip,
    articleFindSearch,
    articleFindStatus,
    setArticleFindSkip,
    setArticleFindTake,
    articleFindCategory,
  });

  const {
    currentPageAnnouncement,
    setCurrentPageAnnouncement,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
  } = usePaginationAnnouncement({
    articleFindTake,
    articleFindSkip,
    setArticleFindSkip,
    setArticleFindTake,
    articleFindSearch,
  });

  const {
    currentPageMaterialPromotion,
    setCurrentPageMaterialPromotion,
    handlePageChangeMaterialPromotion,
    calculateTotalPageMaterialPromotion,
    materialPromotionLength,
  } = usePaginationMaterialPromotion({
    articleFindTake,
    articleFindSkip,
    setArticleFindSkip,
    setArticleFindTake,
    articleFindSearch,
  });

  useEffect(() => {
    if (
      articleFindSearch.length !== 0 ||
      articleFindCategory !== 0 ||
      articleFindStatus !== "all"
    ) {
      setCurrentPage(1);
      setArticleFindSkip(0);
      // articleFindMany.refetch();
    }
  }, [
    articleFindSearch,
    articleFindCategory,
    articleFindStatus,
    articleFindMany,
    setCurrentPage,
  ]);

  const formatWIB = (createdAt: string): string => {
    const date = new Date(createdAt);

    const wibOffset = 7 * 60 * 60 * 1000;
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const wibDate = new Date(utcDate.getTime() + wibOffset);
    return format(wibDate, "kk:mm") + " WIB";
  };

  return {
    currentPageMaterialPromotion,
    setCurrentPageMaterialPromotion,
    handlePageChangeMaterialPromotion,
    calculateTotalPageMaterialPromotion,
    materialPromotionLength,
    materialPromotionFindMany,
    materialPromotionDeleteOne,
    announcementFindType,
    setAnnouncementFindType,
    announcementDeleteOne,
    currentPageAnnouncement,
    setCurrentPageAnnouncement,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
    selectedTable,
    selectTable,
    announcementFindMany,
    formatWIB,
    articleDeleteOne,
    articleFindMany,
    articleFindTake,
    setArticleFindTake,
    articleFindSkip,
    setArticleFindSkip,
    articleFindSearch,
    setArticleFindSearch,
    articleLength,
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    setArticleFindStatus,
    setArticleFindCategory,
    setArticleOrderBy,
    materialPromotionFindType,
    setMaterialPromotionFindType,
  };
};
export default useArticleViewModel;
