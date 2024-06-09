import { KTCard, KTCardBody } from "@/_metronic/helpers";
import useOrderHistoryViewModel from "./OrderHistory-view-model";
import { Badge } from "@/stories/atoms/Badge/Badge";

const OrderHistory = ({}) => {
  const { tableDatas } = useOrderHistoryViewModel({});
  return (
    <>
      <KTCard>
        <KTCardBody>
          <h3 className="card-title">Data Akuisisi</h3>
          <div className="table-responsive mt-5">
            <table className="table gy-5">
              <thead>
                <tr>
                  <th className="fw-bold text-muted text-uppercase min-w-150px">
                    Waktu
                  </th>
                  <th className="fw-bold text-muted text-uppercase min-w-200px">
                    Status
                  </th>
                  <th className="fw-bold text-muted text-uppercase min-w-300px">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableDatas.map((data, index) => (
                  <tr key={index}>
                    <td className="d-flex flex-column fw-bold ">
                      <span className="text-dark">{data.waktu.date}</span>
                      <span className="text-muted">{data.waktu.time}</span>
                    </td>
                    <td>
                      <Badge
                        label={data.status.label}
                        badgeColor={data.status.color}
                      />
                    </td>
                    <td className="text-muted">{data.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default OrderHistory;
