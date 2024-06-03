import { QueryResult } from "@apollo/client";
import Link from "next/link";

import useNotificationsViewModel, {
  breadcrumbs,
  formatDate,
  formatTime,
} from "./Notifications-view-model";
import { NotificationFindManyQuery } from "@/app/service/graphql/gen/graphql";

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
  } = useNotificationsViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Notifikasi</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={setSearchNotification}
            orderBy={setDateOrderBy}
            completionStatus={setCompletionStatus}
          />
          <Body
            data={notificationFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
          />
          <Footer
            skipPage={skipPage}
            setSkipPage={setSkipPage}
            setTakePage={setTakePage}
            totalPage={calculateTotalPage}
            takePage={takePage}
          />
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
}: {
  onSearch: (val: string) => void;
  orderBy: any;
  completionStatus: any;
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
            options={[
              { label: "Semua Status", value: "" },
              { label: "Belum Diproses", value: "NOT_STARTED" },
              { label: "Dalam Proses", value: "IN_PROGRESS" },
              { label: "Selesai", value: "COMPLETED" },
              { label: "Gagal", value: "FAILED" },
              { label: "Selesai", value: "RESOLVED" },
              { label: "Ditutup", value: "CLOSED" },
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
  console.log(data.data?.notificationFindMany);

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
                      <p className="text-muted fw-bold text-truncate m-0">
                        {notif.title}
                      </p>
                    </div>
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

const Footer = ({
  skipPage,
  setSkipPage,
  setTakePage,
  totalPage,
  takePage,
}: any) => {
  if (skipPage === 0) skipPage = 1;

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
            {takePage}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setTakePage(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setTakePage(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={takePage}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setTakePage(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-auto">
        <Pagination
          total={totalPage()}
          current={skipPage}
          maxLength={5}
          onPageChange={(e) => {
            if (e === 1) e = 0;
            setSkipPage(e);
          }}
        ></Pagination>
      </div>
    </div>
  );
};
