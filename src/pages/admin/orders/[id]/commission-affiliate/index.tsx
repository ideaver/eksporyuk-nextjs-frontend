import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CommissionAffiliate from "@/templates/Admin/Order/Detail/CommissionAffiliate";
import AdminOrderLayout from "@/components/layouts/TabBar/Admin/Order/AdminOrderHeader";

const CommissionAffiliatePage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AdminOrderLayout urlType="orders" id={id} />
      <CommissionAffiliate />
    </>
  );
};

export default CommissionAffiliatePage;
