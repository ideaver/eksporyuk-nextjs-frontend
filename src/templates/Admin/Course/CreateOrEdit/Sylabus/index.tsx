import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { RootState } from "@/app/store/store";
import {
  changeEditLesson,
  changeEditLessonTopic,
  changeLessons,
} from "@/features/reducers/products/productReducer";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import {
  ILessonBasic,
  ILessonTopic,
} from "@/types/contents/products/ILessonData";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LessonModal } from "./components/LessonModal";
import TopicModal from "./components/TopicModal";

const CourseSylabusPage = () => {
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [lessonId, setLessonId] = useState("");
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState("null");
  const [isEdit, setIsEdit] = useState<ILessonTopic | ILessonBasic | undefined>(
  );
  const dispatch = useDispatch();
  const currentLessonsSelector = useSelector(
    (state: RootState) => state.product.lessons
  );

  const handleSubmitLTopic = (val: ILessonTopic) => {
    dispatch(
      changeLessons(
        currentLessonsSelector.some((lesson) => lesson.id === val.id)
          ? currentLessonsSelector.map((lesson) =>
              lesson.id === val.id ? { ...lesson, ...val } : lesson
            )
          : currentLessonsSelector.concat(val)
      )
    );
    setShowTopicModal(false);
    setIsEdit(undefined);
    if (val.lessons) {
      window.location.reload();
    }
  };
  const handleRemoveTopic = (index: number) => {
    const newLesson = currentLessonsSelector.filter((_, i) => i !== index);
    dispatch(changeLessons(newLesson));
  };

  const handleEditTopic = (newLesson: ILessonTopic) => {
    dispatch(changeEditLessonTopic(newLesson));
    setIsEdit(newLesson);
    setShowTopicModal(true);
  };

  const handleLessonSubmit = (val: ILessonBasic, parentId: string) => {
    const newLessons = currentLessonsSelector.map((lesson) => {
      if (lesson.id === parentId) {
        return {
          ...lesson,
          lessons: lesson.lessons
            ? lesson.lessons.some((child) => child.id === val.id)
              ? lesson.lessons.map((child) =>
                  child.id === val.id ? val : child
                )
              : lesson.lessons.concat(val)
            : [val],
        };
      }
      return lesson;
    });
    dispatch(changeLessons(newLessons));
    setShowLessonModal(false);
    window.location.reload();
  };

  const handleRemoveLesson = (index: number) => {
    const newLessons = currentLessonsSelector.map((lesson) => {
      return {
        ...lesson,
        lessons: lesson.lessons?.filter((_, i) => i !== index),
      };
    });
    dispatch(changeLessons(newLessons));
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
      source.droppableId === "lessons" &&
      destination.droppableId === "lessons"
    ) {
      const items = Array.from(currentLessonsSelector);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      dispatch(changeLessons(items));
    } else {
      // handle child drag and drop
      const parentIndex = currentLessonsSelector.findIndex(
        (lesson) => `child-${lesson.id}` === source.droppableId
      );

      if (parentIndex === -1) {
        return;
      }

      const parent = currentLessonsSelector[parentIndex];
      const childLessons = Array.from(parent.lessons || []);
      const [reorderedItem] = childLessons.splice(source.index, 1);
      childLessons.splice(destination.index, 0, reorderedItem);

      const newLessons = currentLessonsSelector.map((lesson, index) =>
        index === parentIndex ? { ...lesson, lessons: childLessons } : lesson
      );

      dispatch(changeLessons(newLessons));
    }
  };
  return (
    <>
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Susun Materi</h3>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="lessons">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentLessonsSelector.map((lesson, index) => (
                    <Draggable
                      key={lesson.id}
                      draggableId={lesson.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <LessonCard
                            data={lesson}
                            onClick={() => {
                              if (selectedLessonId === lesson.id) {
                                setSelectedLessonId("null");
                              } else {
                                setSelectedLessonId(lesson.id);
                              }
                            }}
                            isActive={selectedLessonId === lesson.id}
                            onRemove={() => {
                              handleRemoveTopic(index);
                            }}
                            onEdit={() => {
                              handleEditTopic(lesson);
                            }}
                            onChildrenClick={() => {
                              // setLessonId(lesson.id);
                              setShowLessonModal(true);
                            }}
                          >
                            <Droppable droppableId={`child-${lesson.id}`}>
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {lesson.lessons?.map(
                                    (childLesson, childIndex) => (
                                      <div key={childLesson.id}>
                                        {lesson.id === selectedLessonId && (
                                          <Draggable
                                            draggableId={childLesson.id}
                                            index={childIndex}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="ps-10"
                                              >
                                                <LessonCard
                                                  data={childLesson}
                                                  onRemove={() => {
                                                    handleRemoveLesson(
                                                      childIndex
                                                    );
                                                  }}
                                                  onEdit={() => {
                                                    handleEditLesson(
                                                      childLesson,
                                                      lesson
                                                    );
                                                  }}
                                                  isParent={false}
                                                ></LessonCard>
                                              </div>
                                            )}
                                          </Draggable>
                                        )}
                                      </div>
                                    )
                                  )}
                                  <div className="d-flex justify-content-end">
                                    <Buttons
                                      showIcon={true}
                                      mode={"light"}
                                      classNames="mt-5 align-self-end"
                                      onClick={() => {
                                        setIsEdit(undefined)
                                        setLessonId(lesson.id);
                                        setShowLessonModal(true);
                                      }}
                                    >
                                      Tambahkan Materi
                                    </Buttons>
                                  </div>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
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
              setShowTopicModal(true);
            }}
          >
            Tambahkan Topik
          </Buttons>
        </KTCardBody>
      </KTCard>
      <TopicModal
        show={showTopicModal}
        isEdit={isEdit as ILessonTopic}
        handleClose={() => {
          setIsEdit(undefined);
          setShowTopicModal(false);
        }}
        handleSubmit={(val) => {
          handleSubmitLTopic(val);
        }}
      ></TopicModal>
      <LessonModal
        id={lessonId}
        show={showLessonModal}
        handleClose={() => {
          setShowLessonModal(false);
        }}
        handleSubmit={handleLessonSubmit}
        isEdit={isEdit as ILessonBasic}
      ></LessonModal>
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
}: {
  data: ILessonTopic | ILessonBasic;
  isParent?: boolean;
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  onRemove: () => void;
  onEdit: () => void;
  onChildrenClick?: () => void;
}) => {
  function isLessonTopic(object: any): object is ILessonTopic {
    return "description" in object && "title" in object; // Add other necessary properties
  }

  function isLessonBasic(object: any): object is ILessonBasic {
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
        <div className=" d-flex align-items-center ">
          <KTIcon iconName="arrow-up" className="fs-1"></KTIcon>
          <KTIcon iconName="arrow-down" className="fs-1 me-2"></KTIcon>
          <div className="title">
            <h6 className="mb-0">{data.title}</h6>
            <p className="mt-1 text-muted fw-bold mb-0">
              {isLessonTopic(data)
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

export default CourseSylabusPage;
