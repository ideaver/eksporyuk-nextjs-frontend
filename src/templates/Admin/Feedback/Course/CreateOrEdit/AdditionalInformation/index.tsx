import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { RootState } from "@/app/store/store";
import {
  changeEditQuiz,
  changeQuizs,
} from "@/features/reducers/products/productReducer";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { ICreateQuizData } from "@/types/contents/products/IQuizData";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAdditionalInformationViewModel from "./AdditionalInformation-view-model";
import { QuizModal } from "./components/QuizModal";

const CourseAdditionalInformation = () => {
  const { items, addItem, removeItem, handleInputChange } =
    useAdditionalInformationViewModel();

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const currentQuizSelector = useSelector(
    (state: RootState) => state.product.quizs
  );

  const handleSubmitQuiz = (val: ICreateQuizData) => {
    dispatch(
      changeQuizs(
        currentQuizSelector.some((quiz) => quiz.id === val.id)
          ? currentQuizSelector.map((quiz) => (quiz.id === val.id ? val : quiz))
          : currentQuizSelector.concat(val)
      )
    );
    setShowModal(false);
    setIsEdit(false);
    window.location.reload();
  };
  const handleRemoveQuiz = (index: number) => {
    const newQuiz = currentQuizSelector.filter((_, i) => i !== index);
    dispatch(changeQuizs(newQuiz));
  };

  const handleEditQuiz = (newQuiz: ICreateQuizData) => {
    dispatch(changeEditQuiz(newQuiz));
    setIsEdit(true);
    setShowModal(true);
  };
  return (
    <>
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Susun Quiz</h3>
          <h5 className="">Daftar Quiz untuk Kelas</h5>
          {currentQuizSelector.map((quiz, index: number) => (
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
          ))}
          <Buttons
            showIcon={true}
            mode="light"
            classNames="mt-5"
            onClick={() => {
              setIsEdit(false)
              setShowModal(true);
            }}
          >
            Tambahkan Quiz
          </Buttons>
        </KTCardBody>
      </KTCard>
      <KTCard className="mt-5">
        <KTCardBody>
          <h3 className="mb-5">Informasi Tambahan</h3>
          <h5 className="">Objektif</h5>
          {items.map((item, index) => (
            <div className="d-flex mt-5" key={index}>
              <div className="w-100">
                <TextField
                  props={{
                    value: item,
                    onChange: (e: any) =>
                      handleInputChange(index, e.target.value),
                  }}
                ></TextField>
              </div>
              <div className="ms-5">
                <Buttons
                  icon="cross"
                  buttonColor="danger"
                  showIcon={true}
                  onClick={() => removeItem(index)}
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
              addItem();
            }}
          >
            Tambahkan Item
          </Buttons>
        </KTCardBody>
      </KTCard>
      <QuizModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleSubmit={handleSubmitQuiz}
        isEdit={isEdit}
      ></QuizModal>
    </>
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
          Jumlah Soal: {data.quizSylabus.quizs.length}, Tipe Soal: {data.quizBasic.quizType}
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

export default CourseAdditionalInformation;
