import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AffiliatorCouponCreateOneMutation, useAffiliatorCouponCreateOneMutation } from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeIsActive,
  changeThumbnail,
} from "@/features/reducers/affiliators/couponReducer";
import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";

const useNavigation = () => {
  const router = useRouter();

  const pageMap: { [key: string]: string } = {
    "/information": "/affiliation",
    "/affiliation": "/usage",
  };

  const previousPageMap: { [key: string]: string } = Object.entries(
    pageMap
  ).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

  const navigate = (pageMap: { [key: string]: string }) => {
    const pathEnd = router.pathname.split("/").pop();
    const page = pageMap[`/${pathEnd}`];
    console.log(page);
    if (page) {
      router.push(`/admin/affiliate/coupon${page}`);
    }
  };

  const handleNext = () => navigate(pageMap);
  const handlePrevious = () => navigate(previousPageMap);

  return { handleNext, handlePrevious };
};

const useClassViewModel = () => {
  const dispatch = useDispatch();
  const { handleNext, handlePrevious } = useNavigation();
  const thumbnail = useSelector((state: RootState) => state.coupon.thumbnail);
  const status = useSelector((state: RootState) => state.coupon.isActive);
  const couponCode = useSelector((state: RootState) => state.coupon.couponCode);
  const value = useSelector((state: RootState) => state.coupon.value);
  const endDate = useSelector((state: RootState) => state.coupon.endDate);
  const isFreeDelivery = useSelector((state: RootState) => state.coupon.freeDelivery);
  const isActive = useSelector((state: RootState) => state.coupon.isActive);

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
    dispatch(changeIsActive(status));
  };

  const [affiliatorCouponCreateMutation] = useAffiliatorCouponCreateOneMutation();

  // Mutation Data
  const handleAffiliatorCouponCreateMutation = async ({ couponCode, value, endDate, isFreeDelivery, isActive }: any) => {
    const data = await affiliatorCouponCreateMutation({
      variables: {
        data: {
          code: couponCode,
          coupon: {
            create: {
              freeDelivery: isFreeDelivery,
              startDate: new Date(endDate),
              type: DiscountTypeEnum.Amount,
              value: value,
              isActive: Boolean(isActive)
            }
          },
          createdBy: {
            create: {
              user: {
                connect: {
                  username: "hello",
                  name: null
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
    try {
      const data = await handleAffiliatorCouponCreateMutation({couponCode, value, endDate, isFreeDelivery, isActive})
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    status,
    handleNext,
    handlePrevious,
    onSubmit,
  };
};

export default useClassViewModel;
