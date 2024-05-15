import { useState } from "react";

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
  // const mentorLength = useMentorFindLengthQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setArticleFindSkip((page - 1) * articleFindTake);
  };

  // const calculateTotalPage = () => {
  //   return Math.ceil(
  //     (mentorLength.data?.mentorFindMany?.length ?? 0) / mentorFindTake
  //   );
  // };
  return {
    currentPage,
    setCurrentPage,
    articleFindSkip,
    setArticleFindSkip,
    articleFindTake,
    setArticleFindTake,
    handlePageChange,
    //   calculateTotalPage,
  };
};

const dummyData = [
  {
    id: 1,
    title:
      "Strategi Terbaik Untuk Meningkatkan Ekspor Produk Anda: Panduan Langkah Demi Langkah",
    writer: {
      image: "/media/avatars/300-3.jpg",
      name: "Admin Eksporyuk",
    },
    date: "12 November 2022",
    category: ["Tips & Trick"],
    status: true,
  },
  {
    id: 2,
    title: "Inovasi Produk dan Peluang Ekspor: Kunci Kesuksesan Bisnis Anda",
    writer: {
      image: "/media/avatars/300-3.jpg",
      name: "Admin Eksporyuk",
    },
    date: "12 November 2022",
    category: ["Tips & Trick", "Afiliasi"],
    status: false,
  },
];

export const useDummyData = () => {
  const [articles, setArticles] = useState(
    dummyData.map((article: any) => ({ ...article, checked: false }))
  );

  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const handleCheckedAllChange = () => {
    const newSelectAll = !isCheckedAll;
    setIsCheckedAll(newSelectAll);
    setArticles(
      articles?.map((article: any) => ({ ...article, checked: newSelectAll }))
    );
  };
  const handleCheckedItemChange = (id: number) => {
    const newArticles = articles.map((article: any) =>
      article.id === id ? { ...article, checked: !article.checked } : article
    );
    setArticles(newArticles);
    setIsCheckedAll(newArticles.every((article: any) => article.checked));
  };

  return {
    articles,
    isCheckedAll,
    handleCheckedAllChange,
    handleCheckedItemChange,
  };
};

const useArticleViewModel = () => {
  return {};
};
export default useArticleViewModel;
