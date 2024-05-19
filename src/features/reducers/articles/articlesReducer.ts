import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeCategory {
  value: number;
  label: string;
}

interface ArticleState {
  thumbnail: string | null;
  file: File | null;
  category: TypeCategory[];
  status: string;
  title: string;
  content: string;
}

const initialState: ArticleState = {
  thumbnail: null,
  file: null,
  category: [],
  status: "published",
  title: "",
  content: "",
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    changeThumbnail: (state, action: PayloadAction<string | null>) => {
      state.thumbnail = action.payload;
    },
    changeFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload ? action.payload : null;
    },
    changeCategory: (state, action: PayloadAction<TypeCategory[]>) => {
      state.category = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
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
  changeFile,
} = articleSlice.actions;

export default articleSlice.reducer;
