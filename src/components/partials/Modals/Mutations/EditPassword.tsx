import { KTIcon } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { useUserUpdateOneMutation } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { ChangeEvent, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

interface IEditPassword {
  show: boolean;
  isLoading: boolean;
  userId?: string;
  error?: any;
  handleClose: () => void;
  //   handleSubmit: () => void;
}

const EditPasswordModal = ({
  show,
  handleClose,
  userId,
}: //   handleSubmit
IEditPassword) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previousPassword, setPreviousPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const [userUpdateOne] = useUserUpdateOneMutation();
  const handleUpdatePassword = async () => {
    setIsLoading(true);
    try {
      if (!previousPassword || !confirmPassword || !newPassword) {
        setErrorMessage("Isi Field Yang Diperlukan");
        setIsLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage("Konfirmasi Password Tidak Cocok");
        setIsLoading(false);
        return;
      }
      const response = await userUpdateOne({
        variables: {
          where: {
            id: userId,
            password: {
              equals: previousPassword,
            },
          },
          data: {
            password: { set: newPassword },
          },
        },
      });
      Swal.fire({
        title: "Berhasil",
        text: "User password diupdate",
        icon: "success",
      });
      setErrorMessage("");
      setPreviousPassword("");
      setNewPassword("");
      setConfirmPassword("");
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Password Sebelumnya Salah!");
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Modal enforceFocus={false} show={show} centered={true} size="lg">
      <div className="modal-header">
        <h2>Ubah Password</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={() => {
            setErrorMessage("");
            setPreviousPassword("");
            setNewPassword("");
            setConfirmPassword("");
            handleClose();
          }}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>
      <div className="modal-body">
        <h5 className="text-center text-danger">{errorMessage}</h5>
        <h5 className="text-muted mt-5">Password Sebelumnya</h5>
        <TextField
          placeholder="Masukan password sebelumnya"
          props={{
            value: previousPassword,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setPreviousPassword(e.target.value),
          }}
        ></TextField>
        <h5 className="text-muted mt-10">Password Baru</h5>
        <TextField
          placeholder="Masukan Password"
          props={{
            value: newPassword,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value),
          }}
        ></TextField>
        <h5 className="text-muted mt-5">Konfirmasi Password Baru</h5>
        <TextField
          placeholder="Masukan Password"
          props={{
            value: confirmPassword,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value),
          }}
        ></TextField>
        <div className="modal-footer justify-content-center mt-5 pb-0">
          <Buttons
            buttonColor="secondary"
            classNames="btn-lg"
            onClick={() => {
              setErrorMessage("");
              setPreviousPassword("");
              setNewPassword("");
              setConfirmPassword("");
              handleClose();
            }}
          >
            Batal
          </Buttons>
          {isLoading ? (
            <Buttons buttonColor="primary" classNames="btn-lg">
              <Spinner />
            </Buttons>
          ) : (
            <Buttons
              buttonColor="primary"
              disabled={!previousPassword || !confirmPassword || !newPassword}
              classNames="btn-lg"
              onClick={async () => {
                await handleUpdatePassword();
              }}
            >
              Ubah
            </Buttons>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
