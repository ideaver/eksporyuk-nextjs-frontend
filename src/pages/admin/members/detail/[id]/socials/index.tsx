import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import SocialPage from "@/templates/Admin/Member/Detail/Social";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailSocialMember: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ProfileHeader id={id} />
      <SocialPage />
    </>
  );
};

export default DetailSocialMember;
