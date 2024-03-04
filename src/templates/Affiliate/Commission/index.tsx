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
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";

interface CommissionPageProps { }

const CommissionPage = ({ }: CommissionPageProps) => {
  const { breadcrumbs } = useCommissionViewModel({});
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Komisi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head />
          </div>
          {/* <Table data={tableData} />
          <div className="mt-10" /> */}
          <QueryCommissionTable />
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
            onValueChange={() => { }}
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
            onValueChange={() => { }}
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
            onValueChange={() => { }}
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
          onValueChange={() => { }}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => { }}
        ></Pagination>
      </div>
    </div>
  );
};

// const Table = ({ data }: TableProps) => {
//   return (
//     <div className="table-responsive mb-10">
//       <table className="table">
//         <thead>
//           <tr>
//             <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
//             <th className="fw-bold text-muted min-w-475px">NAMA PRODUK</th>
//             <th className="fw-bold text-muted text-end min-w-80px">TIER</th>
//             <th className="fw-bold text-muted text-end min-w-150px">
//               TOTAL KOMISI
//             </th>
//             <th className="fw-bold text-muted text-end min-w-100px">STATUS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td className="fw-bold">{row.idOrder}</td>
//               <td className="fw-bold">
//                 <Link
//                   className="text-dark text-hover-primary"
//                   href={
//                     "commission/" +
//                     row.idOrder.replace(" ", "") +
//                     "/detail-order/"
//                   }
//                 >
//                   {row.namaProduk}
//                 </Link>
//               </td>
//               <td className="fw-bold text-muted text-end">{row.tier}</td>
//               <td className="fw-bold text-muted text-end">{row.totalKomisi}</td>
//               <td className="text-end">
//                 <Badge label={row.status} badgeColor={row.badgeColor} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

const QueryCommissionTable = () => {
  const [commissionData, setCommissionData] = useState<TableRow[]>([]);

  const GET_COMISSION = gql`
  query InvoiceFindMany($where: InvoiceWhereInput) {
  invoiceFindMany(where: $where) {
    id
    adminFee
    amount
    uniqueCode
    createdAt
    updatedAt
    status
    orderId
    order {
      id
    }
    payments {
      id
      amount
      createdAt
      updatedAt
      method
      status
      invoiceId
      transactionId
      invoice {
        id
        adminFee
        amount
        uniqueCode
        createdAt
        updatedAt
        status
        orderId
      }
    }
  }
}`;

  const { loading, error, data } = useQuery(GET_COMISSION);

  useEffect(() => {
    if (data && data.invoiceFindMany) {
      const commissionData = data.invoiceFindMany.map((invoice: any) => ({
        idOrder: invoice.orderId,
        namaProduk: "Product Name",
        tier: "Tier",
        totalKomisi: invoice.amount,
        status: invoice.status,
        badgeColor: invoice.status === "PAID" ? "success" : "warning",
      }));
      setCommissionData(commissionData);
    }
  }, [data]);

  const formatToIDR = (amount: string) => {
    return parseInt(amount).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
  };

  return (
    <div className="table-responsive mb-10">
      <KTTable utilityGY={3}>
        <KTTableHead>
          <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
          <th className="fw-bold text-muted min-w-475px">NAMA PRODUK</th>
          <th className="fw-bold text-muted text-end min-w-80px">TIER</th>
          <th className="fw-bold text-muted text-end min-w-150px">
            TOTAL KOMISI
          </th>
          <th className="fw-bold text-muted text-end min-w-100px">STATUS</th>
        </KTTableHead>

        {commissionData.map((user, index) => (
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
                {user.namaProduk}
              </Link>
            </td>
            <td className="fw-bold text-muted text-end">{user.tier}</td>
            <td className="fw-bold text-muted text-end">{formatToIDR(user.totalKomisi)}</td>
            <td className="text-end">
              <Badge label={user.status} badgeColor={user.badgeColor} />
            </td>
          </KTTableBody>
        ))}

      </KTTable>
    </div>
  );
};