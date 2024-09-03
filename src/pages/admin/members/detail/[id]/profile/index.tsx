import { useUserFindOneQuery } from "@/app/service/graphql/gen/graphql";
import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import ProfilePage from "@/templates/Admin/Member/Detail/Profile";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailProfileMember: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useUserFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.userFindOne && (
        <>
          <ProfileHeader id={id} data={data.userFindOne} />
          <ProfilePage data={data.userFindOne} />
        </>
      )}
    </>
  );
};

export default DetailProfileMember;
