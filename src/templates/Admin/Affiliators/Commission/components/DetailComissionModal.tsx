import { Modal } from "react-bootstrap";

import { useTransactionFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { formatToIDR } from "../Comission-view-model";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { TransactionStatusEnum } from "@/app/service/graphql/gen/graphql";

import { KTIcon } from "@/_metronic/helpers";

const statusMap: { [key: string]: string } = {
  PENDING: "Tertunda",
  PROCESSING: "Di Proses",
  COMPLETED: "Lunas",
  CANCELLED: "Dibatalkan",
  FAILED: "Gagal",
};

const DetailComissionModal = ({ show, onClose, id }: any) => {
  const { data, loading, error } = useTransactionFindOneQuery({
    variables: {
      where: {
        id: id as number,
      },
    },
  });

  return (
    <Modal
      show={show}
      size="lg"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered"
      scrollable={true}
      centered={true}
    >
      <Modal.Header>
        <h2>Detail Komisi</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">
          <div className="row mb-7">
            <label className="col-lg-2 fw-bold text-muted">Tanggal</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {formatDate(data?.transactionFindOne?.createdAt)}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-2 fw-bold text-muted">Nama Pembeli</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {
                  data?.transactionFindOne?.payment?.invoice?.paymentForGateway
                    ?.sender_name
                }
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-2 fw-bold text-muted">Produk</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {
                  data?.transactionFindOne?.payment?.invoice?.paymentForGateway
                    ?.bill_title
                }
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-2 fw-bold text-muted">Total</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {formatToIDR(
                  String(
                    data?.transactionFindOne?.payment?.invoice
                      ?.paymentForGateway?.amount
                  )
                )}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-2 fw-bold text-muted">Affiliasi</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {data?.transactionFindOne?.payment?.invoice?.order
                  ?.createdByUser?.affiliator?.user.name ?? "-"}
              </span>
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-2 fw-bold text-muted mb-0">Status</label>

            <div className="col-lg-8">
              <Badge
                label={statusMap[data?.transactionFindOne?.status || ""]}
                badgeColor={
                  data?.transactionFindOne?.status ===
                  TransactionStatusEnum.Completed
                    ? "success"
                    : data?.transactionFindOne?.status ===
                      TransactionStatusEnum.Cancelled
                    ? "danger"
                    : "warning"
                }
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailComissionModal;
