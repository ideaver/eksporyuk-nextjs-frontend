import { PageTitle } from "@/_metronic/layout/core";
import { breadcrumbs } from "../AdminCoupon-view-model";
import useEditCouponViewModel, { IEditCoupon } from "./EditCoupon-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import clsx from "clsx";
// import CurrencyInput from "react-currency-input-field";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";
import dynamic from "next/dynamic";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const EditCoupon = ({ id, data }: IEditCoupon) => {
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
  } = useEditCouponViewModel({ id, data });
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
                { value: "false", label: "Non Activw" },
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
            <h4 className="required fw-bold text-gray-700">
              Batas Waktu Penggunaan
            </h4>
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
              <TextField
                styleType="outline"
                size="medium"
                placeholder="Pilih tanggal"
                type="date"
                props={{
                  value: date,
                  onChange: (e: any) => {
                    setDate(e.target.value);
                  },
                }}
              />
            ) : null}
          </KTCardBody>
          <div className={"row flex-end mt-10"}>
            <Buttons
              // mode="light"
              buttonColor="secondary"
              classNames={"col-lg-2 me-lg-5"}
              onClick={() => {
                //   resetBuyerState();
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
