import { FeedbackCategoryTypeEnum } from "@/app/service/graphql/gen/graphql";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface followupState {
  name: string | undefined | null;
  id: number | undefined | null;
  content: string | undefined | null;
  selectedFollowUpValue: string;
  followUpTamplate: string | undefined;
  // dataState
  userName: string;
  date: string;
  email: string;
  phone: string;
  coupon: string;
  productName: string;
  totalOrder: string;
  productType: string;
  idInvoiceProduct: string;
}
const initialState: followupState = {
  name: "",
  id: 0,
  content: "",
  selectedFollowUpValue: "",
  followUpTamplate: "",
  userName: "",
  date: "",
  email: "",
  phone: "",
  coupon: "",
  productName: "",
  totalOrder: "",
  productType: "",
  idInvoiceProduct: "",
};

export const followupSlice = createSlice({
  name: "followUp",
  initialState,
  reducers: {
    changeFollowUpTotalOrderName: (state, action: PayloadAction<string>) => {
      state.totalOrder = action.payload;
    },
    changeFollowUpProductTypeName: (state, action: PayloadAction<string>) => {
      state.productType = action.payload;
    },
    changeFollowUpIdInvoiceProductName: (
      state,
      action: PayloadAction<string>
    ) => {
      state.idInvoiceProduct = action.payload;
    },
    changeFollowUpProductName: (state, action: PayloadAction<string>) => {
      state.productName = action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    changeContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    changeFollowUpTamplate: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.followUpTamplate = action.payload;
    },
    changeSelectedFollwUpValue: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.followUpTamplate = action.payload;
    },
    changeFollowUpName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeFollowUpEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changeFollowUpCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
    changeFollowUpPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    changeFollowUpDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const {
  changeFollowUpProductName,
  changeFollowUpProductTypeName,
  changeFollowUpTotalOrderName,
  changeFollowUpIdInvoiceProductName,
  changeContent,
  changeId,
  changeName,
  changeFollowUpTamplate,
  changeSelectedFollwUpValue,
  changeFollowUpCoupon,
  changeFollowUpEmail,
  changeFollowUpName,
  changeFollowUpPhone,
  changeFollowUpDate,
} = followupSlice.actions;

export default followupSlice.reducer;
