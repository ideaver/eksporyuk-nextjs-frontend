import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  serviceName: string;
  serviceStatus: boolean;
  serviceDescription: string;
  serviceType: string;
  subscriberListId: string;
  serviceCost: string;
  serviceObjective: string[];
  servicePortfolio: string[];
  serviceImages: { path: string; fileType: string }[];
  uploadImages: { path: string }[];
  serviceDiscountCost: string;
}

const initialState: ServiceState = {
  serviceName: "",
  serviceStatus: false,
  serviceDescription: "",
  serviceType: "",
  subscriberListId: "",
  serviceCost: "",
  serviceObjective: [],
  servicePortfolio: [],
  serviceImages: [{ path: "/media/avatars/300-1.jpg", fileType: "PNG" }],
  uploadImages: [{ path: "" }],
  serviceDiscountCost: "",
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    changeServiceName: (state, action: PayloadAction<string>) => {
      state.serviceName = action.payload;
    },
    changeServiceStatus: (state, action: PayloadAction<boolean>) => {
      state.serviceStatus = action.payload;
    },
    changeServiceDesc: (state, action: PayloadAction<string>) => {
      state.serviceDescription = action.payload;
    },
    changeServiceType: (state, action: PayloadAction<string>) => {
      state.serviceType = action.payload;
    },
    changeServiceCost: (state, action: PayloadAction<string>) => {
      state.serviceCost = action.payload;
    },
    changeSubscriberListId: (state, action: PayloadAction<string>) => {
      state.subscriberListId = action.payload;
    },
    changeServiceObjective: (state, action: PayloadAction<string[]>) => {
      state.serviceObjective = action.payload;
    },
    changeServicePortfolio: (state, action: PayloadAction<string[]>) => {
      state.servicePortfolio = action.payload;
    },
    changeServiceImages: (
      state,
      action: PayloadAction<{ path: string; fileType: string }[]>
    ) => {
      state.serviceImages = action.payload;
    },
    changeUploadImages: (state, action: PayloadAction<{ path: string }[]>) => {
      state.uploadImages = action.payload;
    },
    changeServiceDiscountCost: (state, action: PayloadAction<string>) => {
      state.serviceDiscountCost = action.payload;
    },
  },
});

export const {
  changeServiceName,
  changeServiceStatus,
  changeServiceDesc,
  changeServiceType,
  changeServiceCost,
  changeServiceObjective,
  changeServiceImages,
  changeServicePortfolio,
  changeUploadImages,
  changeServiceDiscountCost,
  changeSubscriberListId,
} = serviceSlice.actions;

export default serviceSlice.reducer;
