import { PageTitle } from "@/_metronic/layout/core";
import useDetailTransactionViewModel, {
  IDetailTransactionProps,
} from "./DetailTransaction-view-model";
import { OrderCard } from "@/stories/molecules/Cards/OrderCard/OrderCard";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";

const TransactionDetail = ({ id, data }: IDetailTransactionProps) => {
  const { transactionCardData, formatWIB } = useDetailTransactionViewModel({
    id,
    data,
  });
  return (
    <>
      <div className="row gy-5 mb-5">
        {transactionCardData.map((data: any, index: number) => (
          <div className="col-lg-6" key={index}>
            <OrderCard className="h-100" data={data} />
          </div>
        ))}
        <KTCard>
          <KTCardBody>
            <div className="row justify-content-start gy-5">
              <div className="col-lg-auto">
                <h2>Riwayat Order</h2>
              </div>
            </div>
            <div className="w-75 ">
              <KTTable>
                <KTTableHead>
                  <th className="text-start fw-bold text-muted">WAKTU</th>
                  <th className="text-start fw-bold text-muted">STATUS</th>
                  <th className="text-start fw-bold text-muted">DETAIL</th>
                </KTTableHead>
                <tbody className="align-middle">
                  <tr>
                    <td className=" text-start fw-bold">
                      <div className="d-flex flex-column">
                        <span className="text-dark fs-5">
                          {formatDate(
                            data?.adminFindOneTransaction?.transaction
                              ?.updatedAt
                          )}
                        </span>
                        <span className="text-muted">
                          {formatWIB(
                            data?.adminFindOneTransaction?.transaction
                              ?.updatedAt
                          )}
                        </span>
                      </div>
                    </td>
                    <td className=" text-start">
                      <div
                        className="d-flex flex-column"
                        style={{ width: "fit-content" }}
                      >
                        <Badge
                          label="Tekan"
                          size="large"
                          badgeColor="success"
                        />
                      </div>
                    </td>
                    <td className=" text-start">
                      <h4>Pembelian Kelas Eksporyuk</h4>
                    </td>
                  </tr>
                </tbody>
              </KTTable>
            </div>
          </KTCardBody>
        </KTCard>
      </div>
    </>
  );
};

export default TransactionDetail;
