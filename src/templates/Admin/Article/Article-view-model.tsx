import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  AnnouncementTypeEnum,
  QueryMode,
  SortOrder,
  useAnnouncementDeleteOneMutation,
  useAnnouncementFindManyQuery,
  useArticleCategoryFindManyQuery,
  useArticleDeleteOneMutation,
  useArticleFindLengthQuery,
  useArticleFindManyQuery,
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

const usePagination = (
  articleFindTake: number,
  articleFindSkip: number,
  setArticleFindSkip: Dispatch<SetStateAction<number>>,
  setArticleFindTake: Dispatch<SetStateAction<number>>,
  articleFindSearch: string,
  articleFindStatus: string,
  articleFindCategory: number
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const articleLength = useArticleFindLengthQuery({});

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setArticleFindSkip((page - 1) * articleFindTake);
  };

  const length: number | undefined =
    articleLength.data?.articleFindMany?.length;

  const calculateTotalPage = () => {
    return Math.ceil((length as number) / articleFindTake);
  };

  useEffect(() => {
    if (
      articleFindCategory != 0 ||
      articleFindSearch.length > 0 ||
      articleFindStatus != "all"
    ) {
      setCurrentPage(1);
      setArticleFindSkip(0);
    }
  }, [
    articleFindCategory,
    articleFindSearch,
    articleFindStatus,
    setArticleFindSkip,
  ]);
  return {
    currentPage,
    setCurrentPage,
    articleFindSkip,
    setArticleFindSkip,
    articleFindTake,
    setArticleFindTake,
    handlePageChange,
    calculateTotalPage,
    articleLength,
  };
};
const usePaginationAnnouncement = (
  articleFindTake: number,
  articleFindSkip: number,
  setArticleFindSkip: Dispatch<SetStateAction<number>>,
  setArticleFindTake: Dispatch<SetStateAction<number>>,
  articleFindSearch: string,
  articleFindStatus: string
) => {
  const [currentPageAnnouncement, setCurrentPageAnnouncement] = useState(1);

  const announcementLength = useAnnouncementFindManyQuery({});

  const handlePageChangeAnnouncement = (page: number) => {
    setCurrentPageAnnouncement(page);
    setArticleFindSkip((page - 1) * articleFindTake);
  };

  const length: number | undefined =
    announcementLength.data?.announcementFindMany?.length;

  const calculateTotalPageAnnouncement = () => {
    return Math.ceil((length as number) / articleFindTake);
  };

  useEffect(() => {
    if (articleFindSearch.length > 0 || articleFindStatus != "all") {
      setCurrentPageAnnouncement(1);
      setArticleFindSkip(0);
    }
  }, [articleFindSearch, articleFindStatus, setArticleFindSkip]);
  return {
    currentPageAnnouncement,
    setCurrentPageAnnouncement,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
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

  //manual
  const categoryArticleDropdownOption =
    getCategory.data?.articleCategoryFindMany?.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  categoryArticleDropdownOption?.unshift({ value: 0, label: "Semua Kategori" });

  return { loadOptions, categoryArticleDropdownOption };
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

  const {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    articleLength,
  } = usePagination(
    articleFindTake,
    articleFindSkip,
    setArticleFindSkip,
    setArticleFindTake,
    articleFindSearch,
    articleFindStatus,
    articleFindCategory
  );

  const {
    currentPageAnnouncement,
    setCurrentPageAnnouncement,
    handlePageChangeAnnouncement,
    calculateTotalPageAnnouncement,
    announcementLength,
  } = usePaginationAnnouncement(
    articleFindTake,
    articleFindSkip,
    setArticleFindSkip,
    setArticleFindTake,
    articleFindSearch,
    articleFindStatus
  );

  useEffect(() => {
    if (
      articleFindSearch.length !== 0 ||
      articleFindCategory !== 0 ||
      articleFindStatus !== "all"
    ) {
      setCurrentPage(1);
      setArticleFindSkip(0);
      articleFindMany.refetch();
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
  };
};
export default useArticleViewModel;
