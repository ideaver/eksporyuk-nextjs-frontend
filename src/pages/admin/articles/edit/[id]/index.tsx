import { NextPage } from "next";
import EditArticle from "@/templates/Admin/Article/CreateOrEdit/EditArticle/index";
import { useRouter } from "next/router";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import { useArticleFindOneQuery } from "@/app/service/graphql/gen/graphql";

const EditArticlePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useArticleFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.articleFindOne && <EditArticle id={id} data={data} />}
    </>
  );
};

export default EditArticlePage;
