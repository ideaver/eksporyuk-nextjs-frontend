/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { StepperComponent } from "@/_metronic/assets/ts/components";
import { KTIcon } from "@/_metronic/helpers";
import { RootState } from "@/app/store/store";
import {
  ICreateQuizData,
  defaultCreateQuizData,
} from "@/types/contents/products/IQuizData";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { createDefaultLessonData, ILessonBasic, ILessonPDFContent, ILessonVideoContent } from "@/types/contents/products/ILessonData";

type Props = {
  show: boolean;
  id: string;
  isEdit?: ILessonBasic;
  handleClose: () => void;
  handleSubmit: (value: ILessonBasic, id: string) => void;
};

let modalsRoot: any = "";

const LessonModal = ({ show, handleClose, id, handleSubmit, isEdit }: Props) => {
  if (typeof window !== "undefined") {
    modalsRoot = document.getElementById("root-modals") || document.body;
  }

  const currentLessonSelector = useSelector(
    (state: RootState) => state.product.editLesson
  );
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const stepper = useRef<StepperComponent | null>(null);

  const [data, setData] = useState<ILessonBasic>(isEdit ?? createDefaultLessonData());
  const [hasError, setHasError] = useState(false);

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(
      stepperRef.current as HTMLDivElement
    );
  };

  const updateData = (fieldsToUpdate: Partial<ILessonBasic>) => {
    const updatedData = { ...data, ...fieldsToUpdate };
    setData(updatedData);
  };

  const checkLessonBasic = (): boolean => {
    if (!data.title) {
      return false;
    }
    return true;
  };

const checkLessonData = (): boolean => {
    if (!data || !data.title || !data.id || !data.lessonType || !data.content) {
      return false;
    }

    if (data.lessonType === "Video") {
      const videoContent = data.content as ILessonVideoContent;
      if (!videoContent.content || !videoContent.videoUrl) {
        return false;
      }
    } else {
      const pdfContent = data.content as ILessonPDFContent;
      if (!pdfContent.content || !pdfContent.file) {
        return false;
      }
    }

    return true;
};

  const prevStep = () => {
    if (!stepper.current) {
      return;
    }

    stepper.current.goPrev();
  };

  const nextStep = () => {
    setHasError(false);
    if (!stepper.current) {
      return;
    }

    if (stepper.current.getCurrentStepIndex() === 1) {
      if (!checkLessonBasic()) {
        setHasError(true);
        return;
      }
    }

    if (stepper.current.getCurrentStepIndex() === 2) {
      if (!checkLessonData()) {
        setHasError(true);
        return;
      }
    }

    stepper.current.goNext();
  };

  useEffect(() => {
    if (isEdit != null && data != currentLessonSelector) {
        console.log("edit use effect called at lesson modal")
      updateData(currentLessonSelector);
    } else {
        console.log("default use effect called at lesson modal")
      updateData(createDefaultLessonData());
    }
  }, [isEdit, currentLessonSelector]);

  // console.log("IS EDIT", isEdit)
  // console.log(
  //   "isData are selector",
  //   data.id === currentLessonSelector.id,
  //   data,
  //   currentLessonSelector
  // );
  // console.log(
  //   "is data are default",
  //   data.id === defaultCreateQuizData.id,
  //   data,
  //   defaultCreateQuizData
  // );

  return createPortal(
    <Modal
      id="kt_modal_create_lesson"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
    >
      <div className="modal-header">
        <h2>Tambah Materi</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </div>

      <div className="modal-body py-lg-10 px-lg-10">
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
          id="kt_modal_create_app_stepper"
        >
          {/* begin::Aside*/}
          <div className="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
            {/* begin::Nav*/}
            <div className="stepper-nav ps-lg-10">
              {/* begin::Step 1*/}
              <div
                className="stepper-item current"
                data-kt-stepper-element="nav"
              >
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Informati Quiz</h3>

                    <div className="stepper-desc">
                      Masukkan judul dan jenis materi
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Susun Quiz</h3>

                    <div className="stepper-desc">Masukkan Quiz</div>
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 53 */}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper */}
                <div className="stepper-wrapper">
                  {/* begin::Icon */}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Selesai</h3>

                    <div className="stepper-desc">Quiz selesai dibuat</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}
              </div>
              {/* end::Step 3*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className="flex-row-fluid py-lg-5 px-lg-15">
            {/*begin::Form */}
            <form noValidate id="kt_modal_create_app_form">
              <Step1 data={data} updateData={updateData} hasError={hasError} />
              <Step2 data={data} updateData={updateData} hasError={hasError} />
              <Step3 />
              {/* <Step3 data={data} updateData={updateData} hasError={hasError} />
              <Step4 data={data} updateData={updateData} hasError={hasError} />
              <Step5 /> */}

              {/*begin::Actions */}
              <div className="d-flex flex-stack pt-10">
                <div className="me-2">
                  <button
                    type="button"
                    className="btn btn-lg btn-light-primary me-3"
                    data-kt-stepper-action="previous"
                    onClick={prevStep}
                  >
                    <KTIcon iconName="arrow-left" className="fs-3 me-1" />{" "}
                    Sebelumnya
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-kt-stepper-action="submit"
                    onClick={() => {
                      handleSubmit(data, id)
                      handleClose()
                    }}
                  >
                    Kirim{" "}
                    <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
                  </button>

                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-kt-stepper-action="next"
                    onClick={nextStep}
                  >
                    Selanjutnya{" "}
                    <KTIcon iconName="arrow-right" className="fs-3 ms-1 me-0" />
                  </button>
                </div>
              </div>
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { LessonModal };
