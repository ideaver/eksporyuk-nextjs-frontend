import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";
import { PropsValue } from "react-select";

interface BuyerState {
  loadingImport: boolean;
  buyerName: string;
  companyName: string;
  country: number;
  companyAddress: string;
  email: string;
  telephoneNumber: string;
  demand: string;
  abbreviation: "Ton" | "Kg" | "Pcs";
  demandQuantity: string;
  shippingTerms: InternationalTradeDeliveryTypeEnum;
  price: string;

  // Add other buyers properties here
}

const initialState: BuyerState = {
  loadingImport: false,
  buyerName: "",
  companyName: "",
  country: 1,
  companyAddress: "",
  email: "",
  telephoneNumber: "",
  demand: "",
  demandQuantity: "",
  abbreviation: "Ton",
  shippingTerms: InternationalTradeDeliveryTypeEnum.Cfr,
  price: "",

  // Initialize other buyer properties here
};

export const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    changeLoadingImport: (state, action: PayloadAction<boolean>) => {
      state.loadingImport = action.payload;
    },
    changeBuyerName: (state, action: PayloadAction<string>) => {
      state.buyerName = action.payload;
    },
    changeCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    changeCountry: (state, action: PayloadAction<number>) => {
      state.country = action.payload;
    },
    changeCompanyAddress: (state, action: PayloadAction<string>) => {
      state.companyAddress = action.payload;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changeTelephoneNumber: (state, action: PayloadAction<string>) => {
      state.telephoneNumber = action.payload;
    },
    changeDemand: (state, action: PayloadAction<string>) => {
      state.demand = action.payload;
    },
    changeShippingTerms: (
      state,
      action: PayloadAction<InternationalTradeDeliveryTypeEnum>
    ) => {
      state.shippingTerms = action.payload;
    },
    changeDemandQuantity: (state, action: PayloadAction<string>) => {
      state.demandQuantity = action.payload;
    },
    changeAbbreviation: (
      state,
      action: PayloadAction<"Ton" | "Kg" | "Pcs">
    ) => {
      state.abbreviation = action.payload;
    },
    changePrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },

    // Add other buyers actions here
  },
});

export const {
  changeBuyerName,
  changeCountry,
  changeCompanyName,
  changeCompanyAddress,
  changeDemand,
  changeDemandQuantity,
  changeAbbreviation,
  changePrice,
  changeEmail,
  changeShippingTerms,
  changeTelephoneNumber,
  changeLoadingImport,
} = buyerSlice.actions;

export default buyerSlice.reducer;
