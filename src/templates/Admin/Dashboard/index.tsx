import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { PageTitle } from "@/_metronic/layout/core";
import dashboardViewModel, {
  AkuisisiTableProps,
  dashboardTableMocks,
  DashboardTableProps,
  useNewMember,
  useOrderCountByCustomPeriod,
  useReferralLink,
  useTotalLead,
  useTotalOmzet,
  useTotalSales,
  useUserCompetitor,
} from "./Dashboard-view-model";
import { useCallback, useMemo, useRef } from "react";
import { QueryResult } from "@apollo/client";
import {
  OmzetsReferralLinkQuery,
  UserCompetitorsQueryQuery,
} from "@/app/service/graphql/gen/graphql";

const Dashboard = ({}) => {
  const { breadcrumbs, simplifyNumber } =
    dashboardViewModel.useDashboardViewModel();
  const {
    series: salesSeries,
    categories: salesCategories,
    totalSalesData,
    setPeriod: setPeriodSales,
  } = useTotalSales();

  const {
    series: leadSeries,
    categories: leadCategories,
    totalLeadData,
    setPeriod: setPeriodLead,
  } = useTotalLead();

  const {
    series: omzetSeries,
    categories: omzetCategories,
    totalOmzetData,
    setPeriod: setPeriodOmzet,
  } = useTotalOmzet();

  const { newMemberTotal, setPeriod: setMemberPeriod } = useNewMember();

  const {
    series: orderPeriodSeries,
    categories: orderPeriodCategories,
    setPeriod: setOrderCountPeriod,
  } = useOrderCountByCustomPeriod();

  const { data: userCompetitorData } = useUserCompetitor();

  const { data: omzetReferralLinkData } = useReferralLink();

  const isFullHeightChart = window.innerWidth > 768; // Change 768 to your desired breakpoint

  const { BigChart, Charts, OrderAffiliateChart, TopSalesChart } =
    dashboardViewModel.usePackages();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Dashboard Admin</PageTitle>
      <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xl-4">
          <Charts
            value={
              totalLeadData?.totalLead &&
              simplifyNumber(totalLeadData?.totalLead)
            }
            subLabel="Total Lead"
            dataSeries={leadSeries}
            categoriesXAxis={leadCategories}
            onDropdownValueChanged={(e) => {
              setPeriodLead(Number(e));
            }}
          />
        </div>

        <div className="col-xl-4">
          <Charts
            value={
              totalSalesData?.totalSales &&
              simplifyNumber(totalSalesData?.totalSales)
            }
            subLabel="Total Sales"
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            baseChartColor="info"
            lightChartColor="info-light"
            label="2.2%"
            dataSeries={salesSeries}
            categoriesXAxis={salesCategories}
            onDropdownValueChanged={(e) => {
              setPeriodSales(Number(e));
            }}
          />
        </div>

        <div className="col-xl-4">
          <Charts
            value={
              totalOmzetData?.totalOmzet &&
              simplifyNumber(totalOmzetData?.totalOmzet)
            }
            subLabel="Total Omzet"
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            baseChartColor="danger"
            lightChartColor="danger-light"
            label="3.2%"
            dataSeries={omzetSeries}
            categoriesXAxis={omzetCategories}
            onDropdownValueChanged={(e) => {
              setPeriodOmzet(Number(e));
            }}
          />
        </div>
      </div>
      <BigChart
        series={orderPeriodSeries ?? []}
        categories={orderPeriodCategories ?? []}
        className="mb-10"
        title="Riwayat Penjualan"
        subTitle="Sales(Jumlah Pembelian) dan Omzet (Dalam hitungan Juta)"
        onDropdownValueChange={(e) => {
          setOrderCountPeriod(Number(e));
        }}
      />
      <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xxl-8">
          <Charts
            classNames="h-100"
            value={newMemberTotal.data?.userCount?.toString()}
            title="Member Baru"
            subTitle="Perkembangan member baru"
            subLabel="Member baru bulan ini"
            labelIcon="arrow-down"
            labelColorBG="danger-subtle"
            textColor="danger"
            dataSeries={[30, 40, 32, 5]}
            fullHeightChart={isFullHeightChart}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
            onDropdownValueChanged={(value) => {
              setMemberPeriod(Number(value));
            }}
          />
        </div>
        <div className="col">
          <DashboardTable
            title="Kelas Terpopuler"
            subtitle="Siswa baru tiap kelas"
            data={{
              title: "NAMA COURSE",
              value: "SISWA  BARU",
              data: dashboardTableMocks,
            }}
          />
        </div>
      </div>

      <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xl-4">
          <DashboardTable
            title="Top 10 Omzet"
            subtitle="1,3 M total omzet"
            data={{
              title: "PRODUK",
              value: "TOTAL OMZET",
              data: dashboardTableMocks,
            }}
          />
        </div>
        <div className="col-xl-4">
          <DashboardTable
            title="Top 10 Produk"
            subtitle="2,2 rb total sales"
            data={{
              title: "PRODUK",
              value: "TOTAL SALES",
              data: dashboardTableMocks,
            }}
          />
        </div>
        <div className="col-xl-4">
          <AffiliateTable
            title="Top 10 Affiliasi"
            subtitle="420 jt omzet affiliasi"
            data={userCompetitorData}
          />
        </div>
      </div>
      {/* <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xl-8">
          <ListCard items={listCardItems} className="h-100" />
        </div>
        <div className="col-xl-4">
          <OrderAffiliateChart
            chartColorPembayaran="warning"
            chartColorProses="info"
            chartColorPengiriman="gray-300"
            chartHeight={200}
            className="h-100"
            series={[55, 30, 33]}
            categories={["Pembayaran", "Proses", "Pengiriman"]}
            title="Order Afiliasi Aktif"
            subTitle="Order afiliasi yang belum selesai"
            dataPembayaran={55}
            dataProses={30}
            dataPengiriman={33}
            labelPembayaran="Pembayaran"
            labelProses="Proses"
            labelPengiriman="Pengiriman"
          />
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />{" "}
        </div>
      </div> */}
      <div className="row gy-5 g-xl-8 mb-10">
        {" "}
        <div className="col-xl-7">
          <AkuisisiTable data={omzetReferralLinkData} />{" "}
        </div>
        <div className="col-xl-5">
          <TopSalesChart
            items={[
              {
                icon: "/media/svg/brand-logos/whatsapp.svg",
                title: "Whatsapp",
                salesValue: 1476619696,
                precentageValue: 70,
                colorPrecentage: "success",
                colorSubtle: "success-subtle",
              },
              {
                icon: "/media/svg/brand-logos/instagram-2-1.svg",
                title: "Instagram",
                salesValue: 21321,
                precentageValue: 70,
                colorPrecentage: "warning",
                colorSubtle: "warning-subtle",
              },
              {
                icon: "/media/svg/brand-logos/facebook-5.svg",
                title: "Facebook",
                salesValue: 123,
                precentageValue: 70,
                colorPrecentage: "primary",
                colorSubtle: "primary-subtle",
              },
              {
                icon: "/media/svg/brand-logos/tiktok.svg",
                title: "Tiktok",
                salesValue: 123,
                precentageValue: 70,
                colorPrecentage: "info",
                colorSubtle: "info-subtle",
              },
              {
                icon: "/media/svg/brand-logos/google-icon.svg",
                title: "E-mail",
                salesValue: 123,
                precentageValue: 70,
                colorPrecentage: "success",
                colorSubtle: "success-subtle",
              },
            ]}
            categories={[
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
            ]}
            chartColor="success"
            className="h-100"
            series={[55, 30, 33, 55, 30, 33, 55, 30, 33]}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const DashboardTable = ({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: DashboardTableProps;
}) => {
  return (
    <KTCard className="h-100">
      <KTCardBody>
        <div className="mb-5 ">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{title}</span>
          </h3>
          <span className="text-muted mt-1 fw-semibold fs-7">{subtitle}</span>
        </div>
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-150px">{data.title}</th>
                <th className="text-end min-w-125px">{data.value}</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, index) => (
                <tr key={index}>
                  <td className="fw-bold">
                    <div className="d-flex align-items-center ">
                      <div className="symbol symbol-50px me-5">
                        <span className="symbol-label bg-gray-600">
                          <img src={row.img} width={50} height={50} alt="" />
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                          {row.title}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="fw-bold text-end"> {row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  );
};
const AffiliateTable = ({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: UserCompetitorsQueryQuery | undefined;
}) => {
  return (
    <KTCard className="h-100">
      <KTCardBody>
        <div className="mb-5 ">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{title}</span>
          </h3>
          <span className="text-muted mt-1 fw-semibold fs-7">{subtitle}</span>
        </div>
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-150px">AFFILIASI</th>
                <th className="text-end min-w-125px">TOTAL OMZET</th>
              </tr>
            </thead>
            <tbody>
              {data?.userCompetitorQuery?.map((row, index) => (
                <tr key={index}>
                  <td className="fw-bold">
                    <div className="d-flex align-items-center ">
                      <div className="symbol symbol-50px me-5">
                        <span className="symbol-label bg-gray-600">
                          <img
                            src={
                              row.User?.avatarImageId ?? "/media/avatars/300-1"
                            }
                            width={50}
                            height={50}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                          {row.User?.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="fw-bold text-end"> {row.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  );
};

const AkuisisiTable = ({
  data,
}: {
  data: OmzetsReferralLinkQuery | undefined;
}) =>
  // AkuisisiTableProps

  {
    return (
      <KTCard className="h-100">
        <KTCardBody>
          <div className="mb-5 ">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                Data Akuisisi
              </span>
            </h3>
            <span className="text-muted mt-1 fw-semibold fs-7">
              per Januari 2024
            </span>
          </div>
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="min-w-150px">SUMBER TRAFFIC</th>
                  <th>VIEW</th>
                  <th>LEAD</th>
                  <th>SALE</th>
                  <th className="text-end min-w-125px">NILAI</th>
                </tr>
              </thead>
              <tbody>
                {data?.omzetReferralLink?.map((row, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{row?.typeSocialMedia}</td>
                    <td className="fw-bold text-muted">{row.clicks}</td>
                    <td className="fw-bold text-muted">{row.totalLead}</td>
                    <td className="fw-bold text-muted">{row.sales}</td>
                    <td className="fw-bold text-muted text-end">{row.omzet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>
    );
  };
