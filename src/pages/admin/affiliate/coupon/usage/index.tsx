import { NextPage } from "next";

import AsideAffiliateLayout from "@/components/layouts/Aside/Affiliators/AffiliatorsAside";
import CouponUsage from "@/templates/Admin/Affiliators/AddNewCoupon/Usage";

const UsagePage: NextPage = () => {
  return (
    <AsideAffiliateLayout>
      <CouponUsage />
    </AsideAffiliateLayout>
  );
};

export default UsagePage;