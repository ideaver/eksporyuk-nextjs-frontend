import { FeedbackCategoryTypeEnum } from "@/app/service/graphql/gen/graphql";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface feedbackState {
  feedbackCategoryType: "ALL" | FeedbackCategoryTypeEnum;
}
const initialState: feedbackState = {
  feedbackCategoryType: "ALL",
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    changeFeedbackCategoryType: (
      state,
      action: PayloadAction<"ALL" | FeedbackCategoryTypeEnum>
    ) => {
      state.feedbackCategoryType = action.payload;
    },
  },
});

export const { changeFeedbackCategoryType } = feedbackSlice.actions;

export default feedbackSlice.reducer;
