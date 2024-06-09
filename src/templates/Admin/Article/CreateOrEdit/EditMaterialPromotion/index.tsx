import { PageTitle } from "@/_metronic/layout/core";

import { AsyncPaginate } from "react-select-async-paginate";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useCategoriesDropdown } from "../../Article-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { ChangeEvent, useMemo } from "react";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import clsx from "clsx";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import useEditMaterialPromotionViewModel, {
  IEditMaterialPromotion,
  breadcrumbs,
} from "./EditMaterialPromotion-view-model";
import { MaterialPromotionPlatformTypeEnum } from "@/app/service/graphql/gen/graphql";

const EditMaterialPromotion = ({ id, data }: IEditMaterialPromotion) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const {
    isLoadingMaterialPromotion,
    materialPromotionForm,
    title,
    setTitle,
    type,
    setType,
    firstContent,
    setFirstComtent,
    secondContent,
    setSecondContent,
    video,
    setVideo,
    image,
    setImage,
    handleUpdateFile,
  } = useEditMaterialPromotionViewModel({ data, id });

  const router = useRouter();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Article</PageTitle>
      <LoadingOverlayWrapper
        active={isLoadingMaterialPromotion}
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
        <form onSubmit={materialPromotionForm.handleSubmit}>
          <div className="row gx-8">
            {type === MaterialPromotionPlatformTypeEnum.Material ? null : (
              <Aside
                // formToggle={formToogle}
                // handleCategoryChange={handleCategoryChange}
                // category={category}
                thumbnail={image}
                handleFileChange={handleUpdateFile}
                // handleStatusChange={handleStatusChange}
                // status={status}
              />
            )}
            <div
              className={
                type === MaterialPromotionPlatformTypeEnum.Banner
                  ? "col-lg-8"
                  : ""
              }
            >
              <KTCard className="">
                <KTCardBody>
                  <h3 className="mb-5">Tulis Material/Banner</h3>
                  <h5>Tipe</h5>
                  <Dropdown
                    value={type}
                    options={[
                      {
                        value: MaterialPromotionPlatformTypeEnum.Banner,
                        label: "Banner",
                      },
                      {
                        value: MaterialPromotionPlatformTypeEnum.Material,
                        label: "Material",
                      },
                    ]}
                    onValueChange={(val) => {
                      setType(val as MaterialPromotionPlatformTypeEnum);
                    }}
                  />
                  <h5 className="text-muted mt-3 mb-5">Pilih Tipe</h5>

                  <h5 className="required">Judul</h5>
                  <TextField
                    placeholder="Masukan judul artikel"
                    classNames={clsx(
                      {
                        "is-invalid":
                          materialPromotionForm.touched
                            .titleMaterialPromotion &&
                          materialPromotionForm.errors.titleMaterialPromotion,
                      },
                      {
                        "is-valid":
                          materialPromotionForm.touched
                            .titleMaterialPromotion &&
                          !materialPromotionForm.errors.titleMaterialPromotion,
                      }
                    )}
                    props={{
                      ...materialPromotionForm.getFieldProps(
                        "titleMaterialPromotion"
                      ),
                      value:
                        materialPromotionForm.values.titleMaterialPromotion,
                      onChange: (e: any) => {
                        materialPromotionForm.setFieldValue(
                          "titleMaterialPromotion",
                          e.target.value
                        );
                        setTitle(e.target.value);
                      },
                    }}
                  />
                  {materialPromotionForm.touched.titleMaterialPromotion &&
                    materialPromotionForm.errors.titleMaterialPromotion && (
                      <div className="fv-plugins-message-container">
                        <span role="alert">
                          {materialPromotionForm.errors.titleMaterialPromotion}
                        </span>
                      </div>
                    )}
                  <h5 className="text-muted mt-3">Masukan judul</h5>

                  {type === MaterialPromotionPlatformTypeEnum.Material ? (
                    <>
                      <h5 className="">Url Video</h5>
                      <TextField
                        placeholder="Masukan judul artikel"
                        props={{
                          value: video,
                          onChange: (e: any) => {
                            setVideo(e.target.value);
                          },
                        }}
                      />
                      {materialPromotionForm.touched.titleMaterialPromotion &&
                        materialPromotionForm.errors.titleMaterialPromotion && (
                          <div className="fv-plugins-message-container">
                            <span role="alert">
                              {
                                materialPromotionForm.errors
                                  .titleMaterialPromotion
                              }
                            </span>
                          </div>
                        )}
                      <h5 className="text-muted mt-3">Masukan url</h5>
                    </>
                  ) : null}

                  <h5 className=" mt-5">Konten Pertama</h5>
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
                      value={firstContent}
                      style={{ height: "70%" }}
                      onChange={(e) => {
                        setFirstComtent(e);
                      }}
                    />
                  </div>

                  <h5 className="text-muted mt-3">Masukan konten pertama</h5>

                  <h5 className=" mt-5">Konten Kedua</h5>
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
                      value={secondContent}
                      style={{ height: "70%" }}
                      onChange={(e) => {
                        setSecondContent(e);
                      }}
                    />
                  </div>

                  <h5 className="text-muted mt-3">Masukan konten kedua</h5>
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
                <Buttons
                  type="submit"
                  disabled={!materialPromotionForm.isValid.valueOf()}
                >
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

export default EditMaterialPromotion;
