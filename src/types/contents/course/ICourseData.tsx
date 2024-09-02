import { ILessonBasic, ILessonTopic } from "../products/ILessonData";
import { ICreateQuizData } from "../products/IQuizData";
import { IResourceData } from "./IResourceData";

export interface ICourseSectionData {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  quizs: ICreateQuizData[];
  lessons: ILessonBasic[];
  resources: IResourceData[];
}

export type StepProps = {
  data: ICourseSectionData;
  updateData: (fieldsToUpdate: Partial<ICourseSectionData>) => void;
  hasError: boolean;
};

export const createDefaultCourseSectionData = (): ICourseSectionData => ({
  id: Math.random().toString(36).substring(2),
  title: "",
  description: "",
  orderIndex: 0,
  quizs: [],
  lessons: [],
  resources: [],
});
