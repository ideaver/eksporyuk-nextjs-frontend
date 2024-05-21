import { useDispatch, useSelector } from "react-redux";
import { changeFileXLSX } from "@/features/reducers/buyers/buyersReducer";
import { RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import {
  BuyerFindManyQuery,
  QueryMode,
  useBuyerFindLengthQuery,
  useBuyerFindManyQuery,
  useCountryFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { GroupBase, OptionsOrGroups } from "react-select";

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
  const [buyerFindTake, setBuyerFindTake] = useState(10);
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
  const [checkedItems, setCheckedItems] = useState(
    (buyerFindMany.data?.buyerFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (buyerFindMany.data?.buyerFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [buyerFindMany.data?.buyerFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(buyerFindMany.data?.buyerFindMany)
        ? buyerFindMany.data?.buyerFindMany?.map((item) => ({
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

  const dispatch = useDispatch();
  const fileXLSX = useSelector((state: RootState) => state.buyer.fileXLSX);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    dispatch(changeFileXLSX(file.name));

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   dispatch(changeFileXLSX(reader.result as string));
    // };
    // reader.readAsDataURL(file);
  };

  const [buyerFindSearch, setBuyerFindSearch] = useState("");
  const [buyerFindCountry, setBuyerFindCountry] = useState(0);

  const buyerFindMany = useBuyerFindManyQuery({
    variables: {
      take: parseInt(buyerFindTake.toString()),
      skip: buyerFindSkip,
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

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(buyerFindMany);

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
    setBuyerFindCountry,
    formatDate,
    fileXLSX,
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
