import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import ProfilePage from "@/templates/Admin/Member/Detail/Profile";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const DetailProfileMember: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ProfileHeader  id={id}/>
      <ProfilePage />
    </>
  );
};

export default DetailProfileMember;
