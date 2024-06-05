import {
  AffiliateCommissionTypeEnum,
  CourseLevelEnum,
  CourseStatusEnum,
  useCourseFindOneQuery,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import AsideProductLayout from "@/components/layouts/Aside/Products/ClassAside";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import {
  CourseState,
  editCourse,
  resetCourse,
} from "@/features/reducers/course/courseReducer";
import ClassInformation from "@/templates/Admin/Course/CreateOrEdit/Information";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const InformationPage: NextPage = () => {
  // Routing and Fetching
  const router = useRouter();
  const { action, id } = router.query;
  const isEdit = action === "edit";
  const { data, loading, error } = useCourseFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });

  // RTK Query
  const dispatch = useDispatch();
  const currentCourseData = useSelector((state: RootState) => state.course);
  const courseData = data?.courseFindOne;
  const dispatchCourseData: CourseState = useMemo(
    () => ({
      id: courseData?.id.toString() || "",
      courseName: courseData?.title || "",
      classDescription: courseData?.description || "",
      price: courseData?.basePrice.toString() || "",
      affiliateCommission: courseData?.affiliateCommission || 0,
      courseAuthor: courseData?.createdBy.user.name || "",
      courseDuration:
        // courseData?.duration || CourseDurationTypeEnum.ThreeMonths,
        courseData?.duration || 2,
      courseType:
        (courseData?.duration ?? 0) >= 9999999 ? "one-time" : "subscription",
      courseLevel: courseData?.level || CourseLevelEnum.Beginner,
      courseMentor:
        courseData?.mentors?.map((mentor) => ({
          value: mentor.id,
          label: mentor.user.name,
        })) || [],
      introVideo: courseData?.videoUrlId || "",
      objective: courseData?.objective || [],
      thumbnail: courseData?.images?.[0].path ?? "",
      status: courseData?.status ?? CourseStatusEnum.Published,
      affiliateCommissionType:
        courseData?.affiliateCommissionType ||
        AffiliateCommissionTypeEnum.Amount,
      certificateTemplateId: courseData?.certificateTemplate?.[0]?.id || 0,
      discountPrice: courseData?.salePrice?.toString() || "",
      sections:
        courseData?.sections?.map((section) => ({
          id: section.id?.toString() ?? "",
          description: section.description ?? "",
          title: section.name ?? "",
          lessons:
            section.lessons?.map((lesson) => ({
              id: lesson.id?.toString() ?? "",
              title: lesson.title ?? "",
              lessonType: "Video",
              content: {
                content: lesson.description ?? "",
                videoUrl: lesson.material?.path ?? "",
              },
            })) ?? [],
          quizs: section.quizzes
            ? section.quizzes.map((quiz) => {
                const quizTypeSelection = quiz?.questions?.some(
                  (item) => item.type === "TRUE_FALSE"
                )
                  ? "Pilihan Ganda"
                  : "Jawaban Ganda";
                return {
                  id: quiz.id?.toString() ?? "",
                  quizBasic: {
                    quizName: quiz.title ?? "",
                    quizType: quizTypeSelection,
                  },
                  quizSylabus: {
                    quizDescription: quiz.description ?? "",
                    quizs:
                      quiz.questions?.map((question) => ({
                        id: question.id?.toString() ?? "",
                        quizDescription: question.text ?? "",
                        quizQuestion:
                          question.options?.map((option) => ({
                            id: option.id?.toString() ?? "",
                            option: option.optionText ?? "",
                            isCorrect: option.isCorrect ?? false,
                          })) ?? [],
                      })) ?? [],
                  },
                };
              })
            : [],
          resources:
            section.resources?.map((resource) => ({
              id: resource.id?.toString() ?? "",
              title: resource.name ?? "",
              description: resource.description ?? "",
              files:
                resource.files?.map((material) => ({
                  fileUrl: material.path ?? "",
                  fileName: material.path ?? "",
                })) ?? [],
            })) ?? [],
        })) ?? [],
    }),
    [courseData]
  );

  useEffect(() => {
    if (isEdit && (!currentCourseData || currentCourseData.id !== id)) {
      if (dispatchCourseData.id !== currentCourseData.id) {
        dispatch(editCourse(dispatchCourseData));
      }
    } else if (!isEdit && currentCourseData.id != "") {
      if (currentCourseData.id !== "") {
        dispatch(resetCourse());
      }
    }
  }, [currentCourseData, dispatch, dispatchCourseData, id, isEdit]);

  return (
    <>
      {loading && (
        <LoadingUI
          error={isEdit ? error?.message : undefined}
          loading={loading}
        />
      )}
      {!loading && (
        <AsideProductLayout>
          <ClassInformation />
        </AsideProductLayout>
      )}
    </>
  );
};

export default InformationPage;
