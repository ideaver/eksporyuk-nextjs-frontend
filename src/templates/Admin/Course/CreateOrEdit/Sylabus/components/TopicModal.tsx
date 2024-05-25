import { KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { ILessonTopic } from "@/types/contents/products/ILessonData";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { createPortal } from "react-dom";
type Props = {
  show: boolean;
  isEdit?: ILessonTopic;
  handleClose: () => void;
  handleSubmit: (value: ILessonTopic) => void;
};

let modalsRoot: any = "";

const TopicModal = ({ show, isEdit, handleClose, handleSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (isEdit) {
      setTitle(isEdit.title);
      setDescription(isEdit.description);
    }
  }, [isEdit]);
  if (typeof window !== "undefined") {
    modalsRoot = document.getElementById("root-modals") || document.body;
  }

  return createPortal(
    <Modal
      id="kt_modal_create_topic"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
      show={show}
      onHide={handleClose}
    >
      <div className="modal-header">
        <h2>Tambah Topik</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </div>

      <div className="modal-body">
        <h5 className="required">Judul Topik</h5>
        <TextField
          placeholder="Masukkan Judul Topik"
          props={{
            value: title,
            onChange: (e: any) => setTitle(e.target.value),
          }}
        ></TextField>
        <h5 className="mt-5">Deskripsi</h5>
        <Textarea
          rows={5}
          props={{
            value: description,
            onChange: (e: any) => setDescription(e.target.value),
          }}
        ></Textarea>
      </div>

      <div className="mt-10 m-10 mx-auto">
        <div className="d-flex">
          <button
            className="btn btn-secondary btn-active-primary px-6 me-4"
            onClick={handleClose}
          >
            Batal
          </button>
          <button
            className="btn btn-primary btn-active-primary px-6"
            onClick={() =>
              handleSubmit({
                id: isEdit != null ? isEdit.id : Math.random().toString(36).substring(2),
                title: title,
                description: description,
              })
            }
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export default TopicModal;
