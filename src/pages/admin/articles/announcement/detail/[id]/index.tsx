import { useAnnouncementFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import DetailAnnouncement from "@/templates/Admin/Article/DetailAnnouncement";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailAnnouncementPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useAnnouncementFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.announcementFindOne && <DetailAnnouncement id={id} data={data} />}
    </>
  );
};

export default DetailAnnouncementPage;
