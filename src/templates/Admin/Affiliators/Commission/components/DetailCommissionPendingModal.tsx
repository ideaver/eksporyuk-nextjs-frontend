import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";

import {
  PendingCommissionFindOneQuery,
  usePendingCommissionFindOneeQuery,
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

const DetailCommissionPendingModal = ({ show, onClose, id }: any) => {
  const router = useRouter();

  console.log(id);

  // Komisi pending
  const pendingCommission = usePendingCommissionFindOneeQuery({
    variables: {
      pendingCommissionFindOneArgs: {
        where: {
          id: id,
        },
      },
    },
  });

  // console.log(pendingCommission?.data);
  // @ts-ignore
  const data: PendingCommissionFindOneQuery =
    pendingCommission?.data?.pendingCommissionFindOne;

  console.log(pendingCommission?.data);

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
          Detail Order{" "}
          {data?.order?.invoices?.[0].payment?.invoice?.uniqueCode ?? "-"}
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
                {formatDate(data?.order?.createdAt)}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Nama Pembeli
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {data?.order?.createdByUser?.name}
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
                {data?.order?.createdByUser?.phone?.phoneNumber}
              </span>
              <span
                className="fw-bolder fs-6 badge text-white"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-envelope-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {data?.order?.createdByUser?.email}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Produk
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {data?.productName}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Total
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {formatToIDR(String(data?.amountCommission))}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary">
              Affiliasi
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark me-2">
                {data?.order?.createdByUser.affiliator?.user.name ?? "-"}
              </span>
              <span
                className="fw-bolder fs-6 badge text-white me-2"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-phone-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {data?.order?.createdByUser.affiliator?.user.phone
                  ?.phoneNumber ?? "-"}
              </span>
              <span
                className="fw-bolder fs-6 badge text-white"
                style={{ backgroundColor: "gray" }}
              >
                <i
                  className="bi bi-envelope-fill me-2"
                  style={{ fontSize: "16px", color: "white" }}
                ></i>
                {data?.order?.createdByUser.affiliator?.user.email ?? "-"}
              </span>
            </div>
          </div>
          <div className="row mb-7 align-items-center">
            <label className="col-lg-2 fw-bold text-white badge text-bg-primary mb-0">
              Status
            </label>

            <div className="col-lg-8">
              <Badge label="Pending" badgeColor="warning" />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailCommissionPendingModal;
