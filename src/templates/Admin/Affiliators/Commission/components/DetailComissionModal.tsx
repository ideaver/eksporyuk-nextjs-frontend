import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import {
  TransactionStatusEnum,
  usePendingCommissionFindOneeQuery,
  useTransactionFindOneQuery,
  useTransactionUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { formatToIDR } from "../Comission-view-model";

import { KTIcon } from "@/_metronic/helpers";

const statusMap: { [key: string]: string } = {
  PENDING: "Tertunda",
  PROCESSING: "Di Proses",
  COMPLETED: "Lunas",
  CANCELLED: "Dibatalkan",
  FAILED: "Gagal",
};

const DetailComissionModal = ({ show, onClose, id, commPendingId }: any) => {
  const router = useRouter();

  // Komisi berhasil
  const { data, loading, error } = useTransactionFindOneQuery({
    variables: {
      where: {
        id: id as number,
      },
    },
  });

  // Komisi pending
  const {
    data: commPendingData,
    loading: commPendingLoading,
    error: commPendingError,
  } = usePendingCommissionFindOneeQuery({
    variables: {
      pendingCommissionFindOneArgs: {
        where: {
          id: commPendingId,
        },
      },
    },
  });

  console.log(commPendingData);

  const [updateTransaction] = useTransactionUpdateOneMutation();
  const [status, setStatus] = useState<string | undefined>(
    data?.transactionFindOne?.status
  );
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    setStatus(data?.transactionFindOne?.status);
  }, [data?.transactionFindOne?.status]);

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
        <h2>
          Detail Order {data?.transactionFindOne?.payment?.invoice?.uniqueCode}
        </h2>
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
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Tanggal
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {formatDate(data?.transactionFindOne?.createdAt)}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Nama Pembeli
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {
                  data?.transactionFindOne?.payment?.invoice?.paymentForGateway
                    ?.sender_name
                }
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Kontak
            </label>
            <div className="col-lg-8 d-flex gap-2 align-items-center">
              <span
                className="fw-bolder fs-6 badge text-white"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-phone-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {
                  data?.transactionFindOne?.payment?.invoice?.order
                    ?.createdByUser.phone?.phoneNumber
                }
              </span>
              <span
                className="fw-bolder fs-6 badge text-white"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-envelope-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {
                  data?.transactionFindOne?.payment?.invoice?.order
                    ?.createdByUser.email
                }
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Produk
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {
                  data?.transactionFindOne?.payment?.invoice?.paymentForGateway
                    ?.bill_title
                }
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Total
            </label>

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
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Affiliasi
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark me-2">
                {data?.transactionFindOne?.toAccount?.user.name ?? "-"}
              </span>
              <span
                className="fw-bolder fs-6 badge text-white me-2"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-phone-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {data?.transactionFindOne?.toAccount?.user?.phoneId ?? "-"}
              </span>
              <span
                className="fw-bolder fs-6 badge text-white"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-envelope-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {data?.transactionFindOne?.toAccount?.user?.email ?? "-"}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary mb-0">
              Status
            </label>

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
        {/* <Modal.Footer className="p-2">
          <form onSubmit={handleSubmit} className="">
            <label htmlFor="status" className="form-label">
              Ubah Status
            </label>
            <div className="d-flex align-items-center gap-2">
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal.Footer> */}
      </Modal.Body>
    </Modal>
  );
};

export default DetailComissionModal;
