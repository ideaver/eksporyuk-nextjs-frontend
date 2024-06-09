import { MenuComponent } from "@/_metronic/assets/ts/components";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";

export interface TableRow {
  idLangganan: string;
  namaProduk: string;
  masaAktif: string;
  akhirAktif: string;
  subAkhirAktif: string;
  status: string;
  badgeColor: ColorList;
}

export interface TableProps {
  data: TableRow[];
}

export const tableData: TableRow[] = [
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Belum Aktif",
    badgeColor: "warning",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Tidak Aktif",
    badgeColor: "danger",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Tidak Aktif",
    badgeColor: "danger",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
  {
    idLangganan: "INV 7196",
    namaProduk: "Kelas Bimbingan Ekspor Yuk",
    masaAktif: "365 Hari",
    akhirAktif: "25 Januari 2025",
    subAkhirAktif: "(Tersisa 360 Hari)",
    status: "Aktif",
    badgeColor: "success",
  },
];

const useLanggananViewModel = () => {
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
      path: "/Member/Langganan",
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

export default useLanggananViewModel;
