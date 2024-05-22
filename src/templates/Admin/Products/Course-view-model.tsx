import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";

export const breadcrumbs = [
  {
    title: "Manajemen Kelas",
    path: "/admin/courses",
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

const useProductsViewModel = () => {
  const dispatch = useDispatch();
  const selectorOfCreateProduct = useSelector(
    (state: RootState) => state.product
  );
};

export default useProductsViewModel;
