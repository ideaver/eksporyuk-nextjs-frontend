import { useEffect, useState } from "react";
import {
  ArticleFindManyQuery,
  QueryMode,
  useArticleFindLengthQuery,
  useArticleFindManyQuery,
  ArticleTypeEnum,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";

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

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articleFindSkip, setArticleFindSkip] = useState(0);
  const [articleFindTake, setArticleFindTake] = useState(10);
  const articleLength = useArticleFindLengthQuery();

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

const useArticleViewModel = () => {
  const {
    currentPage,
    setCurrentPage,
    articleFindSkip,
    setArticleFindSkip,
    articleFindTake,
    setArticleFindTake,
    handlePageChange,
    calculateTotalPage,
    articleLength,
  } = usePagination();

  const typeOption = Object.entries(ArticleTypeEnum).map(([value, label]) => ({
    label: value,
    value: label,
  }));

  const [articleFindSearch, setArticleFindSearch] = useState("");
  const [articleFindStatus, setArticleFindStatus] = useState("all");
  const [articleFindCategory, setArticleFindCategory] = useState("all");

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
            type: {
              equals:
                articleFindCategory === "all"
                  ? null
                  : (articleFindCategory as ArticleTypeEnum),
            },
          },
        ],
      },
    },
  });

  return {
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
    typeOption,
    setArticleFindCategory,
  };
};
export default useArticleViewModel;
