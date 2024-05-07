import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  thumbnail: string;
  status: string;
  // Add other product properties here
}

const initialState: ProductState = {
  thumbnail: "/media/avatars/300-1.jpg",
  status: "draft",
  // Initialize other product properties here
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    // Add other product actions here
  },
});

export const { changeThumbnail, changeStatus } = productSlice.actions;

export default productSlice.reducer;
