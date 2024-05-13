import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import DetailOrder from "@/templates/Admin/Order/Detail/DetailOrder";
import AdminOrderLayout from "@/components/layouts/TabBar/Admin/Order/AdminOrderHeader";

const DetailOrderPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AdminOrderLayout urlType="orders" id={id} />
      <DetailOrder orderId={id as string} />
    </>
  );
};

export default DetailOrderPage;
