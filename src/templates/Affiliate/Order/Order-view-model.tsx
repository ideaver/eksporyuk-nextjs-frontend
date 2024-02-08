import { MenuComponent } from "@/_metronic/assets/ts/components";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";

export interface TableRow {
  idOrder: string;
  namaProduk: string;
  pembeli: string;
  tanggalPembelian: string;
  totalHarga: string;
  status: string;
  badgeColor: ColorList;
}

export interface TableProps {
  data: TableRow[];
}

export const tableData: TableRow[] = [
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Menunggu Pembayaran",
    badgeColor: "warning",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Pembayaran Dikonfirmasi",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Pesanan Diproses",
    badgeColor: "info",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Proses Pengiriman",
    badgeColor: "info",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Refund",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Batal",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
];

const useOrderViewModel = () => {
  const [exportModalState, setExportModalState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const breadcrumbs = [
    {
      title: "Order Affiliasi",
      path: "/affiliate/order",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return { breadcrumbs, exportModalState, setExportModalState};
};

export default useOrderViewModel;
