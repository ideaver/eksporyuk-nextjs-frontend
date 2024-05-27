import { useRouter } from "next/router";

import { useNotificationFindOneQuery } from "@/app/service/graphql/gen/graphql";

import LoadingUI from "@/components/partials/Handler/LoadingUI";
import DetailNotif from "@/templates/Admin/Notifications/Detail";

const  DetailNotificationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Retrieve data
  const { data, error, loading } = useNotificationFindOneQuery({
    variables: {
      where: {
        id: Number(id),
      }
    }
  })

  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.notificationFindOne && <DetailNotif id={id} data={data} />}
    </>
  )
}

export default DetailNotificationPage;
