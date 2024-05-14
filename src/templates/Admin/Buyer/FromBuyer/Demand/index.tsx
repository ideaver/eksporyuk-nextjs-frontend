import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import useDemandViewModel from "./Demand-view-model";

const DemandPage = () => {
  const {
    inputDemand,
    setInputDemand,
    inputDemandQuantity,
    setInputDemandQuantity,
    inputShippingTerms,
    setInputShippingTerms,
    inputDestinationPort,
    setInputDestinationPort,
  } = useDemandViewModel();
  return (
    <KTCard>
      <KTCardBody>
        <h3 className="mb-5">Informasi Demand</h3>
        <h5 className="required">Demand/Permintaan</h5>
        <TextField
          placeholder="Masukan demand/permintaan"
          props={{
            value: inputDemand,
            onChange: setInputDemand,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">
          Komoditas yang diinginkan buyer
        </h5>
        <h5 className="required">Quantity Required</h5>
        <TextField
          placeholder="Masukan quantity required"
          props={{
            value: inputDemandQuantity,
            onChange: setInputDemandQuantity,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">
          Jumlah komoditas yang dibutuhkan buyer
        </h5>
        <h5 className="required">Shipping Terms</h5>
        <TextField
          props={{
            value: inputShippingTerms,
            onChange: setInputShippingTerms,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">
          Shipping terms yang ditentukan buyer
        </h5>
        <h5 className="required">Destination Port</h5>
        <TextField
          placeholder="Masukan quantity required"
          props={{
            value: inputDestinationPort,
            onChange: setInputDestinationPort,
          }}
        />
        <h5 className="text-muted mt-2 mb-8">
          Tujuan akhir dari dikirimkannya komoditas dari pelabuhan lainnya
        </h5>
      </KTCardBody>
    </KTCard>
  );
};
export default DemandPage;
