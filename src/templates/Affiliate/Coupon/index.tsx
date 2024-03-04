import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import useCouponViewModel, { CouponTableProps } from "./Coupon-view-model";
import { PageTitle } from "@/_metronic/layout/core";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { CouponContents } from "@/stories/organism/Contens/CouponContents/CouponContents";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { KTModal } from "@/_metronic/helpers/components/KTModal";

const Coupon = () => {
  const { breadcrumbs, couponTable, couponDetailsData, couponProductsData } =
    useCouponViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Kupon</PageTitle>
      <KTCard>
        <KTCardBody>
          <Head />
          <CouponTable tableData={couponTable} />
          <Footer />
        </KTCardBody>
      </KTCard>
      <KTModal
        dataBsTarget="kt_coupon_modal"
        title="Detail Kupon"
        fade
        modalCentered
        footerContentCentered
        onClose={() => { }}
        buttonClose={
          <Buttons buttonColor='secondary' classNames="fw-bold" data-bs-dismiss="modal">Tutup</Buttons>
        }
        modalSize="xl"
        buttonSubmit={false}
      >
        <CouponContents
          coupons={couponDetailsData}
          products={couponProductsData}
        />
      </KTModal>
      <KTModal
        dataBsTarget="kt_create_coupon_modal"
        title="Tambah Kupon"
        fade
        modalCentered
        footerContentCentered
        onClose={() => {

        }}
        modalSize="lg"
        buttonClose={
          <Buttons buttonColor='secondary' classNames="fw-bold" data-bs-dismiss="modal">Batal</Buttons>
        }
        buttonSubmit={
          <Buttons classNames="fw-bold">Simpan</Buttons>
        }
      >
        <div>
          <h4 className="required fw-bold text-gray-700">
            Pilih Kupon Utama
          </h4>
          <Dropdown
            styleType="solid"
            props={{ id: "couponName" }}
            options={[
              { label: "EKSPORYUK", value: "mainCoupon1" },
              { label: "Kupon Utama 2", value: "mainCoupon2" },
            ]}
            onValueChange={() => { }}
          />
          <p className="fw-bold text-gray-600 mt-3">
            Pilih kupon utama yang dibuat oleh admin
          </p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField
            styleType="solid"
            placeholder="Masukkan Nama Kupon anda"
          />
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
    </>
  );
};

export default Coupon;

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
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Jenis Kupon", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => { }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Situs", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => { }}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons
            data-bs-toggle="modal"
            data-bs-target="#kt_create_coupon_modal"
          >
            Tambah Kupon
          </Buttons>
        </div>
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
          onValueChange={() => { }}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => { }}
        ></Pagination>
      </div>
    </div>
  );
};

const CouponTable = ({ tableData }: { tableData: CouponTableProps[] }) => {
  return (
    <div className="table-responsive mt-5">
      <table className="table gy-5">
        <thead>
          <tr className="fw-bold text-uppercase text-muted">
            <th className="w-200px">Kode Kupon</th>
            <th className="w-360px">Kupon Utama</th>
            <th className="text-end">Diskon</th>
            <th className="text-end">Penggunaan</th>
            <th className="text-end">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td
                className=""
                data-bs-toggle="modal"
                data-bs-target="#kt_coupon_modal"
              >
                <span className="text-dark fw-bold me-5 cursor-pointer text-hover-primary">
                  {data.name}
                </span>
                {data.name !== "-" && (
                  <button className="btn p-0">
                    <KTIcon
                      iconName="copy"
                      className="fs-1 text-hover-primary "
                    />
                  </button>
                )}
              </td>
              <td className="">
                <span className="text-muted fw-bold me-5">
                  {data.mainCouponName}
                </span>
                {data.mainCouponName !== "-" && (
                  <button className="btn p-0">
                    <KTIcon
                      iconName="copy"
                      className="fs-1 text-hover-primary "
                    />
                  </button>
                )}
              </td>
              <td className="text-muted text-end fw-bold">{data.value}</td>
              <td className="text-muted text-end fw-bold">{data.usage}</td>
              <td className="text-muted text-end fw-bold">
                <Badge
                  label={data.status.label}
                  badgeColor={data.status.color}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
