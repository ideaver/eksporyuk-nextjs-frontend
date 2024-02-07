import { PageTitle } from "@/_metronic/layout/core";
import useCommissionViewModel, {
  TableProps,
  TableRow,
  tableData,
} from "./Commission-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";

interface CommissionPageProps {}

const CommissionPage = ({}: CommissionPageProps) => {
  const { breadcrumbs } = useCommissionViewModel({});
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Komisi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head />
          </div>
          <Table data={tableData} />
          <Footer />
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default CommissionPage;

const Head = () => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Produk", value: "all" },
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
              { label: "Semua Tier", value: "all" },
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

const Footer = () => {
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
          onValueChange={() => {}}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => {}}
        ></Pagination>
      </div>
    </div>
  );
};

const Table = ({ data }: TableProps) => {
  return (
    <div className="table-responsive mb-10">
      <table className="table">
        <thead>
          <tr>
            <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
            <th className="fw-bold text-muted min-w-475px">NAMA PRODUK</th>
            <th className="fw-bold text-muted text-end min-w-80px">TIER</th>
            <th className="fw-bold text-muted text-end min-w-150px">
              TOTAL KOMISI
            </th>
            <th className="fw-bold text-muted text-end min-w-100px">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="fw-bold">{row.idOrder}</td>
              <td className="fw-bold">
                <Link
                  className="text-dark text-hover-primary"
                  href={"commission/" + row.idOrder + "/order/"}
                >
                  {row.namaProduk}
                </Link>
              </td>
              <td className="fw-bold text-muted text-end">{row.tier}</td>
              <td className="fw-bold text-muted text-end">{row.totalKomisi}</td>
              <td className="text-end">
                <Badge label={row.status} badgeColor={row.badgeColor} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
