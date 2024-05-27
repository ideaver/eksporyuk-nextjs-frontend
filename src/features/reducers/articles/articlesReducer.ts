import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeCategory {
  value: number;
  label: string;
}

interface ArticleState {
  category: TypeCategory[];
  status: string;
  title: string;
  content: string;
}

const initialState: ArticleState = {
  category: [],
  status: "published",
  title: "",
  content: "",
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
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

export const { changeCategory, changeContent, changeStatus, changeTitle } =
  articleSlice.actions;

export default articleSlice.reducer;
