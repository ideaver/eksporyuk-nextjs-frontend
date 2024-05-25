import { KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { ChangeEvent, useState } from "react";
import { Modal } from "react-bootstrap";
interface IDeleteUserModal {
  show: boolean;
  isLoading: boolean;
  error?: any;
  handleClose: () => void;
  handleSubmit: (reason: string) => void;
}
const DeleteUserModal = ({
  handleClose,
  handleSubmit,
  isLoading,
  error,
  show,
}: IDeleteUserModal) => {
  const [confirm, setConfirm] = useState("");
  const [deleteReason, setDeleteReason] = useState("");

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
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5>Loading...</h5>
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5>{error.message}</h5>
          </div>
        ) : (
          <div className="d-flex justify-content-center flex-column">
            <h5 className="text-center">
              Apakah anda yakin untuk menghapus akun ini? ketik{" "}
              <span className="text-danger fw-bold">Konfirmasi</span> untuk
              melanjutkan
            </h5>
            <TextField
              classNames="mt-5"
              props={{
                value: confirm,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setConfirm(e.target.value),
              }}
            ></TextField>
            {confirm !== "" && confirm !== "Konfirmasi" && (
              <small className="text-danger">Konfirmasi tidak cocok</small>
            )}
            <h5 className="text-muted mt-5">Alasan menghapus Akun</h5>
            <Textarea
              props={{
                value: deleteReason,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setDeleteReason(e.target.value),
              }}
            ></Textarea>
          </div>
        )}
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
          buttonColor="primary"
          classNames="btn-lg"
          onClick={() => confirm === "Konfirmasi" && handleSubmit(deleteReason)}
        >
          Kirim
        </Buttons>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
