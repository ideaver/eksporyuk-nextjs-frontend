import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { RootState } from "@/app/store/store";
import {
  changeEditSection,
  changeObjective,
  changeSections,
} from "@/features/reducers/course/courseReducer";
import {
  changeEditLesson,
  changeEditQuiz,
  changeLessons,
} from "@/features/reducers/products/productReducer";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { ICourseSectionData } from "@/types/contents/course/ICourseData";
import { IResourceData } from "@/types/contents/course/IResourceData";
import {
  ILessonBasic,
  ILessonTopic,
} from "@/types/contents/products/ILessonData";
import { ICreateQuizData } from "@/types/contents/products/IQuizData";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LessonModal } from "./components/LessonModal";
import { QuizModal } from "./components/QuizModal";
import ResourceModal from "./components/ResourceModal";
import SectionModal from "./components/SectionModal";

const CourseSylabusPage = () => {
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [lessonId, setLessonId] = useState("");
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedCourseSectionId, setSelectedCourseSectionId] =
    useState("null");
  const [isEdit, setIsEdit] = useState<
    | ICourseSectionData
    | ILessonTopic
    | ILessonBasic
    | IResourceData
    | boolean
    | undefined
  >();

  // Start RTK
  const dispatch = useDispatch();
  const currentLessonsSelector = useSelector(
    (state: RootState) => state.product.lessons
  );
  const currentCourseSectionSelector = useSelector(
    (state: RootState) => state.course.sections
  );
  const currentCourseSelector = useSelector((state: RootState) => state.course);
  // End RTK

  // Start Lesson
  const handleSubmitSection = (val: ICourseSectionData) => {
    dispatch(
      changeSections(
        currentCourseSectionSelector.some(
          (courseSection) => courseSection.id === val.id
        )
          ? currentCourseSectionSelector.map((courseSection) =>
              courseSection.id === val.id
                ? { ...courseSection, ...val }
                : courseSection
            )
          : currentCourseSectionSelector.concat(val)
      )
    );
    setShowSectionModal(false);
    setIsEdit(undefined);
    if (val.lessons) {
      window.location.reload();
    }
  };
  const handleRemoveSection = (index: number) => {
    const newLesson = currentLessonsSelector.filter((_, i) => i !== index);
    dispatch(changeLessons(newLesson));
  };

  const handleEditSection = (newSection: ICourseSectionData) => {
    dispatch(changeEditSection(newSection));
    setIsEdit(newSection);
    setShowSectionModal(true);
  };

  const handleLessonSubmit = (val: ILessonBasic, parentId: string) => {
    const newLessons = currentCourseSectionSelector.map((courseSection) => {
      if (courseSection.id === parentId) {
        return {
          ...courseSection,
          lessons: courseSection.lessons
            ? courseSection.lessons.some((child) => child.id === val.id)
              ? courseSection.lessons.map((child) =>
                  child.id === val.id ? val : child
                )
              : courseSection.lessons.concat(val)
            : [val],
        };
      }
      return courseSection;
    });
    dispatch(changeSections(newLessons));
    setShowLessonModal(false);
    window.location.reload();
  };

  const handleRemoveLesson = (index: number) => {
    const newLessons = currentCourseSectionSelector.map((courseSection) => {
      return {
        ...courseSection,
        lessons: courseSection.lessons?.filter((_, i) => i !== index),
      };
    });
    dispatch(changeSections(newLessons));
  };

  const handleEditLesson = (
    newLesson: ILessonBasic,
    parentLesson: ILessonTopic
  ) => {
    setLessonId(parentLesson.id);
    dispatch(changeEditLesson(newLesson));
    setIsEdit(newLesson);
    setShowLessonModal(true);
  };

  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    // handle parent drag and drop
    if (
      source.droppableId === "courseSections" &&
      destination.droppableId === "courseSections"
    ) {
      const items = Array.from(currentCourseSectionSelector);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      dispatch(changeSections(items));
    } else {
      // handle child drag and drop
      const parentIndex = currentCourseSectionSelector.findIndex(
        (courseSection) => `child-${courseSection.id}` === source.droppableId
      );

      if (parentIndex === -1) {
        return;
      }

      const parent = currentCourseSectionSelector[parentIndex];
      const childSection = Array.from(parent.lessons || []);
      const [reorderedItem] = childSection.splice(source.index, 1);
      childSection.splice(destination.index, 0, reorderedItem);

      const newLessons = currentCourseSectionSelector.map((section, index) =>
        index === parentIndex ? { ...section, lessons: childSection } : section
      );

      dispatch(changeSections(newLessons));
    }
  };
  // End Lesson
  // Start Quiz
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleSubmitQuiz = (val: ICreateQuizData) => {
    const filterSelectedCourseSection = currentCourseSectionSelector.filter(
      (section) => section.id === selectedCourseSectionId
    )[0];

    const newQuizs = filterSelectedCourseSection.quizs.some(
      (quiz) => quiz.id === val.id
    )
      ? filterSelectedCourseSection.quizs.map((quiz) =>
          quiz.id === val.id ? val : quiz
        )
      : filterSelectedCourseSection.quizs.concat(val);
    dispatch(
      changeSections(
        currentCourseSectionSelector.map((section) =>
          section.id === selectedCourseSectionId
            ? { ...section, quizs: newQuizs }
            : section
        )
      )
    );
    setShowQuizModal(false);
    setIsEdit(false);
    window.location.reload();
  };
  const handleRemoveQuiz = (index: number) => {
    const filterSelectedCourseSection = currentCourseSectionSelector.filter(
      (section) => section.id === selectedCourseSectionId
    )[0];

    const newQuizAtSection = filterSelectedCourseSection.quizs.filter(
      (_, i) => i !== index
    );
    dispatch(
      changeSections(
        currentCourseSectionSelector.map((section) =>
          section.id === selectedCourseSectionId
            ? { ...section, quizs: newQuizAtSection }
            : section
        )
      )
    );
  };

  const handleEditQuiz = (newQuiz: ICreateQuizData) => {
    dispatch(changeEditQuiz(newQuiz));
    setIsEdit(true);
    setShowQuizModal(true);
  };
  // End Quiz
  const [showResourceModal, setShowResourceModal] = useState(false);

  // Start Resource

  const handleSubmitResource = (data: IResourceData) => {
    const filterSelectedCourseSection = currentCourseSectionSelector.filter(
      (section) => section.id === selectedCourseSectionId
    )[0];

    const newResource = filterSelectedCourseSection.resources.some(
      (resource) => resource.id === data.id
    )
      ? filterSelectedCourseSection.resources.map((resource) =>
          resource.id === data.id ? data : resource
        )
      : filterSelectedCourseSection.resources.concat(data);
    dispatch(
      changeSections(
        currentCourseSectionSelector.map((section) =>
          section.id === selectedCourseSectionId
            ? { ...section, resources: newResource }
            : section
        )
      )
    );
    setShowResourceModal(false);
    setIsEdit(false);
  };

  // End Resource

  // Start Objective

  const [objectives, setObjectives] = useState<string[]>(
    currentCourseSelector.objective
  );

  const addObjectives = () => {
    setObjectives((prevItems) => [...prevItems, ""]);
  };

  const removeObjectives = (index: number) => {
    setObjectives((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleObjectiveInputChange = (index: number, newValue: string) => {
    setObjectives((prevItems) =>
      prevItems.map((item, i) => (i === index ? newValue : item))
    );
  };

  useEffect(() => {
    dispatch(changeObjective(objectives));
  }, [dispatch, objectives]);

  // End Objective

  return (
    <>
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Susun Silabus</h3>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="courseSections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentCourseSectionSelector.map((courseSection, index) => (
                    <Draggable
                      key={courseSection.id}
                      draggableId={courseSection.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <LessonCard
                            data={courseSection}
                            draggableProps={{ ...provided.dragHandleProps }}
                            onClick={() => {
                              if (
                                selectedCourseSectionId === courseSection.id
                              ) {
                                setSelectedCourseSectionId("null");
                              } else {
                                setSelectedCourseSectionId(courseSection.id);
                              }
                            }}
                            isActive={
                              selectedCourseSectionId === courseSection.id
                            }
                            onRemove={() => {
                              handleRemoveSection(index);
                            }}
                            onEdit={() => {
                              handleEditSection(courseSection);
                            }}
                          >
                            {selectedCourseSectionId === courseSection.id && (
                              <>
                                <KTCard className="m-5 shadow">
                                  <KTCardBody>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="mb-0">Susun Materi</h5>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          setIsEdit(undefined);
                                          setSelectedCourseSectionId(
                                            courseSection.id
                                          );
                                          setShowLessonModal(true);
                                        }}
                                      >
                                        Tambah Materi
                                      </button>
                                    </div>
                                    <div className="mt-5">
                                      <Droppable
                                        droppableId={
                                          "child-" + courseSection.id
                                        }
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                            {courseSection.lessons?.map(
                                              (lesson, index) => (
                                                <Draggable
                                                  key={lesson.id}
                                                  draggableId={lesson.id}
                                                  index={index}
                                                >
                                                  {(provided) => (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                    >
                                                      <LessonCard
                                                        data={lesson}
                                                        draggableProps={{
                                                          ...provided.dragHandleProps,
                                                        }}
                                                        onRemove={() => {
                                                          handleRemoveLesson(
                                                            index
                                                          );
                                                        }}
                                                        onEdit={() => {
                                                          handleEditLesson(
                                                            lesson,
                                                            courseSection
                                                          );
                                                        }}
                                                        isParent={false}
                                                      ></LessonCard>
                                                    </div>
                                                  )}
                                                </Draggable>
                                              )
                                            )}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </div>
                                  </KTCardBody>
                                </KTCard>

                                <KTCard className="m-5 shadow">
                                  <KTCardBody>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="mb-0">Susun Quiz</h5>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          setIsEdit(undefined);
                                          setSelectedCourseSectionId(
                                            courseSection.id
                                          );
                                          setShowQuizModal(true);
                                        }}
                                      >
                                        Tambah Quiz
                                      </button>
                                    </div>
                                    <div className="mt-5">
                                      {courseSection.quizs.map(
                                        (quiz, index) => (
                                          <QuizItem
                                            key={index}
                                            data={quiz}
                                            onRemove={() => {
                                              handleRemoveQuiz(index);
                                            }}
                                            onEdit={() => {
                                              handleEditQuiz(quiz);
                                            }}
                                          ></QuizItem>
                                        )
                                      )}
                                    </div>
                                  </KTCardBody>
                                </KTCard>

                                <KTCard className="m-5 shadow">
                                  <KTCardBody>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="mb-0">Susun Resource</h5>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          setIsEdit(undefined);
                                          setSelectedCourseSectionId(
                                            courseSection.id
                                          );
                                          setShowResourceModal(true);
                                        }}
                                      >
                                        Tambah Resource
                                      </button>
                                    </div>
                                    <div className="mt-5">
                                      {courseSection.resources.map(
                                        (resource, index) => (
                                          <div className="" key={index}>
                                            <ResourceItem
                                              data={resource}
                                              onEdit={() => {
                                                setIsEdit(resource);
                                                setShowResourceModal(true);
                                              }}
                                              onRemove={() => {
                                                const newResources =
                                                  courseSection.resources.filter(
                                                    (_, i) => i !== index
                                                  );
                                                dispatch(
                                                  changeSections(
                                                    currentCourseSectionSelector.map(
                                                      (section) =>
                                                        section.id ===
                                                        selectedCourseSectionId
                                                          ? {
                                                              ...section,
                                                              resources:
                                                                newResources,
                                                            }
                                                          : section
                                                    )
                                                  )
                                                );
                                              }}
                                            ></ResourceItem>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </KTCardBody>
                                </KTCard>
                              </>
                            )}
                          </LessonCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Buttons
            showIcon={true}
            mode="light"
            classNames="mt-5"
            onClick={() => {
              setIsEdit(undefined);
              setShowSectionModal(true);
            }}
          >
            Tambahkan Section
          </Buttons>
        </KTCardBody>
      </KTCard>
      <KTCard className="mt-5">
        <KTCardBody>
          <h3 className="">Objektif</h3>
          {objectives.map((item, index) => (
            <div className="d-flex mt-5" key={index}>
              <div className="w-100">
                <TextField
                  props={{
                    value: item,
                    onChange: (e: any) =>
                      handleObjectiveInputChange(index, e.target.value),
                  }}
                ></TextField>
              </div>
              <div className="ms-5">
                <Buttons
                  icon="cross"
                  buttonColor="danger"
                  showIcon={true}
                  onClick={() => removeObjectives(index)}
                ></Buttons>
              </div>
            </div>
          ))}
          <h6 className="text-muted fw-bold">
            Apa saja yang anda berikan dan sediakan untuk siswa
          </h6>
          <Buttons
            showIcon={true}
            mode="light"
            classNames="mt-5"
            onClick={() => {
              addObjectives();
            }}
          >
            Tambahkan Item
          </Buttons>
        </KTCardBody>
      </KTCard>
      <SectionModal
        show={showSectionModal}
        isEdit={isEdit as ICourseSectionData}
        handleClose={() => {
          setIsEdit(undefined);
          setShowSectionModal(false);
        }}
        handleSubmit={(val) => {
          handleSubmitSection(val);
        }}
      ></SectionModal>
      <LessonModal
        id={selectedCourseSectionId}
        show={showLessonModal}
        handleClose={() => {
          setShowLessonModal(false);
        }}
        handleSubmit={handleLessonSubmit}
        isEdit={isEdit as ILessonBasic}
      ></LessonModal>
      <QuizModal
        show={showQuizModal}
        handleClose={() => {
          setShowQuizModal(false);
        }}
        handleSubmit={handleSubmitQuiz}
        isEdit={isEdit as boolean}
      ></QuizModal>
      <ResourceModal
        show={showResourceModal}
        handleClose={() => {
          setShowResourceModal(false);
        }}
        handleSubmit={handleSubmitResource}
        isEdit={isEdit as IResourceData}
      ></ResourceModal>
    </>
  );
};

const LessonCard = ({
  data,
  onRemove,
  onEdit,
  children,
  onClick,
  isActive,
  isParent = true,
  onChildrenClick,
  draggableProps,
}: {
  data: ILessonTopic | ILessonBasic | ICourseSectionData;
  isParent?: boolean;
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  onRemove: () => void;
  onEdit: () => void;
  onChildrenClick?: () => void;
  draggableProps?: any;
}) => {
  function isLessonTopic(object: any): object is ILessonTopic {
    return "description" in object && "title" in object; // Add other necessary properties
  }

  function isLessonBasic(object: any): object is ILessonBasic {
    return "title" in object; // Add other necessary properties
  }
  function isCourseSection(object: any): object is ICourseSectionData {
    return "title" in object; // Add other necessary properties
  }
  return (
    <div>
      <div
        className={clsx(
          "d-flex justify-content-between p-5 align-items-center rounded mt-5",
          isParent ? "bg-light-primary border border-primary border-dashed" : ""
        )}
        onClick={onClick}
      >
        <div className=" d-flex align-items-center" {...draggableProps}>
          <KTIcon iconName="arrow-up" className="fs-1"></KTIcon>
          <KTIcon iconName="arrow-down" className="fs-1 me-2"></KTIcon>
          <div className="title">
            <h6 className="mb-0">{data.title}</h6>
            <p className="mt-1 text-muted fw-bold mb-0">
              {isLessonTopic(data) || isCourseSection(data)
                ? data.description
                : isLessonBasic(data)
                ? `Materi: ${data.lessonType}`
                : null}
            </p>
          </div>
        </div>
        <div className="btns">
          <button className="btn btn-icon btn-active-danger" onClick={onRemove}>
            <KTIcon iconName="trash" className="fs-1"></KTIcon>
          </button>
          <button className="btn btn-icon btn-active-success" onClick={onEdit}>
            <KTIcon iconName="notepad-edit" className="fs-1"></KTIcon>
          </button>
          {isParent && (
            <button className="btn btn-icon ">
              <KTIcon
                iconName={isActive ? "down" : "up"}
                className="fs-1"
              ></KTIcon>
            </button>
          )}
        </div>
      </div>
      <div className="contens">{children}</div>
    </div>
  );
};

const QuizItem = ({
  data,
  onRemove,
  onEdit,
}: {
  data: ICreateQuizData;
  onRemove: () => void;
  onEdit: () => void;
}) => {
  return (
    <div className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed mt-5">
      <div className="title">
        <h6 className="mb-0">{data.quizBasic.quizName}</h6>
        <p className="mt-1 text-muted fw-bold mb-0">
          Jumlah Soal: {data.quizSylabus.quizs.length}, Tipe Soal:{" "}
          {data.quizBasic.quizType}
        </p>
      </div>
      <div className="btns">
        <button className="btn btn-icon btn-active-danger" onClick={onRemove}>
          <KTIcon iconName="trash" className="fs-1"></KTIcon>
        </button>
        <button className="btn btn-icon btn-active-success" onClick={onEdit}>
          <KTIcon iconName="notepad-edit" className="fs-1"></KTIcon>
        </button>
      </div>
    </div>
  );
};
const ResourceItem = ({
  data,
  onRemove,
  onEdit,
}: {
  data: IResourceData;
  onRemove: () => void;
  onEdit: () => void;
}) => {
  return (
    <div className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed mt-5">
      <div className="title">
        <h6 className="mb-0">{data.title}</h6>
        <p className="mt-1 text-muted fw-bold mb-0">
          {data.description}, Jumlah File: {data.files.length}
        </p>
      </div>
      <div className="btns">
        <button className="btn btn-icon btn-active-danger" onClick={onRemove}>
          <KTIcon iconName="trash" className="fs-1"></KTIcon>
        </button>
        <button className="btn btn-icon btn-active-success" onClick={onEdit}>
          <KTIcon iconName="notepad-edit" className="fs-1"></KTIcon>
        </button>
      </div>
    </div>
  );
};

export default CourseSylabusPage;
