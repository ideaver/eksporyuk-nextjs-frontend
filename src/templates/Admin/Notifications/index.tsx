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
  } = useNotificationsViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Notifikasi</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head onSearch={setSearchNotification} orderBy={setDateOrderBy} />
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
}: {
  onSearch: (val: string) => void;
  orderBy: any;
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
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Tipe Notifikasi", value: "all" },
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
            <th className="w-300px">
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
            <th className="">Pengguna</th>
            <th className="">Tanggal</th>
            <th className="">Status</th>
            <th className="min-w-100px">Actions</th>
          </KTTableHead>
          {data.data?.notificationFindMany?.map((notif, index) => {
            return (
              <KTTableBody key={index}>
                <td className="align-middle">
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
                      <Link href={`/admin/notifications/detail/${notif.id}`} className="text-muted fw-bold text-truncate">
                        {notif.title}
                      </Link>
                    </div>
                  </CheckBoxInput>
                </td>
                <td className="align-middle">
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
                <td className="align-middle text-start text-muted fw-bold">
                  <p className="m-0">
                    {formatDate(notif.createdAt) ?? "27 Mei 2024"}
                  </p>
                  <p className="m-0">
                    {formatTime(notif.createdAt) ?? "8:12 WIB"}
                  </p>
                </td>
                <td className="align-middle text-start text-muted fw-bold">
                  <Badge
                    badgeColor={
                      notif.onCompletionStatus === "FAILED"
                        ? "danger"
                        : notif.onCompletionStatus === "NOT_STARTED"
                        ? "warning"
                        : "success"
                    }
                    label={String(notif.onCompletionStatus)}
                    onClick={function noRefCheck() {}}
                  />
                </td>
                <td className="align-middle text-start">
                  <div className="dropdown z-3">
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
                          Edit
                        </button>
                        <button className="dropdown-item" onClick={() => {}}>
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

const Footer = ({ skipPage, setSkipPage, setTakePage, totalPage }: any) => {
  if (skipPage === 0) skipPage = 1;

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
          onValueChange={(e) => setTakePage(e)}
        />
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
