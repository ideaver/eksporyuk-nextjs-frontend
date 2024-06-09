// import { UserRoleEnum } from "@/app/service/graphql/gen/graphql";
import { AnnouncementTypeEnum } from "@/app/service/graphql/gen/graphql";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeCategory {
  value: number;
  label: string;
}

interface AnnouncementState {
  announcementType: AnnouncementTypeEnum;
  contentAnnouncement: string;
  titleAnnouncement: string;
  course: TypeCategory | null;
}

const initialState: AnnouncementState = {
  announcementType: AnnouncementTypeEnum.Affiliate,
  titleAnnouncement: "",
  contentAnnouncement: "",
  course: null,
};

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    changeAnnouncementType: (
      state,
      action: PayloadAction<AnnouncementTypeEnum>
    ) => {
      state.announcementType = action.payload;
    },
    changeCourse: (state, action: PayloadAction<TypeCategory | null>) => {
      state.course = action.payload;
    },
    changeTitleAnnouncement: (state, action: PayloadAction<string>) => {
      state.titleAnnouncement = action.payload;
    },
    changeContentAnnouncement: (state, action: PayloadAction<string>) => {
      state.contentAnnouncement = action.payload;
    },
  },
});

export const {
  changeAnnouncementType,
  changeContentAnnouncement,
  changeTitleAnnouncement,
  changeCourse,
} = announcementSlice.actions;

export default announcementSlice.reducer;
