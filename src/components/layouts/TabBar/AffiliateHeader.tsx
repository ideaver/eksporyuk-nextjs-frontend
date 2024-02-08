import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useAffiliateHeaderViewModel, {
  IAffiliateHeaderViewModel,
} from "./AffiliateHeader-view-model";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { KTIcon } from "@/_metronic/helpers";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";

const AffiliateLayout = ({ urlType, id }: IAffiliateHeaderViewModel) => {
  const { urls, handleFollupChange, selectedFollupValue, follupValues } =
    useAffiliateHeaderViewModel({ urlType, id });
  const router = useRouter();

  return (
    <div className="d-flex justify-content-between">
      <TabLink className="mb-10" links={urls} />
      <div>
        <Buttons
          icon="left"
          buttonColor="secondary"
          classNames="me-5 p-3 pe-2"
          showIcon={true}
          onClick={() => router.back()}
        />
        <Buttons
          buttonColor="secondary"
          classNames="fw-bold"
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
  );
};

export default AffiliateLayout;
