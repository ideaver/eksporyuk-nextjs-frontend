import Link from "next/link";
import { useState, useEffect } from "react";

import { PageTitle } from "@/_metronic/layout/core";
import useComissionViewModel, { TableRow } from "./Comission-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";

import { useInvoiceFindManyQuery } from "@/app/service/graphql/gen/graphql";

interface ComissionPageProps {}

const CommissionPage = ({}: ComissionPageProps) => {
  const { breadcrumbs } = useComissionViewModel({});
  const [takePage, setTakePage] = useState(20);
  const [skipPage, setSkipPage] = useState(1);
  const [status, setStatus] = useState(null);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Komisi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head setStatus={setStatus} />
          </div>
        </KTCardBody>
        <QueryComissionTable skipPage={skipPage} takePage={takePage} status={status} />
        <Footer setSkipPage={setSkipPage} skipPage={skipPage} setTakePage={setTakePage} />
      </KTCard>
    </>
  );
};

export default CommissionPage;

const Head = ({ setStatus }: any) => {
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
            onValueChange={(e) => { setStatus(e) }}
          />
        </div>
      </div>
    </div>
  );
};

const QueryComissionTable = ({ skipPage, takePage, status }: any) => {
  const { data, loading, error } = useInvoiceFindManyQuery({
    variables: {
      skip: skipPage,
      take: takePage,
      where: {
        status: {
          equals: status,
        }
      }
    }
  });
  const [commissionData, setComissionData] = useState<TableRow[]>([]);

  useEffect(() => {
    if (data && data.invoiceFindMany) {
      const commissionData = data.invoiceFindMany.map((invoice: any) => ({
        idOrder: invoice.orderId,
        namaKelas: invoice.order?.enrollment?.map(
          (title: any) => title.course.title
        ),
        pembeli: invoice.order?.enrollment?.map(
          (name: any) => name.course.enrollments[0].student.user.name
        ),
        affiliasi: invoice.order?.enrollment?.map(
          (name: any) =>
            name.course.enrollments[0].student.user.affiliator.user.name
        ),
        totalKomisi: invoice.amount,
        status: invoice.status,
        badgeColor: invoice.status === "FULLPAID" ? "success" : invoice.status === "CANCELLED" ? "danger" : "warning",
      }));
      setComissionData(commissionData);
    }
  }, [data]);

  const formatToIDR = (amount: string) => {
    return parseInt(amount).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="table-responsive mb-10 p-10">
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
                {user.namaKelas}
              </Link>
            </td>
            <td className="fw-bold text-muted text-end">{user.pembeli}</td>
            <td className="fw-bold text-muted text-end">{user.affiliasi}</td>
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

const Footer = ({ setSkipPage, skipPage, setTakePage }: any) => {
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
          onValueChange={(e) => { setTakePage(e) }}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={skipPage}
          maxLength={5}
          onPageChange={(e) => {
            setSkipPage(e);
          }}
        ></Pagination>
      </div>
    </div>
  )
}
