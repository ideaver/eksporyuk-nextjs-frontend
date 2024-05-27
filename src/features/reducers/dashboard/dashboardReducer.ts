import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  salesPeriod: number;
  leadPeriod: number;
  omzetPeriod: number;
  orderCountPeriod: number;
  newMemberPeriod: number;
}

const initialState: DashboardState = {
  salesPeriod: 1,
  leadPeriod: 1,
  omzetPeriod: 1,
  orderCountPeriod: 1,
  newMemberPeriod: 1,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeSalesPeriod: (state, action: PayloadAction<number>) => {
      state.salesPeriod = action.payload;
    },
    changeLeadPeriod: (state, action: PayloadAction<number>) => {
      state.leadPeriod = action.payload;
    },
    changeOmzetPeriod: (state, action: PayloadAction<number>) => {
      state.omzetPeriod = action.payload;
    },
    changeOrderCountPeriod: (state, action: PayloadAction<number>) => {
      state.orderCountPeriod = action.payload;
    },
    changeNewMemberPeriod: (state, action: PayloadAction<number>) => {
      state.newMemberPeriod = action.payload;
    },
  },
});
export const {
  changeLeadPeriod,
  changeSalesPeriod,
  changeNewMemberPeriod,
  changeOrderCountPeriod,
  changeOmzetPeriod,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
