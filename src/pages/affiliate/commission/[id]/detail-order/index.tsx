import React from "react";
import { NextPage } from "next";
import DetailOrder from "@/templates/Affiliate/Commission/Detail/DetailOrder";
import AffiliateHeader from "@/components/layouts/TabBar/AffiliateHeader";
import { useRouter } from "next/router";

const DetailOrderPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AffiliateHeader urlType="commission" id={id} />
      <DetailOrder orderId={id as string} />
    </>
  );
};

export default DetailOrderPage;
