import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BuyerState {
  fileXLSX: string;
  buyerName: string;
  companyName: string;
  country: any;
  companyAddress: string;
  email: string;
  telephoneNumber: string;
  demand: string;
  demandQuantity: string;
  shippingTerms: string;
  destinationPort: string;

  // Add other product properties here
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
  shippingTerms: "",
  destinationPort: "",

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
    changeShippingTerms: (state, action: PayloadAction<string>) => {
      state.destinationPort = action.payload;
    },
    changeDestinationPort: (state, action: PayloadAction<string>) => {
      state.destinationPort = action.payload;
    },
    changeDemandQuantity: (state, action: PayloadAction<string>) => {
      state.destinationPort = action.payload;
    },

    // Add other product actions here
  },
});

export const {
  changeBuyerName,
  changeCountry,
  changeCompanyName,
  changeCompanyAddress,
  changeDemand,
  changeDemandQuantity,
  changeDestinationPort,
  changeEmail,
  changeShippingTerms,
  changeTelephoneNumber,
  changeFileXLSX,
} = buyerSlice.actions;

export default buyerSlice.reducer;
