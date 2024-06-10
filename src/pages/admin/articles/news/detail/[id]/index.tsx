import { useNewsFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import DetailNews from "@/templates/Admin/Article/DetailNews";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailNewsPage: NextPage = () => {
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
      {data?.newsFindOne && <DetailNews id={id} data={data} />}
    </>
  );
};

export default DetailNewsPage;
