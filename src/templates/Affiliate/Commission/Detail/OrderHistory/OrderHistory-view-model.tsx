import { ColorList } from "@/types/general/utilities";

interface TableRowData {
  waktu: { date: string; time: string };
  status: { label: string; color: ColorList };
  detail: JSX.Element;
}
const tableData: TableRowData[] = [
  {
    waktu: { date: "8 Januari 2024", time: "15.00 WIB" },
    status: { label: "Selesai", color: "success" },
    detail: (
      <>
        Order diubah ke <span className="fw-bold text-dark">Selesai</span> oleh{" "}
        <span className="fw-bold text-dark">AdminEksporyuk25</span>
      </>
    ),
  },
  {
    waktu: { date: "8 Januari 2024", time: "15.00 WIB" },
    status: { label: "Menunggu Konfirmasi", color: "primary" },
    detail: (
      <>
        Bukti pembayaran telah dikirim oleh{" "}
        <span className="fw-bold text-dark">Pembeli.</span>
      </>
    ),
  },
  {
    waktu: { date: "8 Januari 2024", time: "15.00 WIB" },
    status: { label: "Menunggu Pembayaran", color: "warning" },
    detail: (
      <>
        Order dibuat dan Menunggu{" "}
        <span className="fw-bold text-dark">Pembayaran.</span>
      </>
    ),
  },
];
export interface IOrderHistoryProps {}

const useOrderHistoryViewModel = ({}: IOrderHistoryProps) => {
  const tableDatas = tableData;
  return { tableDatas };
};

export default useOrderHistoryViewModel;
