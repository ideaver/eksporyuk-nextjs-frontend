import { QueryResult } from "@apollo/client";
import { useState } from "react";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { Badge } from "@/stories/atoms/Badge/Badge";

import {
  TransactionFindManyQuery,
  TransactionStatusEnum,
} from "@/app/service/graphql/gen/graphql";
import DetailComissionModal from "../../../Commission/components/DetailComissionModal";
import { formatToIDR } from "../../../Commission/Comission-view-model";

const RiwayatKomisi = ({
  data,
}: {
  data: QueryResult<TransactionFindManyQuery>;
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [commisionId, setComissionId] = useState(0);

  return (
    <>
      <DetailComissionModal
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        id={commisionId}
      />
      <div className="card mb-5 mb-xl-10 p-2" id="kt_profile_details_view">
        {data.error ? (
          <div className="d-flex justify-content-center align-items-center h-500px flex-column">
            <h3 className="text-center">{data.error.message}</h3>
          </div>
        ) : data.loading ? (
          <div className="d-flex justify-content-center align-items-center h-500px">
            <h3 className="text-center">Loading....</h3>
          </div>
        ) : (
          <KTTable utilityGY={3}>
            <KTTableHead>
              <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
              <th className="fw-bold text-muted min-w-100px">Nama Order</th>
              <th className="fw-bold text-muted text-end min-w-80px">
                Pembeli
              </th>
              <th className="fw-bold text-muted text-end min-w-150px">
                Affiliator
              </th>
              <th className="fw-bold text-muted text-end min-w-150px">
                Total Komisi
              </th>
              <th className="fw-bold text-muted text-end min-w-100px">
                STATUS
              </th>
            </KTTableHead>

            {data.data?.transactionFindMany?.map((user, index) => {
              const statusMap: { [key: string]: string } = {
                PENDING: "Tertunda",
                PROCESSING: "Di Proses",
                COMPLETED: "Lunas",
                CANCELLED: "Dibatalkan",
                FAILED: "Gagal",
              };

              return (
                <KTTableBody key={index}>
                  <td className="fw-bold">
                    {user.payment?.invoice?.uniqueCode}
                  </td>
                  <td
                    className="fw-bold text-dark text-hover-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowDetailModal(true);
                      setComissionId(user.id);
                    }}
                  >
                    {user.payment?.invoice?.paymentForGateway?.bill_title}
                  </td>
                  <td className="fw-bold text-muted text-end">
                    {user.payment?.invoice?.paymentForGateway?.sender_name}
                  </td>
                  <td className="fw-bold text-muted text-end">
                    {user.toAccount?.user.name ?? "-"}
                  </td>
                  <td className="fw-bold text-muted text-end">
                    {formatToIDR(
                      String(user.payment?.invoice?.paymentForGateway?.amount)
                    )}
                  </td>
                  <td className="text-end">
                    <Badge
                      label={statusMap[user.status || ""]}
                      badgeColor={
                        user.status === TransactionStatusEnum.Completed
                          ? "success"
                          : user.status === TransactionStatusEnum.Cancelled
                          ? "danger"
                          : "warning"
                      }
                    />
                  </td>
                </KTTableBody>
              );
            })}
          </KTTable>
        )}
      </div>
    </>
  );
};

export default RiwayatKomisi;
