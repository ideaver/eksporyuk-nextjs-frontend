import { KTCard, KTCardBody } from "@/_metronic/helpers";
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
import { useEffect } from "react";
import { breadcrumbs } from "./Products-view-model";

const Products = ({}) => {
  useEffect(() => {
    const modalElement = document.getElementById(
      "kt_create_coupon_modalllllsss"
    );
    if (!modalElement) return;

    const handleModalShow = () => {
      console.log("Modal is about to be shown");
    };

    const handleModalShown = () => {
      console.log("Modal has been shown");
    };

    modalElement.addEventListener("show.bs.modal", handleModalShow);
    modalElement.addEventListener("shown.bs.modal", handleModalShown);

    // Clean up the event listeners when the component is unmounted
    return () => {
      modalElement.removeEventListener("show.bs.modal", handleModalShow);
      modalElement.removeEventListener("shown.bs.modal", handleModalShown);
    };
  }, []);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Kelas</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head />
          <KTTable utilityGY={5} responsive="table-responsive my-10">
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="w-50px">
                <CheckBoxInput
                  checked={false}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={() => {}}
                >
                  <></>
                </CheckBoxInput>
              </th>
              <th className="min-w-375px">Nama Course</th>
              <th className="text-end min-w-100px">Kategori</th>
              <th className="text-end min-w-275px">Author</th>
              <th className="text-end min-w-125px">Harga</th>
              <th className="text-end min-w-200px">Tanggal Pembuatan</th>
              <th className="text-end min-w-200px">Jumlah Siswa</th>
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
                  <></>
                </CheckBoxInput>
              </td>
              <td className="align-middle ">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-50px me-5">
                    <span className="symbol-label bg-gray-600">
                      <img
                        src={"/media/products/1.png"}
                        width={50}
                        height={50}
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                      Ekspor Yuk Automation (EYA)
                    </span>
                    <span className="fw-bold text-muted">
                      4 Topic, 12 Lesson, 0 Quiz, 0 Assignment
                    </span>
                  </div>
                </div>
              </td>
              <td className="fw-bold text-muted align-middle w-125px">
                Aplikasi EYA
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
                      Mentor EksporYuk
                    </span>
                  </div>
                </div>
              </td>
              <td className="align-middle text-end text-muted fw-bold w-125px">
                Rp 399.000
              </td>
              <td className="align-middle text-end text-muted fw-bold w-150px">
                12 November 2022
              </td>
              <td className="align-middle text-end text-muted fw-bold w-150px">
                2.200
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
              { label: "Semua Kategori", value: "all" },
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
          <Buttons>
            <Link href={"products/create/information"} className="text-white">
              Tambah Kelas Baru
            </Link>
          </Buttons>
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

export default Products;
