import React from "react";
import { NextPage } from "next";
import OrderHistory from "@/templates/Affiliate/Order/Detail/OrderHistory";
import AffiliateHeader from "@/components/layouts/TabBar/AffiliateHeader";
import { useRouter } from "next/router";

const HistoryOrderPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AffiliateHeader urlType="order" id={id} />
      <OrderHistory />
    </>
  );
};

export default HistoryOrderPage;
