import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";

import {
  useTransactionFindOneQuery,
  useTransactionUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
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
  const router = useRouter();

  const { data, loading, error } = useTransactionFindOneQuery({
    variables: {
      where: {
        id: id as number,
      },
    },
  });

  const [updateTransaction] = useTransactionUpdateOneMutation();
  const [status, setStatus] = useState<string | undefined>(
    data?.transactionFindOne?.status
  );
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    setStatus(data?.transactionFindOne?.status)
  }, [data?.transactionFindOne?.status])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateTransaction({
        variables: {
          data: { status: { set: status as TransactionStatusEnum } },
          where: { id: id as number },
        },
      });
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

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
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Ubah Status
              </label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="PROCESSING">Di Proses</option>
                <option value="PENDING">Tertunda</option>
                <option value="FAILED">Gagal</option>
                <option value="CANCELLED">Dibatalkan</option>
                <option value="COMPLETED">Lunas</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailComissionModal;
