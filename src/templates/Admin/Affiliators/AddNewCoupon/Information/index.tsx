import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import useCouponInformationViewModel from "./CouponInformation-view-model";

const CouponInformation = () => {
  const {
    isFreeDelivery,
    setIsFreeDelivery,
    couponCode,
    setCouponCode,
    value,
    setValue,
    setEndDate,
    isActive,
    setIsActive,
    limitUsage,
    setLimitUsage,
    endDate
  } = useCouponInformationViewModel();

  return (
    <KTCard>
      <KTCardBody>
        <h2 className="pb-3">Informasi Kupon</h2>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField
            styleType="outline"
            size="medium"
            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
            props={{
              value: couponCode,
              onChange: setCouponCode,
            }}
          />
          <p className="fw-bold fs-6 text-muted">Nama/Kode Kupon</p>
        </div>
        <h4 className="required fw-bold text-gray-700">Besar Potongan</h4>
        <div className="d-flex">
          <div className="w-50 pe-3">
            <TextField
              classNames=""
              styleType="outline"
              size="medium"
              placeholder="ID, isi dengan identifikasi apapun"
              type="text"
              props={{
                value: value,
                onChange: setValue,
              }}
            />
          </div>
          <div className="w-50 ps-3">
            <Dropdown
              styleType="outline"
              props={{ id: "couponName" }}
              options={[
                { label: "Facebook", value: "akuisisi1" },
                { label: "Instagram", value: "akuisisi2" },
              ]}
              onValueChange={() => {}}
            />
          </div>
        </div>
        <p className="fw-bold fs-6 text-muted">
          Besar dan jenis potongan yang didapatkan
        </p>
        <div className="mt-6">
          <CheckBoxInput
            className=""
            name="value"
            value={"option1" || "option2"}
            checked={false}
            onChange={() => {}}
          >
            {`Sesuaikan Jumlah Potongan dengan Kuantitas Item`}
            <span className="fw-bold fs-6 text-muted pt-2">
              Apabila diaktifkan, maka besaran potongan akan menyesuaikan dengan
              jumlah produk yang dibeli
            </span>
          </CheckBoxInput>
        </div>
        <div className="mt-3">
          <CheckBoxInput
            className="active"
            name="free-delivery"
            value={"option1" || "option2"}
            checked={isFreeDelivery}
            onChange={setIsFreeDelivery}
          >
            {`Aktifkan Gratis Ongkir pada Item Ini agar pelanggan bisa menikmati pengiriman tanpa biaya tambahan`}
            <span className="fw-bold fs-6 text-muted pt-2">
              Apabila diaktifkan, maka pembeli tidak menanggung ongkos kirim
            </span>
          </CheckBoxInput>
        </div>
        <div className="pt-4">
          <h4 className="required fw-bold text-gray-700">
            Batas Jumlah Penggunaan
          </h4>
          <TextField
            styleType="outline"
            size="medium"
            placeholder="Berapa kali kupon ini dapat digunakan"
            type="text"
            props={{
              value: limitUsage,
              onChange: setLimitUsage,
            }}
          />
          <p className="fw-bold fs-6 text-muted">
            Masukkan 0 jika kupon ini dapat digunakan sampai berapa kalipun
          </p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">
            Batas Waktu Penggunaan
          </h4>
          <TextField
            styleType="outline"
            size="medium"
            placeholder="Pilih tanggal"
            type="date"
            props={{
              value: endDate,
              onChange: setEndDate,
            }}
          />
          <p className="fw-bold fs-6 text-muted">
            Masukkan 0 jika kupon ini dapat digunakan sampai kapanpun
          </p>
        </div>
      </KTCardBody>
    </KTCard>
  );
};

export default CouponInformation;
