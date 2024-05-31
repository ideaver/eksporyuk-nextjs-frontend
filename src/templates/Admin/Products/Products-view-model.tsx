import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { QueryResult } from "@apollo/client";

import { RootState } from "@/app/store/store";
import {
  useProductServiceFindManyQuery,
  ProductServiceFindManyQuery,
  QueryMode,
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

const useProductsViewModel = () => {
  // Local states
  const [takePage, setTakePage] = useState<any>(10);
  const [skipPage, setSkipPage] = useState<any>(0);
  const [searchProduct, setSearchProduct] = useState<string>("");

  // Query process
  const productServiceFindMany = useProductServiceFindManyQuery({
    variables: {
      take: Number(takePage),
      skip: skipPage,
      where: {
        name: {
          contains: searchProduct,
          mode: QueryMode.Insensitive,
        },
      }
    }
  });

  // Calculating total page
  const calculateTotalPage = () => {
    return Math.ceil(
      (productServiceFindMany.data?.productServiceFindMany?.length ?? 0) / takePage
    );
  };

  // Checkbox stuff
  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(productServiceFindMany);

  return {
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
  };
};

export default useProductsViewModel;
