import { NotificationFindOneQuery } from "@/app/service/graphql/gen/graphql";
import useDetailNotifViewModel, { breadcrumbs } from "./DetailNotif-view-model";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody } from "@/_metronic/helpers";

const DetailNotif = ({
  id,
  data,
}: {
  id: string | string[] | undefined;
  data: NotificationFindOneQuery | undefined;
}) => {
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Notifikasi</PageTitle>

      <KTCard>
        <KTCardBody>
          <h3 className="mb-5">Detail Notifikasi</h3>
          <h5 className="">Notifikasi</h5>
          <h1 className="my-4">{data?.notificationFindOne?.title}</h1>
          <h5 className="mt-5">Konten</h5>
          <div className="my-2">
            <div dangerouslySetInnerHTML={{ __html: data?.notificationFindOne?.content as string }} />
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default DetailNotif;
