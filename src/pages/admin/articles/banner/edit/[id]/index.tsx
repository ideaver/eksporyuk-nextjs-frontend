import { useBannerFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditBanner from "@/templates/Admin/Article/CreateOrEdit/EditBanner";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditBannerPage: NextPage = () => {
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
      {data?.bannerFindOne && <EditBanner id={id} data={data} />}
    </>
  );
};

export default EditBannerPage;
