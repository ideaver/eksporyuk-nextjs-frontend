import {
  AffiliateCommissionTypeEnum,
  // CourseDurationTypeEnum,
  CourseLevelEnum,
  CourseStatusEnum,
} from "@/app/service/graphql/gen/graphql";
import { OptionType } from "@/templates/Admin/Course/CreateOrEdit/Information/Information-view-model";
import { ICourseSectionData } from "@/types/contents/course/ICourseData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseState {
  id?: string;
  thumbnail: string;
  status: CourseStatusEnum;
  courseName: string;
  classDescription: string;
  introVideo: string;
  courseAuthor: string;
  subscriberListId: string;
  price: string;
  discountPrice?: string;
  courseLevel: CourseLevelEnum;
  courseDuration: number;
  affiliateCommission: number;
  affiliateCommissionType: AffiliateCommissionTypeEnum;
  certificateTemplateId: number;
  courseType: "subscription" | "one-time";
  objective: string[];
  courseMentor: OptionType[] | undefined;
  sections: ICourseSectionData[];
  editSection?: ICourseSectionData;
  errorMessage?: string;
}

const initialState: CourseState = {
  id: "",
  thumbnail: "/media/avatars/blank.png",
  status: CourseStatusEnum.Published,
  courseName: "",
  classDescription: "",
  introVideo: "",
  courseAuthor: "",
  subscriberListId: "",
  price: "",
  discountPrice: "",
  courseType: "subscription",
  courseLevel: CourseLevelEnum.Beginner,
  courseDuration: 100,
  affiliateCommission: 100,
  affiliateCommissionType: AffiliateCommissionTypeEnum.Amount,
  certificateTemplateId: 0,
  objective: [],
  courseMentor: [],
  sections: [],
  editSection: undefined,
  errorMessage: "",
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourse: () => initialState,
    editCourse: (state, action: PayloadAction<CourseState>) => {
      return action.payload;
    },
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeStatus: (state, action: PayloadAction<CourseStatusEnum>) => {
      state.status = action.payload;
    },
    changeCourseName: (state, action: PayloadAction<string>) => {
      state.courseName = action.payload;
    },
    changeSubscriberListId: (state, action: PayloadAction<string>) => {
      state.subscriberListId = action.payload;
    },
    changeClassDescription: (state, action: PayloadAction<string>) => {
      state.classDescription = action.payload;
    },
    changeIntroVideo: (state, action: PayloadAction<string>) => {
      state.introVideo = action.payload;
    },
    changeCourseAuthor: (state, action: PayloadAction<string>) => {
      state.courseAuthor = action.payload;
    },
    changePrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    changeDiscountPrice: (state, action: PayloadAction<string>) => {
      state.discountPrice = action.payload;
    },
    changeCourseLevel: (state, action: PayloadAction<CourseLevelEnum>) => {
      state.courseLevel = action.payload;
    },
    changeCourseDuration: (state, action: PayloadAction<number>) => {
      state.courseDuration = action.payload;
    },
    changeAffiliateCommission: (state, action: PayloadAction<number>) => {
      state.affiliateCommission = action.payload;
    },
    changeAffiliateCommissionType: (
      state,
      action: PayloadAction<AffiliateCommissionTypeEnum>
    ) => {
      state.affiliateCommissionType = action.payload;
    },
    changeCertificateTemplateId: (state, action: PayloadAction<number>) => {
      state.certificateTemplateId = action.payload;
    },
    changeCourseType: (
      state,
      action: PayloadAction<"subscription" | "one-time">
    ) => {
      state.courseType = action.payload;
    },
    changeObjective: (state, action: PayloadAction<string[]>) => {
      state.objective = action.payload;
    },
    changeCourseMentor: (
      state,
      action: PayloadAction<OptionType[] | undefined>
    ) => {
      state.courseMentor = action.payload;
    },
    changeSections: (state, action: PayloadAction<ICourseSectionData[]>) => {
      state.sections = action.payload;
    },
    changeEditSection: (state, action: PayloadAction<ICourseSectionData>) => {
      state.editSection = action.payload;
    },
    changeErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  resetCourse,
  changeThumbnail,
  changeStatus,
  changeCourseName,
  changeClassDescription,
  changeIntroVideo,
  changeCourseAuthor,
  changePrice,
  changeDiscountPrice,
  changeCourseLevel,
  changeObjective,
  changeSections,
  changeEditSection,
  changeCourseMentor,
  changeCourseDuration,
  editCourse,
  changeCourseType,
  changeAffiliateCommission,
  changeAffiliateCommissionType,
  changeCertificateTemplateId,
  changeErrorMessage,
  changeSubscriberListId,
} = courseSlice.actions;

export default courseSlice.reducer;
