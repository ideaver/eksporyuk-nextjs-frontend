import {
  QueryMode,
  SortOrder,
  useEksporDocumentDeleteOneMutation,
  useEksporDocumentFindLengthQuery,
  useEksporDocumentFindManyQuery,
  useLocalCommodityDeleteOneMutation,
  useLocalCommodityFindLengthQuery,
  useLocalCommodityFindManyQuery,
  useSopFileDeleteOneMutation,
  useSopFileFimdLengthQuery,
  useSopFileFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Dokumen",
    path: "/admin/document",
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

const usePaginationSop = ({
  documentFindTake,
  documentFindSkip,
  documentFindSearch,
  setDocumentFindSkip,
  setDocumentFindTake,
}: {
  documentFindTake: number;
  documentFindSkip: number;
  documentFindSearch: string;
  setDocumentFindSkip: Dispatch<SetStateAction<number>>;
  setDocumentFindTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sopLength = useSopFileFimdLengthQuery({
    variables: {
      where: {
        content: {
          contains: documentFindSearch,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setDocumentFindSkip((page - 1) * documentFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (sopLength.data?.sopFileFindMany?.length ?? 0) / documentFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
  };
};

const usePaginationEkspor = ({
  documentFindTake,
  documentFindSkip,
  documentFindSearch,
  setDocumentFindSkip,
  setDocumentFindTake,
}: {
  documentFindTake: number;
  documentFindSkip: number;
  documentFindSearch: string;
  setDocumentFindSkip: Dispatch<SetStateAction<number>>;
  setDocumentFindTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const eksporLength = useEksporDocumentFindLengthQuery({
    variables: {
      where: {
        title: {
          contains: documentFindSearch,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setDocumentFindSkip((currentPage - 1) * documentFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (eksporLength.data?.eksporDocumentFindMany?.length ?? 0) /
        documentFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
  };
};

const usePaginationCommodity = ({
  documentFindTake,
  documentFindSkip,
  documentFindSearch,
  setDocumentFindSkip,
  setDocumentFindTake,
}: {
  documentFindTake: number;
  documentFindSkip: number;
  documentFindSearch: string;
  setDocumentFindSkip: Dispatch<SetStateAction<number>>;
  setDocumentFindTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const commodityLength = useLocalCommodityFindLengthQuery({
    variables: {
      where: {
        name: {
          contains: documentFindSearch,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setDocumentFindSkip((currentPage - 1) * documentFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (commodityLength.data?.localCommodityFindMany?.length ?? 0) /
        documentFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
  };
};

const useDocumentViewModel = () => {
  const [selectTable, setSelectTable] = useState("sop");
  const [documentFindSkip, setDocumentFindSkip] = useState(0);
  const [documentFindTake, setDocumentFindTake] = useState(10);
  const [orderBy, setOrderBy] = useState(SortOrder.Desc);

  const [documentFindSearch, setDocumentFindSearch] = useState("");
  const sopFileFindMany = useSopFileFindManyQuery({
    variables: {
      skip: documentFindSkip,
      take: parseInt(documentFindTake.toString()),
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            title: {
              contains: documentFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
          {
            content: {
              contains: documentFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: documentFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  const eksporFindMany = useEksporDocumentFindManyQuery({
    variables: {
      skip: documentFindSkip,
      take: parseInt(documentFindTake.toString()),
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            title: {
              contains: documentFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
          {
            content: {
              contains: documentFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: documentFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
  const [sopDeleteOne] = useSopFileDeleteOneMutation();
  const [eksporDeleteOne] = useEksporDocumentDeleteOneMutation();
  const [commodityDeleteOne] = useLocalCommodityDeleteOneMutation();

  const commodityFindMany = useLocalCommodityFindManyQuery({
    variables: {
      take: parseInt(documentFindTake.toString()),
      skip: documentFindSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        name: {
          contains: documentFindSearch,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  // pagination
  const {
    currentPage: currentPageSop,
    setCurrentPage: setCurrentPageSop,
    handlePageChange: handlePageChangeSop,
    calculateTotalPage: calculateTotalPageSop,
  } = usePaginationSop({
    documentFindSearch,
    documentFindSkip,
    documentFindTake,
    setDocumentFindSkip,
    setDocumentFindTake,
  });

  const {
    currentPage: currentPageEkspor,
    setCurrentPage: setCurrentPageEkspor,
    handlePageChange: handlePageChangeEkspor,
    calculateTotalPage: calculateTotalPageEkspor,
  } = usePaginationEkspor({
    documentFindSearch,
    documentFindSkip,
    documentFindTake,
    setDocumentFindSkip,
    setDocumentFindTake,
  });
  const {
    currentPage: currentPageCommodity,
    setCurrentPage: setCurrentPageCommodity,
    handlePageChange: handlePageChangeCommodity,
    calculateTotalPage: calculateTotalPageCommodity,
  } = usePaginationCommodity({
    documentFindSearch,
    documentFindSkip,
    documentFindTake,
    setDocumentFindSkip,
    setDocumentFindTake,
  });
  // useEffect(() => {
  //   if (documentFindSearch.length !== 0) {
  //     setCurrentPageSop(1);
  //     setCurrentPageEkspor(1);
  //     setDocumentFindSkip(0);
  //     // articleFindMany.refetch();
  //   }
  // }, [documentFindSearch, setCurrentPageEkspor, setCurrentPageSop]);

  return {
    sopDeleteOne,
    eksporDeleteOne,
    commodityDeleteOne,
    eksporFindMany,
    setSelectTable,
    selectTable,
    currentPageEkspor,
    setCurrentPageEkspor,
    handlePageChangeEkspor,
    calculateTotalPageEkspor,
    currentPageSop,
    setCurrentPageSop,
    handlePageChangeSop,
    calculateTotalPageSop,
    sopFileFindMany,
    documentFindSkip,
    documentFindTake,
    orderBy,
    documentFindSearch,
    setDocumentFindSkip,
    setDocumentFindTake,
    setOrderBy,
    setDocumentFindSearch,
    commodityFindMany,
    currentPageCommodity,
    setCurrentPageCommodity,
    handlePageChangeCommodity,
    calculateTotalPageCommodity,
  };
};

export default useDocumentViewModel;
