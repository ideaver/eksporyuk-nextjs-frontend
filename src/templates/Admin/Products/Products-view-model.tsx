import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { QueryResult } from "@apollo/client";

import { RootState } from "@/app/store/store";
import {
  useProductServiceFindManyQuery,
  ProductServiceFindManyQuery,
  QueryMode,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";

export const breadcrumbs = [
  {
    title: "Manajemen Produk",
    path: "/admin/products",
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

const useCheckbox = (
  productServiceFindMany: QueryResult<ProductServiceFindManyQuery>
) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (productServiceFindMany.data?.productServiceFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (productServiceFindMany.data?.productServiceFindMany ?? []).map(
        (item) => ({
          id: item.id,
          value: false,
        })
      )
    );
  }, [productServiceFindMany.data?.productServiceFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(productServiceFindMany.data?.productServiceFindMany)
        ? productServiceFindMany.data?.productServiceFindMany?.map((item) => ({
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

// Pagination related functions
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [findSkip, setFindSkip] = useState(0);
  const [findTake, setFindTake] = useState(10);
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const productsLength = useProductServiceFindManyQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFindSkip((page - 1) * findTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (productsLength.data?.productServiceFindMany?.length ?? 0) / findTake
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
    productsLength,
  };
};

const useProductsViewModel = () => {
  const {
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    productsLength,
  } = usePagination();

  // Local states
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  // Query process
  const productServiceFindMany = useProductServiceFindManyQuery({
    variables: {
      take: parseInt(findTake.toString()),
      skip: findSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        name: {
          contains: searchProduct,
          mode: QueryMode.Insensitive,
        },
      },
    },
  });

  // Checkbox stuff
  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(productServiceFindMany);

  return {
    orderBy,
    setOrderBy,
    productServiceFindMany,
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    calculateTotalPage,
    setTakePage,
    skipPage,
    setSkipPage,
    searchProduct,
    setSearchProduct,
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    productsLength,
  };
};

export default useProductsViewModel;
