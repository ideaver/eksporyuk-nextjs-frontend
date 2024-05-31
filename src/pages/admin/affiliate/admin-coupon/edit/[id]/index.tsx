import { useCouponFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditCoupon from "@/templates/Admin/Affiliators/AdminCoupon/EditCoupon";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditCouponPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useCouponFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.couponFindOne && <EditCoupon id={id} data={data} />}
    </>
  );
};

export default EditCouponPage;
