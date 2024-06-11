import { useCoursesDropdown } from "@/templates/Admin/Affiliators/AdminCoupon/AdminCoupon-view-model";
import useEditAnnouncementViewModel, {
  IEditAnnouncement,
  breadcrumbs,
  useAnnouncementForm,
} from "./EditAnnouncement-view-model";
import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import clsx from "clsx";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { AnnouncementTypeEnum } from "@/app/service/graphql/gen/graphql";
import { AsyncPaginate } from "react-select-async-paginate";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";

const EditAnnouncement = ({ id, data }: IEditAnnouncement) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const { loadOptions } = useCoursesDropdown();
  const {
    handleAnnouncementUpdateOne,
    content,
    setContent,
    title,
    setTitle,
    announcementType,
    setAnnouncementType,
    course,
    setCourse,
    isLoading,
  } = useEditAnnouncementViewModel({ id, data });
  const { announcementForm } = useAnnouncementForm({ content, title });

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Announcement</PageTitle>
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
        active={isLoading}
        spinner
      >
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
                    setTitle(e.target.value);
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
                value={announcementType}
                options={[
                  {
                    value: AnnouncementTypeEnum.Course,
                    label: "Course",
                  },
                  {
                    value: AnnouncementTypeEnum.Affiliate,
                    label: "Affiliate",
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
                  setAnnouncementType(val as AnnouncementTypeEnum);
                }}
              />
              <h5 className="text-muted mt-3">Masukan tipe announcement</h5>

              <h5 className="required">Hubungkan Kelas</h5>
              {course?.label ? (
                <div className="d-flex mt-5">
                  <div className="w-100">
                    <TextField
                      props={{
                        disabled: true,
                        value: course.label,
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
                  setCourse(value as any);
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
                    announcementForm.setFieldValue("contentAnnouncement", e);
                    setContent(e);
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
              <h5 className="text-muted mt-3">Masukan konten announcement</h5>
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
              disabled={!announcementForm.isValid.valueOf()}
              onClick={handleAnnouncementUpdateOne}
            >
              Simpan Perubahan
            </Buttons>
          </div>
        </form>
      </LoadingOverlayWrapper>
    </>
  );
};
export default EditAnnouncement;
