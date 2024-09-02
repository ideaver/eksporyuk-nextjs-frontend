import { postDataAPI } from "@/app/service/api/rest-service";
import {
  CourseSectionCreateWithoutCourseInput,
  CourseSectionScalarWhereInput,
  CourseSectionUpdateWithWhereUniqueWithoutCourseInput,
  // CourseDurationTypeEnum,
  CourseStatusEnum,
  FileTypeEnum,
  LessonCreateWithoutSectionInput,
  LessonScalarWhereInput,
  LessonUpdateManyWithoutSectionNestedInput,
  LessonUpdateWithWhereUniqueWithoutSectionInput,
  QuestionTypeEnum,
  QuizCreateWithoutSectionInput,
  QuizScalarWhereInput,
  QuizUpdateManyWithoutSectionNestedInput,
  QuizUpdateWithWhereUniqueWithoutSectionInput,
  ResourceCreateWithoutSectionInput,
  ResourceScalarWhereInput,
  ResourceUpdateManyWithoutSectionNestedInput,
  ResourceUpdateWithWhereUniqueWithoutSectionInput,
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
import { ICourseSectionData } from "@/types/contents/course/ICourseData";
import { IResourceData } from "@/types/contents/course/IResourceData";
import {
  ILessonBasic,
  ILessonPDFContent,
  ILessonVideoContent,
} from "@/types/contents/products/ILessonData";
import { ICreateQuizData } from "@/types/contents/products/IQuizData";
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
  try {
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
  } catch (error) {
    throw error;
  }
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

    // const courseIntro = await fileCreateOne({
    //   variables: {
    //     data: {
    //       path: currentCourseSelector.introVideo,
    //       fileType: FileTypeEnum.Mp4,
    //     },
    //   },
    // });

    // console.log("INI COURSE INTRO", (await courseIntro).data?.fileCreateOne);

    const courseVideosHandle = async (lessons: ILessonBasic[]) => {
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
            material = null;
          }
        }
        console.log("INI MATERIAL", material);
        return {
          title: lesson.title,
          description: lesson.content.content,
          orderIndex: index + 1,
          accessibility: VisibilityEnum.Public,
          duration:
            (lesson.content as ILessonVideoContent)?.duration * 60 * 1000,
          ...(material ? { material: { connect: { path: material } } } : {}),
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
        const reverseLessons = section.lessons;
        const lessons = await Promise.all(
          await courseVideosHandle(reverseLessons)
        );
        const resourcesFile = await Promise.all(
          await courseResourceFileHanlder(section.resources)
        );
        return {
          name: section.title,
          accessibility: VisibilityEnum.Public,
          description: section.description,
          orderIndex: index + 1,
          lessons: {
            create: lessons.slice().sort((a, b) => b.orderIndex - a.orderIndex),
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
        subscriberListId: currentCourseSelector.subscriberListId,
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
            path: await courseIntroHandler(),
          },
        },
        mentors: {
          connect:
            currentCourseSelector.courseMentor?.map((mentor) => ({
              id: mentor.value,
            })) || [],
        },
        basePrice: parseInt(currentCourseSelector.price),
        salePrice: parseInt(currentCourseSelector.discountPrice ?? "0"),
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
          create: sectionData
            .slice()
            .sort((a, b) => a.orderIndex - b.orderIndex),
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
  const currentDeletedCourseSelector = useSelector(
    (state: RootState) => state.deletedCourse
  );
  const [fileCreateOne] = useFileCreateOneMutation();
  const [updateCourseMutation, { data, error, loading }] =
    useCourseUpdateOneMutation();

  // Main function to edit the course
  const editCourse = async () => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      console.log(userData);
      await signOut();
      return Promise.reject("User not found");
    }

    const randomName =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      ".png";

    // Handles the thumbnail conversion
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

    // Handles the course intro video upload
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

    // Handles the course videos upload and update
    const courseVideosHandler: (lessons: ILessonBasic[]) => Promise<{
      update: LessonUpdateWithWhereUniqueWithoutSectionInput[] | null;
      create: LessonCreateWithoutSectionInput[] | null;
      deleteMany: LessonScalarWhereInput[] | null;
    }> = async (lessons: ILessonBasic[]) => {
      const lessonsPromises = lessons.map(async (lesson, index) => {
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
            material =
              (lesson.content as ILessonPDFContent).file ?? 
              (lesson.content as ILessonPDFContent).content;
          }
        }

        const lessonUpdate: LessonUpdateWithWhereUniqueWithoutSectionInput = {
          where: {
            id: /^\d+$/.test(lesson.id) ? parseInt(lesson.id) : 0,
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
                (lesson.content as ILessonVideoContent)?.duration * 60 * 1000
              ),
            },
            ...(material ? { material: { connect: { path: material } } } : {}),
          },
        };

        const lessonCreate: LessonCreateWithoutSectionInput = {
          title: lesson.title,
          description: lesson.content.content,
          orderIndex: index,
          accessibility: VisibilityEnum.Public,
          duration: Math.round(
            (lesson.content as ILessonVideoContent)?.duration * 60 * 1000
          ),
          ...(material ? { material: { connect: { path: material } } } : {}),
        };

        return {
          update: /^\d+$/.test(lesson.id) ? lessonUpdate : null,
          create: !/^\d+$/.test(lesson.id) ? lessonCreate : null,
          deleteMany: currentDeletedCourseSelector.lessonsId.map((id) => {
            return {
              id: {
                equals: !isNaN(id as number)
                  ? parseInt(id as string)
                  : (id as number),
              },
            };
          }),
        };
      });

      const results = await Promise.all(lessonsPromises);
      return {
        update: results
          .filter((result) => result.update !== null)
          .map(
            (result) => result.update
          ) as LessonUpdateWithWhereUniqueWithoutSectionInput[],
        create: results
          .filter((result) => result.create !== null)
          .map((result) => result.create) as LessonCreateWithoutSectionInput[],
        deleteMany: results
          .filter((result) => result.deleteMany !== null)
          .map((result) => result.deleteMany) as LessonScalarWhereInput[],
      };
    };

    // Handles the course resource files upload and update
    const courseResourceFileHandler: (resources: IResourceData[]) => Promise<{
      update: ResourceUpdateWithWhereUniqueWithoutSectionInput[] | null;
      create: ResourceCreateWithoutSectionInput[] | null;
      deleteMany: ResourceScalarWhereInput[] | null;
    }> = async (resources: IResourceData[]) => {
      const resourcePromises = resources.map(async (resource, index) => {
        const filesUpdate = await Promise.all(
          resource.files.map(async (file) => {
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

        const resourceUpdate = {
          where: {
            id: /^\d+$/.test(resource.id) ? parseInt(resource.id) : 0,
          },
          data: {
            name: {
              set: resource.title,
            },
            description: {
              set: resource.description,
            },
            files: {
              update: filesUpdate,
              disconnect: currentDeletedCourseSelector.resourcesId.map(
                (id) => ({
                  id: {
                    equals: !isNaN(id as number)
                      ? parseInt(id as string)
                      : (id as number),
                  },
                })
              ),
            },
          },
        };

        const resourceCreate = {
          name: resource.title,
          description: resource.description,
          files: {
            connect: filesUpdate.map((file) => ({ path: file.data.path.set })),
          },
        };

        return {
          update: /^\d+$/.test(resource.id) ? resourceUpdate : null,
          create: !/^\d+$/.test(resource.id) ? resourceCreate : null,
          deleteMany: currentDeletedCourseSelector.resourcesId.map((id) => {
            return {
              id: {
                equals: !isNaN(id as number)
                  ? parseInt(id as string)
                  : (id as number),
              },
            };
          }),
        };
      });

      const results = await Promise.all(resourcePromises);
      return {
        update: results
          .filter((result) => result.update !== null)
          .map(
            (result) => result.update
          ) as ResourceUpdateWithWhereUniqueWithoutSectionInput[],
        create: results
          .filter((result) => result.create !== null)
          .map(
            (result) => result.create
          ) as ResourceCreateWithoutSectionInput[],
        deleteMany: results
          .filter((result) => result.deleteMany !== null)
          .map((result) => result.deleteMany) as ResourceScalarWhereInput[],
      };
    };

    // Handles the course quizzes upload and update
    // TODO: Fix this when update Quiz
    const courseQuizHandler: (quizzes: ICreateQuizData[]) => Promise<{
      update: QuizUpdateWithWhereUniqueWithoutSectionInput[] | null;
      create: QuizCreateWithoutSectionInput[] | null;
      deleteMany: QuizScalarWhereInput[] | null;
    }> = async (quizzes: ICreateQuizData[]) => {
      const quizPromises = quizzes.map(async (quiz, index) => {
        const questions = quiz.quizSylabus.quizs.map((question, index) => ({
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
              deleteMany: currentDeletedCourseSelector.questionsId.map(
                (id) => ({
                  id: {
                    equals: !isNaN(id as number)
                      ? parseInt(id as string)
                      : (id as number),
                  },
                })
              ),
            },
          },
        }));

        const quizUpdate: QuizUpdateWithWhereUniqueWithoutSectionInput = {
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
              update: questions,
              deleteMany: currentDeletedCourseSelector.quizsId.map((id) => ({
                id: {
                  equals: !isNaN(id as number)
                    ? parseInt(id as string)
                    : (id as number),
                },
              })),
            },
          },
        };

        const quizCreate: QuizCreateWithoutSectionInput = {
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
        };

        return {
          update: /^\d+$/.test(quiz.id) ? quizUpdate : null,
          create: !/^\d+$/.test(quiz.id) ? quizCreate : null,
          deleteMany: currentDeletedCourseSelector.quizsId.map((id) => ({
            id: {
              equals: !isNaN(id as number)
                ? parseInt(id as string)
                : (id as number),
            },
          })),
        };
      });

      const results = await Promise.all(quizPromises);
      return {
        update: results
          .filter((result) => result.update !== null)
          .map(
            (result) => result.update
          ) as QuizUpdateWithWhereUniqueWithoutSectionInput[],
        create: results
          .filter((result) => result.create !== null)
          .map((result) => result.create) as QuizCreateWithoutSectionInput[],
        deleteMany: results
          .filter((result) => result.deleteMany !== null)
          .map((result) => result.deleteMany)
          .flat() as QuizScalarWhereInput[],
      };
    };

    // Handles the course sections upload and update
    const courseSectionHandler: (sections: ICourseSectionData[]) => Promise<{
      update: CourseSectionUpdateWithWhereUniqueWithoutCourseInput[] | null;
      create: CourseSectionCreateWithoutCourseInput[] | null;
      deleteMany: CourseSectionScalarWhereInput[] | null;
    }> = async (sections: ICourseSectionData[]) => {
      const sectionPromises = sections.map(async (section, index) => {
        const { update: updateLessons, create: createLessons } =
          await courseVideosHandler(section.lessons);
        const { update: updateResources, create: createResources } =
          await courseResourceFileHandler(section.resources);
        const { update: updateQuizzes, create: createQuizzes } =
          await courseQuizHandler(section.quizs);

        const lessons: LessonUpdateManyWithoutSectionNestedInput = {
          update: updateLessons,
          create: createLessons,
          deleteMany: currentDeletedCourseSelector.lessonsId.map((id) => ({
            id: {
              equals: !isNaN(id as number)
                ? parseInt(id as string)
                : (id as number),
            },
          })),
        };

        const resourcesFile: ResourceUpdateManyWithoutSectionNestedInput = {
          update: updateResources,
          create: createResources,
          deleteMany: currentDeletedCourseSelector.resourcesId.map((id) => ({
            id: {
              equals: !isNaN(id as number)
                ? parseInt(id as string)
                : (id as number),
            },
          })),
        };

        const quizzes: QuizUpdateManyWithoutSectionNestedInput = {
          update: updateQuizzes,
          create: createQuizzes,
          deleteMany: currentDeletedCourseSelector.quizsId.map((id) => ({
            id: {
              equals: !isNaN(id as number)
                ? parseInt(id as string)
                : (id as number),
            },
          })),
        };

        const sectionUpdate: CourseSectionUpdateWithWhereUniqueWithoutCourseInput =
          {
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
              quizzes: quizzes,
            },
          };

        const sectionCreate: CourseSectionCreateWithoutCourseInput = {
          name: section.title,
          description: section.description,
          accessibility: VisibilityEnum.Public,
          orderIndex: index,
          lessons: {
            create: createLessons,
          },
          resources: {
            create: createResources,
          },
          quizzes: {
            create: createQuizzes,
          },
        };

        return {
          update: /^\d+$/.test(section.id) ? sectionUpdate : null,
          create: !/^\d+$/.test(section.id) ? sectionCreate : null,
          deleteMany: currentDeletedCourseSelector.sectionsId.map((id) => ({
            id: {
              equals: !isNaN(id as number)
                ? parseInt(id as string)
                : (id as number),
            },
          })),
        };
      });

      const results = await Promise.all(sectionPromises);
      return {
        update: results
          .filter((result) => result.update !== null)
          .map(
            (result) => result.update
          ) as CourseSectionUpdateWithWhereUniqueWithoutCourseInput[],
        create: results
          .filter((result) => result.create !== null)
          .map(
            (result) => result.create
          ) as CourseSectionCreateWithoutCourseInput[],
        deleteMany: results
          .filter((result) => result.deleteMany !== null)
          .map((result) => result.deleteMany)
          .flat() as CourseSectionScalarWhereInput[],
      };
    };

    // Extract and handle sections, lessons, resources, and quizzes
    const {
      update: sectionColumn,
      create: newSections,
      deleteMany: deleteSections,
    } = await courseSectionHandler(currentCourseSelector.sections);

    try {
      // Update the course with the new data
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
            subscriberListId: {
              set: currentCourseSelector.subscriberListId,
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
              create: newSections,
              deleteMany: deleteSections,
            },
          },
        },
      });
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
          pathname: `/admin/product-management/courses/${action}${page}`,
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
              window.location.href = "/admin/product-management/courses";
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
              window.location.href = "/admin/product-management/courses";
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
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const thumbnail = useSelector((state: RootState) => state.course.thumbnail);
  const status = useSelector((state: RootState) => state.course.status);
  const duration = useSelector(
    (state: RootState) => state.course.courseDuration
  );
  const courseType = useSelector((state: RootState) => state.course.courseType);
  const { handleNext, handlePrevious, isLoading, createCourseError } =
    useNavigation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDetail) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeThumbnail(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (status: CourseStatusEnum) => {
    if (isDetail) return;
    dispatch(changeStatus(status));
  };
  const handleDurationChange = (duration: number) => {
    if (isDetail) return;
    dispatch(changeCourseDuration(duration));
  };
  const handleCourseTypeChange = (courseType: "subscription" | "one-time") => {
    if (isDetail) return;
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
