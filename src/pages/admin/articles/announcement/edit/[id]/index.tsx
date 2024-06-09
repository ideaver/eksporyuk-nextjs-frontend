import { useAnnouncementFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditAnnouncement from "@/templates/Admin/Article/CreateOrEdit/EditAnnouncement";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditAnnouncementPage: NextPage = () => {
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
      {data?.announcementFindOne && <EditAnnouncement id={id} data={data} />}
    </>
  );
};

export default EditAnnouncementPage;
