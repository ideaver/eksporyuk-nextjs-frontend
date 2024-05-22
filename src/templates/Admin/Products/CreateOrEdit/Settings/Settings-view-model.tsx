import { CourseLevelEnum } from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeCourseLevel,
  changeDiscountPrice,
  changePrice,
} from "@/features/reducers/products/productReducer";
import { useDispatch, useSelector } from "react-redux";

const PriceHandler = () => {
  const dispatch = useDispatch();
  const price = useSelector((state: RootState) => state.product.price);
  const discountPrice = useSelector(
    (state: RootState) => state.product.discountPrice
  );

  const handleChangePrice = (price: string) => {
    dispatch(changePrice(price));
  };
  const handleChangeDiscountPrice = (discountPrice: string) => {
    dispatch(changeDiscountPrice(discountPrice));
  };

  return {
    price,
    discountPrice,
    handleChangePrice,
    handleChangeDiscountPrice,
  };
};
const CourseLevelHandler = () => {
  const dispatch = useDispatch();
  const courseLevel = useSelector(
    (state: RootState) => state.product.courseLevel
  );

  const handleChangeCourseLevel = (courseLevel: CourseLevelEnum) => {
    dispatch(changeCourseLevel(courseLevel));
  };
  return {
    courseLevel,
    handleChangeCourseLevel,
  };
};
const useSettingsViewModel = () => {
  const priceHandler = PriceHandler();
  const courseLevelHandler = CourseLevelHandler();
  return {
    ...priceHandler,
    ...courseLevelHandler,
  };
};

export default useSettingsViewModel;
