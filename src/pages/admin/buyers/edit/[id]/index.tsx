import { useBuyerFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditBuyer from "@/templates/Admin/Buyer/FromBuyer/Edit";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditBuyerPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useBuyerFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      <>
        {data == null && <LoadingUI error={error?.message} loading={loading} />}
        {data?.buyerFindOne && <EditBuyer id={id} data={data} />}
      </>
    </>
  );
};

export default EditBuyerPage;
