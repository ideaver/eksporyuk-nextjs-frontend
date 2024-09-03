import { useRouter } from "next/router";

import { useUserFindOneQuery } from "@/app/service/graphql/gen/graphql";
import ProfileHeader from "@/components/layouts/Header/Member/ProfileHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import InfoRekening from "@/templates/Admin/Member/Detail/InfoRekening";

const InfoRekeningPage = () => {
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
          <InfoRekening data={data.userFindOne} />
        </>
      )}
    </>
  )
}

export default InfoRekeningPage;
