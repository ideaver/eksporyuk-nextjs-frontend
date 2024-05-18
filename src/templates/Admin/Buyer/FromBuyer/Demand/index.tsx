import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import useDemandViewModel, {
  useBuyerInformationForm,
} from "./Demand-view-model";
import CurrencyInput from "react-currency-input-field";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDemand,
  changeDemandQuantity,
  changePrice,
} from "@/features/reducers/buyers/buyersReducer";
import { RootState } from "@/app/store/store";
import { useSession } from "next-auth/react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const DemandPage = () => {
  const {
    abbreviation,
    handleChangeAbbreviation,
    shippingTerms,
    handleChangeShippingTerms,
    shippingOption,
    resetBuyerState,
  } = useDemandViewModel();

  const dispatch = useDispatch();

  const { formik, response } = useBuyerInformationForm();

  const router = useRouter();

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
      active={response.loading}
      spinner
    >
      <form onSubmit={formik.handleSubmit}>
        <KTCard>
          <KTCardBody>
            <h3 className="mb-5">Informasi Demand</h3>
            <h5 className="required">Demand/Permintaan</h5>
            <TextField
              placeholder="Masukan demand/permintaan"
              classNames={clsx(
                {
                  "is-invalid": formik.touched.demand && formik.errors.demand,
                },
                {
                  "is-valid": formik.touched.demand && !formik.errors.demand,
                }
              )}
              props={{
                ...formik.getFieldProps("demand"),
                onChange: (e: any) => {
                  formik.setFieldValue("demand", e.target.value);
                  dispatch(changeDemand(e.target.value));
                },
                value: formik.values.demand,
              }}
            />
            {formik.touched.demand && formik.errors.demand && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.demand}</span>
              </div>
            )}
            <h5 className="text-muted mt-2 mb-8">
              Komoditas yang diinginkan buyer
            </h5>
            <h5 className="required">Quantity Required</h5>
            <TextField
              placeholder="Masukan quantity required"
              type="number"
              classNames={clsx(
                {
                  "is-invalid":
                    formik.touched.demandQuantity &&
                    formik.errors.demandQuantity,
                },
                {
                  "is-valid":
                    formik.touched.demandQuantity &&
                    !formik.errors.demandQuantity,
                }
              )}
              props={{
                ...formik.getFieldProps("demandQuantity"),

                value: formik.values.demandQuantity,
                onChange: (e: any) => {
                  formik.setFieldValue("demandQuantity", e.target.value);
                  dispatch(changeDemandQuantity(e.target.value));
                },
              }}
            />
            {formik.touched.demandQuantity && formik.errors.demandQuantity && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.demandQuantity}</span>
              </div>
            )}
            <h5 className="text-muted mt-2 mb-8">
              Jumlah komoditas yang dibutuhkan buyer
            </h5>
            <h5 className="required">Satuan</h5>
            <Dropdown
              value={abbreviation}
              options={[
                { value: "Ton", label: "Ton" },
                { value: "Kg", label: "Kg" },
                { value: "Pcs", label: "Pcs" },
              ]}
              onValueChange={(value) =>
                handleChangeAbbreviation(value as "Ton" | "Kg" | "Pcs")
              }
            ></Dropdown>
            <h5 className="text-muted mt-2 mb-8">
              Jumlah komoditas yang dibutuhkan buyer
            </h5>
            <h5 className="required">Harga</h5>
            <CurrencyInput
              className={clsx(
                "form-control",
                {
                  "is-invalid": formik.touched.price && formik.errors.price,
                },
                {
                  "is-valid": formik.touched.price && !formik.errors.price,
                }
              )}
              {...formik.getFieldProps("price")}
              placeholder="Masukan Harga (Rp)"
              intlConfig={{ locale: "id-ID" }}
              defaultValue={0}
              value={useSelector((state: RootState) => state.buyer.price)}
              decimalsLimit={2}
              onValueChange={(value, name, values) => {
                dispatch(changePrice(value as string));
              }}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.price}</span>
              </div>
            )}
            <h5 className="text-muted mt-2 mb-8">
              Jumlah harga yang dibutuhkan buyer
            </h5>
            <h5 className="required">Shipping Terms</h5>
            <Dropdown
              value={shippingTerms}
              options={shippingOption}
              onValueChange={(value) => {
                handleChangeShippingTerms(
                  value as InternationalTradeDeliveryTypeEnum
                );
              }}
            ></Dropdown>
            <h5 className="text-muted mt-2 mb-8">
              Jumlah komoditas yang dibutuhkan buyer
            </h5>
          </KTCardBody>
          <div className={"row flex-end mt-10"}>
            <Buttons
              mode="light"
              classNames={"col-lg-2 me-lg-5"}
              onClick={() => {
                router.push("/admin/buyers/buyer-information");
              }}
            >
              Sebelumnya
            </Buttons>{" "}
            <Buttons
              // mode="light"
              buttonColor="secondary"
              classNames={"col-lg-2 me-lg-5"}
              onClick={() => {
                resetBuyerState();
              }}
            >
              Batal
            </Buttons>{" "}
            <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} type="submit">
              Kirim
            </Buttons>
          </div>
        </KTCard>
      </form>
    </LoadingOverlayWrapper>
  );
};
export default DemandPage;
