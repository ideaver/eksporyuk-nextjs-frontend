import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BuyerFindManyQuery,
  QueryMode,
  SortOrder,
  useBuyerDeleteManyMutation,
  useBuyerFindLengthQuery,
  useBuyerFindManyQuery,
  useCountryFindManyQuery,
  useImportDataBuyersMutation,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { GroupBase, OptionsOrGroups } from "react-select";
import { postDataAPI } from "@/app/service/api/rest-service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { changeLoadingImport } from "@/features/reducers/buyers/buyersReducer";

export const breadcrumbs = [
  {
    title: "Manajemen Buyer",
    path: "/admin/buyers",
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
  const [buyerFindSkip, setBuyerFindSkip] = useState(0);
  const [buyerFindTake, setBuyerFindTake] = useState(100);
  const buyerLength = useBuyerFindLengthQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setBuyerFindSkip((page - 1) * buyerFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (buyerLength.data?.buyerFindMany?.length ?? 0) / buyerFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    buyerFindSkip,
    setBuyerFindSkip,
    buyerFindTake,
    setBuyerFindTake,
    handlePageChange,
    calculateTotalPage,
    buyerLength,
  };
};

const useCheckbox = (buyerFindMany: QueryResult<BuyerFindManyQuery>) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<
    { id: number; value: boolean }[]
  >([]);

  const getCheckedItems = useMemo(() => {
    return checkedItems.filter((item) => item.value).map((e) => e.id);
  }, [checkedItems]);

  const [checked, setChecked] = useState(getCheckedItems);

  useEffect(() => {
    setChecked(getCheckedItems);
  }, [getCheckedItems]);

  useEffect(() => {
    if (buyerFindMany.data?.buyerFindMany) {
      setCheckedItems(
        buyerFindMany.data.buyerFindMany.map((item) => ({
          id: item.id,
          value: false,
        }))
      );
    }
  }, [buyerFindMany.data?.buyerFindMany]);

  const handleSingleCheck = useCallback((index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index].value = !newCheckedItems[index].value;
      const allChecked = newCheckedItems.every((item) => item.value);
      setSelectAll(allChecked);
      return newCheckedItems;
    });
  }, []);

  const handleSelectAllCheck = useCallback(() => {
    setCheckedItems((prevCheckedItems) => {
      const newSelectAll = !selectAll;
      const newCheckedItems = prevCheckedItems.map((item) => ({
        ...item,
        value: newSelectAll,
      }));
      setSelectAll(newSelectAll);
      return newCheckedItems;
    });
  }, [selectAll]);

  return {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
  };
};

type OptionType = {
  value: number;
  label: string;
};

export const useCountryDropdown = () => {
  const getCountries = useCountryFindManyQuery({
    variables: {
      take: null,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) {
    const result =
      getCountries.data?.countryFindMany?.map((country) => ({
        value: country.id,
        label: country.name.toLocaleLowerCase(),
      })) ?? [];
    result.unshift({ value: 0, label: "Semua Negara" });
    await getCountries.refetch({
      skip: prevOptions.length,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    return {
      options: result,
      hasMore: false,
    };
  }

  return { loadOptions };
};

const useBuyerViewModel = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    currentPage,
    setCurrentPage,
    buyerFindSkip,
    setBuyerFindSkip,
    buyerFindTake,
    setBuyerFindTake,
    handlePageChange,
    calculateTotalPage,
    buyerLength,
  } = usePagination();

  const [fileXLSXPreview, setFileXLSXPreview] = useState<string | undefined>();
  const [fileXLSX, setFileXLSX] = useState<File | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileXLSXPreview(file.name);

    const blob = file.slice(0, file.size);
    const newFile = new File([blob as Blob], file.name);

    setFileXLSX(newFile);
  };

  const [buyerFindSearch, setBuyerFindSearch] = useState("");
  const [buyerFindCountry, setBuyerFindCountry] = useState(0);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  const buyerFindMany = useBuyerFindManyQuery({
    variables: {
      take: parseInt(buyerFindTake.toString()),
      skip: buyerFindSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            buyerName: {
              contains: buyerFindSearch,
              mode: QueryMode.Insensitive,
            },
            countryId: {
              equals: buyerFindCountry === 0 ? null : buyerFindCountry,
            },
          },
          {
            email: {
              contains: buyerFindSearch,
              mode: QueryMode.Insensitive,
            },
            countryId: {
              equals: buyerFindCountry === 0 ? null : buyerFindCountry,
            },
          },
          {
            companyName: {
              contains: buyerFindSearch,
              mode: QueryMode.Insensitive,
            },
            countryId: {
              equals: buyerFindCountry === 0 ? null : buyerFindCountry,
            },
          },
          {
            productName: {
              contains: buyerFindSearch,
              mode: QueryMode.Insensitive,
            },
            countryId: {
              equals: buyerFindCountry === 0 ? null : buyerFindCountry,
            },
          },
        ],
      },
    },
  });

  const [buyerDeleteMany] = useBuyerDeleteManyMutation();
  const [importDataBuyers] = useImportDataBuyersMutation();

  const handleDownloadTamplateFile = async () => {
    try {
      const response = await fetch("/files/tamplate-import-buyers.xlsx");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "tamplate-import-buyers.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(changeLoadingImport(false));
  }, [dispatch]);

  const handleImportDataBuyer = async () => {
    dispatch(changeLoadingImport(true));
    try {
      const body = {
        file: fileXLSX,
        userId: session?.user.id,
      };
      const response = await postDataAPI({
        endpoint: "upload/file",
        body,
        isMultipartRequest: true,
      });
      await importDataBuyers({
        variables: {
          importBuyers: {
            adminId: session?.user.id as string,
            fileURL: response?.data,
          },
        },
      });
      await buyerFindMany.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(changeLoadingImport(false));
      router.reload();
    }
  };

  const {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
  } = useCheckbox(buyerFindMany);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
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
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return {
    orderBy,
    setOrderBy,
    handleImportDataBuyer,
    handleDownloadTamplateFile,
    deleteLoading,
    setDeleteLoading,
    buyerDeleteMany,
    checked,
    setBuyerFindCountry,
    formatDate,
    fileXLSXPreview,
    handleFileChange,
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    setBuyerFindSearch,
    calculateTotalPage,
    buyerFindMany,
    buyerFindTake,
    setBuyerFindTake,
    setBuyerFindSkip,
    currentPage,
    handlePageChange,
  };
};

export default useBuyerViewModel;
