import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  loading: boolean;
}

const initialState: TransactionState = {
  loading: false,
};

const transactionSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    changeTransactionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { changeTransactionLoading } = transactionSlice.actions;

export default transactionSlice.reducer;
