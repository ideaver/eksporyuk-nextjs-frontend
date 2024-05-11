import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import CoursePage from "@/templates/Admin/Member/Detail/Course";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailCourseMember: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ProfileHeader id={id} />
      <CoursePage />
    </>
  );
};

export default DetailCourseMember;
