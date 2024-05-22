import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ArticleFindManyQuery,
  QueryMode,
  useArticleCategoryFindManyQuery,
  useArticleDeleteOneMutation,
  useArticleFindLengthQuery,
  useArticleFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { GroupBase, OptionsOrGroups } from "react-select";

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
    if (currentPage >= 2) {
      setArticleFindSkip(0);
    }
  };

  const length: any = articleLength.data?.articleFindMany?.length;

  const calculateTotalPage = () => {
    return Math.ceil(length / 10);
  };
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

export const useCategoriesDropdown = () => {
  const getCategory = useArticleCategoryFindManyQuery({
    variables: {
      take: null,
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

  const articleFindMany = useArticleFindManyQuery({
    variables: {
      take: parseInt(articleFindTake.toString()),
      skip: articleFindSkip,
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
  }, [articleFindSearch, articleFindCategory, articleFindStatus]);

  return {
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
  };
};
export default useArticleViewModel;