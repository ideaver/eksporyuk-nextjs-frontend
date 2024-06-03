import { QueryResult } from "@apollo/client";

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

import useActivityViewModel, {
  breadcrumbs,
  formatRelativeTime,
  genRandomIP,
} from "./Activity-view-model";
import {
  ActivityFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";

const Activity = () => {
  const {
    currentPage,
    setCurrentPage,
    setFindSkip,
    setFindTake,
    handlePageChange,
    calculateTotalPage,
    activityLength,
    activityFindMany,
    orderBy,
    setOrderBy,
    findTake,
  } = useActivityViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Aktifitas</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            orderBy={orderBy}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <Body data={activityFindMany} />
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

export default Activity;

const Head = ({
  orderBy,
  setOrderBy,
}: {
  orderBy: SortOrder;
  setOrderBy: (e: SortOrder) => void;
}) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <h1>Aktifitas User</h1>
      </div>
      <div className="row col-lg-auto gy-3 align-items-center">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={orderBy}
            options={[
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(val) => {
              setOrderBy(val as SortOrder);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <button className="btn btn-secondary">View All</button>
        </div>
        <div className="col-lg-auto">
          <button className="btn btn-secondary">New User</button>
        </div>
        <div className="col-lg-auto">
          <button className="btn btn-secondary">Login Issues</button>
        </div>
      </div>
    </div>
  );
};

const Body = ({ data }: { data: QueryResult<ActivityFindManyQuery> }) => {
  console.log(data.data?.activityFindMany);

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
            <th className="min-w-100px">IP Address</th>
            <th className="text-start min-w-200px">Hostname</th>
            <th className="text-end min-w-200px">Country</th>
            <th className="text-end min-w-200px">Date</th>
            <th className="text-end min-w-200px">Event</th>
            <th className="text-end min-w-200px">Local User</th>
          </KTTableHead>
          {data.data?.activityFindMany?.map((activity, index) => {
            return (
              <KTTableBody key={index}>
                <td className="text-start min-w-200px">
                  <span className="text-primary fs-6 fw-bold">
                    {genRandomIP()}
                  </span>
                </td>
                <td className="text-start min-w-200px">
                  <span className="text-dark cursor-pointer fs-6 fw-bold">
                    ...
                  </span>
                </td>
                <td className="text-end min-w-200px">
                  <span className="text-muted fs-6 fw-bold">Unknown</span>
                </td>
                <td className="text-end min-w-200px">
                  <span className="text-muted fs-6 fw-bold">
                    {formatRelativeTime(activity.updatedAt)}
                  </span>
                </td>
                <td className="text-end min-w-200px">
                  <span className="text-muted fs-6 fw-bold">
                    {activity.type}
                  </span>
                </td>
                <td className="text-end min-w-200px text-muted fw-bold">
                  <p className="m-0 text-primary">{activity.user.name}</p>
                  <p className="m-0">{activity.user.role}</p>
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
