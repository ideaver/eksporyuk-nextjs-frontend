import { QueryResult } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import useNotificationsViewModel, {
  breadcrumbs,
  // formatDate,
  formatTime,
} from "./Notifications-view-model";
import { NotificationFindManyQuery, InstantWithdrawalRequestFindManyQuery } from "@/app/service/graphql/gen/graphql";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";
import { formatDate } from "@/app/service/utils/dateFormatter";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import WithdrawalRequestModal from "./components/WithdrawalRequestModal";

const NotificationPage = () => {
  const {
    notificationFindMany,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    calculateTotalPage,
    setSearchNotification,
    skipPage,
    setSkipPage,
    setTakePage,
    setDateOrderBy,
    setCompletionStatus,
    takePage,
    currentPage,
    handlePageChange,
    setFindTake,
    findTake,
    instantWithdrawalRequestFindMany,
    selectedTable,
    setSelectedTable,
    setSearchWithdrawal,
    calculateTotalWithdrawalPage,
    currentWithdrawalPage,
    handleWithdrawalPageChange,
    setFindWithdrawalTake,
    findWithdrawalTake,
    setWithdrawalStatus,
    loading,
  } = useNotificationsViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Notifikasi</PageTitle>
      <LoadingOverlayWrapper
        active={loading}
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
        spinner
      ></LoadingOverlayWrapper>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={
              selectedTable === "notification"
                ? setSearchNotification
                : setSearchWithdrawal
            }
            orderBy={setDateOrderBy}
            completionStatus={selectedTable === "notification" ? setCompletionStatus : setWithdrawalStatus}
            selectedTable={String(selectedTable)}
            setSelectedTable={(val: string | number) => setSelectedTable(val)}
          />
          {selectedTable === "notification" ? (
            <Body
              data={notificationFindMany}
              handleSelectAllCheck={handleSelectAllCheck}
              handleSingleCheck={handleSingleCheck}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
          ) : (
            <WithdrawalBody data={instantWithdrawalRequestFindMany} />
          )}
          {selectedTable === "notification" ? (
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
          ) : (
            <Footer
              pageLength={calculateTotalWithdrawalPage()}
              currentPage={currentWithdrawalPage}
              setCurrentPage={(val) => handleWithdrawalPageChange(val)}
              findSkip={(val) => {}}
              findTake={(val) => {
                setFindWithdrawalTake(val);
              }}
              takeValue={findWithdrawalTake}
            />
          )}
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default NotificationPage;

const Head = ({
  onSearch,
  orderBy,
  completionStatus,
  selectedTable,
  setSelectedTable,
}: {
  onSearch: (val: string) => void;
  orderBy: any;
  completionStatus: any;
  selectedTable: string;
  setSelectedTable: (val: string | number) => void;
}) => {
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
      <div className="row col-lg-auto gy-3 align-items-center">
        <div className="col-lg-auto">
          <p className="m-0">Urutkan Dari</p>
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Latest", value: "asc" },
              { label: "Oldest", value: "desc" },
            ]}
            onValueChange={(e: any) => orderBy(e)}
          />
        </div>
        {/* <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Tipe Notifikasi", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div> */}
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={selectedTable}
            options={[
              { label: "Notifikasi", value: "notification" },
              { label: "Withdrawal Request", value: "withdrawal" },
            ]}
            onValueChange={(e) => {
              setSelectedTable(e);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={selectedTable === "notification" ? [
              { label: "Semua Status", value: "" },
              { label: "Belum Diproses", value: "NOT_STARTED" },
              { label: "Dalam Proses", value: "IN_PROGRESS" },
              { label: "Selesai", value: "COMPLETED" },
              { label: "Gagal", value: "FAILED" },
              { label: "Selesai", value: "RESOLVED" },
              { label: "Ditutup", value: "CLOSED" },
            ]: [
              { label: "Semua Status", value: "" },
              { label: "Di Diproses", value: "PROCESSING" },
              { label: "Ditolak", value: "REJECTED" },
              { label: "Di Terima", value: "APPROVED" },
            ]}
            onValueChange={(e: any) => {
              completionStatus(e);
              if (e === "") completionStatus(null);
            }}
          />
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
}: {
  data: QueryResult<NotificationFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: number; value: boolean }[];
  selectAll: boolean;
}) => {
  return (
    <>
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
            <th className="min-w-300px">
              <CheckBoxInput
                className="w-150px"
                checked={selectAll}
                name="check-all"
                value="all"
                defaultChildren={false}
                onChange={handleSelectAllCheck}
              >
                <>Notifikasi</>
              </CheckBoxInput>
            </th>
            <th className="text-start min-w-200px">Pengguna</th>
            <th className="text-end min-w-200px">Tanggal</th>
            <th className="text-end min-w-200px">Status</th>
            <th className="text-end min-w-200px">Actions</th>
          </KTTableHead>
          {data.data?.notificationFindMany?.map((notif, index) => {
            const statusMap: { [key: string]: string } = {
              NOT_STARTED: "Belum Diproses",
              IN_PROGRESS: "Dalam Proses",
              COMPLETED: "Selesai",
              FAILED: "Gagal",
              RESOLVED: "Selesai",
              CLOSED: "Ditutup",
            };

            return (
              <KTTableBody key={index}>
                <td className="text-end min-w-200px">
                  <CheckBoxInput
                    className="d-flex"
                    checked={checkedItems[index]?.value ?? false}
                    name={"check-" + notif.id}
                    value={String(notif.id)}
                    defaultChildren={false}
                    onChange={() => handleSingleCheck(index)}
                  >
                    <Link href={`/admin/notifications/detail/${notif.id}`}>
                      <div className="d-flex justify-content-start align-items-center gap-3">
                        <div
                          className="bg-gray p-2"
                          style={{
                            backgroundColor: "#E1E3EA",
                            borderRadius: "5px",
                          }}
                        >
                          <i
                            className="bi bi-envelope"
                            style={{ fontSize: "30px" }}
                          ></i>
                        </div>
                        <p className="fw-bold text-truncate m-0">
                          {notif.title}
                        </p>
                      </div>
                    </Link>
                  </CheckBoxInput>
                </td>
                <td className="text-end min-w-200px">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5 symbol-circle">
                      <span className="symbol-label bg-gray-600">
                        <img
                          className="symbol-label bg-gray-600"
                          src={
                            notif.user?.avatarImageId ??
                            "/media/avatars/300-2.jpg"
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </span>
                    </div>
                    <span className="text-dark cursor-pointer fs-6 fw-bold">
                      {notif.user?.name ?? "Unknown User"}
                    </span>
                  </div>
                </td>
                <td className="text-end min-w-200px text-muted fw-bold">
                  <p className="m-0">
                    {formatDate(notif.createdAt) ?? "27 Mei 2024"}
                  </p>
                  <p className="m-0">
                    {formatTime(notif.createdAt) ?? "8:12 WIB"}
                  </p>
                </td>
                <td className="text-end min-w-200px text-muted fw-bold">
                  <Badge
                    badgeColor={
                      notif.onCompletionStatus === "FAILED"
                        ? "danger"
                        : notif.onCompletionStatus === "NOT_STARTED"
                        ? "warning"
                        : notif.onCompletionStatus === "IN_PROGRESS"
                        ? "warning"
                        : "success"
                    }
                    label={statusMap[notif.onCompletionStatus || ""]}
                    onClick={function noRefCheck() {}}
                  />
                </td>
                <td className="text-end min-w-200px">
                  <div className="dropdown z-3">
                    <Link
                      href={`/admin/notifications/detail/${notif.id}`}
                      className="btn btn-secondary"
                    >
                      Lihat Detail
                    </Link>
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

const WithdrawalBody = ({
  data,
}: {
  data: QueryResult<InstantWithdrawalRequestFindManyQuery>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [withdrawalId, setWithdrawalId] = useState<number>(0);
  const [withdrawalStatus, setWithdrawalStatus] = useState<string>("");

  return (
    <>
      <WithdrawalRequestModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        action={modalAction}
        withdrawalId={withdrawalId}
        withdrawalStatus={withdrawalStatus}
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
            <th className="text-center">
              Pengguna
            </th>
            <th className="text-center">Email</th>
            <th className="text-end">Tanggal</th>
            <th className="text-end">Amount</th>
            <th className="text-end">Status</th>
            <th className="text-center">Actions</th>
          </KTTableHead>
          {data.data?.instantWithdrawalRequestFindMany?.map((withDrawal, index) => {
            const statusMap: { [key: string]: string } = {
              PROCESSING: "Di Diproses",
              REJECTED: "Ditolak",
              APPROVED: "Di Terima",
            };

            return (
              <KTTableBody key={index}>
                <td className="text-center">
                  <Link href={`affiliate/affiliator/detail/${withDrawal.createdById}/profile`}>
                    {withDrawal.createdBy.user.name}
                  </Link>
                </td>
                <td className="text-center">
                  {withDrawal.createdBy.user.email}
                </td>
                <td className="text-end text-muted fw-bold">
                  {/* <p className="m-0">
                    {formatDate(notif.createdAt) ?? "-"}
                  </p>
                  <p className="m-0">
                    {formatTime(notif.createdAt) ?? "-"}
                  </p> */}
                  {formatDate(withDrawal.createdAt)}
                </td>
                <td className="text-end text-muted fw-bold">
                  {formatCurrency(withDrawal.amount)}
                </td>
                <td className="text-end text-muted fw-bold">
                  <Badge
                    badgeColor={
                      withDrawal.status === "REJECTED"
                        ? "danger"
                        : withDrawal.status === "PROCESSING"
                        ? "warning"
                        : "success"
                    }
                    label={statusMap[withDrawal.status || ""]}
                    onClick={function noRefCheck() {}}
                  />
                </td>
                <td className="text-center min-w-200px">
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-success" onClick={() => {
                      setShowModal(true);
                      setModalAction("approve");
                      setWithdrawalId(withDrawal.id);
                      setWithdrawalStatus("APPROVED");
                    }}>Approve</button>
                    <button className="btn btn-danger" onClick={() => {
                      setShowModal(true);
                      setModalAction("reject");
                      setWithdrawalId(withDrawal.id);
                      setWithdrawalStatus("REJECTED");
                    }}>Reject</button>
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
