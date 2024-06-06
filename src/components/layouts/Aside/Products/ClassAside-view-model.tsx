import { postDataAPI } from "@/app/service/api/rest-service";
import {
  // CourseDurationTypeEnum,
  CourseStatusEnum,
  FileTypeEnum,
  QuestionTypeEnum,
  useCourseCreateOneMutation,
  useFileCreateOneMutation,
  useUserFindOneQuery,
  VisibilityEnum,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeCourseDuration,
  changeCourseType,
  changeErrorMessage,
  changeStatus,
  changeThumbnail,
  resetCourse,
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
      userId: session,
    },
    isMultipartRequest: true,
  });
  const url = response?.data;
  return url;
};

const useCreateCourse = () => {
  const currentCourseSelector = useSelector((state: RootState) => state.course);
  const { data: session, status } = useSession();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserFindOneQuery({
    variables: {
      where: {
        id: session?.user.id,
      },
    },
  });

  const [createCourseMutation, { data, error, loading }] =
    useCourseCreateOneMutation();
  const [fileCreateOne] = useFileCreateOneMutation();
  const createCourse = async () => {
    if (
      !userLoading &&
      (userError != undefined || userData?.userFindOne === null)
    ) {
      await signOut();
      return Promise.reject("User not found");
    }
    console.log(userData?.userFindOne?.id);
    const randomName =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      ".png";
    const thumbnail = await convertFile(
      currentCourseSelector.thumbnail,
      userData?.userFindOne?.id,
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
              userData?.userFindOne?.id,
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
    try {
      const result = await createCourseMutation({
        variables: courseVariable,
      });
      console.log("DATA FROM CREATE DATA", result.data);
      if (result.data) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(new Error("Mutation did not return a result"));
      }
    } catch (error) {
      console.log("ERROR FROM CREATE DATA", error);
      return Promise.reject(error);
    }
  };
  return { createCourse, loading, error, data, currentCourseSelector };
};

const useNavigation = () => {
  const router = useRouter();
  const action = router.query.id ? "edit" : "create";
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

    if (page) {
      router.push(`/admin/courses/${action}${page}`);
    }
  };

  const handleNext = async () => {
    const pathEnd = router.pathname.split("/").pop();
    const lastPage = Object.values(pageMap).pop();
    const courseData = createCourse.currentCourseSelector;
    if (`/${pathEnd}` === lastPage) {
      if (
        courseData.sections === undefined ||
        courseData.sections.length === 0
      ) {
        dispatch(changeErrorMessage("Section Kosong"));
      } else if (courseData.objective.length === 0) {
        dispatch(changeErrorMessage("Objective Kosong"));
      } else {
        if (action == "create") {
          dispatch(changeErrorMessage(""));
          setIsLoading(true);
          setCreateCourseError(undefined);
          try {
            const res = await createCourse.createCourse();
            if (res !== undefined) {
              setIsLoading(false);
              dispatch(resetCourse());
              console.log("SUCCSS CREATED WITH ERROR", createCourse.error);
              console.log("SUCCESS CREATED COURSE", createCourse.data);
              window.location.href = "/admin/courses";
            } else {
              setIsLoading(false);
              console.log("TERJADI ERROR DI:", res);
            }
          } catch (error: any | undefined | null) {
            dispatch(
              changeErrorMessage(
                (error as ApolloError)?.message ?? error.toString()
              )
            );
            console.log(
              "TERJADI ERROR DI:",
              (error as ApolloError)?.message ?? "NO MESSAGE FOUND"
            );
            setCreateCourseError(error?.toString());
            setIsLoading(false);
          }
        } else {
          dispatch(changeErrorMessage(""));
        }
      }
    } else {
      const isEmptyHTML = (str: string) => {
        const strippedString = str.replace(/<[^>]*>/g, "").trim();
        return strippedString.length === 0;
      };
      if (courseData.courseName === "") {
        dispatch(changeErrorMessage("Nama Kelas Kosong"));
      } else if (isEmptyHTML(courseData.classDescription)) {
        dispatch(changeErrorMessage("Deskripsi Kelas Kosong"));
      } else if (courseData.introVideo === "") {
        dispatch(changeErrorMessage("Intro Video Kosong"));
      } else if (courseData.price === "" || parseInt(courseData.price) === 0) {
        dispatch(changeErrorMessage("Harga kelas kosong"));
      } else if (
        courseData.thumbnail === "" ||
        courseData.thumbnail === "/media/avatars/blank.png"
      ) {
        dispatch(changeErrorMessage("Gambar kelas kosong"));
      } else if (courseData.affiliateCommission == 0) {
        dispatch(changeErrorMessage("Affiliasi Komisi kosong"));
      } else if (
        courseData.courseType === "subscription" &&
        courseData.courseDuration < 1
      ) {
        dispatch(
          changeErrorMessage("Durasi Kelas langganan kurang dari satu hari!")
        );
      } else {
        dispatch(changeErrorMessage(""));
        navigate(pageMap);
      }

      window.scrollTo(0, 0);
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
