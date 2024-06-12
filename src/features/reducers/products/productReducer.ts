import { CourseLevelEnum } from "@/app/service/graphql/gen/graphql";
import { createDefaultLessonData, createDefaultLessonTopic, ILessonBasic, ILessonTopic } from "@/types/contents/products/ILessonData";
import { defaultCreateQuizData, ICreateQuizData } from "@/types/contents/products/IQuizData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  thumbnail: string;
  status: string;
  className: string;
  classDescription: string;
  introVideo: string;
  classAuthor: string;
  
  price: string;
  discountPrice: string;
  courseLevel: CourseLevelEnum;
  quizs: ICreateQuizData[];
  editQuiz: ICreateQuizData;
  objective: string[];
  lessons: ILessonTopic[];
  editLessonTopic: ILessonTopic;
  editLesson: ILessonBasic;
  // Add other product properties here
}

const initialState: ProductState = {
  thumbnail: "/media/avatars/300-1.jpg",
  status: "draft",
  className: "",
  classDescription: "",
  introVideo: "",
  classAuthor: "",
  price: "",
  discountPrice: "",
  courseLevel: CourseLevelEnum.Beginner,
  quizs: [],
  editQuiz: defaultCreateQuizData,
  objective: [],
  lessons: [],
  editLessonTopic: createDefaultLessonTopic(),
  editLesson: createDefaultLessonData(),
  // Initialize other product properties here
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    changeClassName: (state, action: PayloadAction<string>) => {
      state.className = action.payload;
    },
    changeClassDescription: (state, action: PayloadAction<string>) => {
      state.classDescription = action.payload;
    },
    changeIntroVideo: (state, action: PayloadAction<string>) => {
      state.introVideo = action.payload;
    },
    changeClassAuthor: (state, action: PayloadAction<string>) => {
      state.classAuthor = action.payload;
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
    changeQuizs: (state, action: PayloadAction<ICreateQuizData[]>) => {
      state.quizs = action.payload;
    },
    changeEditQuiz: (state, action: PayloadAction<ICreateQuizData>) => {
      state.editQuiz = action.payload;
    },
    changeObjective: (state, action: PayloadAction<string[]>) => {
      state.objective = action.payload;
    },
    changeLessons: (state, action: PayloadAction<ILessonTopic[]>) => {
      state.lessons = action.payload;
    },
    changeEditLessonTopic: (state, action: PayloadAction<ILessonTopic>) => {
      state.editLessonTopic = action.payload;
    },
    changeEditLesson(data: ProductState, action: PayloadAction<ILessonBasic>) {
      data.editLesson = action.payload;
    }
    // Add other product actions here
  },
});

export const {
  changeThumbnail,
  changeStatus,
  changeClassName,
  changeClassDescription,
  changeIntroVideo,
  changeClassAuthor,
  changePrice,
  changeDiscountPrice,
  changeCourseLevel,
  changeQuizs,
  changeEditQuiz,
  changeObjective,
  changeLessons,
  changeEditLessonTopic,
  changeEditLesson
} = productSlice.actions;

export default productSlice.reducer;
