import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import {
  ILessonPDFContent,
  ILessonVideoContent,
  StepProps,
} from "@/types/contents/products/ILessonData";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

const Step2 = ({ data, updateData, hasError }: StepProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [lessonContent, setLessonContent] = useState<string>(
    data.content.content
  );
  const [lessonPdf, setLessonPdf] = useState<string>(
    (data.content as ILessonPDFContent).file
  );

  const fileToBlob = (file?: File) => {
    return new Blob([file ?? ""], { type: file?.type });
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
      console.error("Error converting string to file: ", error);
      return null;
    }
  };

  useEffect(() => {
    setLessonContent(data.content.content);
    const pdfFile = stringToFile(
      (data.content as ILessonPDFContent).file,
      (data.content as ILessonPDFContent).fileName
    );
    if (pdfFile !== null) {
      setLessonPdf(URL.createObjectURL(fileToBlob(pdfFile)));
    } else {
      setLessonPdf((data.content as ILessonPDFContent).file);
    }
  }, [data.content]);

  const getFileName = (data: any) => {
    try {
      return new URL((data.content as ILessonPDFContent).fileName).pathname.split("/").pop();
    } catch (e) {
      return (data.content as ILessonPDFContent).fileName;
    }
  };
  

  return (
    <>
      <div className="pb-5" data-kt-stepper-element="content">
        <div className="w-100">
          <h5>Konten Lesson</h5>
          <ReactQuill
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["clean"],
              ],
            }}
            value={lessonContent}
            onChange={(value, delta, source) => {
              setLessonContent(value);

              updateData({
                ...data,
                content:
                  data.lessonType == "Video"
                    ? {
                        ...data.content,
                        content: value,
                      }
                    : {
                        ...data.content,
                        content: value,
                      },
              });
            }}
            // style={{
            //   height: "70%",
            // }}
          />
          <h6 className="mt-3 text-muted">Masukkan Deskripsi Materi</h6>
          {data.lessonType === "Video" ? (
            <>
              <h5 className="mt-5">Durasi Video</h5>
              <TextField
                placeholder="Masukkan durasi video (menit)"
                type="number"
                props={{
                  value: (data.content as ILessonVideoContent).duration ,
                  onChange: (e: any) =>
                    updateData({
                      ...data,
                      content: {
                        ...(data.content as ILessonVideoContent),
                        duration: e.target.value,
                      },
                    }),
                }}
              ></TextField>
            </>
          ) : (
            <></>
          )}
          <h5 className="mt-5">
            {data.lessonType === "Video" ? "Url Video" : "Pilih File PDF"}
          </h5>
          {data.lessonType === "Video" ? (
            <>
              <Textarea
                props={{
                  value:
                    "videoUrl" in data.content
                      ? (data.content as ILessonVideoContent).videoUrl
                      : undefined,
                  onChange: (e: any) =>
                    updateData({
                      ...data,
                      content: {
                        ...(data.content as ILessonVideoContent),
                        videoUrl: e.target.value,
                      },
                    }),
                }}
              />
            </>
          ) : (
            <div>
              <input
                type="file"
                className="form-control form-control-lg form-control-solid"
                name="file"
                accept=".pdf"
                onChange={async (e) => {
                  const res = await fileToString(e.target.files![0]);
                  updateData({
                    ...data,
                    content: {
                      ...(data.content as ILessonPDFContent),
                      file: res,
                      fileName: e.target.files![0].name,
                    },
                  });
                }}
              />
              {"file" in data.content &&
                (data.content as ILessonPDFContent).file != null && (
                  <div className="d-flex align-items-center mt-5">
                    <a
                      className="btn btn-primary me-5"
                      href={lessonPdf}
                      target="_blank"
                    >
                      Lihat File
                    </a>
                    <p className="mb-0 pb-0">
                      {getFileName(data)}
                    </p>
                  </div>
                )}
            </div>
          )}
          {hasError && (
            <div className="fv-plugins-message-container">
              {(!data.content ||
                !("content" in data.content && !data.content.content)) && (
                <div
                  data-field="content"
                  data-validator="notEmpty"
                  className="fv-help-block"
                >
                  Konten Lesson diperlukan
                </div>
              )}
              {"videoUrl" in data.content &&
                !data.content.videoUrl &&
                data.lessonType != "PDF" && (
                  <div
                    data-field="videoUrl"
                    data-validator="notEmpty"
                    className="fv-help-block"
                  >
                    Video URL diperlukan
                  </div>
                )}
              {"file" in data.content &&
                !data.content.file &&
                data.lessonType != "Video" && (
                  <div
                    data-field="file"
                    data-validator="notEmpty"
                    className="fv-help-block"
                  >
                    File diperlukan
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Step2 };
