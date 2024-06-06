import { Modal } from "react-bootstrap";

import { KTIcon } from "@/_metronic/helpers";

const DetailComissionModal = ({ show, onClose, id }: any) => {
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
        <h1>test {id}</h1>
      </Modal.Body>
    </Modal>
  )
};

export default DetailComissionModal;
