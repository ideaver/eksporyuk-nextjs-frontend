import { ChangeEvent, useMemo } from "react";
import useEditNewsViewModel, {
  IEditNews,
  breadcrumbs,
} from "./EditNews-view-model";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PageTitle } from "@/_metronic/layout/core";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import clsx from "clsx";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { NewsTypeEnum } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import "react-quill/dist/quill.snow.css";

const EditNews = ({ id, data }: IEditNews) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const {
    handleUpdateFile,
    isLoadingNews,
    newsForm,
    title,
    setTitle,
    type,
    setType,
    content,
    image,
    setImage,
    setContent,
  } = useEditNewsViewModel({ data, id });

  const router = useRouter();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit News</PageTitle>
      <LoadingOverlayWrapper
        active={isLoadingNews}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(255, 255, 255, 0.8)",
          }),
          spinner: (base) => ({
            ...base,
            width: "100px",
            "& svg circle": {
              stroke: "rgba(3, 0, 0, 1)",
            },
          }),
        }}
        spinner
      >
        <form onSubmit={newsForm.handleSubmit}>
          <div className="row gx-8">
            <Aside
              // formToggle={formToogle}
              // handleCategoryChange={handleCategoryChange}
              // category={category}
              thumbnail={image}
              handleFileChange={handleUpdateFile}
              // handleStatusChange={handleStatusChange}
              // status={status}
            />
            <div className={"col-lg-8"}>
              <KTCard className="">
                <KTCardBody>
                  <h3 className="mb-5">Edit News</h3>

                  <h5 className="required">Judul</h5>
                  <TextField
                    placeholder="Masukan judul news"
                    classNames={clsx(
                      {
                        "is-invalid":
                          newsForm.touched.titleNews &&
                          newsForm.errors.titleNews,
                      },
                      {
                        "is-valid":
                          newsForm.touched.titleNews &&
                          !newsForm.errors.titleNews,
                      }
                    )}
                    props={{
                      ...newsForm.getFieldProps("titleNews"),
                      value: newsForm.values.titleNews,
                      onChange: (e: any) => {
                        newsForm.setFieldValue("titleNews", e.target.value);
                        setTitle(e.target.value);
                      },
                    }}
                  />
                  {newsForm.touched.titleNews && newsForm.errors.titleNews && (
                    <div className="fv-plugins-message-container">
                      <span role="alert">{newsForm.errors.titleNews}</span>
                    </div>
                  )}
                  <h5 className="text-muted mt-3">Masukan judul</h5>

                  <h5>Tipe</h5>
                  <Dropdown
                    value={type}
                    options={[
                      {
                        value: NewsTypeEnum.Headline,
                        label: "Headline",
                      },
                      {
                        value: NewsTypeEnum.Opinion,
                        label: "Opinion",
                      },
                      {
                        value: NewsTypeEnum.Feature,
                        label: "Feature",
                      },
                    ]}
                    onValueChange={(val) => {
                      setType(val as NewsTypeEnum);
                    }}
                  />
                  <h5 className="text-muted mt-3 mb-5">Pilih Tipe</h5>

                  <h5 className=" mt-5">Konten </h5>
                  <div
                    style={{
                      height: "220px",
                    }}
                  >
                    <ReactQuill
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          [
                            "link",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["clean"],
                        ],
                      }}
                      theme="snow"
                      value={content}
                      style={{ height: "70%" }}
                      onChange={(e) => {
                        setContent(e);
                      }}
                    />
                  </div>

                  <h5 className="text-muted mt-3">Masukan konten</h5>
                </KTCardBody>
              </KTCard>

              <div className="d-flex flex-end mt-6 gap-4">
                <Buttons
                  buttonColor="secondary"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Batal
                </Buttons>
                <Buttons type="submit" disabled={!newsForm.isValid.valueOf()}>
                  Simpan
                </Buttons>
              </div>
            </div>
          </div>
        </form>
      </LoadingOverlayWrapper>
    </>
  );
};

const Aside = ({
  thumbnail,
  //   category,
  //   handleCategoryChange,
  handleFileChange,
}: //   handleStatusChange,
//   formToggle,
{
  thumbnail: any;
  //   category: TypeCategory[];
  //   handleCategoryChange: (e: TypeCategory[]) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  //   formToggle: string;
}) => {
  return (
    <div className="col-lg-4">
      <KTCard>
        <KTCardBody className="d-flex flex-column">
          <h3>Thumbnail</h3>

          <input
            type="file"
            onChange={handleFileChange}
            className="d-none"
            accept=".jpg, .jpeg, .png"
            id="thumbnail-input"
          />
          <label
            htmlFor="thumbnail-input"
            className="card shadow align-self-center mt-5"
            style={{
              maxWidth: 150,
            }}
          >
            <div
              className="border-0 px-2 py-1 bg-white shadow position-absolute top-0 end-0 rounded-circle"
              style={{ transform: "translate(50%, -50%)" }}
            >
              <KTIcon iconName="pencil" />
            </div>
            <div className="card-body">
              <img
                src={thumbnail ?? "/media/svg/files/blank-image.svg"}
                alt=""
                className="img-fluid rounded object-fit-cover"
              />
            </div>
          </label>
          <p className="text-muted fw-bold text-center mt-5">
            Format gambar yang diterima adalah .jpg, .jpeg dan .png
          </p>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

export default EditNews;
