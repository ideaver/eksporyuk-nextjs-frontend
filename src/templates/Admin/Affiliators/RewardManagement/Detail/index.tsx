import { RewardsCatalogFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { breadcrumbs } from "./DetailReward-view-model";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { dateFormatter } from "../../AffiliatorManagement/Affiliator-view-model";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";

const DetailReward = ({
  data,
}: {
  data: RewardsCatalogFindOneQuery | undefined;
}) => {
  console.log(data?.rewardsCatalogFindOne?.createdAt);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Reward</PageTitle>
      <KTCard>
        <KTCardBody>
          <h2 className="mb-5">Detail Reward</h2>
          <div className="mb-5">
            <h4 className="">Reward</h4>
            {data?.rewardsCatalogFindOne?.title && (
              <p className="fw-bold fs-5 pt-2">
              Saldo {formatCurrency(Number(data?.rewardsCatalogFindOne?.title))}
            </p>
            )}
            {data?.rewardsCatalogFindOne?.course?.title && (
              <p className="fw-bold fs-5 pt-2">
              {data?.rewardsCatalogFindOne?.course?.title}
            </p>
            )}
            {/* <p className="fw-bold fs-5 pt-2">
              {data?.rewardsCatalogFindOne?.title || data?.rewardsCatalogFindOne?.course?.title}
            </p> */}
          </div>
          <div className="mb-5">
            <h4 className="">Deskripsi Reward</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.rewardsCatalogFindOne?.description as string,
              }}
            />
          </div>
          <div className="mb-5">
            <h4 className="">Poin yang dibutuhkan</h4>
            <p className="fw-bold fs-5 pt-2">
              {data?.rewardsCatalogFindOne?.pointsRequired}
            </p>
          </div>
          <div className="mb-5">
            <h4 className="">Waktu berakhir</h4>
            <p className="fw-bold fs-5 pt-2">
              {formatDate(data?.rewardsCatalogFindOne?.endSales) ?? "-"}
            </p>
          </div>
          <div className="mb-5">
            <h4 className="">Dibuat oleh:</h4>
            <p className="fw-bold fs-5 pt-2">
              {data?.rewardsCatalogFindOne?.createdBy.user.name ?? "Unknown User"}
            </p>
          </div>
          {/* <div className="mb-5">
            <h4 className="">Course yang terhubung</h4>
            <p className="fw-bold fs-5 pt-2">
              {data?.rewardsCatalogFindOne?.course?.title ?? "Tidak ada course"}
            </p>
          </div> */}
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default DetailReward;
