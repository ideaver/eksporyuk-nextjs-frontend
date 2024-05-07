import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  thumbnail: string;
  status: string;
  className: string;
  classDescription: string;
  introVideo: string;
  classAuthor: string;
  // Add other product properties here
}

const initialState: ProductState = {
  thumbnail: "/media/avatars/300-1.jpg",
  status: "draft",
  className: "",
  classDescription: "",
  introVideo: "",
  classAuthor: "",
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
    changeClassName: (state, action: PayloadAction<string>) => {
      state.className = action.payload;
    },
    changeClassDescription: (state, action: PayloadAction<string>) => {
      state.classDescription = action.payload;
    },
    changeIntroVideo: (state, action: PayloadAction<string>) => {
      state.introVideo = action.payload;
    },
    changeClassAuthor: (state, action: PayloadAction<string>) => {
      state.classAuthor = action.payload;
    },
    // Add other product actions here
  },
});

export const { 
  changeThumbnail, 
  changeStatus, 
  changeClassName, 
  changeClassDescription, 
  changeIntroVideo, 
  changeClassAuthor 
} = productSlice.actions;

export default productSlice.reducer;