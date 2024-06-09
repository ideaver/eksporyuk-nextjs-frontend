import { ColorList } from "@/types/general/utilities";

interface ICommissionProps {}

export interface TableRow {
  idOrder: string;
  namaProduk: string;
  tier: string;
  totalKomisi: string;
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
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    tier: "I",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
];

const useCommissionViewModel = ({}: ICommissionProps) => {
  const breadcrumbs = [
    {
      title: "Affiliasi",
      path: "/affiliate/commission",
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

  return { breadcrumbs };
};

export default useCommissionViewModel;
