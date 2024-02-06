import { PageTitle } from "@/_metronic/layout/core";
import useAffiliateDashboardViewModel, {
  AkuisisiTableProps,
  akuisisTableData,
  listCardItems,
} from "./Dashboard-view-model";
import ListCard from "@/stories/organism/Tables/ListCard/ListCard";

export default function AffiliateDashboard() {
  const { breadcrumbs, BigChart, Charts, mockData } =
    useAffiliateDashboardViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Dashboard Affiliasi</PageTitle>
      <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />
        </div>

        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />
        </div>

        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />
        </div>
      </div>
      <BigChart {...mockData} className="mb-10" />
      <div className="row gy-5 g-xl-8 mb-10">
        <div className="col-xl-8">
          <ListCard items={listCardItems} />
        </div>
        <div className="col-xl-4">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />{" "}
        </div>
      </div>
      <div className="row gy-5 g-xl-8 mb-10">
        {" "}
        <div className="col-xl-7">
          <AkuisisiTable data={akuisisTableData} />{" "}
        </div>
        <div className="col-xl-5">
          <Charts
            labelIcon="arrow-up"
            labelColorBG="success-subtle"
            dataSeries={[30, 40, 90, 70]}
            categoriesXAxis={["Feb", "Mar", "Apr", "May"]}
          />{" "}
        </div>
      </div>
    </>
  );
}

const AkuisisiTable = ({ data }: AkuisisiTableProps) => {
  return (
    <div className="table-responsive ">
      <div className="card">
        <div className="card-header border-0 pb-0 mb-5 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Data Akuisisi</span>
            <span className="text-muted mt-1 fw-semibold fs-7">
              per Januari 2024
            </span>
          </h3>
        </div>
        <div className="card-body py-3">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-150px">SUMBER TRAFFIC</th>
                <th>VIEW</th>
                <th>LEAD</th>
                <th>SALE</th>
                <th className="text-end min-w-120px">NILAI</th>
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
      </div>
    </div>
  );
};
