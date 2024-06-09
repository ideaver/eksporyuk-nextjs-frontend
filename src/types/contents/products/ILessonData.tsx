export interface ILessonVideoContent {
  content: string;
  videoUrl: string;
  duration: number;
}
export interface ILessonPDFContent {
  content: string;
  file: string;
  fileName: string;
}

export interface ILessonBasic {
  id: string;
  title: string;
  lessonType: "Video" | "PDF";
  content: ILessonVideoContent | ILessonPDFContent;
}

export interface ILessonTopic {
  id: string;
  title: string;
  description: string;
  lessons?: ILessonBasic[];
}

export type StepProps = {
  data: ILessonBasic;
  updateData: (fieldsToUpdate: Partial<ILessonBasic>) => void;
  hasError: boolean;
};

export const createDefaultLessonData = (): ILessonBasic => ({
  id: Math.random().toString(36).substring(2),
  title: "",
  lessonType: "Video",
  content: {
    content: "",
    videoUrl: "",
    duration: 0
  },
});

export const createDefaultLessonTopic = (): ILessonTopic => ({
  id: Math.random().toString(36).substring(2),
  title: "",
  description: "",
});