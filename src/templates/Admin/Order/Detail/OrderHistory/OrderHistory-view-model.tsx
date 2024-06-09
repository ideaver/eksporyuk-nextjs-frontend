import { OrderFindOneQuery, OrderStatusEnum } from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { ColorList } from "@/types/general/utilities";

interface TableRowData {
  waktu: { date: string; time: string };
  status: { label: string; color: ColorList };
}

function getStatusBadgeColor(status: OrderStatusEnum | undefined) {
  switch (status) {
    case OrderStatusEnum.Pending:
      return "warning";
    case OrderStatusEnum.Processing:
      return "primary";
    case OrderStatusEnum.Done:
      return "success";
    case OrderStatusEnum.Shipped:
      return "info";
    case OrderStatusEnum.Delivered:
      return "success";
    case OrderStatusEnum.Cancelled:
      return "danger";
    case OrderStatusEnum.Returned:
      return "secondary";
    default:
      return "info";
  }
}
const tableData = (data: OrderFindOneQuery["orderFindOne"]) => {
  const latestStatus = data?.statuses?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
  const tableData: TableRowData[] | undefined = data?.statuses?.map(
    (status) => {
      return {
        waktu: {
          date: formatDate(status.createdAt),
          time: new Date(status.createdAt).toLocaleTimeString(),
        },
        status: {
          label: status?.status ?? "No Status",
          color: getStatusBadgeColor(status?.status),
        },
    
      };
    }
  );

  // {
  //   waktu: { date: "8 Januari 2024", time: "15.00 WIB" },
  //   status: { label: "Selesai", color: "success" },
  //   detail: (
  //     <>
  //       Order diubah ke <span className="fw-bold text-dark">Selesai</span> oleh{" "}
  //       <span className="fw-bold text-dark">AdminEksporyuk25</span>
  //     </>
  //   ),
  // },
  // {
  //   waktu: { date: "8 Januari 2024", time: "15.00 WIB" },
  //   status: { label: "Menunggu Konfirmasi", color: "primary" },
  //   detail: (
  //     <>
  //       Bukti pembayaran telah dikirim oleh{" "}
  //       <span className="fw-bold text-dark">Pembeli.</span>
  //     </>
  //   ),
  // },
  // {
  //   waktu: { date: "8 Januari 2024", time: "15.00 WIB" },
  //   status: { label: "Menunggu Pembayaran", color: "warning" },
  //   detail: (
  //     <>
  //       Order dibuat dan Menunggu{" "}
  //       <span className="fw-bold text-dark">Pembayaran.</span>
  //     </>
  //   ),
  // },
  return tableData;
};
export interface IOrderHistoryProps {
  data: OrderFindOneQuery["orderFindOne"];
}

const useOrderHistoryViewModel = ({ data }: IOrderHistoryProps) => {
  const tableDatas = tableData(data);
  return { tableDatas };
};

export default useOrderHistoryViewModel;
