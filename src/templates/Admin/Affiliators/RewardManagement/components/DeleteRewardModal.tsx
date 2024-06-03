import { Modal } from "react-bootstrap";

import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTIcon } from "@/_metronic/helpers";

import useRewardManagementViewModel from "../RewardManagement-view-model";

interface deleteRewardModal {
  show: boolean;
  handleClose: () => void;
  rewardId: number;
  rewardIds: number[];
}

const DeleteRewardModal = ({ show, handleClose, rewardId, rewardIds }: deleteRewardModal) => {
  const { onDeleteOne, onDeleteMany } = useRewardManagementViewModel();

  return (
    <Modal show={show} centered={true}>
      <div className="modal-header">
        <h2>Hapus {rewardIds.length > 1 ? "Semua" : undefined} Reward</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        <h5 className="text-center">Apakah anda yakin untuk menghapus {rewardIds.length > 1 ? "semua" : undefined} reward ini?</h5>
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
            if (rewardIds.length !== 0) {
              onDeleteMany(rewardIds);
            } else {
              onDeleteOne(rewardId);
            }
          }}
        >
          Iya
        </Buttons>
      </div>
    </Modal>
  );
}

export default DeleteRewardModal;
