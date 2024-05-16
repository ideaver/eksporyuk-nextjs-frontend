import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";

interface BuyerState {
  fileXLSX: string;
  buyerName: string;
  companyName: string;
  country: any;
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
  fileXLSX: "",
  buyerName: "",
  companyName: "",
  country: "",
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
    changeFileXLSX: (state, action: PayloadAction<string>) => {
      state.fileXLSX = action.payload;
    },
    changeBuyerName: (state, action: PayloadAction<string>) => {
      state.buyerName = action.payload;
    },
    changeCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    changeCountry: (state, action: PayloadAction<any>) => {
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
  changeFileXLSX,
} = buyerSlice.actions;

export default buyerSlice.reducer;
