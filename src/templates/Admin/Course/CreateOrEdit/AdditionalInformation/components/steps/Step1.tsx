/* eslint-disable jsx-a11y/anchor-is-valid */

import { KTIcon } from "@/_metronic/helpers";
import { StepProps } from "@/types/contents/products/IQuizData";

const Step1 = ({ data, updateData, hasError }: StepProps) => {
  return (
    <div className="current" data-kt-stepper-element="content">
      <div className="w-100">
        {/*begin::Form Group */}
        <div className="fv-row mb-10">
          <label className="d-flex align-items-center fs-5 fw-semibold mb-2">
            <span className="required">Nama Quiz</span>
            <i
              className="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="Isi nama Quiz"
            ></i>
          </label>
          <input
            type="text"
            className="form-control form-control-lg form-control-solid"
            name="quizName"
            placeholder=""
            value={data.quizBasic.quizName}
            onChange={(e) =>
              updateData({
                quizBasic: {
                  quizName: e.target.value,
                  quizType: data.quizBasic.quizType,
                },
              })
            }
          />
          {!data.quizBasic.quizName && hasError && (
            <div className="fv-plugins-message-container">
              <div
                data-field="quizName"
                data-validator="notEmpty"
                className="fv-help-block"
              >
               Nama Quiz diperlukan
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}

        {/*begin::Form Group */}
        <div className="fv-row">
          {/* begin::Label */}
          <label className="d-flex align-items-center fs-5 fw-semibold mb-4">
            <span className="required">Tipe Quiz</span>

            <i
              className="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="Pilih Tipe Quiz"
            ></i>
          </label>
          {/* end::Label */}
          <div>
            {/*begin:Option */}
            <label className="d-flex align-items-center justify-content-between mb-6 cursor-pointer">
              <span className="d-flex align-items-center me-2">
                <span className="symbol symbol-50px me-6">
                  <span className="symbol-label bg-light-primary">
                    <KTIcon iconName="abstract-14" className="fs-1 text-primary" />
                  </span>
                </span>

                <span className="d-flex flex-column">
                  <span className="fw-bolder fs-6">Pilihan Ganda</span>
                  <span className="fs-7 text-muted">
                    Jawaban dengan salah satu jawaban
                  </span>
                </span>
              </span>

              <span className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="radio"
                  name="quizType"
                  value="Quick Online Courses"
                  checked={data.quizBasic.quizType === "Pilihan Ganda"}
                  onChange={() =>
                    updateData({
                      quizBasic: {
                        quizName: data.quizBasic.quizName,
                        quizType: "Pilihan Ganda",
                      },
                    })
                  }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
            <label className="d-flex align-items-center justify-content-between mb-6 cursor-pointer">
              <span className="d-flex align-items-center me-2">
                <span className="symbol symbol-50px me-6">
                  <span className="symbol-label bg-light-danger">
                    <KTIcon iconName="category" className="fs-1 text-danger" />
                  </span>
                </span>

                <span className="d-flex flex-column">
                  <span className="fw-bolder fs-6">
                    Jawaban Ganda
                  </span>
                  <span className="fs-7 text-muted">
                    Quiz dengan jawaban yang lebih dari satu
                  </span>
                </span>
              </span>

              <span className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="radio"
                  name="quizType"
                  value="Face to Face Discussions"
                  checked={data.quizBasic.quizType === "Jawaban Ganda"}
                  onChange={() =>
                    updateData({
                      quizBasic: {
                        quizName: data.quizBasic.quizName,
                        quizType: "Jawaban Ganda",
                      },
                    })
                  }
                />
              </span>
            </label>
            {/*end::Option */}
          </div>
        </div>
        {/*end::Form Group */}
      </div>
    </div>
  );
};

export { Step1 };
