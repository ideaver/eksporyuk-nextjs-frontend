import { PageTitle } from "@/_metronic/layout/core";
import useInformationViewModel, {
  breadcrumbs,
  useAnnouncementForm,
  useArticleForm,
  useCategoriesDropdown,
  useCategoryForm,
} from "./Information-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { ChangeEvent, useMemo } from "react";
import { useRouter } from "next/router";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { useDispatch, useSelector } from "react-redux";
import {
  TypeCategory,
  changeContent,
  changeTitle,
  changeToogleForm,
  changeUrlVideo,
} from "@/features/reducers/articles/articlesReducer";
import clsx from "clsx";
import { AsyncPaginate } from "react-select-async-paginate";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { RootState } from "@/app/store/store";
import {
  AnnouncementTypeEnum,
  MaterialPromotionPlatformTypeEnum,
  NewsTypeEnum,
  UserRoleEnum,
} from "@/app/service/graphql/gen/graphql";
import { useCoursesDropdown } from "@/templates/Admin/Affiliators/AdminCoupon/AdminCoupon-view-model";
import {
  changeContentAnnouncement,
  changeTitleAnnouncement,
} from "@/features/reducers/announcement/announcementReducer";
import {
  changeContentMaterialPromotionFirst,
  changeContentMaterialPromotionSecond,
  changeMaterialType,
  changeTitleMaterialPromotion,
  changeVideoUrl,
} from "@/features/reducers/materialPromotion/materialPromotion";
import {
  changeContentNews,
  changeNewsType,
  changeTitleNews,
} from "@/features/reducers/news/newsReducer";

const InformationPage = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const formToogle = useSelector(
    (state: RootState) => state.article.toogleForm
  );
  const urlVideo = useSelector((state: RootState) => state.article.urlVideo);
  const typeAnnouncement = useSelector(
    (state: RootState) => state.announcement.announcementType
  );
  const courseAnnouncement = useSelector(
    (state: RootState) => state.announcement.course
  );
  const materialPromotionState = useSelector(
    (state: RootState) => state.materialPromotion
  );
  const newsState = useSelector((state: RootState) => state.news);

  const {
    announcementForm,
    response,
    announcementCreateOne,
    resetAnnouncementState,
    handleAnnouncementCreateOne,
    isLoadingAnnouncement,
    handleAnnouncementTypeChange,
  } = useAnnouncementForm();

  const {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    handleTargetChange,
    status,
    category,
    handleCategoryChange,
    resetArticleState,
    isLoading,
    handleArticleCreateOne,
    targetOptions,
    target,
    handleConnectCourse,
    materialPromotionForm,
    isLoadingMaterialPromotion,
    resetMaterialPromotionState,
    newsForm,
    isLoadingNews,
    resetNewsState,
  } = useInformationViewModel();

  const { loadOptions } = useCoursesDropdown();

  const { formik } = useArticleForm();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Artikel</PageTitle>
      <LoadingOverlayWrapper
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
        active={
          isLoading ||
          isLoadingAnnouncement ||
          isLoadingMaterialPromotion ||
          isLoadingNews
        }
        spinner
      >
        <div className="dropdown w-100 mb-5 text-end">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {formToogle}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  dispatch(changeToogleForm("Article"));
                }}
              >
                Article
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  dispatch(changeToogleForm("Announcement"));
                }}
              >
                Announcement
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  dispatch(changeToogleForm("Material Promotion"));
                }}
              >
                Material Promotion
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  dispatch(changeToogleForm("News"));
                }}
              >
                News
              </button>
            </li>
          </ul>
        </div>
        {formToogle === "Article" ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="row gx-8">
              <Aside
                formToggle={formToogle}
                handleCategoryChange={handleCategoryChange}
                category={category}
                thumbnail={thumbnail}
                handleFileChange={handleFileChange}
                handleStatusChange={handleStatusChange}
                status={status}
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
                          dispatch(changeTitle(e.target.value));
                        },
                      }}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="fv-plugins-message-container">
                        <span role="alert">{formik.errors.title}</span>
                      </div>
                    )}
                    <h5 className="text-muted mt-3">Masukan judul artikel</h5>
                    <h5 className="">URL Video</h5>
                    <TextField
                      placeholder="Masukan url video"
                      props={{
                        value: urlVideo,
                        onChange: (e: any) => {
                          dispatch(changeUrlVideo(e.target.value));
                        },
                      }}
                    />

                    <h5 className="text-muted mt-3">Masukan url video</h5>
                    <h5 className="required mt-5">Target Artikel</h5>
                    <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
                      {target.map((e: any, index) => (
                        <Buttons
                          key={index}
                          classNames="fit-content"
                          icon="cross"
                          buttonColor="secondary"
                          showIcon
                          onClick={() => {
                            handleTargetChange(target.filter((v) => v !== e));
                          }}
                        >
                          <span>{e}</span>
                        </Buttons>
                      ))}
                    </div>

                    <Dropdown
                      options={targetOptions}
                      onValueChange={(val) => {
                        handleTargetChange([...target, val as UserRoleEnum]);
                      }}
                    />
                    <h5 className="text-muted mt-3">Masukan target artikel</h5>

                    <h5 className="required mt-5">Konten Artikel</h5>
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
                        value={formik.values.content}
                        style={{ height: "70%" }}
                        onChange={(e) => {
                          formik.setFieldValue("content", e);
                          dispatch(changeContent(e));
                        }}
                      />
                    </div>

                    {formik.touched.content && formik.errors.content && (
                      <div className="fv-plugins-message-container">
                        <span role="alert">{formik.errors.content}</span>
                      </div>
                    )}
                    <h5 className="text-muted mt-3">Masukan konten artikel</h5>
                  </KTCardBody>
                </KTCard>

                <div className="d-flex flex-end mt-6 gap-4">
                  <Buttons
                    buttonColor="secondary"
                    onClick={() => {
                      resetArticleState();
                    }}
                  >
                    Batal
                  </Buttons>
                  <Buttons
                    type="submit"
                    // disabled={!formik.isValid.valueOf()}
                    onClick={() => {}}
                  >
                    Simpan
                  </Buttons>
                </div>
              </div>
            </div>
          </form>
        ) : formToogle === "Announcement" ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <KTCard className="">
                <KTCardBody>
                  <h3 className="mb-5">Tulis Announcement</h3>
                  <h5 className="required">Judul Announcement</h5>
                  <TextField
                    placeholder="Masukan judul Announcement"
                    classNames={clsx(
                      {
                        "is-invalid":
                          announcementForm.touched.titleAnnouncement &&
                          announcementForm.errors.titleAnnouncement,
                      },
                      {
                        "is-valid":
                          announcementForm.touched.titleAnnouncement &&
                          !announcementForm.errors.titleAnnouncement,
                      }
                    )}
                    props={{
                      ...announcementForm.getFieldProps("titleAnnouncement"),
                      value: announcementForm.values.titleAnnouncement,
                      onChange: (e: any) => {
                        announcementForm.setFieldValue(
                          "titleAnnouncement",
                          e.target.value
                        );
                        dispatch(changeTitleAnnouncement(e.target.value));
                      },
                    }}
                  />
                  {announcementForm.touched.titleAnnouncement &&
                    announcementForm.errors.titleAnnouncement && (
                      <div className="fv-plugins-message-container">
                        <span role="alert">
                          {announcementForm.errors.titleAnnouncement}
                        </span>
                      </div>
                    )}
                  <h5 className="text-muted mt-3">Masukan judul</h5>
                  <h5 className="required mt-5">Tipe Announcement</h5>
                  <Dropdown
                    value={typeAnnouncement}
                    options={[
                      {
                        value: AnnouncementTypeEnum.Affiliate,
                        label: "Affiliate",
                      },
                      {
                        value: AnnouncementTypeEnum.Course,
                        label: "Course",
                      },
                      {
                        value: AnnouncementTypeEnum.System,
                        label: "System",
                      },
                      {
                        value: AnnouncementTypeEnum.Other,
                        label: "Other",
                      },
                    ]}
                    onValueChange={(val) => {
                      handleAnnouncementTypeChange(val as AnnouncementTypeEnum);
                    }}
                  />
                  <h5 className="text-muted mt-3">Masukan tipe announcement</h5>

                  <h5 className="required">Hubungkan Kelas</h5>
                  {courseAnnouncement?.label ? (
                    <div className="d-flex mt-5">
                      <div className="w-100">
                        <TextField
                          props={{
                            disabled: true,
                            value: courseAnnouncement.label,
                          }}
                        ></TextField>
                      </div>
                    </div>
                  ) : null}
                  <AsyncPaginate
                    className="mt-5"
                    isSearchable={true}
                    loadOptions={loadOptions}
                    onChange={(value) => {
                      handleConnectCourse(value as any);
                    }}
                  ></AsyncPaginate>
                  <h5 className="text-muted mt-3">Hubungkan dengan kelas</h5>

                  <h5 className="required mt-5">Konten Announcement</h5>
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
                      value={announcementForm.values.contentAnnouncement}
                      style={{ height: "70%" }}
                      onChange={(e) => {
                        announcementForm.setFieldValue(
                          "contentAnnouncement",
                          e
                        );
                        dispatch(changeContentAnnouncement(e));
                      }}
                    />
                  </div>

                  {announcementForm.touched.contentAnnouncement &&
                    announcementForm.errors.contentAnnouncement && (
                      <div className="fv-plugins-message-container">
                        <span role="alert">
                          {announcementForm.errors.contentAnnouncement}
                        </span>
                      </div>
                    )}
                  <h5 className="text-muted mt-3">
                    Masukan konten announcement
                  </h5>
                </KTCardBody>
              </KTCard>
              <div className="d-flex flex-end mt-6 gap-4">
                <Buttons
                  buttonColor="secondary"
                  onClick={() => {
                    resetAnnouncementState();
                    router.back();
                  }}
                >
                  Batal
                </Buttons>
                <Buttons
                  type="submit"
                  disabled={!announcementForm.isValid.valueOf()}
                  onClick={handleAnnouncementCreateOne}
                >
                  Simpan
                </Buttons>
              </div>
            </form>
          </>
        ) : formToogle === "News" ? (
          <form onSubmit={newsForm.handleSubmit}>
            <div className="row gx-8">
              <Aside
                formToggle={formToogle}
                handleCategoryChange={handleCategoryChange}
                category={category}
                thumbnail={thumbnail}
                handleFileChange={handleFileChange}
                handleStatusChange={handleStatusChange}
                status={status}
              />
              <div className={"col-lg-8"}>
                <KTCard className="">
                  <KTCardBody>
                    <h3 className="mb-5">Tulis News</h3>

                    <h5 className="required">Judul</h5>
                    <TextField
                      placeholder="Masukan judul"
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
                          dispatch(changeTitleNews(e.target.value));
                        },
                      }}
                    />
                    {newsForm.touched.titleNews &&
                      newsForm.errors.titleNews && (
                        <div className="fv-plugins-message-container">
                          <span role="alert">{newsForm.errors.titleNews}</span>
                        </div>
                      )}
                    <h5 className="text-muted mt-3">Masukan judul</h5>

                    <h5>Tipe</h5>
                    <Dropdown
                      value={newsState.newsType}
                      options={[
                        {
                          value: NewsTypeEnum.Headline,
                          label: "Headline",
                        },
                        {
                          value: NewsTypeEnum.Feature,
                          label: "Feature",
                        },
                        {
                          value: NewsTypeEnum.Opinion,
                          label: "Opinion",
                        },
                      ]}
                      onValueChange={(val) => {
                        dispatch(changeNewsType(val as NewsTypeEnum));
                      }}
                    />
                    <h5 className="text-muted mt-3 mb-5">Pilih Tipe</h5>

                    <h5 className=" mt-5">Konten</h5>
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
                        value={newsState.contentNews}
                        style={{ height: "70%" }}
                        onChange={(e) => {
                          dispatch(changeContentNews(e));
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
                      resetNewsState();
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
        ) : (
          <form onSubmit={materialPromotionForm.handleSubmit}>
            <div className="row gx-8">
              {materialPromotionState.materialType ===
              MaterialPromotionPlatformTypeEnum.Material ? null : (
                <Aside
                  formToggle={formToogle}
                  handleCategoryChange={handleCategoryChange}
                  category={category}
                  thumbnail={thumbnail}
                  handleFileChange={handleFileChange}
                  handleStatusChange={handleStatusChange}
                  status={status}
                />
              )}
              <div
                className={
                  materialPromotionState.materialType ===
                  MaterialPromotionPlatformTypeEnum.Banner
                    ? "col-lg-8"
                    : ""
                }
              >
                <KTCard className="">
                  <KTCardBody>
                    <h3 className="mb-5">Tulis Material/Banner</h3>
                    <h5>Tipe</h5>
                    <Dropdown
                      value={materialPromotionState.materialType}
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
                        dispatch(
                          changeMaterialType(
                            val as MaterialPromotionPlatformTypeEnum
                          )
                        );
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
                            !materialPromotionForm.errors
                              .titleMaterialPromotion,
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
                          dispatch(
                            changeTitleMaterialPromotion(e.target.value)
                          );
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
                    <h5 className="text-muted mt-3">Masukan judul</h5>

                    {materialPromotionState.materialType ===
                    MaterialPromotionPlatformTypeEnum.Material ? (
                      <>
                        <h5 className="">Url Video</h5>
                        <TextField
                          placeholder="Masukan judul artikel"
                          props={{
                            value: materialPromotionState.videoUrl,
                            onChange: (e: any) => {
                              dispatch(changeVideoUrl(e.target.value));
                            },
                          }}
                        />
                        {materialPromotionForm.touched.titleMaterialPromotion &&
                          materialPromotionForm.errors
                            .titleMaterialPromotion && (
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
                        value={
                          materialPromotionState.contentMaterialPromotionFirst
                        }
                        style={{ height: "70%" }}
                        onChange={(e) => {
                          formik.setFieldValue("content", e);
                          dispatch(changeContentMaterialPromotionFirst(e));
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
                        value={
                          materialPromotionState.contentMaterialPromotionSecond
                        }
                        style={{ height: "70%" }}
                        onChange={(e) => {
                          formik.setFieldValue("content", e);
                          dispatch(changeContentMaterialPromotionSecond(e));
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
                      resetMaterialPromotionState();
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
        )}
      </LoadingOverlayWrapper>
      <AddCategoryModal />
    </>
  );
};

const Aside = ({
  thumbnail,
  status,
  category,
  handleCategoryChange,
  handleFileChange,
  handleStatusChange,
  formToggle,
}: {
  thumbnail: string | null | undefined;
  status: string;
  category: TypeCategory[];
  handleCategoryChange: (e: TypeCategory[]) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (e: string) => void;
  formToggle: string;
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

      {formToggle !== "Article" ? null : (
        <>
          <KTCard className="mt-5">
            <KTCardBody className="d-flex flex-column">
              <h3 className="mb-5">Kategori</h3>
              <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
                {category.map((e: any, index) => (
                  <Buttons
                    key={index}
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
                  handleCategoryChange([...category, value as TypeCategory]);
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
                onValueChange={(value) => handleStatusChange(value as string)}
              ></Dropdown>
              <p className="text-muted fw-bold mt-5">Atur Status</p>
            </KTCardBody>
          </KTCard>
        </>
      )}
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

export default InformationPage;
