import { Modal } from "react-bootstrap";

import { Buttons } from "@/stories/molecules/Buttons/Buttons";

import { KTIcon } from "@/_metronic/helpers";
import useNotificationsViewModel from "../Notifications-view-model";

interface withdrawalRequestModal {
  show: boolean;
  handleClose: () => void;
  action: string;
  affiliatorId: string;
}

const WithdrawalRequestModal = ({
  show,
  handleClose,
  action,
  affiliatorId,
}: withdrawalRequestModal) => {
  // const { onDelete, onDeleteMany } = useNotificationsViewModel();

  return (
    <Modal show={show} centered={true}>
      <div className="modal-header">
        <h2>Permintaan Withdrawal</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        <h5 className="text-center">
          Apakah anda yakin untuk {action === "approve" ? "Approve" : "Reject"}{" "}
          permintaan withdrawal ini?
        </h5>
      </div>

      <div className="modal-footer mx-auto">
        <Buttons buttonColor={action === "approve" ? "success" : "danger"} classNames="btn-lg" onClick={() => {}}>
          Iya
        </Buttons>
        <Buttons
          buttonColor="secondary"
          classNames="btn-lg"
          onClick={handleClose}
        >
          Batal
        </Buttons>
      </div>
    </Modal>
  );
};

export default WithdrawalRequestModal;
