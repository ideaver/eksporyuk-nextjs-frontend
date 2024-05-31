import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import {
  CourseDurationTypeEnum,
  CourseStatusEnum,
} from "@/app/service/graphql/gen/graphql";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useRouter } from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import ClassTabBar from "../../TabBar/Products/ClassTabBar";
import useClassViewModel from "./ClassAside-view-model";
interface AsideProductLayoutProps {
  children?: React.ReactNode;
}

const AsideProductLayout = ({ children }: AsideProductLayoutProps) => {
  const {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    handleDurationChange,
    status,
    duration,
    handleNext,
    handlePrevious,
    isLoading,
    createCourseError,
  } = useClassViewModel();
  const router = useRouter();
  return (
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
      <div className="row gx-10">
        <div className="col-lg-3">
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
                    src={thumbnail}
                    alt=""
                    className="img-fluid rounded object-fit-cover"
                  />
                </div>
              </label>
              <p className="text-muted fw-bold text-center mt-5">
                Pilih gambar untuk dijadikan thumbnail. Format gambar yang
                diterima adalah .jpg, .jpeg dan .png
              </p>
            </KTCardBody>
          </KTCard>
          <KTCard className="mt-5">
            <KTCardBody className="d-flex flex-column">
              <h3 className="mb-5">Status</h3>
              <Dropdown
                options={[
                  { value: CourseStatusEnum.Published, label: "Published" },
                  { value: CourseStatusEnum.Draft, label: "Draft" },
                  { value: CourseStatusEnum.Archived, label: "Archived" },
                ]}
                value={status}
                onValueChange={(value) =>
                  handleStatusChange(value as CourseStatusEnum)
                }
              ></Dropdown>
              <p className="text-muted fw-bold mt-5">Atur Status</p>
              <h3 className="mb-5 mt-5">Durasi Kelas</h3>
              <Dropdown
                options={[
                  {
                    value: CourseDurationTypeEnum.ThreeMonths,
                    label: "3 Bulan",
                  },
                  { value: CourseDurationTypeEnum.SixMonths, label: "6 Bulan" },
                  {
                    value: CourseDurationTypeEnum.TwelveMonths,
                    label: "12 Bulan",
                  },
                ]}
                value={duration}
                onValueChange={(value) =>
                  handleDurationChange(value as CourseDurationTypeEnum)
                }
              ></Dropdown>
            </KTCardBody>
          </KTCard>
        </div>

        <div className="col-lg-9">
          <ClassTabBar urlType="create"></ClassTabBar>
          {createCourseError && <Alert title="Terjadi Masalah" label={createCourseError} alertColor="danger" dismissable/>}
          {children}

          <div className={"row flex-end mt-10"}>
            {router.pathname !== "/admin/courses/[action]/information" && (
              <Buttons
                mode="light"
                classNames={"col-lg-2 me-lg-5"}
                onClick={handlePrevious}
              >
                Sebelumnya
              </Buttons>
            )}

            <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} onClick={handleNext}>
              {router.pathname === "/admin/courses/[action]/sylabus"
                ? "Kirim"
                : "Selanjutnya"}
            </Buttons>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
};

export default AsideProductLayout;
