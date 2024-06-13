import Link from "next/link";
import { QueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

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
import DeleteProductModal from "./components/DeleteProductModal";

import useProductsViewModel, { breadcrumbs } from "./Products-view-model";
import {
  ProductServiceFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
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
    productsLength,
    orderBy,
    setOrderBy,
    setServiceType,
    setStatus,
  } = useProductsViewModel();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let productIds: number[] = [];

  productIds = checkedItems.filter((item) => item.value).map((item) => item.id);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Produk</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={setSearchProduct}
            orderBy={orderBy}
            setOrderBy={(e: any) => {
              setOrderBy(e);
            }}
            productIds={productIds}
            setShowDeleteModal={setShowDeleteModal}
            setServiceType={setServiceType}
            setStatus={setStatus}
          />
          <Body
            data={productServiceFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          />
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            findSkip={(val) => {}}
            findTake={(val) => {
              setFindTake(val);
            }}
            takeValue={findTake}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({
  onSearch,
  orderBy,
  setOrderBy,
  productIds,
  setShowDeleteModal,
  setServiceType,
  setStatus,
}: any) => {
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
              { label: "Lainnya", value: "OTHER" },
            ]}
            onValueChange={(e: any) => {
              if (e === "all") {
                setServiceType(null);
              } else {
                setServiceType(e);
              }
            }}
          />
        </div>
        {/* <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Tipe Pembayaran", value: "all" },
              { label: "Sekali Beli", value: "one-time" },
              { label: "Berlangganan", value: "subscribe" },
            ]}
            onValueChange={() => {}}
          />
        </div> */}
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Buka", value: "true" },
              { label: "Tutup", value: "" },
            ]}
            onValueChange={(e: any) => {
              if (e === "all") {
                setStatus(null);
              } else {
                setStatus(e === "true");
              }
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={orderBy}
            options={[
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(e) => {
              setOrderBy(e as SortOrder);
            }}
          />
        </div>
        <div className="col-lg-auto">
          {productIds.length > 0 ? (
            <button
              className={`ms-auto d-inline btn btn-danger`}
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Product
            </button>
          ) : (
            <Buttons>
              <Link
                href="/admin/product-management/products/create-service"
                className="text-white"
              >
                Tambah Service Baru
              </Link>
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

const Body = ({
  data,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
  showDeleteModal,
  setShowDeleteModal,
}: {
  data: QueryResult<ProductServiceFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: number; value: boolean }[];
  selectAll: boolean;
  showDeleteModal: boolean;
  setShowDeleteModal: (index: boolean) => void;
}) => {
  const { setOrderBy, orderBy, setSearchProduct } = useProductsViewModel();
  const router = useRouter();

  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState(0);

  let productIds: number[] = [];

  productIds = checkedItems.filter((item) => item.value).map((item) => item.id);

  return (
    <>
      <DeleteProductModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        productId={productId}
        productIds={productIds}
      />

      {data.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{data?.error.message}</h3>
        </div>
      ) : data?.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable utilityGY={5} responsive="table-responsive my-10">
          <KTTableHead
            textColor="muted"
            fontWeight="bold"
            className="text-uppercase align-middle"
          >
            <th className="min-w-150px">
              <CheckBoxInput
                checked={selectAll}
                name="check-all"
                value="all"
                defaultChildren={false}
                onChange={handleSelectAllCheck}
              >
                <>Nama Layanan</>
              </CheckBoxInput>
            </th>
            <th className="min-w-150px text-center">Tipe Layanan</th>
            <th className="text-end min-w-150px">Harga</th>
            <th className="text-center">Total Pembelian</th>
            <th className="text-end">Status</th>
            <th className="text-end min-w-100px">Actions</th>
          </KTTableHead>
          {data.data?.productServiceFindMany?.map((product, index) => {
            const tipeLayananMap: { [key: string]: string } = {
              OTHER: "Lainnya",
              LEGALITY: "Legalitas",
              WEBSITE: "Website",
            };

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
                    <Link href={`/admin/product-management/products/detail/${product.id}`}>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <span className="symbol-label bg-gray-600">
                            <img
                              src={
                                product?.images?.[0]?.path ??
                                "/media/products/1.png"
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
                    </Link>
                  </CheckBoxInput>
                </td>
                <td className="fw-bold text-muted text-center align-middle w-125px">
                  {tipeLayananMap[product?.productServiceCategory || ""]}
                </td>
                <td className="align-middle text-end text-muted fw-bold w-125px">
                  <span className="text-muted fs-6 fw-bold">
                    {currencyFormatter(product?.basePrice)}
                  </span>
                </td>
                <td className="align-middle text-center">
                  <span className="text-muted fs-6 fw-bold">
                    {product?.purchaseCount}
                  </span>
                </td>
                <td className="align-middle text-end">
                  <Badge
                    label={product.isActive ? "Buka" : "Tutup"}
                    badgeColor={product.isActive ? "success" : "danger"}
                  />{" "}
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
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            router.push(`/admin/product-management/products/edit/${product.id}`)
                          }
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setProductId(product.id);
                          }}
                        >
                          Hapus
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </KTTableBody>
            );
          })}
        </KTTable>
      )}
    </>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  findTake,
  pageLength,
  takeValue,
}: {
  findTake: (val: number) => void;
  findSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  takeValue: number;
}) => {
  return (
    <div className="row justify-content-between">
      <div className="col-auto">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {takeValue}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  findTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  findTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={takeValue}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  findTake(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
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
