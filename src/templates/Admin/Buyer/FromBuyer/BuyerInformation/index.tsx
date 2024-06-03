import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import useBuyerInformationViewModel, {
  useCountryDropdown,
  useBuyerInformationForm,
} from "./BuyerInformation-view-model";
import { AsyncPaginate } from "react-select-async-paginate";
import clsx from "clsx";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBuyerName,
  changeCompanyAddress,
  changeCompanyName,
  changeEmail,
  changeTelephoneNumber,
} from "@/features/reducers/buyers/buyersReducer";
import { RootState } from "@/app/store/store";

const BuyerInformationPage = () => {
  const buyerState = useSelector((state: RootState) => state.buyer);
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
          <h5 className="">Nama Perusahaan</h5>
          <input
            type="text"
            placeholder="Masukan nama perusahaan"
            onChange={(e) => {
              dispatch(changeCompanyName(e.target.value));
            }}
            value={buyerState.companyName}
            className={clsx("w-100 px-4 p-3 form-control-md form-control")}
          />
          <h5 className="text-muted mt-2 mb-8">Nama perusahaan buyer</h5>
          <h5 className="">Negara</h5>
          <AsyncPaginate
            isSearchable={true}
            onChange={(e) => {
              handleChangeCountry(e?.value as number);
            }}
            loadOptions={loadOptions}
          ></AsyncPaginate>
          <h5 className="text-muted mt-2 mb-8">Pilih negara Asal buyer</h5>
          <h5 className="">Alamat Perusahaan</h5>
          <input
            type="text"
            placeholder="Masukan alamat perusahaan"
            onChange={(e) => {
              dispatch(changeCompanyAddress(e.target.value));
            }}
            value={buyerState.companyAddress}
            className={clsx("w-100 px-4 p-3 form-control-md form-control")}
          />
          <h5 className="text-muted mt-2 mb-8">Alamat perusahaan buyer</h5>
          <h5 className="">E-mail Buyer</h5>
          <input
            type="text"
            placeholder="Masukan email"
            onChange={(e) => {
              dispatch(changeEmail(e.target.value));
            }}
            value={buyerState.email}
            className={clsx("w-100 px-4 p-3 form-control-md form-control")}
          />
          <h5 className="text-muted mt-2 mb-8">E-mail buyer</h5>
          <h5 className="">No. Telepon</h5>
          <input
            type="number"
            placeholder="Masukan nomor telepon"
            onChange={(e) => {
              dispatch(changeTelephoneNumber(e.target.value));
            }}
            value={buyerState.telephoneNumber}
            className={clsx("w-100 px-4 p-3 form-control-md form-control")}
          />
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
