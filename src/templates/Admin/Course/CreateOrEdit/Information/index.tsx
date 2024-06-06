import { KTCard, KTCardBody } from "@/_metronic/helpers";
import {
  AffiliateCommissionTypeEnum,
  CourseLevelEnum,
} from "@/app/service/graphql/gen/graphql";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import CurrencyInput from "react-currency-input-field";
import "react-quill/dist/quill.snow.css";
import { AsyncPaginate } from "react-select-async-paginate";
import useInformationViewModel, {
  AddMentorHandler,
  OptionType,
  useMentorsDropdown,
} from "./Information-view-model";
import { on } from "events";

const ClassInformation = ({}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const {
    inputClassName,
    setInputClassName,
    inputClassDescription,
    setInputClassDescription,
    inputIntroVideo,
    setInputIntroVideo,
    inputClassAuthor,
    setInputClassAuthor,
    inputClassPrice,
    setInputClassPrice,
    inputClassLevel,
    setInputClassLevel,
    inputClassDiscountPrice,
    setInputClassDiscountPrice,
    inputCourseAffiliateCommission,
    setInputCourseAffiliateCommission,
    inputAffilaiteCommissionType,
    setInputAffilaiteCommissionType,
    inputErrorMessage,
    setErrorMessage,
  } = useInformationViewModel();

  const { loadOptions } = useMentorsDropdown();

  const {
    addMentor,
    currentMentorSelector,
    selectedMentor,
    setSelectedMentor,
    removeMentor,
  } = AddMentorHandler();

  return (
    <>
      {inputErrorMessage && (
        <Alert
          label={inputErrorMessage as string}
          title="Terjadi Masalah"
          alertColor="danger"
        ></Alert>
      )}
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Informasi Kelas</h3>
          <h5 className="required">Nama Kelas</h5>
          <TextField
            props={{
              value: inputClassName,
              onChange: setInputClassName,
            }}
          />
          <h5 className="mt-5 required">Deskrpsi Kelas</h5>
          <div
            className=""
            style={{
              height: 177,
            }}
          >
            <ReactQuill
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ align: [] }],
                  ["clean"],
                ],
              }}
              value={inputClassDescription}
              onChange={setInputClassDescription}
              style={{
                height: "70%",
              }}
            />
          </div>
          <h5 className="mt-5 required">Intro Video</h5>
          <TextField
            props={{
              value: inputIntroVideo,
              onChange: setInputIntroVideo,
            }}
          />
          <h5 className="text-muted mt-3">Video harus berasal dari Youtube</h5>
          {/* removed and might be use for future use */}
          {/* <h5 className="required mt-5">Author</h5>
        <TextField
          props={{
            value: inputClassAuthor,
            onChange: setInputClassAuthor,
          }}
        />
        <h5 className="text-muted mt-3">Pembuat materi kelas</h5> */}
          <h5 className="required mt-5">Mentor</h5>
          {/* TODO Create Selected Mentor */}
          {selectedMentor &&
            selectedMentor?.map((mentor, index) => {
              return (
                <div className="d-flex mt-5" key={index}>
                  <div className="w-100">
                    <TextField
                      props={{
                        enabled: "false",
                        value: mentor.label,
                        onChange: () => {},
                      }}
                    ></TextField>
                  </div>
                  <div className="ms-5">
                    <Buttons
                      icon="cross"
                      buttonColor="danger"
                      showIcon={true}
                      onClick={() => removeMentor(index)}
                    ></Buttons>
                  </div>
                </div>
              );
            })}
          <AsyncPaginate
            className={currentMentorSelector && "mt-5"}
            isSearchable={true}
            loadOptions={loadOptions}
            onChange={(value) => {
              addMentor(value as OptionType);
            }}
          ></AsyncPaginate>
          <div className="row">
            <div className="col">
              {" "}
              <h5 className="required mt-5">Harga Kelas</h5>
              <div className="input-group">
                <span className="input-group-text" id="price-field">
                  Rp
                </span>
                <CurrencyInput
                  className="form-control"
                  id="price-field"
                  name="price"
                  placeholder="Masukan Harga (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={inputClassPrice as string}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {
                    if (typeof setInputClassPrice === "function") {
                      setInputClassPrice(value ?? "");
                    }
                  }}
                />
              </div>
            </div>
            <div className="col">
              <h5 className="mt-5">Harga Diskon</h5>
              <div className="input-group">
                <span className="input-group-text" id="price-field">
                  Rp
                </span>
                <CurrencyInput
                  className="form-control"
                  id="price-field"
                  name="price"
                  placeholder="Masukan Harga (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={inputClassDiscountPrice as string}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {
                    if (typeof setInputClassDiscountPrice === "function") {
                      setInputClassDiscountPrice(value ?? "");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="required mt-5">Tipe Afiliasi Komisi</h5>
              <Dropdown
                value={inputAffilaiteCommissionType}
                options={[
                  {
                    value: AffiliateCommissionTypeEnum.Amount,
                    label: "Jumlah",
                  },
                  {
                    value: AffiliateCommissionTypeEnum.Percentage,
                    label: "Persentasi",
                  },
                ]}
                onValueChange={(value) => {
                  if (typeof setInputAffilaiteCommissionType === "function") {
                    setInputAffilaiteCommissionType(
                      value as AffiliateCommissionTypeEnum
                    );
                  }
                }}
              ></Dropdown>
            </div>
            <div className="col">
              <h5 className="required mt-5">Harga Afiliasi Komisi</h5>
              <div className="input-group">
                <span className="input-group-text" id="price-field">
                  {inputAffilaiteCommissionType === "AMOUNT" ? "Rp" : "%"}
                </span>
                <CurrencyInput
                  className="form-control"
                  id="price-field"
                  name="price"
                  placeholder="Masukan Komisi (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={inputCourseAffiliateCommission as string}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {
                    if (
                      typeof setInputCourseAffiliateCommission === "function"
                    ) {
                      setInputCourseAffiliateCommission(value ?? "");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <h5 className="mt-5 required">Tingkat Kesulitan</h5>
          <Dropdown
            value={inputClassLevel}
            options={[
              { value: CourseLevelEnum.Beginner, label: "Mudah" },
              { value: CourseLevelEnum.Intermediate, label: "Sedang" },
              { value: CourseLevelEnum.Advanced, label: "Sulit" },
            ]}
            onValueChange={(value) => {
              if (typeof setInputClassLevel === "function") {
                setInputClassLevel(value as CourseLevelEnum);
              }
            }}
          ></Dropdown>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default ClassInformation;
