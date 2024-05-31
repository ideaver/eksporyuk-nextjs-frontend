import Link from "next/link";
import { QueryResult } from "@apollo/client";

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
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";

import useProductsViewModel, { breadcrumbs } from "./Products-view-model";
import { ProductServiceFindManyQuery } from "@/app/service/graphql/gen/graphql";
import currencyFormatter from "@/_metronic/helpers/Formatter";

const CoursePage = ({}) => {
  const {
    productServiceFindMany,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    skipPage,
    setSkipPage,
    setTakePage,
    searchProduct,
    setSearchProduct,
    calculateTotalPage,
    currentPage,
    setCurrentPage,
    findSkip,
    setFindSkip,
    findTake,
    setFindTake,
    handlePageChange,
    productsLength
  } = useProductsViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Produk</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={setSearchProduct}
          />
          <Body
            data={productServiceFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
          />
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            findSkip={(val) => {}}
            findTake={(val) => {
              setFindTake(val);
            }}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({ onSearch }: any) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={{
            onChange: (e: any) => onSearch(e.target.value),
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Tipe Produk", value: "all" },
              { label: "Legalitas", value: "LEGALITY" },
              { label: "Website", value: "WEBSITE" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Tipe Pembayaran", value: "all" },
              { label: "Sekali Beli", value: "one-time" },
              { label: "Berlangganan", value: "subscribe" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Buka", value: "true" },
              { label: "Tutup", value: "" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons>
            <Link href="/admin/products/create-service" className="text-white">
              Tambah Service Baru
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

const Body = ({
  data,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
}: {
  data: QueryResult<ProductServiceFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: number; value: boolean }[];
  selectAll: boolean;
}) => {
  console.log(data);

  return (
    <KTTable utilityGY={5} responsive="table-responsive my-10">
      <KTTableHead
        textColor="muted"
        fontWeight="bold"
        className="text-uppercase align-middle"
      >
        <th className="min-w-375px">
          <CheckBoxInput
            checked={false}
            name="check-all"
            value="all"
            defaultChildren={false}
            onChange={() => {}}
          >
            <>Nama Produk</>
          </CheckBoxInput>
        </th>
        <th className="min-w-150px text-end">Tipe Produk</th>
        <th className="text-end min-w-150px">Tipe Pembayaran</th>
        <th className="text-end min-w-150px">Harga</th>
        <th className="text-end min-w-125px">Total Omset</th>
        <th className="text-end min-w-200px">Total Kuantiti</th>
        <th className="text-end min-w-200px">Total Order</th>
        <th className="text-end min-w-150px">Status</th>
        <th className="text-end min-w-100px">Actions</th>
      </KTTableHead>
      {data.data?.productServiceFindMany?.map((product, index) => {
        return (
          <KTTableBody key={index}>
            <td className="align-middle">
              <CheckBoxInput
                className="d-flex"
                checked={checkedItems[index]?.value ?? false}
                name={"check-" + product.id}
                value={String(product.id)}
                defaultChildren={false}
                onChange={() => handleSingleCheck(index)}
              >
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-50px me-5">
                    <span className="symbol-label bg-gray-600">
                      <img
                        src={
                          product?.images?.[0]?.path ?? "/media/products/1.png"
                        }
                        width={50}
                        height={50}
                        alt=""
                      />
                    </span>
                  </div>
                  <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                    {product?.name}
                  </span>
                </div>
              </CheckBoxInput>
            </td>
            <td className="fw-bold text-muted text-end align-middle w-125px">
              {product?.productServiceCategory}
            </td>
            <td className="align-middle text-end w-250px">
              <span className="text-muted fs-6 fw-bold">Sekali Beli</span>
            </td>
            <td className="align-middle text-end text-muted fw-bold w-125px">
              <span className="text-muted fs-6 fw-bold">
                {currencyFormatter(product?.basePrice)}
              </span>
            </td>
            <td className="align-middle text-end text-muted fw-bold w-150px">
              <span className="text-muted fs-6 fw-bold">Rp 399.000</span>
            </td>
            <td className="align-middle text-end text-muted fw-bold w-150px">
              <span className="text-muted fs-6 fw-bold">
                {product?.purchaseCount}
              </span>
            </td>
            <td className="align-middle text-end">
              <span className="text-muted fs-6 fw-bold">
                {product?.purchaseCount}
              </span>
            </td>
            <td className="align-middle text-end">
              <Badge label="Buka" badgeColor="success" />{" "}
            </td>
            <td className="align-middle text-end ">
              <div className="dropdown  ps-15 pe-0">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Actions
                </button>
                {/* <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => {}}>
                  Kirim Pengaturan ulang kata sandi
                </button>
              </li>
              <li>
                <button className="dropdown-item">Edit</button>
              </li>
              <li>
                <button className="dropdown-item">Hapus</button>
              </li>
            </ul> */}
              </div>
            </td>
          </KTTableBody>
        );
      })}
      {/* <KTTableBody>
        <td className="align-middle">
          <CheckBoxInput
            className="ps-0"
            checked={false}
            name="check-all"
            value="all"
            defaultChildren={false}
            onChange={() => {}}
          >
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
              <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                Ekspor Yuk Automation (EYA)
              </span>
            </div>
          </CheckBoxInput>
        </td>
        <td className="fw-bold text-muted text-end align-middle w-125px">
          Non Fisik
        </td>
        <td className="align-middle text-end w-250px">
          <span className="text-muted fs-6 fw-bold">Sekali Beli</span>
        </td>
        <td className="align-middle text-end text-muted fw-bold w-125px">
          <span className="text-muted fs-6 fw-bold">Rp 399.000</span>
        </td>
        <td className="align-middle text-end text-muted fw-bold w-150px">
          <span className="text-muted fs-6 fw-bold">Rp 399.000</span>
        </td>
        <td className="align-middle text-end text-muted fw-bold w-150px">
          <span className="text-muted fs-6 fw-bold">40</span>
        </td>
        <td className="align-middle text-end">
          <span className="text-muted fs-6 fw-bold">10</span>
        </td>
        <td className="align-middle text-end">
          <Badge label="Buka" badgeColor="success" />{" "}
        </td>
        <td className="align-middle text-end ">
          <div className="dropdown  ps-15 pe-0">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => {}}>
                  Kirim Pengaturan ulang kata sandi
                </button>
              </li>
              <li>
                <button className="dropdown-item">Edit</button>
              </li>
              <li>
                <button className="dropdown-item">Hapus</button>
              </li>
            </ul>
          </div>
        </td>
      </KTTableBody> */}
    </KTTable>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  findTake,
  pageLength,
}: {
  findTake: (val: number) => void;
  findSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
}) => {
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
          onValueChange={(val) => findTake(val as number)}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={pageLength}
          current={currentPage}
          maxLength={5}
          onPageChange={(val) => setCurrentPage(val)}
        ></Pagination>
      </div>
    </div>
  );
};

export default CoursePage;
