import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArticleState {
  thumbnail: string;
  category: string[];
  status: string;
  title: string;
  urlVideo: string;
  content: string;
}

const initialState: ArticleState = {
  thumbnail: "/media/svg/files/blank-image.svg",
  category: [],
  status: "",
  title: "",
  urlVideo: "",
  content: "",
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeCategory: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeUrlVideo: (state, action: PayloadAction<string>) => {
      state.urlVideo = action.payload;
    },
    changeContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeContent,
  changeStatus,
  changeThumbnail,
  changeTitle,
  changeUrlVideo,
} = articleSlice.actions;

export default articleSlice.reducer;
