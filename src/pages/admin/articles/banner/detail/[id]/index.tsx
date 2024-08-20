import { useBannerFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import DetailBanner from "@/templates/Admin/Article/DetailBanner";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailBannerPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useBannerFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.bannerFindOne && <DetailBanner id={id} data={data} />}
    </>
  );
};

export default DetailBannerPage;
