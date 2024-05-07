import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import ClassTabBar from "../../TabBar/Products/ClassTabBar";
import useClassViewModel from "./ClassAside-view-model";

interface AsideProductLayoutProps {
  children?: React.ReactNode;
}

const AsideProductLayout = ({ children }: AsideProductLayoutProps) => {
  const { thumbnail, handleFileChange, handleStatusChange, status } =
    useClassViewModel();

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
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ]}
              value={status}
              onValueChange={(value) => handleStatusChange(value as string)}
            ></Dropdown>
            <p className="text-muted fw-bold mt-5">Atur Status</p>
          </KTCardBody>
        </KTCard>
      </div>

      <div className="col-lg-9">
        <ClassTabBar urlType="create"></ClassTabBar>
        {children}
      </div>
    </div>
  );
};

export default AsideProductLayout;
