import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import useBuyerInformationViewModel, {
  useCountryDropdown,
  useBuyerInformationForm,
} from "./BuyerInformation-view-model";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { AsyncPaginate } from "react-select-async-paginate";
import clsx from "clsx";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useDispatch } from "react-redux";
import {
  changeBuyerName,
  changeCompanyAddress,
  changeCompanyName,
  changeEmail,
  changeTelephoneNumber,
} from "@/features/reducers/buyers/buyersReducer";

const BuyerInformationPage = () => {
  const { handleChangeCountry, resetBuyerState } =
    useBuyerInformationViewModel();
  const dispatch = useDispatch();

  const { loadOptions } = useCountryDropdown();

  const { formik } = useBuyerInformationForm();

  return (
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
              dispatch(changeBuyerName(e.target.value));
            }}
            value={formik.values.buyerName}
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
          <h5 className="required">Nama Perusahaan</h5>
          <input
            type="text"
            placeholder="Masukan nama perusahaan"
            {...formik.getFieldProps("companyName")}
            onChange={(e) => {
              formik.setFieldValue("companyName", e.target.value);
              dispatch(changeCompanyName(e.target.value));
            }}
            value={formik.values.companyName}
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
          <h5 className="required">Negara</h5>
          <AsyncPaginate
            isSearchable={true}
            onChange={(e) => {
              handleChangeCountry(e?.value as number);
            }}
            loadOptions={loadOptions}
          ></AsyncPaginate>
          <h5 className="text-muted mt-2 mb-8">Pilih negara Asal buyer</h5>
          <h5 className="required">Alamat Perusahaan</h5>
          <input
            type="text"
            placeholder="Masukan alamat perusahaan"
            {...formik.getFieldProps("companyAddress")}
            onChange={(e) => {
              formik.setFieldValue("companyAddress", e.target.value);
              dispatch(changeCompanyAddress(e.target.value));
            }}
            value={formik.values.companyAddress}
            className={clsx(
              "w-100 px-4 p-3 form-control-md form-control",
              {
                "is-invalid":
                  formik.touched.companyAddress && formik.errors.companyAddress,
              },
              {
                "is-valid":
                  formik.touched.companyAddress &&
                  !formik.errors.companyAddress,
              }
            )}
          />
          {formik.touched.companyAddress && formik.errors.companyAddress && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.companyAddress}</span>
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
              dispatch(changeEmail(e.target.value));
            }}
            value={formik.values.email}
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
            type="text"
            placeholder="Masukan nomor telepon"
            {...formik.getFieldProps("telephoneNumber")}
            onChange={(e) => {
              formik.setFieldValue("telephoneNumber", e.target.value);
              dispatch(changeTelephoneNumber(e.target.value));
            }}
            value={formik.values.telephoneNumber}
            className={clsx(
              "w-100 px-4 p-3 form-control-md form-control",
              {
                "is-invalid":
                  formik.touched.telephoneNumber &&
                  formik.errors.telephoneNumber,
              },
              {
                "is-valid":
                  formik.touched.telephoneNumber &&
                  !formik.errors.telephoneNumber,
              }
            )}
          />
          {formik.touched.telephoneNumber && formik.errors.telephoneNumber && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.telephoneNumber}</span>
            </div>
          )}
          <h5 className="text-muted mt-2 mb-8">No. telepon buyer</h5>
        </KTCardBody>
        <div className={"row flex-end mt-10"}>
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
          <Buttons type="submit" classNames={"col-lg-2 mt-5 mt-lg-0"}>
            Selanjutnya
          </Buttons>
        </div>
      </KTCard>
    </form>
  );
};
export default BuyerInformationPage;
