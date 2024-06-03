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

  const stringToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr?.[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type: mime});
  };


  useEffect(() => {
    setLessonContent(data.content.content);
  }, [data.content.content]);

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
          <h5 className="mt-5">
            {data.lessonType === "Video" ? "Url Video" : "Pilih File PDF"}
          </h5>
          {data.lessonType === "Video" ? (
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
                      ...data.content,
                      videoUrl: e.target.value,
                    },
                  }),
              }}
            />
          ) : (
            <div>
              <input
                type="file"
                className="form-control form-control-lg form-control-solid"
                name="file"
                accept=".pdf"
                onChange={async (e)  => {
                  const res =  await fileToString(e.target.files![0])
                  updateData({
                    ...data,
                    content: {
                      ...data.content,
                      file: res,
                    },
                  });
                }}
              />
              {
                "file" in data.content && (data.content as ILessonPDFContent).file != null  && (
                  <a className="mt-5 btn btn-primary" href={URL.createObjectURL(fileToBlob(stringToFile((data.content as ILessonPDFContent).file, "file.pdf")))} target="_blank">Lihat File</a>
                )
              }
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
