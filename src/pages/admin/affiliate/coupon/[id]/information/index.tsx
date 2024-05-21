import { NextPage } from "next";

import AsideAffiliateLayout from "@/components/layouts/Aside/Affiliators/AffiliatorsAside";
import CouponInformation from "@/templates/Admin/Affiliators/AddNewCoupon/Information";

const InformationPage: NextPage = () => {
  return (
    <AsideAffiliateLayout>
      <CouponInformation />
    </AsideAffiliateLayout>
  );
};

export default InformationPage;
