import { Modal } from "react-bootstrap";

import { Buttons } from "@/stories/molecules/Buttons/Buttons";

import { KTIcon } from "@/_metronic/helpers";
import useKuponAffiliasiViewModel from "../Detail/KuponAffiliasi/KuponAffiliasi-view-model";

interface deleteCouponModal {
  show: boolean;
  handleClose: () => void;
  couponId: number;
}

const DeleteCouponModal = ({ show, handleClose, couponId }: deleteCouponModal) => {
  const { onDelete } = useKuponAffiliasiViewModel();

  return (
    <Modal show={show} centered={true}>
      <div className="modal-header">
        <h2>Hapus Akun</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        <h5 className="text-center">Apakah anda yakin untuk menghapus kupon ini?</h5>
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
          onClick={() => onDelete(couponId)}
        >
          Iya
        </Buttons>
      </div>
    </Modal>
  )
}

export default DeleteCouponModal
