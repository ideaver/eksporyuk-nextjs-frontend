import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { CardInfo } from "@/stories/molecules/Cards/CardInfo/CardInfo";

const CommissionAffiliate = ({}) => {
  return (
    <>
      <KTCard>
        <KTCardBody>
          <h3 className="card-title mb-10">Komisi Affiliasi</h3>
          <div className="row gy-5">
            <div className="col-lg-4">
              <CardInfo
                className="h-100"
                title="Tier"
                icon="abstract-14"
                description="1 (Satu)"
                iconColor="primary"
                showBorder={true}
              ></CardInfo>
            </div>
            <div className="col-lg-4">
              <CardInfo
                className="h-100"
                title="Total Komisi"
                icon="bill"
                description="Rp 300.000"
                iconColor="primary"
                showBorder={true}
              ></CardInfo>
            </div>
            <div className="col-lg-4">
              <CardInfo
                className="h-100"
                title="Status"
                icon="notification-circle"
                iconColor="primary"
                showBorder={true}
                badgeText="Sudah Dibayar"
                badgeColor="success"
              ></CardInfo>
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default CommissionAffiliate;
