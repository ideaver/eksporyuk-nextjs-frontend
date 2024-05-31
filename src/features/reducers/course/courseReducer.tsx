import { CourseDurationTypeEnum, CourseLevelEnum } from "@/app/service/graphql/gen/graphql";
import { OptionType } from "@/templates/Admin/Course/CreateOrEdit/Information/Information-view-model";
import { ICourseSectionData } from "@/types/contents/course/ICourseData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  thumbnail: string;
  status: string;
  courseName: string;
  classDescription: string;
  introVideo: string;
  courseAuthor: string;
  price: string;
  discountPrice?: string;
  courseLevel: CourseLevelEnum;
  courseDuration: CourseDurationTypeEnum;
  objective: string[];
  courseMentor: OptionType[] | undefined;
  sections: ICourseSectionData[];
  editSection?: ICourseSectionData;
}

const initialState: CourseState = {
  thumbnail: "/media/avatars/blank.png",
  status: "draft",
  courseName: "",
  classDescription: "",
  introVideo: "",
  courseAuthor: "",
  price: "",
  discountPrice: "",
  courseLevel: CourseLevelEnum.Beginner,
  courseDuration: CourseDurationTypeEnum.ThreeMonths,
  objective: [],
  courseMentor: [],
  sections: [],
  editSection: undefined,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourse: () => initialState,
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    changeCourseName: (state, action: PayloadAction<string>) => {
      state.courseName = action.payload;
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
    changeCourseDuration: (state, action: PayloadAction<CourseDurationTypeEnum>) => {
      state.courseDuration = action.payload;
    },
    changeObjective: (state, action: PayloadAction<string[]>) => {
      state.objective = action.payload;
    },
    changeCourseMentor: (state, action: PayloadAction<OptionType[] | undefined>) => {
      state.courseMentor = action.payload;
    },
    changeSections: (state, action: PayloadAction<ICourseSectionData[]>) => {
      state.sections = action.payload;
    },
    changeEditSection: (state, action: PayloadAction<ICourseSectionData>) => {
      state.editSection = action.payload;
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
  changeCourseDuration
} = courseSlice.actions;

export default courseSlice.reducer;