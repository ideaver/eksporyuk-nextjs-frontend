
export interface IQuizBasic {
  quizName: string;
  quizType: "Pilihan Ganda" | "Jawaban Ganda";
}

export interface IQuizOption {
  id: string;
  option: string;
  isCorrect: boolean;
}

export interface IQuizSylabus {
  id: string;
  quizDescription: string;
  quizQuestion: IQuizOption[];
}

export interface IQuizSylabusData {
  quizDescription: string;
  quizs: IQuizSylabus[];
}

export interface ICreateQuizData {
  id: string;
  quizBasic: IQuizBasic;
  quizSylabus: IQuizSylabusData;
}
export type StepProps = {
  data: ICreateQuizData;
  updateData: (fieldsToUpdate: Partial<ICreateQuizData>) => void;
  hasError: boolean;
};

export const defaultCreateQuizData: ICreateQuizData = {

id: Math.random().toString(36).substring(2),
  quizBasic: {
    quizName: "",
    quizType: "Pilihan Ganda",
  },
  quizSylabus: {
    quizDescription: "",
    quizs: [],
  },
};
