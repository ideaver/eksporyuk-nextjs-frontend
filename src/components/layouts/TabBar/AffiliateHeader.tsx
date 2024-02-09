import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useAffiliateHeaderViewModel, {
  IAffiliateHeaderViewModel,
} from "./AffiliateHeader-view-model";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { OrderCard } from "@/stories/molecules/Cards/OrderCard/OrderCard";
import { PageTitle } from "@/_metronic/layout/core";

const AffiliateLayout = ({ urlType, id }: IAffiliateHeaderViewModel) => {
  const {
    urls,
    handleFollupChange,
    selectedFollupValue,
    follupValues,
    orderTableDatas,
    breadcrumbs
  } = useAffiliateHeaderViewModel({ urlType, id });
  const router = useRouter();

  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Order Affiliasi</PageTitle>
      <div className="d-lg-flex justify-content-between mb-5">
        <TabLink className="mb-10" links={urls} />
        <div className="mb-5 mb-lg-0 d-sm-flex d-lg-block">
          <Buttons
            icon="left"
            buttonColor="secondary"
            classNames="me-5 p-3 pe-2"
            showIcon={true}
            onClick={() => router.back()}
          />
          <Buttons
            buttonColor="secondary"
            classNames="fw-bold w-100 w-lg-auto mt-5 mt-lg-0"
            data-bs-toggle="modal"
            data-bs-target="#kt_follup_modal"
          >
            Kirim Follow-Up
          </Buttons>
        </div>
        <FollowUpModal
          follupValues={follupValues}
          selectedFollupValue={selectedFollupValue}
          handleFollupChange={handleFollupChange}
        />
      </div>
      <div className="row gy-5 mb-5">
        {orderTableDatas.map((data, index) => (
          <div className="col-lg-4" key={index}>
            <OrderCard className="h-100" data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateLayout;
