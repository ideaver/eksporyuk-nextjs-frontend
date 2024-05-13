import AdminOrderLayout from "@/components/layouts/TabBar/Admin/Order/AdminOrderHeader";
import OrderHistory from "@/templates/Admin/Order/Detail/OrderHistory";
import { NextPage } from "next";
import { useRouter } from "next/router";

const HistoryOrderPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  return (
    <>
      <AdminOrderLayout urlType="orders" id={id} />
      <OrderHistory />
    </>
  );
};

export default HistoryOrderPage;
