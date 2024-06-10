import { UserRoleEnum } from "@/app/service/graphql/gen/graphql";
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
  target: UserRoleEnum[];
  toogleForm: string;
  urlVideo: string;
}

const initialState: ArticleState = {
  category: [],
  status: "published",
  title: "",
  content: "",
  target: [],
  toogleForm: "Article",
  urlVideo: "",
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
    changeTarget: (state, action: PayloadAction<UserRoleEnum[]>) => {
      state.target = action.payload;
    },
    changeToogleForm: (state, action: PayloadAction<string>) => {
      state.toogleForm = action.payload;
    },
    changeUrlVideo: (state, action: PayloadAction<string>) => {
      state.urlVideo = action.payload;
    },
  },
});

export const {
  changeTarget,
  changeCategory,
  changeContent,
  changeStatus,
  changeTitle,
  changeToogleForm,
  changeUrlVideo,
} = articleSlice.actions;

export default articleSlice.reducer;
