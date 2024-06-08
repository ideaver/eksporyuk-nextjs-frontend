import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeletedCourseState {
  sectionsId: Array<string | number>;
  lessonsId: Array<string | number>;
  quizsId: Array<string | number>;
  questionsId: Array<string | number>;
  resourcesId: Array<string | number>;
}

const initialState: DeletedCourseState = {
  sectionsId: [],
  lessonsId: [],
  quizsId: [],
  questionsId: [],
  resourcesId: [],
};

export const deletedCourseSlice = createSlice({
  name: "deletedCourse",
  initialState,
  reducers: {
    resetDeletedCourse: () => initialState,
    deleteSection: (state, action: PayloadAction<string | number>) => {
      state.sectionsId.push(action.payload);
    },
    deleteLesson: (state, action: PayloadAction<string | number>) => {
      state.lessonsId.push(action.payload);
    },
    deleteQuiz: (state, action: PayloadAction<string | number>) => {
      state.quizsId.push(action.payload);
    },
    deleteQuestion: (state, action: PayloadAction<string | number>) => {
      state.questionsId.push(action.payload);
    },
    deleteResource: (state, action: PayloadAction<string | number>) => {
      state.resourcesId.push(action.payload);
    },
  },
});

export const {
  resetDeletedCourse,
  deleteSection,
  deleteLesson,
  deleteQuiz,
  deleteResource,
  deleteQuestion,
} = deletedCourseSlice.actions;

export default deletedCourseSlice.reducer;
