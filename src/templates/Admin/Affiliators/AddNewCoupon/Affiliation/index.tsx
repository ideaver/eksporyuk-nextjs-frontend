import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";

const CouponAffiliation = () => {
  return (
    <KTCard>
      <KTCardBody>
        <h2 className="pb-3">Pengaturan Afiliasi</h2>

        <div className="mt-6">
          <CheckBoxInput
            className="active"
            name="follup"
            value={"option1" && "option2"}
            checked={false}
            onChange={() => {}}
          >
            {`Izinkan Affiliasi Menggunakan Kupon Ini`}
            <span className="fw-bold fs-6 text-muted pt-2">
              Apabila diaktifkan, maka affilasi dapat menggunakan kode ini dan
              membuat kode sendiri menggunakan kode ini
            </span>
          </CheckBoxInput>
        </div>
        <div className="pt-4">
          <h4 className="fw-bold text-gray-700">
            Batas Penggunaan Kupon oleh Affiliasi
          </h4>
          <TextField
            styleType="outline"
            size="medium"
            placeholder="Berapa kali kupon ini dapat digunakan sebagai base kupon affiliasi"
          />
          <p className="fw-bold fs-6 text-muted">
            Masukkan 0 jika kupon ini dapat digunakan berkali-kali oleh
            affiliasi
          </p>
        </div>
      </KTCardBody>
    </KTCard>
  );
};

export default CouponAffiliation;
