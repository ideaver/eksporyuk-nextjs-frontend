import { PageTitle } from "@/_metronic/layout/core";
import IllustrationCard from "@/stories/molecules/Cards/IllustrationCard/IllustrationCard";
import usePromotionViewModel, {
  PromotionTableList,
} from "./Promotion-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import Image from "next/image";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { useEffect, useState } from "react";

const Promotion = () => {
  const {
    breadcrumbs,
    promotionTableData,
    promotionTabsData,
    promotionImages,
  } = usePromotionViewModel();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <PageTitle breadcrumbs={breadcrumbs}>Order Affiliasi</PageTitle>

          <IllustrationCard
            title={
              "Gunakan material promosi yang kami buat untuk membantu promosi anda sebagai afiliasi"
            }
            image="/media/illustrations/sigma-1/17.png"
          ></IllustrationCard>
          <KTCard className="mt-5">
            <KTCardBody>
              <TextField
                classNames="w-md-25 mb-5"
                styleType="solid"
                preffixIcon="magnifier"
                placeholder="Search"
              />
              <PromotionTable tableData={promotionTableData} />
              <Footer />
            </KTCardBody>
          </KTCard>
          <PromotionModal
            tabsData={promotionTabsData}
            imageData={promotionImages}
          />
        </>
      )}
    </>
  );
};

export default Promotion;

const Footer = () => {
  return (
    <div className="row justify-content-between">
      <div className="col-auto">
        <Dropdown
          styleType="solid"
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
          ]}
          onValueChange={() => {}}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => {}}
        ></Pagination>
      </div>
    </div>
  );
};

const PromotionTable = ({ tableData }: { tableData: PromotionTableList[] }) => {
  return (
    <div className="table-responsive">
      <table className="table gy-3">
        <thead>
          <tr className="fw-bold text-muted text-uppercase">
            <th>Nama Product</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>
                <td className="fw-bold text-end d-flex align-items-center ">
                  <div className="d-flex align-items-center mb-7">
                    <div className="symbol symbol-50px me-5">
                      <span className="symbol-label bg-gray-600">
                        <Image
                          src={row.imageSrc}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                        {row.title}
                      </span>
                    </div>
                  </div>
                </td>
              </td>
              <td className="text-end">
                <Buttons
                  mode="light"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_promotion_modal"
                >
                  Lihat Materi Promosi
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PromotionModal = ({
  tabsData,
  imageData,
}: {
  tabsData: any;
  imageData: any;
}) => {
  return (
    <div className="modal fade" tabIndex={-1} id="kt_promotion_modal">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className=" d-block">
              <h3 className="modal-title mb-1"> Bantuan Promosi</h3>
              <span>Bundling Kelas Ekspor + Aplikasi EYA</span>
            </div>
            <div
              className="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <KTIcon iconName="cross" className="fs-2x" />
            </div>
          </div>

          <div className="modal-body">
            <h3 className="fw-bold text-gray-600">Media</h3>
            <div className="row mb-5 gy-5">
              {imageData.map((image: any, index: any) => (
                <div className="col" key={index}>
                  <div className="d-block">
                    <img
                      className="rounded w-100 mb-3"
                      src={image.src}
                      alt={image.alt}
                    />
                    <Buttons
                      classNames="w-100"
                      mode="light"
                      icon="file-down"
                      showIcon={true}
                    >
                      Download
                    </Buttons>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="fw-bold text-gray-600">Caption atau Pesan</h3>
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
              {tabsData.map((tab: any, index: any) => (
                <li className="nav-item" key={index}>
                  <a
                    className={`nav-link ${index === 0 ? "active" : ""}`}
                    data-bs-toggle="tab"
                    href={`#${tab.id}`}
                  >
                    {tab.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="tab-content" id="myTabContent">
              {tabsData.map((tab: any, index: any) => (
                <div
                  className={`tab-pane fade ${
                    index === 0 ? "show active" : ""
                  }`}
                  id={tab.id}
                  role="tabpanel"
                  key={index}
                >
                  <p>{tab.message}</p>
                  <Buttons
                    classNames="w-25"
                    buttonColor="secondary"
                    mode="light"
                    onClick={() => {}}
                  >
                    Copy Caption
                  </Buttons>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer justify-content-center">
            <Buttons buttonColor="secondary" data-bs-dismiss="modal">
              Tutup
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};
