import { PageTitle } from "@/_metronic/layout/core";
import useEditBuyerViewModel, {
  IEditBuyer,
  breadcrumbs,
  useCountryDropdown,
} from "./EditBuyer-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import clsx from "clsx";
import { AsyncPaginate } from "react-select-async-paginate";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import CurrencyInput from "react-currency-input-field";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const EditBuyer = ({ id, data }: IEditBuyer) => {
  const router = useRouter();
  const { loadOptions } = useCountryDropdown();
  const {
    handleBuyerUpdateOne,
    loading,
    setLoading,
    shippingOption,
    formik,
    buyerName,
    companyName,
    address,
    email,
    phone,
    country,
    demand,
    quantity,
    abbreviation,
    price,
    deliveryType,
    setBuyerName,
    setAddress,
    setCompanyName,
    setEmail,
    setPhone,
    setCountry,
    setDemand,
    setQuantity,
    setAbbreviation,
    setPrice,
    setDeliveryType,
    hsCode,
    setHsCode,
  } = useEditBuyerViewModel({ id, data });
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Buyer</PageTitle>
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
        <form onSubmit={formik.handleSubmit}>
          <KTCard>
            <KTCardBody>
              <h3 className="mb-5">Informasi Buyer</h3>
              <h5 className="required">Nama Buyer</h5>
              <input
                placeholder="Masukan nama buyer"
                type="text"
                {...formik.getFieldProps("buyerName")}
                onChange={(e) => {
                  formik.setFieldValue("buyerName", e.target.value);
                  setBuyerName(e.target.value);
                }}
                value={formik.values.buyerName ?? ""}
                className={clsx(
                  "w-100 px-4 p-3 form-control-md form-control",
                  {
                    "is-invalid":
                      formik.touched.buyerName && formik.errors.buyerName,
                  },
                  {
                    "is-valid":
                      formik.touched.buyerName && !formik.errors.buyerName,
                  }
                )}
              />
              {formik.touched.buyerName && formik.errors.buyerName && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.buyerName}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">Nama lengkap buyer</h5>
              <h5 className="">Nama Perusahaan</h5>
              <input
                type="text"
                placeholder="Masukan nama perusahaan"
                {...formik.getFieldProps("companyName")}
                onChange={(e) => {
                  formik.setFieldValue("companyName", e.target.value);
                  setCompanyName(e.target.value);
                }}
                className={clsx(
                  "w-100 px-4 p-3 form-control-md form-control",
                  {
                    "is-invalid":
                      formik.touched.companyName && formik.errors.companyName,
                  },
                  {
                    "is-valid":
                      formik.touched.companyName && !formik.errors.companyName,
                  }
                )}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.companyName}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">Nama perusahaan buyer</h5>
              <h5 className="">Negara</h5>
              <button className="btn btn-secondary pe-none py-3 my-2">
                {country?.label}
              </button>
              <AsyncPaginate
                isSearchable={true}
                onChange={(e) => {
                  setCountry(e as any);
                }}
                loadOptions={loadOptions}
              ></AsyncPaginate>
              <h5 className="text-muted mt-2 mb-8">Pilih negara Asal buyer</h5>
              <h5 className="">Alamat Perusahaan</h5>
              <input
                type="text"
                placeholder="Masukan alamat perusahaan"
                {...formik.getFieldProps("address")}
                onChange={(e) => {
                  formik.setFieldValue("address", e.target.value);
                  setAddress(e.target.value);
                }}
                value={formik.values.address ?? ""}
                className={clsx(
                  "w-100 px-4 p-3 form-control-md form-control",
                  {
                    "is-invalid":
                      formik.touched.address && formik.errors.address,
                  },
                  {
                    "is-valid":
                      formik.touched.address && !formik.errors.address,
                  }
                )}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.address}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">Alamat perusahaan buyer</h5>
              <h5 className="">E-mail Buyer</h5>
              <input
                type="text"
                placeholder="Masukan email"
                {...formik.getFieldProps("email")}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                  setEmail(e.target.value);
                }}
                value={formik.values.email ?? ""}
                className={clsx(
                  "w-100 px-4 p-3 form-control-md form-control",
                  {
                    "is-invalid": formik.touched.email && formik.errors.email,
                  },
                  {
                    "is-valid": formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              <h5 className="text-muted mt-2 mb-8">E-mail buyer</h5>
              <h5 className="">No. Telepon</h5>
              <input
                type="number"
                placeholder="Masukan nomor telepon"
                {...formik.getFieldProps("phone")}
                onChange={(e) => {
                  formik.setFieldValue("phone", e.target.value);
                  setPhone(e.target.value);
                }}
                value={formik.values.phone ?? ""}
                className={clsx(
                  "w-100 px-4 p-3 form-control-md form-control",
                  {
                    "is-invalid": formik.touched.phone && formik.errors.phone,
                  },
                  {
                    "is-valid": formik.touched.phone && !formik.errors.phone,
                  }
                )}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.phone}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">No. telepon buyer</h5>
            </KTCardBody>
          </KTCard>
          {/* demand */}
          <KTCard className="mt-5">
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
                    setDemand(e.target.value);
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
              <h5 className="">Quantity Required</h5>
              <TextField
                placeholder="Masukan quantity required"
                type="number"
                classNames={clsx(
                  {
                    "is-invalid":
                      formik.touched.quantity && formik.errors.quantity,
                  },
                  {
                    "is-valid":
                      formik.touched.quantity && !formik.errors.quantity,
                  }
                )}
                props={{
                  ...formik.getFieldProps("quantity"),

                  value: formik.values.quantity,
                  onChange: (e: any) => {
                    formik.setFieldValue("demandQuantity", e.target.value);
                    setQuantity(e.target.value);
                  },
                }}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.quantity}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">
                Jumlah komoditas yang dibutuhkan buyer
              </h5>
              <h5 className="">Satuan</h5>
              <Dropdown
                value={abbreviation}
                options={[
                  { value: "none", label: "None" },
                  { value: "Ton", label: "Ton" },
                  { value: "Kg", label: "Kg" },
                  { value: "Pcs", label: "Pcs" },
                ]}
                onValueChange={(value) => setAbbreviation(value as string)}
              ></Dropdown>
              <h5 className="text-muted mt-2 mb-8">
                Jumlah komoditas yang dibutuhkan buyer
              </h5>
              <h5 className="">Harga</h5>
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
                value={price ?? ""}
                decimalsLimit={2}
                onValueChange={(value, name, values) => {
                  setPrice(value);
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
              <h5 className="">HS Code</h5>
              <TextField
                placeholder="Masukan HS code"
                props={{
                  value: hsCode,
                  onChange: (e: any) => {
                    setHsCode(e.target.value);
                  },
                }}
              />
              <h5 className="text-muted mt-2 mb-8">
                HS code yang diinginkan buyer
              </h5>
              <h5 className="">Shipping Terms</h5>
              <Dropdown
                value={deliveryType}
                options={shippingOption}
                onValueChange={(value) => {
                  setDeliveryType(value as InternationalTradeDeliveryTypeEnum);
                }}
              ></Dropdown>
              <h5 className="text-muted mt-2 mb-8">
                Shipping terms yang diinginkan buyer
              </h5>
            </KTCardBody>
            <div className={"row flex-end mt-10"}>
              <Buttons
                // mode="light"
                buttonColor="secondary"
                classNames={"col-lg-2 me-lg-5"}
                onClick={() => {
                  // resetBuyerState();
                  router.back();
                }}
              >
                Batal
              </Buttons>
              <Buttons
                type="submit"
                onClick={handleBuyerUpdateOne}
                classNames={"col-lg-2 mt-5 mt-lg-0"}
              >
                Ubah Data Buyer
              </Buttons>
            </div>
          </KTCard>
        </form>
      </LoadingOverlayWrapper>
    </>
  );
};

export default EditBuyer;
