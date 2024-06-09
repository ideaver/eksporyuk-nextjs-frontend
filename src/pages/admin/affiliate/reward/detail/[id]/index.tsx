import { NextPage } from "next";
import { useRouter } from "next/router";

import DetailArticle from "@/templates/Admin/Article/Detail";
import DetailReward from "@/templates/Admin/Affiliators/RewardManagement/Detail";
import { useArticleFindOneQuery, useRewardsCatalogFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";

const DetailRewardPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useRewardsCatalogFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });

  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.rewardsCatalogFindOne && <DetailReward data={data} />}
    </>
  );
};

export default DetailRewardPage;