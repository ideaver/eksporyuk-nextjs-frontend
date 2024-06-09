import { NextPage } from "next";
import DetailArticle from "@/templates/Admin/Article/Detail";
import { useRouter } from "next/router";
import { useArticleFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";

const DetailArticlePage: NextPage = () => {
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
      {data?.articleFindOne && <DetailArticle id={id} data={data} />}
    </>
  );
};

export default DetailArticlePage;
