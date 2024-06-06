import { useRouter } from "next/router";

import AffiliatorHeader from "@/components/layouts/Header/Affiliator/AffiliatorHeader";

import InfoRekening from "@/templates/Admin/Affiliators/AffiliatorManagement/Detail/InfoRekening";
import { useAffiliatorFindOneQuery } from "@/app/service/graphql/gen/graphql";

const InfoRekeningPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useAffiliatorFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });

  return (
    <>
      <AffiliatorHeader id={id} data={data} />
      <InfoRekening data={data} />
    </>
  );
};

export default InfoRekeningPage;
