import { useRouter } from "next/router";

import { useStudentFindOneQuery } from "@/app/service/graphql/gen/graphql";
import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import ProfilePage from "@/templates/Admin/Member/Detail/Profile";
import InfoRekening from "@/templates/Admin/Member/Detail/InfoRekening";

const InfoRekeningPage = () => {
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
          <InfoRekening data={data} />
        </>
      )}
    </>
  )
}

export default InfoRekeningPage;
