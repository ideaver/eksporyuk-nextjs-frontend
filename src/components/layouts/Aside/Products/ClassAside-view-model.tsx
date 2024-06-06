import { postDataAPI } from "@/app/service/api/rest-service";
import {
  CourseSectionUpdateManyWithoutCourseNestedInput,
  // CourseDurationTypeEnum,
  CourseStatusEnum,
  FileTypeEnum,
  QuestionTypeEnum,
  useCourseCreateOneMutation,
  useCourseUpdateOneMutation,
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
  ILessonPDFContent,
  ILessonVideoContent,
} from "@/types/contents/products/ILessonData";
import { ApolloError } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const stringToFile = (dataUrl: string, filename: string): File | null => {
  try {
    const arr = dataUrl.split(",");
    const mime = arr?.[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error converting string to file: ", error);
    return null;
  }
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

const isBase64 = (str: string): boolean => {
  try {
    new URL(str);
    return false;
  } catch (_) {
    try {
      const decoded = atob(str);
      return decoded.startsWith("data:image");
    } catch (_) {
      return false;
    }
  }
};

const useUserAndCourseIdentify = () => {
  const currentCourseSelector = useSelector((state: RootState) => state.course);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    setIsLoggedIn(
      !userLoading && (userError != undefined || userData?.userFindOne === null)
    );
  }, [userLoading, userError, userData]);

  return {
    currentCourseSelector,
    userData,
    userLoading,
    userError,
    isLoggedIn,
  };
};

const useCreateCourse = () => {
  const {
    currentCourseSelector,
    userData,
    userError,
    userLoading,
    isLoggedIn,
  } = useUserAndCourseIdentify();
  const [createCourseMutation, { data, error, loading }] =
    useCourseCreateOneMutation();
  const [fileCreateOne] = useFileCreateOneMutation();
  const createCourse = async () => {
    if (isLoggedIn) {
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
        let material;
        if (lesson.lessonType === "Video") {
          const res = await fileCreateOne({
            variables: {
              data: {
                path: (lesson.content as ILessonVideoContent).videoUrl,
                fileType: FileTypeEnum.Mp4,
              },
            },
          });
          material = res.data?.fileCreateOne?.path;
        } else {
          material = await convertFile(
            (lesson.content as ILessonPDFContent).file,
            userData?.userFindOne?.id,
            (lesson.content as ILessonPDFContent).fileName
          );
        }
        console.log("INI MATERIAL", material);
        return {
          title: lesson.title,
          description: lesson.content.content,
          orderIndex: index,
          accessibility: VisibilityEnum.Public,
          duration:
            (lesson.content as ILessonVideoContent)?.duration * 60 * 1000 ?? 0,
          material: {
            connect: {
              path: material,
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
            id: userData?.userFindOne?.id,
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
        ...(currentCourseSelector.certificateTemplateId !== 0
          ? {
              certificateTemplate: {
                connect: {
                  id: currentCourseSelector.certificateTemplateId,
                },
              },
            }
          : {}),
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
      return Promise.reject(error);
    }
  };
  return { createCourse, loading, error, data, currentCourseSelector };
};

const useEditCourse = () => {
  const {
    currentCourseSelector,
    userData,
    userError,
    userLoading,
    isLoggedIn,
  } = useUserAndCourseIdentify();
  const [fileCreateOne] = useFileCreateOneMutation();
  const [updateCourseMutation, { data, error, loading }] =
    useCourseUpdateOneMutation();

  const editCourse = async () => {
    if (isLoggedIn) {
      await signOut();
      return Promise.reject("User not found");
    }

    const randomName =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      ".png";

    const thumbnailHandler = async () => {
      try {
        const thumbnail = await convertFile(
          currentCourseSelector.thumbnail,
          userData?.userFindOne?.id,
          randomName
        );
        return thumbnail as string;
      } catch (error) {
        return currentCourseSelector.thumbnail;
      }
    };

    const courseIntroHandler = async () => {
      try {
        const courseIntro = fileCreateOne({
          variables: {
            data: {
              path: currentCourseSelector.introVideo,
              fileType: FileTypeEnum.Mp4,
            },
          },
        });
        return (await courseIntro).data?.fileCreateOne?.path;
      } catch (error) {
        return currentCourseSelector.introVideo;
      }
    };

    // const courseIntro = fileCreateOne({
    //   variables: {
    //     data: {
    //       path: currentCourseSelector.introVideo,
    //       fileType: FileTypeEnum.Mp4,
    //     },
    //   },
    // });

    // console.log("INI COURSE INTRO", (await courseIntro).data?.fileCreateOne);

    const courseVideosHandler = async (lessons: ILessonBasic[]) => {
      return lessons.map(async (lesson, index) => {
        let material;
        if (lesson.lessonType === "Video") {
          try {
            const res = await fileCreateOne({
              variables: {
                data: {
                  path: (lesson.content as ILessonVideoContent).videoUrl,
                  fileType: FileTypeEnum.Mp4,
                },
              },
            });
            material = res.data?.fileCreateOne?.path;
          } catch (error) {
            console.log("BAGAIMANA BISA INI ERROR", error);
            material = (lesson.content as ILessonVideoContent).videoUrl;
          }
        } else {
          try {
            material = await convertFile(
              (lesson.content as ILessonPDFContent).file,
              userData?.userFindOne?.id,
              (lesson.content as ILessonPDFContent).fileName
            );
          } catch (error) {
            material = (lesson.content as ILessonPDFContent).file;
          }
        }
        console.log("INI MATERIAL", material);
        return {
          where: {
            id: parseInt(lesson.id),
          },
          data: {
            title: {
              set: lesson.title,
            },
            description: {
              set: lesson.content.content,
            },
            orderIndex: {
              set: index,
            },
            accessibility: {
              set: VisibilityEnum.Public,
            },
            duration: {
              set: Math.round(
                (lesson.content as ILessonVideoContent)?.duration * 60 * 1000 ??
                  0
              ),
            },
            material: {
              connect: {
                path: material,
              },
            },
          },
        };
      });
    };

    const courseResourceFileHanlder = async (resources: IResourceData[]) => {
      return resources.map(async (resource, index) => {
        const files = await Promise.all(
          resource.files.map(async (file) => {
            console.log("INI FILE RESOURCE UPDATE", file);
            try {
              const uploadedPath = await convertFile(
                file.fileUrl,
                userData?.userFindOne?.id,
                file.fileName
              );
              return {
                where: {
                  path: file.fileUrl,
                },
                data: {
                  path: {
                    set: uploadedPath,
                  },
                },
              };
            } catch (error) {
              return {
                where: {
                  path: file.fileUrl,
                },
                data: {
                  path: {
                    set: file.fileUrl,
                  },
                },
              };
            }
          })
        );
        console.log("INI FILES RESOURCE  UPDATE", files);
        return {
          where: {
            id: parseInt(resource.id),
          },
          data: {
            name: {
              set: resource.title,
            },
            description: {
              set: resource.description,
            },
            files: {
              update: files,
            },
          },
        };
      });
    };
    const sectionColumn = await Promise.all(
      currentCourseSelector.sections.map(async (section, index) => {
        const lessons = {
          update: await Promise.all(await courseVideosHandler(section.lessons)),
        };
        const resourcesFile = {
          update: await Promise.all(
            await courseResourceFileHanlder(section.resources)
          ),
        };
        console.log("INI LESSONS", index, lessons);
        console.log("INI RESOURCES", index, resourcesFile);
        return {
          where: {
            id: parseInt(section.id),
          },
          data: {
            name: {
              set: section.title,
            },
            description: {
              set: section.description,
            },
            accessibility: {
              set: VisibilityEnum.Public,
            },
            orderIndex: {
              set: index,
            },
            lessons: lessons,
            resources: resourcesFile,
            quizzes: {
              update: section.quizs.map((quiz, index) => ({
                where: {
                  id: parseInt(quiz.id),
                },
                data: {
                  title: {
                    set: quiz.quizBasic.quizName,
                  },
                  description: {
                    set: quiz.quizSylabus.quizDescription,
                  },
                  questions: {
                    update: quiz.quizSylabus.quizs.map((question, index) => ({
                      where: {
                        id: parseInt(question.id),
                      },
                      data: {
                        text: {
                          set: question.quizDescription,
                        },
                        type: {
                          set:
                            quiz.quizBasic.quizType === "Pilihan Ganda"
                              ? QuestionTypeEnum.TrueFalse
                              : QuestionTypeEnum.MultipleChoice,
                        },
                        options: {
                          update: question.quizQuestion.map((answer) => ({
                            where: {
                              id: parseInt(answer.id),
                            },
                            data: {
                              optionText: {
                                set: answer.option,
                              },
                              isCorrect: {
                                set: answer.isCorrect,
                              },
                            },
                          })),
                        },
                      },
                    })),
                  },
                },
              })),
            },
          },
        };
      })
    );
    const sectionData: CourseSectionUpdateManyWithoutCourseNestedInput = {
      update: sectionColumn,
    };

    try {
      const result = await updateCourseMutation({
        variables: {
          where: {
            id: parseInt(currentCourseSelector.id ?? ""),
          },
          data: {
            title: {
              set: currentCourseSelector.courseName,
            },
            basePrice: {
              set: parseInt(currentCourseSelector.price),
            },
            salePrice: {
              set: parseInt(currentCourseSelector.discountPrice ?? "0"),
            },
            description: {
              set: currentCourseSelector.classDescription,
            },
            mentors: {
              set: currentCourseSelector.courseMentor?.map((mentor) => ({
                id: mentor.value,
              })),
            },
            level: {
              set: currentCourseSelector.courseLevel,
            },
            affiliateCommission: {
              set: currentCourseSelector.affiliateCommission,
            },
            affiliateCommissionType: {
              set: currentCourseSelector.affiliateCommissionType,
            },
            status: {
              set: currentCourseSelector.status,
            },
            duration: {
              set: currentCourseSelector.courseDuration,
            },
            objective: {
              set: currentCourseSelector.objective,
            },
            ...(currentCourseSelector.certificateTemplateId !== 0
              ? {
                  certificateTemplate: {
                    connect: {
                      id: currentCourseSelector.certificateTemplateId,
                    },
                  },
                }
              : {}),
            images: {
              set: [
                {
                  path: await thumbnailHandler(),
                },
              ],
            },
            videoUrl: {
              connect: {
                path: await courseIntroHandler(),
              },
            },
            sections: {
              update: sectionColumn,
            },
          },
        },
      });
      console.log("DATA FROM UPDATE COURSE DATA", result.data);
      if (result.data) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(new Error("Mutation did not return a result"));
      }
    } catch (error) {
      console.log("ERROR FROM UPDATE COURSE DATA", error);
      return Promise.reject(error);
    }
  };

  return {
    editCourse,
    loading,
    error,
    data,
    currentCourseSelector,
  };
};

const useNavigation = () => {
  const router = useRouter();
  const action = router.query.action;
  const dispatch = useDispatch();
  const createCourse = useCreateCourse();
  const updateCourse = useEditCourse();
  const [isLoading, setIsLoading] = useState(false);
  const [createCourseError, setCreateCourseError] = useState<
    string | undefined
  >(undefined);

  const pageMap: { [key: string]: string } = {
    "/information": "/sylabus",
    "/sylabus": "/certificate",
  };

  const previousPageMap: { [key: string]: string } = Object.entries(
    pageMap
  ).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});
  const navigate = (pageMap: { [key: string]: string }) => {
    const pathEnd = router.pathname.split("/").pop();
    const page = pageMap[`/${pathEnd}`];

    if (page) {
      router.push(
        {
          pathname: `/admin/courses/${action}${page}`,
          query: router.query,
        },
        undefined,
        { shallow: true }
      );
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
              "TERJADI ERROR DI CREATE:",
              (error as ApolloError)?.message ?? "NO MESSAGE FOUND"
            );
            setCreateCourseError(error?.toString());
            setIsLoading(false);
          }
        } else {
          dispatch(changeErrorMessage(""));
          setIsLoading(true);
          try {
            const res = await updateCourse.editCourse();
            if (res !== undefined) {
              setIsLoading(false);
              dispatch(resetCourse());
              console.log("SUCCSS UPDATED WITH ERROR", updateCourse.error);
              console.log("SUCCESS UPDATED COURSE", updateCourse.data);
              window.location.href = "/admin/courses";
            } else {
              setIsLoading(false);
              console.log("TERJADI ERROR DI:", res);
            }
          } catch (error: any) {
            dispatch(
              changeErrorMessage(
                (error as ApolloError)?.message ?? error.toString()
              )
            );
            console.log(
              "TERJADI ERROR DI EDIT:",
              (error as ApolloError)?.message ?? "NO MESSAGE FOUND"
            );
            setCreateCourseError(error?.toString());
            setIsLoading(false);
          }
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
      dispatch(changeCourseDuration(9999999));
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
