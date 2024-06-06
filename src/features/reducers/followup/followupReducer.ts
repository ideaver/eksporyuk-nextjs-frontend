import { FeedbackCategoryTypeEnum } from "@/app/service/graphql/gen/graphql";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface followupState {
  name: string | undefined | null;
  id: number | undefined | null;
  content: string | undefined | null;
}
const initialState: followupState = {
  name: "",
  id: 0,
  content: "",
};

export const followupSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    changeContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { changeContent, changeId, changeName } = followupSlice.actions;

export default followupSlice.reducer;
