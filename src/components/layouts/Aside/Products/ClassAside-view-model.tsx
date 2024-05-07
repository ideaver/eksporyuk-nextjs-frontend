import { RootState } from "@/app/store/store";
import { changeStatus, changeThumbnail } from "@/features/reducers/products/productReducer";
import { useDispatch, useSelector } from "react-redux";
const useClassViewModel = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((state: RootState) => state.product.thumbnail);
  const status = useSelector((state: RootState) => state.product.status);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeThumbnail(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (status: string) => {

    dispatch(changeStatus(status));
  }
  

  return {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    status
  };
};
export default useClassViewModel;
