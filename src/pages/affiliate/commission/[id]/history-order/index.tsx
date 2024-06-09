import React from "react";
import { NextPage } from "next";
import OrderHistory from "@/templates/Affiliate/Commission/Detail/OrderHistory";
import AffiliateHeader from "@/components/layouts/TabBar/AffiliateHeader";
import { useRouter } from "next/router";

const HistoryorderPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AffiliateHeader urlType="commission" id={id} />
      <OrderHistory />
    </>
  );
};

export default HistoryorderPage;
