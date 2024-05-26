import { Modal } from "react-bootstrap";

import { Buttons } from "@/stories/molecules/Buttons/Buttons";

import { KTIcon } from "@/_metronic/helpers";
import useKuponAffiliasiViewModel from "../Detail/KuponAffiliasi/KuponAffiliasi-view-model";

interface deleteCouponModal {
  show: boolean;
  handleClose: () => void;
  couponId: number;
  couponIds: number[];
}

const DeleteCouponModal = ({ show, handleClose, couponId, couponIds }: deleteCouponModal) => {
  const { onDelete, onDeleteMany } = useKuponAffiliasiViewModel();

  return (
    <Modal show={show} centered={true}>
      <div className="modal-header">
        <h2>Hapus {couponIds.length > 1 ? "Semua" : undefined} Kupon</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        <h5 className="text-center">Apakah anda yakin untuk menghapus {couponIds.length > 1 ? "semua" : undefined} kupon ini?</h5>
      </div>

      <div className="modal-footer mx-auto">
      <Buttons
          buttonColor="secondary"
          classNames="btn-lg"
          onClick={handleClose}
        >
          Batal
        </Buttons>
        <Buttons
          buttonColor="danger"
          classNames="btn-lg"
          onClick={() => {
            if (couponIds.length !== 0) {
              onDeleteMany(couponIds);
            } else {
              onDelete(couponId);
            }
          }}
        >
          Iya
        </Buttons>
      </div>
    </Modal>
  )
}

export default DeleteCouponModal
