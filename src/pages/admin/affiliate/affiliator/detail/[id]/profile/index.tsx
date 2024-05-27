import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  useAffiliatorFindOneQuery,
} from "@/app/service/graphql/gen/graphql";
import AffiliatorHeader from "@/components/layouts/Header/Affiliator/AffiliatorHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import AffiliatorProfilePage from "@/templates/Admin/Affiliators/AffiliatorManagement/Detail/Profile";

const DetailProfileAffiliator: NextPage = () => {
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
      {data == null && <LoadingUI error={error?.message} loading={loading} />}

      {data?.affiliatorFindOne && (
        <>
          <AffiliatorHeader id={id} data={data} />
          <AffiliatorProfilePage data={data} />
        </>
      )}
    </>
  );
};

export default DetailProfileAffiliator;
