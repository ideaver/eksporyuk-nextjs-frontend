import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { breadcrumbs } from "../Products/Products-view-model";
import useAdminOrderViewModel from "./Order-view-model";

const OrderPage = ({}) => {
  const {
    exportModalState,
    setExportModalState,
  } = useAdminOrderViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Order</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head  />
          <KTTable utilityGY={5} responsive="table-responsive my-10">
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="min-w-150px">
                <CheckBoxInput
                  checked={false}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={() => {}}
                >
                  <p className="mb-0">ID ORDER</p>
                </CheckBoxInput>
              </th>
              <th className="min-w-275px">Nama Course</th>
              <th className="text-end min-w-275px">Pembeli</th>
              <th className="text-end min-w-200px">Tanggal Pembelian</th>
              <th className="text-end min-w-200px">Total Harga</th>
              <th className="text-end min-w-275px">Afiliasi</th>
              <th className="text-end min-w-200px">Kupon</th>
              <th className="text-end min-w-150px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>
            <tr>
              <td className="align-middle">
                <CheckBoxInput
                  className="ps-0"
                  checked={false}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={() => {}}
                >
                  <p className="fw-bold text-black mb-0">INV 12345</p>
                </CheckBoxInput>
              </td>
              <td className="align-middle ">
                <div className="d-flex align-items-center">
                  <Link
                    href="orders/inv1234/detail-order"
                    className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold mb-0"
                  >
                    Ekspor Yuk Automation (EYA)
                  </Link>
                </div>
              </td>

              <td className="align-middle text-end w-250px">
                <div className="d-flex align-items-center justify-content-end">
                  <div className="symbol symbol-50px symbol-circle me-5">
                    <img
                      className="symbol-label bg-gray-600"
                      src={"/media/avatars/300-1.jpg"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-muted text-hover-primary cursor-pointer fs-6 fw-bold">
                      Cindy Ayu Pradila
                    </span>
                  </div>
                </div>
              </td>
              <td className="align-middle text-end text-muted fw-bold w-150px">
                12 November 2022
              </td>
              <td className="align-middle text-end text-muted fw-bold w-150px">
                Rp 698.342
              </td>
              <td className="align-middle text-end w-250px">
                <div className="d-flex align-items-center justify-content-end">
                  <div className="symbol symbol-50px symbol-circle me-5">
                    <img
                      className="symbol-label bg-gray-600"
                      src={"/media/avatars/300-1.jpg"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-muted text-hover-primary cursor-pointer fs-6 fw-bold">
                      Didik Sugiarto
                    </span>
                  </div>
                </div>
              </td>
              <td className="align-middle text-end text-muted fw-bold w-150px">
                EKSPORYUK
              </td>
              <td className="align-middle text-end">
                <p>
                  {" "}
                  <Badge label="Published" badgeColor="success" />{" "}
                </p>
              </td>
              <td className="align-middle text-end ">
                <Dropdown
                  styleType="solid"
                  options={[
                    { label: "Action", value: "all" },
                    { label: "Aktif", value: "active" },
                    { label: "Tidak Aktif", value: "inactive" },
                  ]}
                  onValueChange={() => {}}
                />
              </td>
            </tr>
          </KTTable>

          <Footer />
        </KTCardBody>
      </KTCard>
      <ExportModal
        onClose={()=>{}}
        date={exportModalState}
        onChange={([startDate, endDate]) => {
          setExportModalState([startDate, endDate]);
        }}
      />
    </>
  );
};

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
      {/* TODO This is for multiple instace, make when integrating */}
      {/* <div className="row col-lg-auto gy-3 align-items-center">
        <div className="col-lg-auto">
          <p className="mb-0 fw-bold">3 Items Selected</p>
        </div>
        <div className="col-lg-auto">
          <Buttons mode="light">Change Status</Buttons>
        </div>
        <div className="col-lg-auto">
          <Buttons
            data-bs-toggle="modal"
            data-bs-target="#kt_create_coupon_modalllllsss"
            buttonColor="danger"
          >
            Delete Selected
          </Buttons>
        </div>
      </div> */}
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Tipe Order", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons  data-bs-toggle="modal" data-bs-target="#kt_export_order_modal">Export Data</Buttons>
        </div>
      </div>
      <KTModal
        dataBsTarget="kt_create_coupon_modalllllsss"
        title="Tambah Kupon"
        fade
        modalCentered
        footerContentCentered
        onClose={() => {}}
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
        buttonSubmit={<Buttons classNames="fw-bold">Simpan</Buttons>}
      >
        <div>
          <h4 className="required fw-bold text-gray-700">Pilih Kupon Utama</h4>
          <Dropdown
            styleType="solid"
            props={{ id: "couponName" }}
            options={[
              { label: "EKSPORYUK", value: "mainCoupon1" },
              { label: "Kupon Utama 2", value: "mainCoupon2" },
            ]}
            onValueChange={() => {}}
          />
          <p className="fw-bold text-gray-600 mt-3">
            Pilih kupon utama yang dibuat oleh admin
          </p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField styleType="solid" placeholder="Masukkan Nama Kupon anda" />
          <p className="fw-bold text-gray-600 mt-3">
            Masukkan kode kupon yang ingin anda gunakan dan bagikan
          </p>
        </div>
        <Alert
          alertColor="warning"
          mode="light"
          label="Hanya bisa membuat 1 kupon dari setiap kupon utama. Kupon yang sudah anda buat tidak dapat diubah kembali."
          title="PERHATIAN"
          labelColor="dark"
          border="dashed"
          prefixIcon="shield-cross"
        ></Alert>
      </KTModal>
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

const ExportModal = ({
  date,
  onChange,
  onClose,
}: {
  date: Date;
  onChange: (value: any) => void;
  onClose: () => void;
}) => {
  return (
    <div>
      <KTModal
        dataBsTarget="kt_export_order_modal"
        title="Export Data"
        fade
        modalCentered
        onClose={onClose}
        buttonClose={
          <Buttons buttonColor="secondary" data-bs-dismiss="modal" classNames="fw-bold">Batal</Buttons>
        }
        buttonSubmit={
          <Buttons data-bs-dismiss="modal" classNames="fw-bold">Export</Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <p className="fw-bold required text-gray-700">Pilih Rentang Waktu</p>
        <Flatpickr
          value={date}
          onChange={onChange}
          options={{
            mode: "range",
            dateFormat: "d m Y",
          }}
          className="form-control form-control-solid"
          placeholder="Pilih Rentang Waktu"
        />
        <p className="fw-bold text-muted mt-2">
          Pilih rentang waktu data yang ingin diexport
        </p>
      </KTModal>
    </div>
  );
}


export default OrderPage;
