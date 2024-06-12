import { KTIcon } from "@/_metronic/helpers/components/KTIcon";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { IResourceData } from "@/types/contents/course/IResourceData";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  isEdit?: IResourceData;
  handleClose: () => void;
  handleSubmit: (value: IResourceData) => void;
};
interface UrlFile {
  fileUrl: string;
  fileName: string;
}
type FileIcons = {
  [key: string]: string;
  doc: string;
  docx: string;
  pdf: string;
  jpg: string;
  jpeg: string;
  png: string;
  svg: string;
  xml: string;
  ai: string;
  css: string;
  tif: string;
  xlsx: string;
  xls: string;
};

const ResourceModal = ({ show, isEdit, handleClose, handleSubmit }: Props) => {
  const [files, setFiles] = useState<File[] | UrlFile[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 10) {
      alert("You can only upload a maximum of 10 files");
      e.target.value = "";
    } else {
      setFiles(Array.from(e.target.files!));
    }
  };

  const handleDelete = (index: number) => {
    const fileToDelete = files[index];

    if (fileToDelete instanceof File) {
      const newFiles = (files as File[]).filter((_, i) => i !== index);
      setFiles(newFiles);
    } else {
      const newFiles = (
        files as { fileUrl: string; fileName: string }[]
      ).filter((_, i) => i !== index);
      setFiles(newFiles);
    }
  };

  const handleView = (index: number) => {
    const file = files[index];
    if (file instanceof File) {
      if (!file) {
        console.error(`No file found at index ${index}`);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const url = e.target?.result;
        window.open(url as string, "_blank");
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file as File);
    } else {
      const file = (
        files as {
          fileUrl: string;
          fileName: string;
        }[]
      )[index];
      window.open(file.fileUrl, "_blank");
    }
  };
  const fileIcons: FileIcons = {
    doc: "doc.svg",
    docx: "doc.svg",
    pdf: "pdf.svg",
    jpg: "folder-document.svg",
    jpeg: "folder-document.svg",
    png: "folder-document.svg",
    svg: "folder-document.svg",
    xml: "xml.svg",
    ai: "ai.svg",
    css: "css.svg",
    tif: "tif.svg",
    xlsx: "xlsx.svg",
    xls: "xlsx.svg",
  };

  const fileToString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const stringToFile = (dataUrl: string, filename: string): File | null => {
    try {
      const arr = dataUrl.split(",");
      const mime = arr?.[0].match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      console.error("Invalid Base64 string:", error);
      return null;
    }
  };

  const handleReset = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
  };
  useEffect(() => {
    if (isEdit) {
      const files: File[] | UrlFile[] = [];
      isEdit.files?.forEach((file) => {
        const fileData = stringToFile(file.fileUrl, file.fileName);
        if (fileData) {
          (files as File[]).push(fileData);
        } else {
          (files as UrlFile[]).push(...(isEdit.files as unknown as UrlFile[]));
        }
      });
      setTitle(isEdit.title);
      setDescription(isEdit.description);
      setFiles(files);
    }
  }, [isEdit]);
  return (
    <Modal
      id="kt_modal_create_resource"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
      show={show}
      onHide={handleClose}
    >
      <div className="modal-header">
        <h2>Buat Resource</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </div>

      <div className="modal-body py-lg-10 px-lg-10">
        <h5 className="text-muted required">Judul</h5>
        <TextField
          props={{
            value: title,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value),
          }}
        ></TextField>
        <h5 className="text-muted mt-5 required">Deskripsi</h5>
        <Textarea
          rows={5}
          props={{
            value: description,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value),
          }}
        ></Textarea>
        <h5 className="text-muted mt-5">File</h5>
        {files.length === 0 ? (
          <div className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed mt-5">
            <div className="text d-flex">
              <KTIcon
                iconName="file-up"
                className="fs-2hx me-5 text-primary"
              ></KTIcon>
              <div className="title">
                <h6 className="mb-0">Pilih file untuk diupload</h6>
                <p className="mt-1 text-muted fw-bold mb-0">
                  File yang diupload dapat berformat PDF, Gambar, dan Spreadsheet. Maksimal 10 file
                </p>
              </div>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFilesChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="btn btn-primary">
              Pilih File
            </label>
          </div>
        ) : (
          <div className="row mt-5  gy-5">
            {files.map((file, index) => {
              let fileName: string;
              let fileExtension: string | undefined;

              if (file instanceof File) {
                fileName = file.name;
                fileExtension = fileName?.split(".").pop()?.toLowerCase();
              } else {
                const url = new URL(file.fileName);
                const pathParts = url.pathname.split("/");
                fileName = pathParts[pathParts.length - 1];
                fileExtension = fileName.split(".").pop()?.toLowerCase();
              }

              const iconFile =
                fileIcons[fileExtension as string] || "folder-document.svg";

              return (
                <div key={index} className="col">
                  <div className="card h-100 shadow pe-5 ps-5">
                    <img
                      src={`/media/svg/files/${iconFile}`}
                      className="card-img-top mt-5"
                      alt={fileName}
                      height={60}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{fileName}</h5>
                    </div>
                    <div className="card-footer">
                      <div className="btns-file d-flex justify-content-between gap-2 mt-5">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(index)}
                        >
                          Hapus
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleView(index)}
                        >
                          Lihat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="modal-footer mx-auto">
        <button className="btn btn-secondary" onClick={handleClose}>
          Batal
        </button>
        <button
          className="btn btn-primary"
          onClick={async () => {
            const filesString: (string | UrlFile)[] = [];

            for (let index = 0; index < files.length; index++) {
              if (files[index] instanceof File) {
                const res = await fileToString((files as File[])[index]);
                filesString.push(res);
              } else {
                filesString.push(files[index] as UrlFile);
              }
            }

            handleSubmit({
              id:
                isEdit != null
                  ? isEdit.id
                  : Math.random().toString(36).substr(2, 9),
              title: title,
              description: description,
              files: filesString.map((file, index) => {
                if (typeof file === "string") {
                  return {
                    fileUrl: file,
                    fileName: (files[index] as File).name,
                  };
                } else {
                  return file;
                }
              }),
            });
            handleReset();
          }}
        >
          Kirim
        </button>
      </div>
    </Modal>
  );
};

export default ResourceModal;
