import { NextPage } from "next";

import AsideAffiliateLayout from "@/components/layouts/Aside/Affiliators/AffiliatorsAside";
import CouponAffiliation from "@/templates/Admin/Affiliators/AddNewCoupon/Affiliation";

const AffiliationPage: NextPage = () => {
  return (
    <AsideAffiliateLayout>
      <CouponAffiliation />
    </AsideAffiliateLayout>
  );
};

export default AffiliationPage;