import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import usePixelViewModel, { TableRow } from "./Pixel-view-model";

interface PixelPageProps {}

const PixelPage = ({}: PixelPageProps) => {
  const {
    breadcrumbs,
    pixelModalState,
    setPixelModalState,
    follupValues,
    selectedFollupValue,
    handleFollupChange,
    pixelTabsData,
  } = usePixelViewModel({});
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Pixel</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head />
          </div>
          {/* <Table data={tableData} /> */}
          <QueryTablePixel />
          <Footer />
        </KTCardBody>
      </KTCard>
      <PixelModal
        date={pixelModalState}
        onChange={([startDate, endDate]) => {
          setPixelModalState([startDate, endDate]);
        }}
      />
      <FollowUpModal
        follupValues={follupValues}
        selectedFollupValue={selectedFollupValue}
        handleFollupChange={handleFollupChange}
        linkAPIWhatsapp=""
      />
      <SaveAdjustId />
      <IdPixelModal
        tabsData={pixelTabsData}
        follupValues={follupValues}
        selectedFollupValue={selectedFollupValue}
        handleFollupChange={handleFollupChange}
      />
      <SubmitIdPixelModal />
    </>
  );
};

export default PixelPage;

const Head = () => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
        ></TextField>
      </div>
      <div className="col-lg-auto">
        <Buttons
          data-bs-toggle="modal"
          data-bs-target="#kt_pengaturan_id_modal"
        >
          Pengaturan ID Pixel
        </Buttons>
      </div>
    </div>
  );
};

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

// const Table = ({ data }: TableProps) => {
//     return (
//         <div className="table-responsive mb-10">
//             <table className="table">
//                 <thead>
//                     <tr className='fw-bold uppercase text-muted'>
//                         <th className={`rounded-start text-uppercase min-w-500px`}>nama produk<i className="bi bi-arrow-up ms-3"></i><i className="bi bi-arrow-down"></i></th>
//                         <th className='w-100px text-end text-uppercase'>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((row, index) => (
//                         <tr key={index}>
//                             <th className="">
//                                 <div className="d-flex align-items-center">
//                                     <div className="d-flex flex-column">
//                                         <div className="text-muted fw-bold text-start fs-6 mb-0 text-dark">
//                                             {row.value}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </th>
//                             <td>
//                                 <div className="d-flex flex-column w-100 me-2">
//                                     <div className={``}>
//                                         <div className={`text-end fw-bold fs-5 text-muted`}>
//                                             {row.breadcrumb}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

const QueryTablePixel = () => {
  const [pixelData, setPixelData] = useState<TableRow[]>([]);

  const GET_PIXEL = gql`
    query {
      courseFindMany {
        updatedAt
        title
        status
        startDate
        sellingPrice
        prerequisites
        outcome
        objective
        maxEnrollment
        level
        isCertificationProvided
        id
        endDate
        description
        createdById
        basePrice
        createdAt
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PIXEL);

  // Pixel Kurang data Untuk Icon dan Button. Button > Mutation buat Push data

  useEffect(() => {
    if (data && data.courseFindMany) {
      const pixelData = data.courseFindMany.map((data: any) => ({
        icon: "Aa",
        value: data.title,
        breadcrumb: "Hubungkan",
      }));
      setPixelData(pixelData);
    }
  }, [data]);

  console.log(`GET_PIXEL`, data, loading, error);

  return (
    <div className="table-responsive mb-10">
      <KTTable utilityGY={3}>
        <KTTableHead className="fw-bold uppercase text-muted">
          <th className={`rounded-start text-uppercase min-w-500px`}>
            nama produk<i className="bi bi-arrow-up ms-3"></i>
            <i className="bi bi-arrow-down"></i>
          </th>
          <th className="w-100px text-end text-uppercase">Actions</th>
        </KTTableHead>
        <tbody>
          {pixelData.map((user, index) => (
            <tr key={index}>
              <th className="">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <div className="text-dark fw-bold text-start fs-6 mb-0 text-dark">
                      <Buttons
                        buttonColor="secondary"
                        classNames="btn-sm fw-bold fs-5 me-5"
                      >
                        <img src="" alt="" />
                        {user.icon}
                      </Buttons>
                      {user.value}
                    </div>
                  </div>
                </div>
              </th>
              <td>
                <div className="d-flex flex-column w-100 me-2">
                  <div className={``}>
                    <div className={`text-end fw-bold fs-5 text-muted`}>
                      <Buttons
                        mode="light"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_id_pixel_modal"
                      >
                        {user.breadcrumb}
                      </Buttons>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </KTTable>
    </div>
  );
};

const PixelModal = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (value: any) => void;
}) => {
  return (
    <KTModal
      dataBsTarget="kt_pengaturan_id_modal"
      title="Pengaturan ID Pixel"
      fade
      modalCentered
      modalSize="lg"
      buttonClose={
        <Buttons
          buttonColor="secondary"
          classNames="fw-bold"
          data-bs-dismiss="modal"
        >
          Batal
        </Buttons>
      }
      buttonSubmit={
        <Buttons
          data-bs-dismiss="modal"
          classNames="fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#tersimpan_pengaturan_id"
        >
          Simpan Pengaturan
        </Buttons>
      }
      footerContentCentered
    >
      <div>
        <h4 className="fw-bold text-gray-700">Facebook/Meta Pixel ID</h4>
        <div className="d-flex">
          <TextField
            styleType="outline"
            size="medium"
            placeholder="1234567890"
          />
        </div>
      </div>
      <div className="mt-8">
        <h4 className="fw-bold text-gray-700">TikTok Pixel ID</h4>
        <div className="d-flex">
          <TextField
            styleType="outline"
            size="medium"
            placeholder="C545FFHT8ST896F"
          />
        </div>
      </div>
      <div className="mt-8">
        <h4 className="fw-bold text-gray-700">Google Tag Manager ID</h4>
        <div className="d-flex">
          <TextField
            styleType="outline"
            size="medium"
            placeholder="GTM-RGUSIRGS"
          />
        </div>
      </div>
    </KTModal>
  );
};

const SaveAdjustId = () => {
  return (
    <KTModal
      dataBsTarget="tersimpan_pengaturan_id"
      fade
      modalCentered
      modalSize="md"
      footerContentCentered
      buttonClose={
        <Buttons
          buttonColor="primary"
          classNames="fw-bold"
          data-bs-dismiss="modal"
        >
          Tutup
        </Buttons>
      }
      buttonSubmit={false}
    >
      <div className="d-flex align-items-center justify-content-center">
        <img
          src={"/media/svg/general/checklist.svg"}
          className="img-fluid mb-6"
          alt=""
          width={100}
        />
      </div>
      <h2 className="text-center text-gray-700 mb-2">Pengaturan tersimpan</h2>
      <p className="text-center text-gray-700 fs-5">
        Pengaturan ID Pixel berhasil disimpan
      </p>
    </KTModal>
  );
};

const IdPixelModal = ({
  tabsData,
  follupValues,
  selectedFollupValue,
  handleFollupChange,
}: {
  tabsData: any;
  follupValues: string[];
  selectedFollupValue: string;
  handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <KTModal
      dataBsTarget="kt_id_pixel_modal"
      modalCentered
      fade
      modalSize="lg"
      title="ID Pixel"
      subTitle="Produk: Kelas Bimbingan EksporYuk"
      buttonClose={
        <Buttons
          buttonColor="secondary"
          classNames="fw-bold"
          data-bs-dismiss="modal"
        >
          Tutup
        </Buttons>
      }
      buttonSubmit={
        <Buttons
          data-bs-dismiss="modal"
          classNames="fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#submit_id_pixel_modal"
        >
          Submit Pixel
        </Buttons>
      }
    >
      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
        {tabsData.map((tab: any, index: any) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${index === 0 ? "active" : ""} fw-bold`}
              data-bs-toggle="tab"
              href={`#${tab.id}`}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
      <div>
        <div className="tab-content">
          {tabsData.map((tab: any, index: any) => (
            <div
              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
              id={tab.id}
              role="tabpanel"
              key={index}
            >
              <div>{tab.message}</div>
            </div>
          ))}
        </div>
      </div>
    </KTModal>
  );
};

const SubmitIdPixelModal = () => {
  return (
    <KTModal
      dataBsTarget="submit_id_pixel_modal"
      fade
      title=""
      modalSize="md"
      modalCentered
      buttonClose={
        <Buttons
          buttonColor="primary"
          classNames="fw-bold"
          data-bs-dismiss="modal"
        >
          Tutup
        </Buttons>
      }
      buttonSubmit={false}
      footerContentCentered
    >
      <div className="d-flex align-items-center justify-content-center">
        <img
          src={"/media/svg/general/checklist.svg"}
          className="img-fluid mb-6"
          alt=""
          width={100}
        />
      </div>
      <h2 className="text-center text-gray-700 mb-2">
        Pengaturan Berhasil Diperbarui
      </h2>
      <p className="text-center text-gray-700 fs-5">
        Data Pixel Produk Berhasil Diperbarui
      </p>
    </KTModal>
  );
};
