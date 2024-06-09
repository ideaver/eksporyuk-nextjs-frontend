import { useMaterialPromotionPlatformFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditMaterialPromotion from "@/templates/Admin/Article/CreateOrEdit/EditMaterialPromotion";
import DetailMaterialPromotion from "@/templates/Admin/Article/DetailMaterialPromotion";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailMaterialPromotionPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useMaterialPromotionPlatformFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.materialPromotionPlatformFindOne && (
        <EditMaterialPromotion id={id} data={data} />
      )}
    </>
  );
};

export default DetailMaterialPromotionPage;
