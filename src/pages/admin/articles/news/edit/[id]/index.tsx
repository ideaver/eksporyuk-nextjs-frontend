import { useNewsFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditNews from "@/templates/Admin/Article/CreateOrEdit/EditNews";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditNewsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useNewsFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.newsFindOne && <EditNews id={id} data={data} />}
    </>
  );
};

export default EditNewsPage;
