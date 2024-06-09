import { MenuComponent } from "@/_metronic/assets/ts/components";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";

export interface TableRow {
  idMemberOrder: string;
  namaProduk: string;
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
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Menunggu Pembayaran",
    badgeColor: "warning",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Pembayaran Dikonfirmasi",
    badgeColor: "success",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Pesanan Diproses",
    badgeColor: "info",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Proses Pengiriman",
    badgeColor: "info",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Refund",
    badgeColor: "danger",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Batal",
    badgeColor: "danger",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
  {
    idMemberOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tanggalPembelian: "7 Januari 2024",
    totalHarga: "Rp 698.342",
    status: "Selesai",
    badgeColor: "success",
  },
];

const useMemberOrderViewModel = () => {
  const [exportModalState, setExportModalState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };


  const breadcrumbs = [
    {
      title: "Member",
      path: "/Member/order",
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

  return { breadcrumbs, exportModalState, setExportModalState, selectedFollupValue, handleFollupChange};
};

export default useMemberOrderViewModel;
