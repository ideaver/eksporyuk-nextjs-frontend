import { PageTitle } from "@/_metronic/layout/core";
import {
  AkuisisiTableProps,
  akuisisTableData,
  listCardItems,
} from "./Dashboard-view-model";
import ListCard from "@/stories/organism/Tables/ListCard/ListCard";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import dashboardViewModel from "./Dashboard-view-model";

const Dashboard = ({}) => {
  const { breadcrumbs, mockData } = dashboardViewModel.useDashboardViewModel();

  const { BigChart, Charts, OrderAffiliateChart, TopSalesChart } =
    dashboardViewModel.usePackages();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Dashboard Affiliasi</PageTitle>
      <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-down"
            labelColorBG="danger-subtle"
            textColor="danger"
            dataSeries={[30, 40, 32, 5]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />
        </div>

        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            baseChartColor="info"
            lightChartColor="info-light"
            label="2.2%"
            dataSeries={[20, 80, 30, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />
        </div>

        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            baseChartColor="danger"
            lightChartColor="danger-light"
            label="3.2%"
            dataSeries={[35, 29, 43, 54]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />
        </div>
      </div>
      <BigChart {...mockData} className="mb-10" />
      <div className="row gy-5 g-xl-8 mb-10">
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
          {/* <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />{" "} */}
        </div>
      </div>
      <div className="row gy-5 g-xl-8 mb-10">
        {" "}
        <div className="col-xl-7">
          <AkuisisiTable data={akuisisTableData} />{" "}
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

const AkuisisiTable = ({ data }: AkuisisiTableProps) => {
  return (
    <KTCard className="h-100">
      <KTCardBody>
        <div className="mb-5 ">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Data Akuisisi</span>
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
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="fw-bold">{row.source}</td>
                  <td className="fw-bold text-muted">{row.view}</td>
                  <td className="fw-bold text-muted">{row.lead}</td>
                  <td className="fw-bold text-muted">{row.sale}</td>
                  <td className="fw-bold text-muted text-end">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  );
};
