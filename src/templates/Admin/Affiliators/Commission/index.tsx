import Link from "next/link";

import { PageTitle } from "@/_metronic/layout/core";
import useComissionViewModel, {
  formatToIDR,
  breadcrumbs,
} from "./Comission-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { SortOrder } from "@/app/service/graphql/gen/graphql";
import dynamic from "next/dynamic";

interface ComissionPageProps {}

const CommissionPage = ({}: ComissionPageProps) => {
  const {
    setTakePage,
    skipPage,
    setSkipPage,
    setStatus,
    commissionData,
    loading,
    error,
    calculateTotalPage,
    setSearchComission,
    setOrderBy,
    isCustomTake,
    setIsCustomTake,
    takePage,
  } = useComissionViewModel({});

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Komisi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head
              setStatus={setStatus}
              onSearch={setSearchComission}
              setOrderBy={(e: any) => {
                setOrderBy(e);
              }}
            />
          </div>
        </KTCardBody>
        <QueryComissionTable
          commissionData={commissionData}
          loading={loading}
          error={error}
        />
        <Footer
          setSkipPage={setSkipPage}
          skipPage={skipPage}
          takePage={takePage}
          setTakePage={setTakePage}
          totalPage={calculateTotalPage}
          isCustomTake={isCustomTake}
          setIsCustomTake={setIsCustomTake}
        />
      </KTCard>
    </>
  );
};

export default CommissionPage;

const Head = ({ setStatus, onSearch, setOrderBy }: any) => {
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
              { label: "Semua Status", value: "all" },
              { label: "Pending", value: "PENDING" },
              { label: "Unpaid", value: "UNPAID" },
              { label: "Halfpaid", value: "HALFPAID" },
              { label: "Full Paid", value: "FULLPAID" },
              { label: "Cancelled", value: "CANCELLED" },
              { label: "Failed", value: "FAILED" },
              { label: "Refunded", value: "REFUNDED" },
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

const QueryComissionTable = ({ commissionData, error, loading }: any) => {
  return (
    <div className="table-responsive mb-10 p-10">
      {error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{error.message}</h3>
        </div>
      ) : loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable utilityGY={3}>
          <KTTableHead>
            <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
            <th className="fw-bold text-muted min-w-475px">Nama Kelas</th>
            <th className="fw-bold text-muted text-end min-w-80px">Pembeli</th>
            <th className="fw-bold text-muted text-end min-w-150px">
              Affiliasi
            </th>
            <th className="fw-bold text-muted text-end min-w-150px">
              Total Komisi
            </th>
            <th className="fw-bold text-muted text-end min-w-100px">STATUS</th>
          </KTTableHead>

          {commissionData.map((user: any, index: number) => (
            <KTTableBody key={index}>
              <td className="fw-bold">INV {user.idOrder}</td>
              <td className="fw-bold">
                <Link
                  className="text-dark text-hover-primary"
                  href={
                    "commission/" +
                    user.idOrder.toString().replace(" ", "") +
                    "/detail-order/"
                  }
                >
                  {user.namaKelas}
                </Link>
              </td>
              <td className="fw-bold text-muted text-end">{user.pembeli}</td>
              <td className="fw-bold text-muted text-end">{user.affiliasi}</td>
              <td className="fw-bold text-muted text-end">
                {formatToIDR(user.totalKomisi)}
              </td>
              <td className="text-end">
                <Badge label={user.status} badgeColor={user.badgeColor} />
              </td>
            </KTTableBody>
          ))}
        </KTTable>
      )}
    </div>
  );
};

const Footer = ({
  setSkipPage,
  skipPage,
  setTakePage,
  totalPage,
  isCustomTake,
  setIsCustomTake,
  takePage,
}: any) => {
  const CheckBoxInput = dynamic(
    () =>
      import("@/stories/molecules/Forms/Advance/CheckBox/CheckBox").then(
        (module) => module.CheckBoxInput
      ),
    {
      ssr: false,
    }
  );
  if (skipPage === 0) skipPage = 1;

  return (
    <div className="row justify-content-between gy-5 py-5 px-10">
      <div className="row col-lg-auto gy-3 align-middle">
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

      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
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
    </div>
  );
};
