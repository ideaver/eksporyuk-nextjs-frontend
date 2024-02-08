import React from "react";
import { NextPage } from "next";
import AffiliateHeader from "@/components/layouts/TabBar/AffiliateHeader";
import CommissionAffiliate from "@/templates/Affiliate/Commission/Detail/CommissionAffiliate";
import { useRouter } from "next/router";

const CommissionAffiliatePage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AffiliateHeader urlType="commission" id={id} />
      <CommissionAffiliate />
    </>
  );
};

export default CommissionAffiliatePage;
