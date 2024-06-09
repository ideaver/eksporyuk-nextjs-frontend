import { NewsTypeEnum } from "@/app/service/graphql/gen/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeCategory {
  value: number;
  label: string;
}

interface AnnouncementState {
  newsType: NewsTypeEnum;
  contentNews: string;
  titleNews: string;
}

const initialState: AnnouncementState = {
  titleNews: "",
  contentNews: "",
  newsType: NewsTypeEnum.Headline,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    changeNewsType: (state, action: PayloadAction<NewsTypeEnum>) => {
      state.newsType = action.payload;
    },

    changeTitleNews: (state, action: PayloadAction<string>) => {
      state.titleNews = action.payload;
    },
    changeContentNews: (state, action: PayloadAction<string>) => {
      state.contentNews = action.payload;
    },
  },
});

export const { changeNewsType, changeTitleNews, changeContentNews } =
  newsSlice.actions;

export default newsSlice.reducer;
