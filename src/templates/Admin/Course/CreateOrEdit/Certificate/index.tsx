import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { CourseLevelEnum } from "@/app/service/graphql/gen/graphql";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import CurrencyInput from "react-currency-input-field";

const CertificatePage = ({}) => {
  return (
    <>
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Pengaturan Harga</h3>
          <h5 className="mt-5 text-muted">Pilih Sertifikat</h5>
         
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default CertificatePage;
