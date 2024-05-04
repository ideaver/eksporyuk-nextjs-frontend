import { useState } from "react";


export interface IKelasTerdaftarViewModel {
  urlType: "kelas/kelas-terdaftar"
  id: string | string[] | undefined;
}
const useKelasTerdaftarViewModel = ({
  urlType,
  id,
}: IKelasTerdaftarViewModel) => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
      label: "Semua Kelas",
      to: `/kelas/${urlType}/semua-kelas`,
    },
    {
      label: "Belum Selesai",
      to: `/kelas/${urlType}/belum-selesai`,
    },
    {
      label: "Sudah Selesai",
      to: `/kelas/${urlType}/sudah-selesai`,
    },
  ];


  const breadcrumbs = [
    {
      title: "Kelas Terdaftar",
      path: "/kelas/kelas-terdaftar",
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

  return { urls, selectedFollupValue, handleFollupChange, follupValues, breadcrumbs };
};

export default useKelasTerdaftarViewModel;
