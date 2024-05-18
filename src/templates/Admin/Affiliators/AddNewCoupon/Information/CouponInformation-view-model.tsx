import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store/store";
import {
  changeCouponCode,
  changeIsActive,
  changeFreeDelivery,
  changeEndDate,
  changeStartDate,
  changeValue,
  changeLimitUsage,
} from "@/features/reducers/affiliators/couponReducer";

const useField = <T extends string | boolean | number>(
  selector: (state: RootState) => T,
  action: (value: T) => UnknownAction
) => {
  const dispatch = useDispatch();
  const initialValue = useSelector(selector);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: T;
    if (typeof initialValue === "boolean") {
      newValue = event.target.checked as T;
    } else if (typeof initialValue === "number") {
      newValue = Number(event.target.value) as T;
    } else {
      newValue = event.target.value as T;
    }
    setValue(newValue);
    dispatch(action(newValue));
  };

  return [value, handleChange] as const;
};

const useCouponInformationViewModel = () => {
  const [couponCode, setCouponCode] = useField(
    (state: RootState) => state.coupon.couponCode,
    (value) => changeCouponCode(value)
  );

  const [isActive, setIsActive] = useField(
    (state: RootState) => state.coupon.isActive,
    (value) => changeIsActive(value)
  );

  const [isFreeDelivery, setIsFreeDelivery] = useField(
    (state) => state.coupon.freeDelivery,
    (value) => changeFreeDelivery(value)
  );

  console.log(isFreeDelivery);

  const [endDate, setEndDate] = useField(
    (state: RootState) => state.coupon.endDate,
    (value) => changeEndDate(value)
  );

  const [startDate, setStartDate] = useField(
    (state: RootState) => state.coupon.startDate,
    (value) => changeStartDate(value)
  );

  const [value, setValue] = useField(
    (state: RootState) => state.coupon.value,
    (value) => changeValue(value)
  );

  const [limitUsage, setLimitUsage] = useField(
    (state: RootState) => state.coupon.limitUsage,
    (value) => changeLimitUsage(value)
  );

  return {
    isFreeDelivery,
    setIsFreeDelivery,
    couponCode,
    setCouponCode,
    value,
    setValue,
    endDate,
    setEndDate,
    isActive,
    setIsActive,
    startDate,
    setStartDate,
    limitUsage,
    setLimitUsage,
  };
};

export default useCouponInformationViewModel;
