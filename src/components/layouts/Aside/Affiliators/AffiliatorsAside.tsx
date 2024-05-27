import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useRouter } from "next/router";
import ClassTabBar from "../../TabBar/Admin/Affiliate/AffiliateTabBar";
import useClassViewModel from "./AffiliatorsAside-view-model";

interface AsideAffiliateLayoutProps {
  children?: React.ReactNode;
}

const AsideAffiliateLayout = ({ children }: AsideAffiliateLayoutProps) => {
  const {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    status,
    handleNext,
    handlePrevious,
    onSubmit,
  } = useClassViewModel();
  const router = useRouter();
  return (
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
            {/* <Dropdown
              options={[
                { value: "true", label: "Aktif" },
                { value: "false", label: "Tidak Aktif" },
              ]}
              value={status}
              onValueChange={(value) => handleStatusChange(value as boolean)}
            ></Dropdown> */}
            <p className="text-muted fw-bold mt-5">Atur Status</p>
          </KTCardBody>
        </KTCard>
      </div>

      <div className="col-lg-9">
        <ClassTabBar></ClassTabBar>
        {children}
        <div className={"row flex-end mt-10"}>
          {router.pathname !== `/admin/affiliate/coupon/[id]/information` && (
            <Buttons
              mode="light"
              classNames={"col-lg-2 me-lg-5"}
              onClick={handlePrevious}
            >
              Sebelumnya
            </Buttons>
          )}

          <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} onClick={router.pathname == `/admin/affiliate/coupon/[id]/affiliation` ? onSubmit : handleNext}>
            {router.pathname == `/admin/affiliate/coupon/[id]/affiliation` ? "Buat Kupon" : "Selanjutnya"}
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default AsideAffiliateLayout;
