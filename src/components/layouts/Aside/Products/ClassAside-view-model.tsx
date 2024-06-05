import { postDataAPI } from "@/app/service/api/rest-service";
import {
  // CourseDurationTypeEnum,
  CourseStatusEnum,
  FileTypeEnum,
  QuestionTypeEnum,
  useCourseCreateOneMutation,
  useFileCreateOneMutation,
  VisibilityEnum,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeCourseDuration,
  changeCourseType,
  changeStatus,
  changeThumbnail,
} from "@/features/reducers/course/courseReducer";
import { IResourceData } from "@/types/contents/course/IResourceData";
import {
  ILessonBasic,
  ILessonVideoContent,
} from "@/types/contents/products/ILessonData";
import { ApolloError } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const stringToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mime = arr?.[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const convertFile = async (file: any, session: any, filename: string) => {
  const newFile = stringToFile(file, filename);
  const response = await postDataAPI({
    endpoint: "upload/file",
    body: {
      file: newFile,
    },
    fields: {
      userId: session.user.id,
    },
    isMultipartRequest: true,
  });
  if (response?.status === 404) {
    await signOut();
  }
  const url = response?.data;
  return url;
};

const useCreateCourse = () => {
  const currentCourseSelector = useSelector((state: RootState) => state.course);
  const { data: session, status } = useSession();
  const [createCourseMutation, { data, error, loading }] =
    useCourseCreateOneMutation();
  const [fileCreateOne] = useFileCreateOneMutation();
  const createCourse = async () => {
    const randomName =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      ".png";
    const thumbnail = await convertFile(
      currentCourseSelector.thumbnail,
      session,
      randomName
    );
    const courseIntro = fileCreateOne({
      variables: {
        data: {
          path: currentCourseSelector.introVideo,
          fileType: FileTypeEnum.Mp4,
        },
      },
    });

    console.log("INI COURSE INTRO", (await courseIntro).data?.fileCreateOne);

    const courseVideosHandle = async (lessons: ILessonBasic[]) => {
      return lessons.map(async (lesson, index) => {
        const material = await fileCreateOne({
          variables: {
            data: {
              path: (lesson.content as ILessonVideoContent).videoUrl,
              fileType: FileTypeEnum.Mp4,
            },
          },
        });
        console.log("INI MATERIAL", material.data?.fileCreateOne);
        return {
          title: lesson.title,
          description: (lesson.content as ILessonVideoContent).content,
          orderIndex: index,
          accessibility: VisibilityEnum.Public,
          material: {
            connect: {
              path: material.data?.fileCreateOne?.path,
            },
          },
        };
      });
    };

    const courseResourceFileHanlder = async (resource: IResourceData[]) => {
      return resource.map(async (resource, index) => {
        const files = await Promise.all(
          resource.files.map(async (file) => {
            console.log("INI FILE RESOURCE", file);
            const uploadedPath = await convertFile(
              file.fileUrl,
              session,
              file.fileName
            );
            return {
              path: uploadedPath,
            };
          })
        );
        console.log("INI FILES RESOURCE", files);
        return {
          name: resource.title,
          description: resource.description,
          files: {
            connect: files,
          },
        };
      });
    };

    const sectionData = await Promise.all(
      currentCourseSelector.sections.map(async (section, index) => {
        const lessons = await Promise.all(
          await courseVideosHandle(section.lessons)
        );
        const resourcesFile = await Promise.all(
          await courseResourceFileHanlder(section.resources)
        );
        return {
          name: section.title,
          accessibility: VisibilityEnum.Public,
          orderIndex: index,
          lessons: {
            create: lessons,
          },
          quizzes: {
            create: section.quizs.map((quiz, index) => ({
              title: quiz.quizBasic.quizName,
              description: quiz.quizSylabus.quizDescription,
              questions: {
                create: quiz.quizSylabus.quizs.map((question, index) => ({
                  text: question.quizDescription,
                  type:
                    quiz.quizBasic.quizType === "Pilihan Ganda"
                      ? QuestionTypeEnum.TrueFalse
                      : QuestionTypeEnum.MultipleChoice,
                  options: {
                    create: question.quizQuestion.map((answer) => ({
                      optionText: answer.option,
                      isCorrect: answer.isCorrect,
                    })),
                  },
                })),
              },
            })),
          },
          resources: {
            create: resourcesFile,
          },
        };
      })
    );
    const courseVariable = {
      data: {
        title: currentCourseSelector.courseName,
        description: currentCourseSelector.classDescription,
        images: {
          connect: [
            {
              path: thumbnail,
            },
          ],
        },
        status: currentCourseSelector.status as CourseStatusEnum,
        createdBy: {
          connect: {
            id: session?.user.id,
          },
        },
        duration: currentCourseSelector.courseDuration,
        videoUrl: {
          connect: {
            path: (await courseIntro).data?.fileCreateOne?.path,
          },
        },
        mentors: {
          connect:
            currentCourseSelector.courseMentor?.map((mentor) => ({
              id: mentor.value,
            })) || [],
        },
        basePrice: parseInt(currentCourseSelector.price),
        level: currentCourseSelector.courseLevel,
        affiliateCommission: currentCourseSelector.affiliateCommission,
        affiliateCommissionType: currentCourseSelector.affiliateCommissionType,
        objective: {
          set: currentCourseSelector.objective,
        },
        sections: {
          create: sectionData,
        },
      },
    };
    console.log("DATA COURSE", courseVariable);
    createCourseMutation({
      variables: courseVariable,
    });
    if (data !== undefined) {
      Promise.resolve(data);
    } else if (error !== undefined || data === undefined) {
      Promise.reject(error);
    }
  };
  return { currentCourseSelector, createCourse, loading, error, data };
};

const useNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const createCourse = useCreateCourse();
  const [isLoading, setIsLoading] = useState(false);
  const [createCourseError, setCreateCourseError] = useState<
    string | undefined
  >(undefined);

  const pageMap: { [key: string]: string } = {
    "/information": "/sylabus",
  };

  const previousPageMap: { [key: string]: string } = Object.entries(
    pageMap
  ).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

  const navigate = (pageMap: { [key: string]: string }) => {
    const pathEnd = router.pathname.split("/").pop();
    const page = pageMap[`/${pathEnd}`];
    const action = router.query.id ? "edit" : "create";
    if (page) {
      router.push(`/admin/courses/${action}${page}`);
    }
  };

  const handleNext = async () => {
    const pathEnd = router.pathname.split("/").pop();
    const lastPage = Object.values(pageMap).pop();
    if (`/${pathEnd}` === lastPage) {
      setIsLoading(true);
      setCreateCourseError(undefined);
      try {
        await createCourse.createCourse();
        setIsLoading(false);
        // dispatch(resetCourse());
        console.log("SUCCSS CREATED WITH ERROR", createCourse.error);
        console.log("SUCCESS CREATED COURSE", createCourse.data);
        router.push(`/admin/courses`);
      } catch (error: any) {
        console.log("TERJADI ERROR DI:", (error as ApolloError).message);
        setCreateCourseError(error.toString());
        setIsLoading(false);
      }
    } else {
      navigate(pageMap);
    }
  };

  const handlePrevious = () => navigate(previousPageMap);

  return { handleNext, handlePrevious, isLoading, createCourseError };
};

const useClassViewModel = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((state: RootState) => state.course.thumbnail);
  const status = useSelector((state: RootState) => state.course.status);
  const duration = useSelector(
    (state: RootState) => state.course.courseDuration
  );
  const courseType = useSelector((state: RootState) => state.course.courseType);
  const { handleNext, handlePrevious, isLoading, createCourseError } =
    useNavigation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeThumbnail(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (status: CourseStatusEnum) => {
    dispatch(changeStatus(status));
  };
  const handleDurationChange = (duration: number) => {
    dispatch(changeCourseDuration(duration));
  };
  const handleCourseTypeChange = (courseType: "subscription" | "one-time") => {
    dispatch(changeCourseType(courseType));
    if (courseType === "one-time") {
      dispatch(changeCourseDuration(999999999999999));
    } else {
      dispatch(changeCourseDuration(2));
    }
  };
  // const handleDurationChange = (duration: CourseDurationTypeEnum) => {
  //   dispatch(changeCourseDuration(duration));
  // };

  return {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    handleDurationChange,
    status,
    duration,
    handleNext,
    handlePrevious,
    isLoading,
    createCourseError,
    handleCourseTypeChange,
    courseType,
  };
};

export default useClassViewModel;
