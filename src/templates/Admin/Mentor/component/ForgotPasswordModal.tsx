import { KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Modal } from "react-bootstrap";
interface IForgotPasswordModal {
  show: boolean;
  isLoading: boolean;
  error?: any;
  handleClose: () => void;
  handleSubmit: () => void;
}
const ForgotPasswordModal = ({
  handleClose,
  handleSubmit,
  isLoading,
  error,
  show,
}: IForgotPasswordModal) => {
  return (
    <Modal show={show} centered={true} >
      <div className="modal-header">
        <h2>Lupa Password</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5>Loading...</h5>
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5>{error.message}</h5>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h5>Kirim Email untuk lupa password akun ini?</h5>
          </div>
        )}
      </div>

      <div className="modal-footer mx-auto">
        <Buttons buttonColor="secondary" classNames="btn-lg" onClick={handleClose}>
          Batal
        </Buttons>
        <Buttons buttonColor="primary" classNames="btn-lg" onClick={handleSubmit}>
          Kirim
        </Buttons>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
