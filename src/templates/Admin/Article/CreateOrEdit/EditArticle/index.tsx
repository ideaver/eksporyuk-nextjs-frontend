import { PageTitle } from "@/_metronic/layout/core";
import useEditArticleViewModel, {
  IEditArticle,
  breadcrumbs,
} from "./EditArticle-view-model";
import { AsyncPaginate } from "react-select-async-paginate";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useCategoriesDropdown } from "../../Article-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { ChangeEvent, useMemo } from "react";
import { useCategoryForm } from "../Information/Information-view-model";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import clsx from "clsx";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const EditArticle = ({ id, data }: IEditArticle) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const {
    setContent,
    setTitle,
    status,
    setStatus,
    category,
    setCategory,
    formik,
    thumbnail,
    editedThumbnail,
    handleUpdateFile,
    handleArticleUpdateOne,
    isLoading,
  } = useEditArticleViewModel({ data, id });

  const router = useRouter();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Article</PageTitle>
      <LoadingOverlayWrapper
        active={isLoading}
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
        <form onSubmit={formik.handleSubmit}>
          <div className="row gx-8">
            <Aside
              handleFileChange={handleUpdateFile}
              status={status}
              handleCategoryChange={setCategory}
              category={category ?? [{ value: 0, label: "kategori nol" }]}
              handleStatusChange={setStatus}
              thumbnail={thumbnail}
              editedThumbnail={editedThumbnail}
            />
            <div className="col-lg-8">
              <KTCard className="">
                <KTCardBody>
                  <h3 className="mb-5">Tulis Artikel</h3>
                  <h5 className="required">Judul Artikel</h5>
                  <TextField
                    placeholder="Masukan judul artikel"
                    classNames={clsx(
                      {
                        "is-invalid":
                          formik.touched.title && formik.errors.title,
                      },
                      {
                        "is-valid":
                          formik.touched.title && !formik.errors.title,
                      }
                    )}
                    props={{
                      ...formik.getFieldProps("title"),
                      value: formik.values.title,
                      onChange: (e: any) => {
                        formik.setFieldValue("title", e.target.value);
                        setTitle(e.target.value);
                      },
                    }}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="fv-plugins-message-container">
                      <span role="alert">{formik.errors.title}</span>
                    </div>
                  )}
                  <h5 className="text-muted mt-3">Edit judul artikel</h5>
                  <h5 className="required mt-5">Konten Artikel</h5>
                  <div>
                    <ReactQuill
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          [
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
                      className={clsx(
                        {
                          "is-invalid":
                            formik.touched.content && formik.errors.content,
                        },
                        {
                          "is-valid":
                            formik.touched.content && !formik.errors.content,
                        }
                      )}
                      theme="snow"
                      value={formik.values.content}
                      onChange={(e) => {
                        formik.setFieldValue("content", e);
                        setContent(e);
                      }}
                    />
                  </div>
                  {formik.touched.content && formik.errors.content && (
                    <div className="fv-plugins-message-container">
                      <span role="alert">{formik.errors.content}</span>
                    </div>
                  )}
                  <h5 className="text-muted mt-3">Edit konten artikel</h5>
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
                <Buttons type="submit" onClick={handleArticleUpdateOne}>
                  Simpan
                </Buttons>
              </div>
            </div>
          </div>
        </form>
      </LoadingOverlayWrapper>

      <AddCategoryModal />
    </>
  );
};

const Aside = ({
  status,
  handleCategoryChange,
  category,
  handleStatusChange,
  thumbnail,
  handleFileChange,
  editedThumbnail,
}: {
  thumbnail:
    | {
        __typename?: "File" | undefined;
        path: string;
      }
    | undefined;
  status: string;
  editedThumbnail: string | null | undefined;
  category: { value: any; label: any }[];
  handleCategoryChange: (e: { value: any; label: any }[] | undefined) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (e: string) => void;
}) => {
  const { loadOptions } = useCategoriesDropdown();
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
                src={
                  editedThumbnail
                    ? editedThumbnail
                    : thumbnail?.path ?? "/media/svg/files/blank-image.svg"
                }
                alt="thumbnail"
                className="img-fluid rounded object-fit-cover"
              />
            </div>
          </label>
          <p className="text-muted fw-bold text-center mt-5">
            Format gambar yang diterima adalah .jpg, .jpeg dan .png
          </p>
        </KTCardBody>
      </KTCard>
      <KTCard className="mt-5">
        <KTCardBody className="d-flex flex-column">
          <h3 className="mb-5">Kategori</h3>
          <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
            {category?.map((e: any, index) => (
              <Buttons
                key={e.value + index}
                classNames="fit-content"
                icon="cross"
                buttonColor="secondary"
                showIcon
                onClick={() => {
                  handleCategoryChange(
                    category.filter((v) => v.value !== e.value)
                  );
                }}
              >
                <span>{e?.label}</span>
              </Buttons>
            ))}
          </div>

          <AsyncPaginate
            className="min-w-200px"
            loadOptions={loadOptions}
            onChange={(value) => {
              handleCategoryChange([
                ...category,
                value as { label: any; value: any },
              ]);
            }}
          ></AsyncPaginate>
          <p className="text-muted fw-bold mt-5">Atur Kategori</p>
          <Buttons
            showIcon={true}
            mode="light"
            data-bs-toggle="modal"
            data-bs-target="#kt_add_category_modal"
            classNames="mt-5 text-start"
          >
            Tambah Kategori
          </Buttons>
        </KTCardBody>
      </KTCard>
      <KTCard className="mt-5">
        <KTCardBody className="d-flex flex-column">
          <h3 className="mb-5">Status</h3>
          <Dropdown
            options={[
              { value: "published", label: "Published" },
              { value: "private", label: "Private" },
            ]}
            value={status}
            onValueChange={(value) => {
              handleStatusChange(value as string);
            }}
          ></Dropdown>
          <p className="text-muted fw-bold mt-5">Atur Status</p>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

const AddCategoryModal = () => {
  const { formik, response } = useCategoryForm();
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <KTModal
          dataBsTarget="kt_add_category_modal"
          title="Tambah Kategori"
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
            <Buttons data-bs-dismiss="modal" classNames="fw-bold" type="submit">
              Tambah
            </Buttons>
          }
          footerContentCentered
          modalSize="lg"
        >
          <h5 className="required">Nama Kategori</h5>
          <TextField
            placeholder="Masukkan Nama Kategori"
            classNames={clsx(
              {
                "is-invalid":
                  formik.touched.categoryName && formik.errors.categoryName,
              },
              {
                "is-valid":
                  formik.touched.categoryName && !formik.errors.categoryName,
              }
            )}
            props={{
              ...formik.getFieldProps("categoryName"),
            }}
          ></TextField>
          {formik.touched.categoryName && formik.errors.categoryName && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.categoryName}</span>
            </div>
          )}
        </KTModal>
      </form>
    </div>
  );
};

export default EditArticle;
