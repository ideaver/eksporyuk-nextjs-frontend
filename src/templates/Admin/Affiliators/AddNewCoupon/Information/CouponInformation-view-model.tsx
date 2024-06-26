import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { RootState } from "@/app/store/store";
import {
  changeCouponCode,
  changeIsActive,
  changeFreeDelivery,
  changeEndDate,
  changeStartDate,
  changeValue,
  changeLimitUsage,
  changeAllowAffiliator,
} from "@/features/reducers/affiliators/couponReducer";
import { useCouponCreateOneMutation } from "@/app/service/graphql/gen/graphql";
import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = router.query;

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

  const [allowAffiliator, setAllowAffiliator] = useField(
    (state: RootState) => state.coupon.allowAffiliator,
    (value) => changeAllowAffiliator(value)
  )

  const [couponCreateMutation] = useCouponCreateOneMutation();

  const resetFormData = () => {
    dispatch(changeCouponCode(""));
    dispatch(changeEndDate(""));
    dispatch(changeFreeDelivery(false));
    dispatch(changeIsActive(false));
    dispatch(changeLimitUsage(0));
    dispatch(changeStartDate(""));
    dispatch(changeValue(""));
    dispatch(changeAllowAffiliator(false));
  };

  const handleStatusChange = (status: string) => {
    dispatch(changeIsActive(status === "true"));
  };

  // Mutation Data
  const handleCouponCreateMutation = async ({ couponCode, value, endDate, isActive }: any) => {
    const data = await couponCreateMutation({
      variables: {
        data: {
          startDate: new Date(),
          value,
          isActive: Boolean(isActive),
          endDate,
          type: DiscountTypeEnum.Amount,
          affiliatorCoupon: {
            create: {
              code: couponCode,
              extendedFrom: {
                connect: {
                  id: 2,
                }
              },
              createdBy: {
                connect: {
                  id: String(id)
                }
              }
            }
          }
        }
      },
    });
    return data;
  };

  // Data Mutation
  const onSubmit = async () => {
    if (!couponCode || !value || !endDate || !isActive || !limitUsage) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const data = await handleCouponCreateMutation({couponCode, value, endDate, isActive})
      resetFormData();
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      router.push(`/admin/affiliate/affiliator/detail/${id}/profile`);
    }
  }

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
    handleStatusChange,
    onSubmit,
    allowAffiliator,
    setAllowAffiliator,
    errorMessage,
  };
};

export default useCouponInformationViewModel;
