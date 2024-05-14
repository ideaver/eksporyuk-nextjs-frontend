interface ICommissionProps {}

export interface TableRow {
  idOrder?: any;
  namaKelas?: any;
  pembeli?: any;
  affiliasi?: any;
  totalKomisi: any;
  status: any;
  badgeColor: any;
}

export interface TableProps {
  data: TableRow[];
}

export const tableData: TableRow[] = [
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Belum Dibayar",
    badgeColor: "danger",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
  {
    idOrder: "INV 7196",
    namaKelas: "Kelas Bimbingan Ekspor Yuk",
    pembeli: "Cindy Ayu Pradila",
    affiliasi: "Cindy Ayu Pradila",
    totalKomisi: "Rp 698.342",
    status: "Sudah Dibayar",
    badgeColor: "success",
  },
]

const useComissionViewModel = ({}: ICommissionProps) => {
  const breadcrumbs = [
    {
      title: "Manajemen Produk",
      path: "#",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Semua Komisi",
      path: "#",
      isSeparator: true,
      isActive: true,
    },
  ];

  return { breadcrumbs };
};

export default useComissionViewModel;
