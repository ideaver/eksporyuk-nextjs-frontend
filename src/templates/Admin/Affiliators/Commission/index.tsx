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

interface ComissionPageProps {}

const CommissionPage = ({}: ComissionPageProps) => {
  const { takePage, setTakePage, skipPage, setSkipPage, status, setStatus, commissionData, loading, error, calculateTotalPage } =
    useComissionViewModel({});

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Komisi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head setStatus={setStatus} />
          </div>
        </KTCardBody>
        {/* <QueryComissionTable
          skipPage={skipPage}
          takePage={takePage}
          status={status}
        /> */}
        <QueryComissionTable
          commissionData={commissionData}
          loading={loading}
          error={error}
        />
        <Footer
          setSkipPage={setSkipPage}
          skipPage={skipPage}
          setTakePage={setTakePage}
          totalPage={calculateTotalPage}
        />
      </KTCard>
    </>
  );
};

export default CommissionPage;

const Head = ({ setStatus, onSearch }: any) => {
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
              { label: "Semua Kelas", value: "all" },
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
              { label: "Semua Status", value: "" },
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
      </div>
    </div>
  );
};

const QueryComissionTable = ({ commissionData, error, loading }: any) => {
  // const { commissionData, loading, error, calculateTotalPage } = useCommisionData(
  //   skipPage,
  //   takePage,
  //   status
  // );

  // console.log("calcullate", calculateTotalPage());

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

const Footer = ({ setSkipPage, skipPage, setTakePage, totalPage }: any) => {
  if (skipPage === 0) skipPage = 1;

  return (
    <div className="row justify-content-between p-5">
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