import { useDispatch, useSelector } from "react-redux";
import { changeFileXLSX } from "@/features/reducers/buyers/buyersReducer";
import { RootState } from "@/app/store/store";

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

const useBuyerViewModel = () => {
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
  return {
    fileXLSX,
    handleFileChange,
  };
};

export default useBuyerViewModel;
