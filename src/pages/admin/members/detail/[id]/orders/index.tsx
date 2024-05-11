import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import OrderPage from "@/templates/Admin/Member/Detail/Order";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailOrderMember: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ProfileHeader id={id} />
      <OrderPage />
    </>
  );
};

export default DetailOrderMember;
