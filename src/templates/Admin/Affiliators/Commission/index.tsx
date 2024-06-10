import Link from "next/link";
import { QueryResult } from "@apollo/client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AsyncPaginate } from "react-select-async-paginate";

import useComissionViewModel, {
  formatToIDR,
  breadcrumbs,
  useFilterDropdown,
  // useCoursesDropdown,
  // useMembershipsDropdown,
} from "./Comission-view-model";
import { InvoiceFindManyQuery, TransactionFindManyQuery, PendingCommissionFindManyQuery } from "@/app/service/graphql/gen/graphql";
import DetailComissionModal from "./components/DetailComissionModal";
import { TransactionStatusEnum } from "@/app/service/graphql/gen/graphql";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { SortOrder } from "@/app/service/graphql/gen/graphql";

interface ComissionPageProps {}

const customStyles = {
  // provide correct types here
  control: (provided: any, state: { isFocused: boolean }) => ({
      ...provided,
      borderRadius: '5px',
      border: '2px solid #ccc',
      boxShadow: state.isFocused ? '0 0 0 2px #3699FF' : null,
  }),
  option: (provided: any, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3699FF' : null,
      color: state.isFocused ? 'white' : null,
  }),
}

const CommissionPage = ({}: ComissionPageProps) => {
  const {
    setTakePage,
    skipPage,
    setSkipPage,
    setStatus,
    calculateTotalPage,
    setSearchComission,
    setOrderBy,
    isCustomTake,
    setIsCustomTake,
    takePage,
    invoiceFindMany,
    currentPage,
    handlePageChange,
    setFindTake,
    findTake,
    transactionFindMany,
    pendingComissionFindMany,
    selectedTable,
    setSelectedTable,
    setSearchPendingComission,
    calculateTotalPendingCommPage,
    currentPendingCommPage,
    handlePendingCommPageChange,
    setFindPendingCommTake,
    findPendingCommTake,
    setSearchFilter,
  } = useComissionViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Komisi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head
              setStatus={setStatus}
              onSearch={selectedTable === "commission" ? setSearchComission : setSearchPendingComission}
              setOrderBy={(e: any) => {
                setOrderBy(e);
              }}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              setSearchFilter={setSearchFilter}
            />
          </div>
        </KTCardBody>
        {selectedTable === "commission" ? (

          <Body data={transactionFindMany} />
        ): (
          <PendingCommissionBody data={pendingComissionFindMany} />
        )}
        {selectedTable === "commission" ? (
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
        ): (
          <Footer
            pageLength={calculateTotalPendingCommPage()}
            currentPage={currentPendingCommPage}
            setCurrentPage={(val) => handlePendingCommPageChange(val)}
            findSkip={(val) => {}}
            findTake={(val) => {
              setFindPendingCommTake(val);
            }}
            takeValue={findPendingCommTake}
          />
        )}
      </KTCard>
    </>
  );
};

export default CommissionPage;

const Head = ({ setStatus, onSearch, setOrderBy, selectedTable, setSelectedTable, setSearchFilter }: any) => {
  const { loadOptions: loadAffiliator } = useFilterDropdown();
  // const { loadOptions: loadCourses } = useCoursesDropdown();
  // const { loadOptions: loadMemberships } = useMembershipsDropdown();

  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={{
            onChange: (e: any) =>{
              if (e.target.value === "") {
                onSearch(null);
              } else {
                onSearch(e.target.value)
              }
            },
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <AsyncPaginate
            className="min-w-200px"
            loadOptions={loadAffiliator}
            onChange={(e) => {
              console.log(e);
              if (e?.label === "Semua Affiliator" || e?.label === "Semua Kelas" || e?.label === "Semua Membership") {
                setSearchFilter(null);
                // onSearch(null);
                } else {
                setSearchFilter(e?.label);
              }
            }}
            styles={customStyles}
          />
        </div>
        {/* <div className="col-lg-auto">
          <AsyncPaginate
            className="min-w-200px"
            loadOptions={loadCourses}
            onChange={(e) => {
              console.log(e);
              if (e?.label === "Semua Kelas") {
                setSearchFilter(null);
                // onSearch(null);
                } else {
                setSearchFilter(e?.label);
              }
            }}
          />
        </div>
        <div className="col-lg-auto">
          <AsyncPaginate
            className="min-w-200px"
            loadOptions={loadMemberships}
            onChange={(e) => {
              console.log(e);
              if (e?.label === "Semua Memberships") {
                setSearchFilter(null);
                // onSearch(null);
                } else {
                setSearchFilter(e?.label);
              }
            }}
          />
        </div> */}
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Komisi", value: "commission" },
              { label: "Komisi Pending", value: "pending-commission" },
            ]}
            onValueChange={(e) => {
              setSelectedTable(e);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Tertunda", value: "PENDING" },
              { label: "Belum Dibayar", value: "UNPAID" },
              // { label: "Setengah Dibayar", value: "HALFPAID" },
              // { label: "Lunas", value: "FULLPAID" },
              { label: "Dibatalkan", value: "CANCELLED" },
              { label: "Gagal", value: "FAILED" },
              // { label: "Di Refund", value: "REFUNDED" },
            ]}
            onValueChange={(e) => {
              setStatus(e);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(e) => {
              setOrderBy(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Body = ({ data }: { data: QueryResult<TransactionFindManyQuery> }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [commisionId, setComissionId] = useState(0);

  console.log(data);

  return (
    <div className="table-responsive mb-10 p-10">
      <DetailComissionModal
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        id={commisionId}
      />
      {data.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{data.error.message}</h3>
        </div>
      ) : data.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable utilityGY={3}>
          <KTTableHead>
            <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
            <th className="fw-bold text-muted min-w-100px">Nama Order</th>
            <th className="fw-bold text-muted text-end min-w-80px">Pembeli</th>
            <th className="fw-bold text-muted text-end min-w-150px">
              Affiliasi
            </th>
            <th className="fw-bold text-muted text-end min-w-150px">
              Total Komisi
            </th>
            <th className="fw-bold text-muted text-end min-w-100px">STATUS</th>
          </KTTableHead>

          {data.data?.transactionFindMany?.map((user, index) => {
            const statusMap: { [key: string]: string } = {
              PENDING: "Tertunda",
              PROCESSING: "Di Proses",
              COMPLETED: "Lunas",
              CANCELLED: "Dibatalkan",
              FAILED: "Gagal",
            };

            return (
              <KTTableBody key={index}>
                <td className="fw-bold">INV {user.id}</td>
                <td
                  className="fw-bold text-dark text-hover-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowDetailModal(true);
                    setComissionId(user.id);
                  }}
                >
                  {user.payment?.invoice?.paymentForGateway?.bill_title}
                </td>
                <td className="fw-bold text-muted text-end">
                  {
                    user.payment?.invoice?.paymentForGateway?.sender_name
                  }
                </td>
                <td className="fw-bold text-muted text-end">
                  {
                    user.payment?.invoice?.order?.createdByUser?.affiliator?.user.name ?? "-" 
                  }
                </td>
                <td className="fw-bold text-muted text-end">
                  {formatToIDR(String(user.payment?.invoice?.paymentForGateway?.amount))}
                </td>
                <td className="text-end">
                  <Badge
                    label={statusMap[user.status || ""]}
                    badgeColor={
                      user.status === TransactionStatusEnum.Completed
                        ? "success"
                        : user.status === TransactionStatusEnum.Cancelled
                        ? "danger"
                        : "warning"
                    }
                  />
                </td>
              </KTTableBody>
            );
          })}
        </KTTable>
      )}
    </div>
  );
};

const PendingCommissionBody = ({ data }: { data: any}) => {
  return (
    <div className="table-responsive mb-10 p-10">
      {data.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{data.error.message}</h3>
        </div>
      ) : data.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable utilityGY={3}>
          <KTTableHead>
            <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
            <th className="fw-bold text-muted min-w-100px">Nama Order</th>
            <th className="fw-bold text-muted text-end min-w-80px">Pembeli</th>
            {/* <th className="fw-bold text-muted text-end min-w-150px">
              Affiliasi
            </th> */}
            <th className="fw-bold text-muted text-end min-w-150px">
              Total Komisi
            </th>
            <th className="fw-bold text-muted text-end min-w-100px">STATUS</th>
          </KTTableHead>

          {data.data?.pendingCommissionFindMany?.map((user: any, index: any) => {
            return (
              <KTTableBody key={index}>
                <td className="fw-bold">INV {user.order?.id}</td>
                <td
                  className="fw-bold text-dark text-hover-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {user.productName}
                </td>
                <td className="fw-bold text-muted text-end">
                  {
                    user.orderBy?.name
                  }
                </td>
                {/* <td className="fw-bold text-muted text-end">
                  {
                    "-" 
                  }
                </td> */}
                <td className="fw-bold text-muted text-end">
                  {formatToIDR(String(user.amountCommission))}
                </td>
                <td className="text-end">
                  <Badge
                    label="Pending"
                    badgeColor="warning"
                  />
                </td>
              </KTTableBody>
            );
          })}
        </KTTable>
      )}
    </div>
  )
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
