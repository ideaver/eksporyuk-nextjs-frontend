import { PageTitle } from "@/_metronic/layout/core";
import useBuyerViewModel, {
  breadcrumbs,
  useCountryDropdown,
} from "./Buyer-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import Link from "next/link";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  BuyerDeleteManyMutation,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { MutationFunctionOptions } from "@apollo/client";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const BuyerPage = () => {
  const {
    setBuyerFindCountry,
    formatDate,
    calculateTotalPage,
    buyerFindMany,
    setBuyerFindTake,
    setBuyerFindSearch,
    currentPage,
    handlePageChange,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    checked,
    buyerDeleteMany,
    handleDownloadTamplateFile,
    orderBy,
    setOrderBy,
    buyerFindTake,
  } = useBuyerViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Buyer</PageTitle>
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
        active={useSelector((state: RootState) => state.buyer.loadingImport)}
        spinner
      >
        <KTCard>
          <KTCardBody>
            <Head
              setSearchCountry={(id) => {
                setBuyerFindCountry(id);
              }}
              onSearch={(val) => {
                setBuyerFindSearch(val);
              }}
              checkedItems={checked}
              handleDownloadTamplateFile={handleDownloadTamplateFile}
              orderBy={orderBy}
              setOrderBy={(e) => {
                setOrderBy(e);
              }}
            />
            {buyerFindMany.error ? (
              <div className="d-flex justify-content-center align-items-center h-500px flex-column">
                <h3 className="text-center">{buyerFindMany.error.message}</h3>
              </div>
            ) : buyerFindMany.loading ? (
              <div className="d-flex justify-content-center align-items-center h-500px">
                <h3 className="text-center">Loading....</h3>
              </div>
            ) : (
              <KTTable
                utilityGY={5}
                utilityGX={8}
                responsive="table-responsive my-10"
                className="fs-6"
              >
                <KTTableHead
                  textColor="muted"
                  fontWeight="bold"
                  className="text-uppercase align-middle"
                >
                  <th className="min-w-200px">
                    <CheckBoxInput
                      checked={selectAll}
                      name="check-all"
                      value="all"
                      defaultChildren={false}
                      onChange={() => {
                        handleSelectAllCheck();
                      }}
                    >
                      <p className="mb-0">NAMA BUYER</p>
                    </CheckBoxInput>
                  </th>
                  <th className="text-end min-w-200px">NAMA PERUSAHAAN</th>
                  <th className="text-end min-w-250px">NEGARA</th>
                  <th className="text-end min-w-250px">ALAMAT</th>
                  <th className="text-end min-w-200px">E-MAIL</th>
                  <th className="text-end min-w-200px">NO. TELEPON</th>
                  <th className="text-end min-w-250px">TANGGAL TERDAFTAR</th>
                  <th className="text-end min-w-200px">DEMAND</th>
                  <th className="text-end min-w-250px">QUANTITY REQUIRED</th>
                  <th className="text-end min-w-200px">SHIPPING TERMS</th>
                  <th className="text-end min-w-125px">ACTION</th>
                </KTTableHead>

                <tbody className="align-middle">
                  {buyerFindMany.data?.buyerFindMany?.map((buyer, index) => {
                    return (
                      <tr key={buyer.id} className="">
                        <td className="">
                          <CheckBoxInput
                            className="ps-0"
                            checked={checkedItems[index]?.value ?? false}
                            name="check-all"
                            value="all"
                            defaultChildren={false}
                            onChange={() => {
                              handleSingleCheck(index);
                            }}
                          >
                            <p className="fw-bold text-black mb-0">
                              {buyer.buyerName}
                            </p>
                          </CheckBoxInput>
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.companyName}
                        </td>
                        <td className="min-w-250px text-end fw-bold text-muted">
                          {/* <img
                        className="symbol-label bg-gray-600 rounded-circle mx-3"
                        src={buyer.country?.flagEmoji}
                        width={40}
                        height={40}
                        alt="flag"
                      /> */}
                          <span className=" mx-3">
                            {buyer.country?.flagEmoji}
                          </span>
                          <span className="text-muted fw-bold">
                            {buyer.country?.name}
                          </span>
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.address}
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.email}
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.phone}
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {formatDate(buyer.createdAt)}
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.productName}
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.quantity} <span>{buyer.abbreviation}</span>
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          {buyer.deliveryType}
                        </td>
                        <td className="text-end ">
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
                                <Link
                                  href={`/admin/buyers/edit/${buyer.id}`}
                                  className="dropdown-item"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </KTTable>
            )}
            <Footer
              pageLength={calculateTotalPage()}
              currentPage={currentPage}
              setCurrentPage={(val) => handlePageChange(val)}
              setBuyerFindSkip={(val) => {}}
              setBuyerFindTake={(val) => {
                setBuyerFindTake(val);
              }}
              buyerFindTake={buyerFindTake}
            />
          </KTCardBody>
        </KTCard>
      </LoadingOverlayWrapper>
      <ImportModal />
    </>
  );
};

const Head = ({
  onSearch,
  setSearchCountry,
  checkedItems,
  handleDownloadTamplateFile,
  orderBy,
  setOrderBy,
}: {
  onSearch: (val: string) => void;
  setSearchCountry: (id: number) => void;
  checkedItems: number[];
  handleDownloadTamplateFile: () => void;
  orderBy: SortOrder;
  setOrderBy: (e: SortOrder) => void;
}) => {
  const { loadOptions } = useCountryDropdown();
  const { buyerDeleteMany, buyerFindMany, deleteLoading, setDeleteLoading } =
    useBuyerViewModel();
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
        />
      </div>
      <div className="col-lg-auto row gy-3">
        <div className="col-lg-auto">
          <AsyncPaginate
            className="min-w-200px"
            loadOptions={loadOptions}
            onChange={(id) => setSearchCountry(id?.value as number)}
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
          <Buttons mode="light" onClick={handleDownloadTamplateFile}>
            Tamplate Data Buyer
          </Buttons>
        </div>
        <div className="col-lg-auto">
          <Buttons
            mode="light"
            data-bs-toggle="modal"
            data-bs-target="#kt_import_data_modal"
          >
            Import Data
          </Buttons>
        </div>

        <div className="col-lg-auto">
          {checkedItems.length > 0 ? (
            <Buttons
              buttonColor="danger"
              disabled={deleteLoading}
              onClick={async () => {
                setDeleteLoading(true);
                try {
                  await buyerDeleteMany({
                    variables: {
                      where: {
                        id: {
                          in: checkedItems,
                        },
                      },
                    },
                  });
                  await buyerFindMany.refetch();
                } catch (error) {
                  console.log(error);
                } finally {
                  setDeleteLoading(false);
                }
              }}
            >
              Delete Selected Items
            </Buttons>
          ) : (
            <Buttons>
              <Link
                href={"/admin/buyers/buyer-information"}
                className="text-white"
              >
                Add New Buyyer
              </Link>
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setBuyerFindTake,
  setBuyerFindSkip,
  pageLength,
  buyerFindTake,
}: {
  currentPage: number;
  pageLength: number;
  setCurrentPage: (val: number) => void;
  setBuyerFindTake: (val: number) => void;
  setBuyerFindSkip: (val: number) => void;
  buyerFindTake: number;
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
            {buyerFindTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setBuyerFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setBuyerFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={buyerFindTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setBuyerFindTake(parseInt(e.target.value));
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

const ImportModal = () => {
  const { handleFileChange, fileXLSXPreview, handleImportDataBuyer } =
    useBuyerViewModel();
  return (
    <div>
      <KTModal
        dataBsTarget="kt_import_data_modal"
        title="Import Data Buyer"
        fade
        modalCentered
        buttonClose={
          <Buttons
            buttonColor="secondary"
            data-bs-dismiss="modal"
            classNames="fw-bold"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={
          <Buttons
            data-bs-dismiss="modal"
            classNames="fw-bold"
            onClick={handleImportDataBuyer}
          >
            Import
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <div className="mx-10">
          <p className="fw-bold fs-5  text-muted">Tamplate Data Buyer</p>
        </div>
        <div className="min-h-50px">
          <input
            type="file"
            onChange={handleFileChange}
            className="d-none"
            accept=".xlsx"
            id="input-file"
          />
          {fileXLSXPreview ? (
            <div className="m-4 mx-10">
              <div className="d-flex">
                <img
                  src="/media/svg/files/xlsx.svg"
                  width={60}
                  height={60}
                  alt="xlsx icon"
                />
                <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                  <h4>{fileXLSXPreview}</h4>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mx-10">
          <p className="fw-bold required text-muted mt-2 fs-5">
            Pilih File Yang Ingin Diimport
          </p>
          <label
            htmlFor="input-file"
            className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed mt-5"
          >
            <div className="title">
              <div className="mt-1 text-muted fw-bold mb-0">
                <div className="d-flex">
                  <img
                    src="/media/svg/files/upload.svg"
                    width={50}
                    height={50}
                    alt="xlsx icon"
                  />
                  <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                    <h4>Pilih file yang ingin di upload</h4>
                    <h5 className="text-muted">
                      File yang diupload harus berformat .XLSX
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </KTModal>
    </div>
  );
};

export default BuyerPage;
