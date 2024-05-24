import { useFeedbackFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import FeedbackDetail from "@/templates/Admin/Feedback/Detail";
import { NextPage } from "next";
import { useRouter } from "next/router";
const FeedbackDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error, refetch } = useFeedbackFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });

  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.feedbackFindOne && (
        <FeedbackDetail id={id} data={data} refetch={refetch} />
      )}
    </>
  );
};

export default FeedbackDetailPage;
