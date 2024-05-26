import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";

interface CouponState {
  thumbnail: string;
  isActive: boolean;
  couponCode: string;
  freeDelivery: boolean;
  startDate: string;
  value: number;
  endDate: string;
  limitUsage: number;
  allowAffiliator: boolean;
}

const initialState: CouponState = {
  thumbnail: "/media/avatars/300-1.jpg",
  isActive: false,
  couponCode: "",
  freeDelivery: false,
  startDate: "2024-06-01",
  value: 0,
  endDate: "2024-06-01",
  limitUsage: 0,
  allowAffiliator: false,
}

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    changeCouponCode: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
    },
    changeFreeDelivery: (state, action: PayloadAction<boolean>) => {
      state.freeDelivery = action.payload;
    },
    changeStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    changeValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    changeEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    changeLimitUsage: (state, action: PayloadAction<number>) => {
      state.limitUsage = action.payload;
    },
    changeAllowAffiliator: (state, action: PayloadAction<boolean>) => {
      state.allowAffiliator = action.payload;
    }
  }
});

export const {
  changeThumbnail,
  changeIsActive,
  changeCouponCode,
  changeFreeDelivery,
  changeStartDate,
  changeValue,
  changeEndDate,
  changeLimitUsage,
  changeAllowAffiliator,
} = couponSlice.actions;

export default couponSlice.reducer;
