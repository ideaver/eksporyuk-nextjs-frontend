import { useStudentFindOneQuery } from "@/app/service/graphql/gen/graphql";
import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import SocialPage from "@/templates/Admin/Member/Detail/Social";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailSocialMember: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
 const { data, loading, error } = useStudentFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.studentFindOne && (
        <>
          <ProfileHeader id={id} data={data.studentFindOne} />
          <SocialPage data={data.studentFindOne} />
        </>
      )}
    </>
  );
};

export default DetailSocialMember;
