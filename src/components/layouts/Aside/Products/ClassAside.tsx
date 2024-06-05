import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { CourseStatusEnum } from "@/app/service/graphql/gen/graphql";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useRouter } from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import ClassTabBar from "../../TabBar/Products/ClassTabBar";
import useClassViewModel from "./ClassAside-view-model";
interface AsideProductLayoutProps {
  children?: React.ReactNode;
}

const AsideProductLayout = ({ children }: AsideProductLayoutProps) => {
  const {
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
  } = useClassViewModel();
  const router = useRouter();

  const isEdit = router.query.action === "edit";
  const courseId = router.query.id as string;

  // const {
  //   data: courseFindData,
  //   loading,
  //   error,
  // } = useCourseFindOneQuery({
  //   variables: {
  //     where: {
  //       id: parseInt(courseId),
  //     },
  //   },
  // });
  // const dispatch = useDispatch();
  // const currentCourseData = useSelector((state: RootState) => state.course);
  // const courseData = courseFindData?.courseFindOne;
  // useEffect(() => {
  //   if (isEdit && (!currentCourseData || currentCourseData.id !== courseId)) {
  //     dispatch(
  //       editCourse({
  //         id: courseData?.id.toString() || "",
  //         courseName: courseData?.title || "",
  //         classDescription: courseData?.description || "",
  //         price: courseData?.basePrice.toString() || "",
  //         courseAuthor: courseData?.createdBy.user.name || "",
  //         courseDuration:
  //           // courseData?.duration || CourseDurationTypeEnum.ThreeMonths,
  //           courseData?.duration || 2,
  //         courseLevel: courseData?.level || CourseLevelEnum.Beginner,
  //         courseMentor:
  //           courseData?.mentors?.map((mentor) => ({
  //             value: mentor.id,
  //             label: mentor.user.name,
  //           })) || [],
  //         introVideo: courseData?.videoUrlId || "",
  //         objective: courseData?.objective || [],
  //         thumbnail: courseData?.images?.[0].path ?? "",
  //         status: courseData?.status ?? CourseStatusEnum.Published,
  //         sections:
  //           courseData?.sections?.map((section) => ({
  //             id: section.id?.toString() ?? "",
  //             description: section.description ?? "",
  //             title: section.name ?? "",
  //             lessons:
  //               section.lessons?.map((lesson) => ({
  //                 id: lesson.id?.toString() ?? "",
  //                 title: lesson.title ?? "",
  //                 lessonType: "Video",
  //                 content: {
  //                   content: lesson.description ?? "",
  //                   videoUrl: lesson.material?.path ?? "",
  //                 },
  //               })) ?? [],
  //             quizs: section.quizzes
  //               ? section.quizzes.map((quiz) => {
  //                   const quizTypeSelection = quiz?.questions?.some(
  //                     (item) => item.type === "TRUE_FALSE"
  //                   )
  //                     ? "Pilihan Ganda"
  //                     : "Jawaban Ganda";
  //                   return {
  //                     id: quiz.id?.toString() ?? "",
  //                     quizBasic: {
  //                       quizName: quiz.title ?? "",
  //                       quizType: quizTypeSelection,
  //                     },
  //                     quizSylabus: {
  //                       quizDescription: quiz.description ?? "",
  //                       quizs:
  //                         quiz.questions?.map((question) => ({
  //                           id: question.id?.toString() ?? "",
  //                           quizDescription: question.text ?? "",
  //                           quizQuestion:
  //                             question.options?.map((option) => ({
  //                               id: option.id?.toString() ?? "",
  //                               option: option.optionText ?? "",
  //                               isCorrect: option.isCorrect ?? false,
  //                             })) ?? [],
  //                         })) ?? [],
  //                     },
  //                   };
  //                 })
  //               : [],
  //             resources:
  //               section.resources?.map((resource) => ({
  //                 id: resource.id?.toString() ?? "",
  //                 title: resource.name ?? "",
  //                 description: resource.description ?? "",
  //                 files:
  //                   resource.files?.map((material) => ({
  //                     fileUrl: material.path ?? "",
  //                     fileName: material.path ?? "",
  //                   })) ?? [],
  //               })) ?? [],
  //           })) ?? [],
  //       })
  //     );
  //   }
  // }, []);

  return (
    <LoadingOverlayWrapper
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(255, 255, 255, 0.8)",
        }),
        spinner: (base) => ({
          ...base,
          width: "100px",
          "& svg circle": {
            stroke: "rgba(3, 0, 0, 1)",
          },
        }),
      }}
      active={isLoading}
      spinner
    >
      <div className="row gx-10">
        <div className="col-lg-3">
          <KTCard>
            <KTCardBody className="d-flex flex-column">
              <h3>Thumbnail</h3>

              <input
                type="file"
                onChange={handleFileChange}
                className="d-none"
                accept=".jpg, .jpeg, .png"
                id="thumbnail-input"
              />
              <label
                htmlFor="thumbnail-input"
                className="card shadow align-self-center mt-5"
                style={{
                  maxWidth: 150,
                }}
              >
                <div
                  className="border-0 px-2 py-1 bg-white shadow position-absolute top-0 end-0 rounded-circle"
                  style={{ transform: "translate(50%, -50%)" }}
                >
                  <KTIcon iconName="pencil" />
                </div>
                <div className="card-body">
                  <img
                    src={thumbnail}
                    alt=""
                    className="img-fluid rounded object-fit-cover"
                  />
                </div>
              </label>
              <p className="text-muted fw-bold text-center mt-5">
                Pilih gambar untuk dijadikan thumbnail. Format gambar yang
                diterima adalah .jpg, .jpeg dan .png
              </p>
            </KTCardBody>
          </KTCard>
          <KTCard className="mt-5">
            <KTCardBody className="d-flex flex-column">
              <h3 className="mb-5">Status</h3>
              <Dropdown
                options={[
                  { value: CourseStatusEnum.Published, label: "Published" },
                  { value: CourseStatusEnum.Draft, label: "Draft" },
                  { value: CourseStatusEnum.Archived, label: "Archived" },
                ]}
                value={status}
                onValueChange={(value) =>
                  handleStatusChange(value as CourseStatusEnum)
                }
              ></Dropdown>
              <p className="text-muted fw-bold mt-5">Atur Status</p>
              <h3 className="mb-5 mt-5">Tipe Kelas</h3>
              <Dropdown
                options={[
                  {
                    value: "subscription",
                    label: "Langganan",
                  },
                  { value: "one-time", label: "Sekali Beli" },
                ]}
                value={courseType}
                onValueChange={(value) =>
                  handleCourseTypeChange(value as "subscription" | "one-time")
                }
              ></Dropdown>
              {courseType === "subscription" && (
                <>
                  <h3 className="mb-5 mt-5">Durasi Kelas</h3>

                  <div className="dropdown">
                    <button
                      className="form form-control form-select text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {duration} Hari
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleDurationChange(100);
                          }}
                        >
                          3 Bulan (100 Hari)
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleDurationChange(200);
                          }}
                        >
                          6 Bulan (200 Hari)
                        </button>
                      </li>
                      <li>
                        <input
                          type="number"
                          value={duration}
                          className="form-control py-2"
                          placeholder="Nilai Custom (Hari)"
                          min={0}
                          onChange={(e) => {
                            handleDurationChange(parseInt(e.target.value));
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </KTCardBody>
          </KTCard>
        </div>

        <div className="col-lg-9">
          <ClassTabBar
            urlType={isEdit ? "edit" : "create"}
            id={courseId}
          ></ClassTabBar>
          {createCourseError && (
            <Alert
              title="Terjadi Masalah"
              label={createCourseError}
              alertColor="danger"
              dismissable
            />
          )}
          {children}

          <div className={"row flex-end mt-10"}>
            {router.pathname !== "/admin/courses/[action]/information" && (
              <Buttons
                mode="light"
                classNames={"col-lg-2 me-lg-5"}
                onClick={handlePrevious}
              >
                Sebelumnya
              </Buttons>
            )}

            <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} onClick={handleNext}>
              {router.pathname === "/admin/courses/[action]/sylabus"
                ? "Kirim"
                : "Selanjutnya"}
            </Buttons>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
};

export default AsideProductLayout;
