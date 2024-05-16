import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import useDemandViewModel from "./Demand-view-model";
import CurrencyInput from "react-currency-input-field";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";

const DemandPage = () => {
  const {
    inputDemand,
    setInputDemand,
    inputDemandQuantity,
    setInputDemandQuantity,
    price,
    handleChangePrice,
    abbreviation,
    handleChangeAbbreviation,
    shippingTerms,
    handleChangeShippingTerms,
    shippingOption,
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
        <h5 className="required">Satuan</h5>
        <Dropdown
          value={abbreviation}
          options={[
            { value: "Ton", label: "Ton" },
            { value: "Kg", label: "Kg" },
            { value: "Pcs", label: "Ton" },
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
          className="form-control"
          id="price-field"
          name="price"
          placeholder="Masukan Harga (Rp)"
          intlConfig={{ locale: "id-ID" }}
          defaultValue={0}
          value={price}
          decimalsLimit={2}
          onValueChange={(value, name, values) =>
            handleChangePrice(value ?? "")
          }
        />
        <h5 className="text-muted mt-2 mb-8">
          Jumlah harga yang dibutuhkan buyer
        </h5>
        <h5 className="required">Shipping Terms</h5>
        <Dropdown
          value={shippingTerms}
          options={shippingOption}
          onValueChange={(value) =>
            handleChangeShippingTerms(
              value as InternationalTradeDeliveryTypeEnum
            )
          }
        ></Dropdown>
        <h5 className="text-muted mt-2 mb-8">
          Jumlah komoditas yang dibutuhkan buyer
        </h5>
      </KTCardBody>
    </KTCard>
  );
};
export default DemandPage;
