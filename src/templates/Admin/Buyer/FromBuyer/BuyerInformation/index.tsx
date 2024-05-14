import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import useBuyerInformationViewModel, {
  useCountryDropdown,
} from "./buyerInformation-view-model";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { AsyncPaginate } from "react-select-async-paginate";

const BuyerInformationPage = () => {
  const {
    inputBuyerName,
    setInputBuyerName,
    inputCompanyAddress,
    setInputCompanyAddress,
    inputCompanyName,
    setInputCompanyName,
    inputCountry,
    setInputCountry,
    inputEmail,
    setInputEmail,
    inputTelephoneNumber,
    setInputTelephoneNumber,
  } = useBuyerInformationViewModel();

  const { loadOptions } = useCountryDropdown();

  return (
    <KTCard>
      <KTCardBody>
        <h3 className="mb-5">Informasi Buyer</h3>
        <h5 className="required">Nama Buyer</h5>
        <TextField
          placeholder="Masukan nama buyer"
          props={{
            value: inputBuyerName,
            onChange: setInputBuyerName,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">Nama lengkap buyer</h5>
        <h5 className="required">Nama Perusahaan</h5>
        <TextField
          placeholder="Masukan Nama perusahaan buyer"
          props={{
            value: inputCompanyName,
            onChange: setInputCompanyName,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">Nama perusahaan buyer</h5>
        <h5 className="required">Negara</h5>
        {/* <TextField
          props={{
            value: inputCountry,
            onChange: setInputCountry,
          }}
        /> */}
        <AsyncPaginate
          isSearchable={true}
          loadOptions={loadOptions}
        ></AsyncPaginate>
        <h5 className="text-muted mt-2 mb-8">Pilih negara Asal buyer</h5>
        <h5 className="required">Alamat Perusahaan</h5>
        <Textarea
          placeholder="Masukan alamat perusahaan buyer"
          classNames="min-h-125px"
          props={{
            value: inputCompanyAddress,
            onChange: setInputCompanyAddress,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">Alamat perusahaan buyer</h5>
        <h5 className="">E-mail Buyer</h5>
        <TextField
          placeholder="Masukan e-mail buyer"
          props={{
            value: inputEmail,
            onChange: setInputEmail,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">E-mail buyer</h5>
        <h5 className="">No. Telepon</h5>
        <TextField
          placeholder="Masukan no. telepon"
          props={{
            value: inputTelephoneNumber,
            onChange: setInputTelephoneNumber,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">No. telepon buyer</h5>
      </KTCardBody>
    </KTCard>
  );
};
export default BuyerInformationPage;
