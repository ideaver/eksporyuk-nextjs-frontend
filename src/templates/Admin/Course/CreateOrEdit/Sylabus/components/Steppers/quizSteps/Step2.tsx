/* eslint-disable jsx-a11y/anchor-is-valid */

import { KTIcon } from "@/_metronic/helpers";
import { deleteQuestion } from "@/features/reducers/course/deletedCourseReducer";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { StepProps } from "@/types/contents/products/IQuizData";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

const Step2 = ({ data, updateData, hasError }: StepProps) => {
  const [openItemId, setOpenItemId] = useState("");
  const dispatch = useDispatch();

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(data.quizSylabus.quizs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateData({
      quizSylabus: {
        quizDescription: data.quizSylabus.quizDescription,
        quizs: items,
      },
    });
  };

  const deleteItem = (id: string) => {
    const filteredItems = data.quizSylabus.quizs.filter(
      (item) => item.id !== id
    );
    updateData({
      quizSylabus: {
        quizDescription: data.quizSylabus.quizDescription,
        quizs: filteredItems,
      },
    });
    dispatch(deleteQuestion(id));
  };
  return (
    <>
      <div className="pb-5" data-kt-stepper-element="content">
        <div className="w-100">
          <h5>Deskripsi Quiz</h5>
          <Textarea
            props={{
              value: data.quizSylabus.quizDescription,
              onChange: (e: any) =>
                updateData({
                  quizSylabus: {
                    quizDescription: e.target.value,
                    quizs: data.quizSylabus.quizs,
                  },
                }),
            }}
          ></Textarea>
          <h5 className="mt-5">Daftar Pertanyaan</h5>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="quizSylabus">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.quizSylabus.quizs.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={`item-${item.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed mt-5"
                            onClick={() =>
                              setOpenItemId(
                                openItemId === item.id ? "" : item.id
                              )
                            }
                          >
                            <div className="title d-flex ">
                              <KTIcon
                                iconName="arrow-up"
                                className="fs-1"
                              ></KTIcon>
                              <KTIcon
                                iconName="arrow-down"
                                className="fs-1 me-2"
                              ></KTIcon>

                              <h6 className="mb-0">
                                Pertanyaan ke-{index + 1}
                              </h6>
                            </div>
                            <div className="btns">
                              <button
                                type="button"
                                className="btn btn-icon btn-active-danger"
                                onClick={() => deleteItem(item.id)}
                              >
                                <KTIcon
                                  iconName="trash"
                                  className="fs-1"
                                ></KTIcon>
                              </button>
                              <div
                                className="btn btn-icon"
                                onClick={() => {
                                  console.log(data);
                                }}
                              >
                                {" "}
                                <KTIcon
                                  iconName={
                                    openItemId === item.id ? "down" : "up"
                                  }
                                  className="fs-1"
                                ></KTIcon>
                              </div>
                            </div>
                          </div>
                          {openItemId === item.id && (
                            <div className="quizContent mt-5 px-10">
                              <h5 className="required">Pertanyaan</h5>
                              <Textarea
                                props={{
                                  value: item.quizDescription,
                                  onChange: (e: any) =>
                                    updateData({
                                      quizSylabus: {
                                        quizDescription:
                                          data.quizSylabus.quizDescription,
                                        quizs: data.quizSylabus.quizs.map(
                                          (quiz) =>
                                            quiz.id === item.id
                                              ? {
                                                  ...quiz,
                                                  quizDescription:
                                                    e.target.value,
                                                }
                                              : quiz
                                        ),
                                      },
                                    }),
                                }}
                              ></Textarea>
                              <h5 className="required mt-5">Pilih Jawaban</h5>
                              <div className="questions">
                                {item.quizQuestion.map((quiz, index) => (
                                  <div className="row mt-5" key={index}>
                                    <div className="col-10">
                                      <TextField
                                        props={{
                                          value: quiz.option,
                                          onChange: (
                                            e: ChangeEvent<HTMLInputElement>
                                          ) =>
                                            updateData({
                                              quizSylabus: {
                                                quizDescription:
                                                  data.quizSylabus
                                                    .quizDescription,
                                                quizs:
                                                  data.quizSylabus.quizs.map(
                                                    (quizItem) =>
                                                      quizItem.id === item.id
                                                        ? {
                                                            ...quizItem,
                                                            quizQuestion:
                                                              quizItem.quizQuestion.map(
                                                                (
                                                                  quizQuestion
                                                                ) =>
                                                                  quizQuestion.id ===
                                                                  quiz.id
                                                                    ? {
                                                                        ...quizQuestion,
                                                                        option:
                                                                          e
                                                                            .target
                                                                            .value,
                                                                      }
                                                                    : quizQuestion
                                                              ),
                                                          }
                                                        : quizItem
                                                  ),
                                              },
                                            }),
                                        }}
                                      ></TextField>
                                    </div>
                                    <div className="col-2 d-flex justify-content-center">
                                      <div className="form-check form-check-custom form-check-solid form-check-lg">
                                        <input
                                          className="form-check-input"
                                          type={
                                            data.quizBasic.quizType ===
                                            "Jawaban Ganda"
                                              ? "checkbox"
                                              : "radio"
                                          }
                                          value=""
                                          id={"answ-" + item.id + 1}
                                          name={"answerGroup" + item.id}
                                          checked={quiz.isCorrect === true}
                                          onChange={(e) => {
                                            if (
                                              data.quizBasic.quizType ===
                                              "Pilihan Ganda"
                                            ) {
                                              updateData({
                                                quizSylabus: {
                                                  quizDescription:
                                                    data.quizSylabus
                                                      .quizDescription,
                                                  quizs:
                                                    data.quizSylabus.quizs.map(
                                                      (quizItem) =>
                                                        quizItem.id === item.id
                                                          ? {
                                                              ...quizItem,
                                                              quizQuestion:
                                                                quizItem.quizQuestion.map(
                                                                  (
                                                                    quizQuestion
                                                                  ) =>
                                                                    quizQuestion.id ===
                                                                    quiz.id
                                                                      ? {
                                                                          ...quizQuestion,
                                                                          isCorrect:
                                                                            quizQuestion.id ===
                                                                            quiz.id,
                                                                        }
                                                                      : {
                                                                          ...quizQuestion,
                                                                          isCorrect:
                                                                            false,
                                                                        }
                                                                ),
                                                            }
                                                          : quizItem
                                                    ),
                                                },
                                              });
                                            } else {
                                              updateData({
                                                quizSylabus: {
                                                  quizDescription:
                                                    data.quizSylabus
                                                      .quizDescription,
                                                  quizs:
                                                    data.quizSylabus.quizs.map(
                                                      (quizItem) =>
                                                        quizItem.id === item.id
                                                          ? {
                                                              ...quizItem,
                                                              quizQuestion:
                                                                quizItem.quizQuestion.map(
                                                                  (
                                                                    quizQuestion
                                                                  ) =>
                                                                    quizQuestion.id ===
                                                                    quiz.id
                                                                      ? {
                                                                          ...quizQuestion,
                                                                          isCorrect:
                                                                            e
                                                                              .target
                                                                              .checked,
                                                                        }
                                                                      : quizQuestion
                                                                ),
                                                            }
                                                          : quizItem
                                                    ),
                                                },
                                              });
                                            }
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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
              updateData({
                quizSylabus: {
                  quizDescription: data.quizSylabus.quizDescription,
                  quizs: [
                    ...data.quizSylabus.quizs,
                    {
                      id: new Date().getTime().toString(),
                      quizDescription: "",
                      quizQuestion: [
                        {
                          id: "0",
                          option: "",
                          isCorrect: true,
                        },
                        {
                          id: "1",
                          option: "",
                          isCorrect: false,
                        },
                        {
                          id: "2",
                          option: "",
                          isCorrect: false,
                        },
                        {
                          id: "3",
                          option: "",
                          isCorrect: false,
                        },
                      ],
                    },
                  ],
                },
              });
            }}
          >
            Tambahkan Pertanyaan
          </Buttons>
          {data.quizSylabus.quizs.length <= 0 && hasError && (
            <div className="fv-plugins-message-container">
              <div
                data-field="quizName"
                data-validator="notEmpty"
                className="fv-help-block"
              >
                Data Quiz diperlukan
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Step2 };
