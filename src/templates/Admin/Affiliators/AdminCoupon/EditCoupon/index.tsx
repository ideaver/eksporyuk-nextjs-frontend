import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { PageTitle } from "@/_metronic/layout/core";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { breadcrumbs, useCoursesDropdown } from "../AdminCoupon-view-model";
import useEditCouponViewModel, { IEditCoupon } from "./EditCoupon-view-model";
// import CurrencyInput from "react-currency-input-field";
import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Flatpickr from "react-flatpickr";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { AsyncPaginate } from "react-select-async-paginate";

const EditCoupon = ({ id, data }: IEditCoupon) => {
  const router = useRouter();
  const CheckBoxInput = dynamic(
    () =>
      import("@/stories/molecules/Forms/Advance/CheckBox/CheckBox").then(
        (module) => module.CheckBoxInput
      ),
    {
      ssr: false,
    }
  );
  const {
    code,
    setCode,
    status,
    setStatus,
    discount,
    discountType,
    setDiscount,
    setDiscountType,
    addDate,
    setAddDate,
    date,
    setDate,
    loading,
    handleCouponUpdateOne,
    maxClaim,
    setMaxClaim,
    connectCourse,
    setConnectCourse,
    selectedMentor,
    setSelectedMentor,
    addMentor,
    removeMentor,
    selectedCourse,
    setSelectedCourses,
    addCourse,
    removeCourse,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useEditCouponViewModel({ id, data });

  const { loadOptions } = useCoursesDropdown();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Coupon</PageTitle>
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
        active={loading}
        spinner
      >
        <KTCard>
          <KTCardBody>
            <h3 className="mb-5">Edit Koupon</h3>
            <h5 className="required">Kode Kupon</h5>
            <TextField
              placeholder="Masukan demand/permintaan"
              props={{
                value: code,
                onChange: (e: any) => {
                  setCode(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-2 mb-8">Kode Kupon</h5>

            <Dropdown
              value={status}
              options={[
                { value: "true", label: "Active" },
                { value: "false", label: "Non Active" },
              ]}
              onValueChange={(value) => setStatus(value as string)}
            ></Dropdown>
            <h5 className="text-muted mt-2 mb-8"> Atur Status</h5>
            <h5 className="required">Besaran Potongan</h5>
            <div className="my-1">
              <Dropdown
                options={[
                  { value: DiscountTypeEnum.Amount, label: "Harga (Rp)" },
                  { value: DiscountTypeEnum.Percentage, label: "Persen (%)" },
                ]}
                value={discountType}
                onValueChange={(value) => {
                  setDiscountType(value as DiscountTypeEnum);
                }}
              />
            </div>

            <TextField
              placeholder="Masukan Jumlah Diskon"
              type="number"
              props={{
                value: discount,
                onChange: (e: any) => {
                  setDiscount(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-2 mb-8">Atur Diskon</h5>
            <h4 className="fw-bold text-gray-700">Batas Waktu Penggunaan</h4>
            <CheckBoxInput
              className="active my-2"
              name="follup"
              value={"true"}
              checked={addDate}
              onChange={(e) => {
                setAddDate((prev) => !prev);
              }}
            >
              {`Berikan batas waktu untuk kupon ini`}
            </CheckBoxInput>
            {addDate ? (
              <>
                <div className="mb-5 mt-6">
                  <h4 className="required fw-bold text-gray-700">Batas Awal</h4>
                  <Flatpickr
                    value={startDate}
                    onChange={([date]) => {
                      setStartDate(date);
                    }}
                    options={{
                      enableTime: false,
                      dateFormat: "Y-m-d",
                    }}
                    className="form-control form-control-solid"
                    placeholder="Pick date"
                  />
                </div>
                <div className="mb-5 mt-6">
                  <h4 className="required fw-bold text-gray-700">
                    Batas Akhir
                  </h4>
                  <Flatpickr
                    value={endDate}
                    onChange={([date]) => {
                      setEndDate(date);
                    }}
                    options={{
                      enableTime: false,
                      dateFormat: "Y-m-d",
                    }}
                    className="form-control form-control-solid"
                    placeholder="Pick date"
                  />
                </div>
              </>
            ) : // <TextField
            //   styleType="outline"
            //   size="medium"
            //   placeholder="Pilih tanggal"
            //   type="date"
            //   props={{
            //     value: date,
            //     onChange: (e: any) => {
            //       setDate(e.target.value);
            //     },
            //   }}
            // />
            null}
            <div className="mb-5 mt-6">
              <h4 className="required fw-bold text-gray-700">
                Max Penggunaan User
              </h4>
              <TextField
                styleType="outline"
                size="medium"
                type="number"
                props={{
                  value: String(maxClaim),
                  onChange: (e: any) => setMaxClaim(e.target.value),
                }}
              />
            </div>
            {/* <div className="mb-5 mt-6">
          <h4 className="fw-bold text-gray-700">Penerapan Kupon</h4>
          <h6 className="mt-4 text-muted">
            Pilih Kelas yang Dapat Menggunakan Kupon Ini
          </h6>
          <AsyncPaginate
            className="mt-5"
            loadOptions={loadOptions}
            onChange={(value) => {
              setConnectCourse(value?.value);
            }}
          ></AsyncPaginate>
        </div> */}
            {selectedCourse.length === 0 && (
              <div className="mb-8 mt-6">
                <h4 className="fw-bold text-gray-700">
                  Kupon hanya bisa digunakan di kelas
                </h4>
                {/* <h6 className="mt-4 text-muted">
            Pilih Kelas yang Dapat Menggunakan Kupon Ini
          </h6> */}
                {selectedMentor &&
                  selectedMentor?.map((mentor: any, index: any) => {
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
                  className="mt-5"
                  loadOptions={loadOptions}
                  onChange={(value) => {
                    setSelectedCourses([]);
                    addMentor(value);
                  }}
                ></AsyncPaginate>
              </div>
            )}

            {selectedMentor.length === 0 && (
              <div className="mb-5 mt-6">
                <h4 className="fw-bold text-gray-700">
                  Kupon tidak bisa digunakan di kelas
                </h4>
                {/* <h6 className="mt-4 text-muted">
            Pilih Kelas yang Dapat Menggunakan Kupon Ini
          </h6> */}
                {selectedCourse &&
                  selectedCourse?.map((mentor: any, index: any) => {
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
                            onClick={() => removeCourse(index)}
                          ></Buttons>
                        </div>
                      </div>
                    );
                  })}
                <AsyncPaginate
                  className="mt-5"
                  loadOptions={loadOptions}
                  onChange={(value) => {
                    setSelectedMentor([]);
                    addCourse(value);
                  }}
                ></AsyncPaginate>
              </div>
            )}
          </KTCardBody>
          <div className={"row flex-end mt-10"}>
            <Buttons
              // mode="light"
              buttonColor="secondary"
              classNames={"col-lg-2 me-lg-5"}
              onClick={() => {
                //   resetBuyerState();
                router.back();
              }}
            >
              Batal
            </Buttons>{" "}
            <Buttons
              classNames={"col-lg-2 mt-5 mt-lg-0"}
              type="submit"
              onClick={handleCouponUpdateOne}
            >
              Kirim
            </Buttons>
          </div>
        </KTCard>
      </LoadingOverlayWrapper>
    </>
  );
};

export default EditCoupon;
