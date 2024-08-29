import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

const UploadFileModal = ({
  handleSend,
  onImageUpload,
  errorMessage,
  loading = false,
}: {
  handleSend: (message: string) => Promise<void>;
  onImageUpload: (image: File) => void;
  errorMessage?: string;
  loading?: boolean;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      if (onImageUpload) {
        onImageUpload(file);
      }
    }
  };

  const imageUrl = image ? URL.createObjectURL(image) : null;

  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const labelRef = useRef<HTMLLabelElement | null>(null);

  const handleModalShown = () => {
    labelRef.current?.click();
  };

  useEffect(() => {
    const modalElement = modalContentRef.current?.closest(".modal");
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", handleModalShown);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", handleModalShown);
      }
    };
  }, []);

  return (
    <KTModal
      dataBsTarget="kt_upload_file"
      title="Upload Gambar"
      onClose={() => {
        setImage(null);
        setMessage("");
      }}
      fade
      modalCentered
      buttonClose={
        <Buttons
          buttonColor="secondary"
          data-bs-dismiss="modal"
          classNames="fw-bold"
        >
          Batal
        </Buttons>
      }
      buttonSubmit={
        loading ? (
          <Buttons classNames="fw-bold" onClick={async () => {}}>
            <Spinner />
          </Buttons>
        ) : (
          <Buttons
            //   data-bs-dismiss="modal"
            disabled={!image && message.length === 0}
            classNames="fw-bold"
            onClick={async () => {
              await handleSend(message);
            }}
          >
            Kirim
          </Buttons>
        )
      }
      footerContentCentered
      modalSize="lg"
    >
      <div ref={modalContentRef} className="text-center">
        <div className="ps-4">
          <div className="text-center text-danger fs-4">{errorMessage}</div>
          <div className="me-3">
            <label htmlFor="fileDoc">
              <img
                src={imageUrl ?? ""}
                alt=""
                style={{
                  maxWidth: "1000px",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </label>
          </div>
          <div className="relative">
            <input
              type="file"
              id="fileDoc"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label
              ref={labelRef}
              htmlFor="fileDoc"
              className="btn btn-primary w-fit m-5"
              style={{ display: image ? "none" : "block" }}
            >
              Select Image
            </label>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control form-control-flush mb-3"
            name=""
            id=""
            placeholder="Type a message"
          ></textarea>
        </div>
      </div>
    </KTModal>
  );
};

export default UploadFileModal;
