import { PageTitle } from "@/_metronic/layout/core";
import useEditMembershipViewModel, {
  IEditMembershipProps,
  breadcrumbs,
} from "./EditMembership-view-model";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import clsx from "clsx";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { MembershipTypeEnum } from "@/app/service/graphql/gen/graphql";
import CurrencyInput from "react-currency-input-field";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { useCoursesDropdown } from "../InformationMembership/InformationMembership-view-model";

const EditMembership = ({ id, data }: IEditMembershipProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const {
    formik,
    isLoading,
    setIsloading,
    membershipType,
    setName,
    setDescription,
    setPrice,
    setBenefits,
    setMembershipType,
    setDuration,
    price,
    benefits,
    courses,
    handleChangeCourses,
    handleDeleteCourses,
  } = useEditMembershipViewModel({ id, data });
  const { loadOptions } = useCoursesDropdown();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Membership</PageTitle>
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
        <form onSubmit={formik.handleSubmit}>
          <KTCard>
            <KTCardBody>
              <h3 className="mb-5">Informasi Membership</h3>
              <h5 className="required">Nama Membership</h5>
              <TextField
                placeholder="Masukan nama membership"
                classNames={clsx(
                  {
                    "is-invalid": formik.touched.name && formik.errors.name,
                  },
                  {
                    "is-valid": formik.touched.name && !formik.errors.name,
                  }
                )}
                props={{
                  ...formik.getFieldProps("name"),
                  onChange: (e: any) => {
                    formik.setFieldValue("name", e.target.value);
                    setName(e.target.value);
                  },
                  value: formik.values.name,
                }}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.name}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">Masukan nama membership</h5>
              <h5 className="required">Deskripsi Membership</h5>
              <Textarea
                placeholder="Masukan deskripsi membership"
                classNames={clsx(
                  {
                    "is-invalid":
                      formik.touched.description && formik.errors.description,
                  },
                  {
                    "is-valid":
                      formik.touched.description && !formik.errors.description,
                  }
                )}
                props={{
                  value: formik.values.description,
                  onChange: (e: any) => {
                    formik.setFieldValue("description", e.target.value);
                    setDescription(e.target.value);
                  },
                }}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.description}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-5">
                Masukan deskripsi membership
              </h5>
              <h5 className="required">Tipe Membership</h5>
              <Dropdown
                value={membershipType}
                options={[
                  {
                    value: MembershipTypeEnum.ThreeMonth,
                    label: "THREE_MONTH",
                  },
                  { value: MembershipTypeEnum.SixMonth, label: "SIX_MONTH" },
                  {
                    value: MembershipTypeEnum.TwelveMonth,
                    label: "TWELVE_MONTH",
                  },
                ]}
                onValueChange={(value) =>
                  setMembershipType(value as MembershipTypeEnum)
                }
              ></Dropdown>
              <h5 className="text-muted mt-2 mb-8">Pilih tipe membership</h5>
              <h5 className="required">Harga</h5>
              <CurrencyInput
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.price && formik.errors.price,
                  },
                  {
                    "is-valid": formik.touched.price && !formik.errors.price,
                  }
                )}
                placeholder="Masukan Harga (Rp)"
                intlConfig={{ locale: "id-ID" }}
                {...formik.getFieldProps("price")}
                defaultValue={0}
                value={price}
                decimalsLimit={2}
                onValueChange={(value, name, values) => {
                  formik.setFieldValue("price", parseFloat(value as string));
                  setPrice(parseFloat(value as string));
                }}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.price}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">Jumlah harga membership</h5>
              <h5 className="required">Durasi {"(Hari)"}</h5>
              <TextField
                placeholder="Masukan durasi membership"
                type="number"
                classNames={clsx(
                  {
                    "is-invalid":
                      formik.touched.duration && formik.errors.duration,
                  },
                  {
                    "is-valid":
                      formik.touched.duration && !formik.errors.duration,
                  }
                )}
                props={{
                  ...formik.getFieldProps("duration"),
                  onChange: (e: any) => {
                    formik.setFieldValue("duration", e.target.value);
                    setDuration(parseInt(e.target.value));
                  },
                  value: formik.values.duration,
                }}
              />
              {formik.touched.duration && formik.errors.duration && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.duration}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">
                Masukan durasi membership
              </h5>
              <h5 className="">Benefit Kelas</h5>
              <div className="d-flex fflex-wrap gap-2">
                {courses?.map((e, index) => {
                  return (
                    <div key={index}>
                      <Buttons
                        showIcon
                        icon="cross"
                        buttonColor="secondary"
                        classNames="text-dark me-1"
                        onClick={() => {
                          handleDeleteCourses(e.value);
                        }}
                        key={index}
                      >
                        {e.label}
                      </Buttons>
                    </div>
                  );
                })}
              </div>
              <AsyncPaginate
                className="mt-5"
                isSearchable={true}
                loadOptions={loadOptions}
                onChange={(val) => {
                  handleChangeCourses({
                    value: val?.value as number,
                    label: val?.label as string,
                  });
                }}
              ></AsyncPaginate>

              <h5 className="text-muted mt-2 mb-8">
                Masukan benefit kelas ketika berlangganan
              </h5>
              <h5 className="required">Benefit</h5>
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
                  value={benefits}
                  style={{ height: "70%" }}
                  onChange={(e) => {
                    formik.setFieldValue("benefits", e);
                    setBenefits(e);
                  }}
                />
              </div>
              {/* <Textarea
                placeholder="Masukan Benefit"
                classNames={clsx(
                  {
                    "is-invalid":
                      formik.touched.benefits && formik.errors.benefits,
                  },
                  {
                    "is-valid":
                      formik.touched.benefits && !formik.errors.benefits,
                  }
                )}
                props={{
                  ...formik.getFieldProps("benefits"),
                  onChange: (e: any) => {
                    formik.setFieldValue("benefits", e.target.value);
                    setBenefits(e.target.value);
                  },
                  value: formik.values.benefits,
                }}
              /> */}
              {formik.touched.benefits && formik.errors.benefits && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.benefits}</span>
                </div>
              )}
              <h5 className="text-muted mt-2 mb-8">
                Masukan durasi membership
              </h5>
            </KTCardBody>
            <div className={"row flex-end mt-10"}>
              <Buttons
                // mode="light"
                buttonColor="secondary"
                classNames={"col-lg-2 me-lg-5"}
                onClick={() => {
                  router.back();
                }}
              >
                Batal
              </Buttons>{" "}
              <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} type="submit">
                Simpan
              </Buttons>
            </div>
          </KTCard>
        </form>
      </LoadingOverlayWrapper>
    </>
  );
};
export default EditMembership;
