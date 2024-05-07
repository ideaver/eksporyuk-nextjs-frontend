import { RootState } from "@/app/store/store";
import {
  changeStatus,
  changeThumbnail,
} from "@/features/reducers/products/productReducer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const useNavigation = () => {
  const router = useRouter();

  const pageMap: { [key: string]: string } = {
    "/information": "/settings",
    "/settings": "/additional-information",
    "/additional-information": "/sylabus",
    "/sylabus": "/certificate",
  };

  const previousPageMap: { [key: string]: string } = Object.entries(
    pageMap
  ).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

  const navigate = (pageMap: { [key: string]: string }) => {
    const pathEnd = router.pathname.split("/").pop();
    const page = pageMap[`/${pathEnd}`];
    const action = router.query.id ? "edit" : "create";
    if (page) {
      router.push(`/admin/products/${action}${page}`);
    }
  };

  const handleNext = () => navigate(pageMap);
  const handlePrevious = () => navigate(previousPageMap);

  return { handleNext, handlePrevious };
};

const useClassViewModel = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((state: RootState) => state.product.thumbnail);
  const status = useSelector((state: RootState) => state.product.status);
  const { handleNext, handlePrevious } = useNavigation();

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
  };

  return {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    status,
    handleNext,
    handlePrevious,
  };
};

export default useClassViewModel;
