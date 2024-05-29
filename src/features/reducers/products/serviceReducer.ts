import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  serviceName: string;
  serviceStatus: string;
  serviceDescription: string;
  serviceType: string;
  serviceCost: string;
  serviceObjective?: string[];
  servicePortfolio?: string[];
  serviceImages: string;
}

const initialState: ServiceState = {
  serviceName: "",
  serviceStatus: "private",
  serviceDescription: "",
  serviceType: "legality",
  serviceCost: "",
  serviceObjective: [],
  servicePortfolio: [],
  serviceImages: ""
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    changeServiceName: (state, action: PayloadAction<string>) => {
      state.serviceName = action.payload;
    },
    changeServiceStatus: (state, action: PayloadAction<string>) => {
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
    changeServiceObjective: (state, action: PayloadAction<string[]>) => {
      state.serviceObjective = action.payload;
    },
    changeServicePortfolio: (state, action: PayloadAction<string[]>) => {
      state.servicePortfolio = action.payload;
    },
    changeServiceImages: (state, action: PayloadAction<string>) => {
      state.serviceImages = action.payload;
    },
  }
});

export const {
  changeServiceName,
  changeServiceStatus,
  changeServiceDesc,
  changeServiceType,
  changeServiceCost,
  changeServiceObjective,
  changeServiceImages,
} = serviceSlice.actions;

export default serviceSlice.reducer;
