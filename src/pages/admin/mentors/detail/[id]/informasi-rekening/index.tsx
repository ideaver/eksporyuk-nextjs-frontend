import { useRouter } from "next/router";

import { useMentorFindOneQuery } from "@/app/service/graphql/gen/graphql";
import Mentorheader from "@/components/layouts/Header/Mentor/MentorHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import InfoRekening from "@/templates/Admin/Mentor/CreateOrEdit/InfoRekening";

const InfoRekeningPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useMentorFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}

      {data?.mentorFindOne && (
        <>
          <Mentorheader id={id} data={data} />
          <InfoRekening data={data} />
        </>
      )}
    </>
  );
}

export default InfoRekeningPage;
