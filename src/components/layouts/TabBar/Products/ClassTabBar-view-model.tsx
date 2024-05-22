import { useState } from "react";

export interface IClassTabBarViewModel {
  urlType: "create" | "edit";
  id?: string | string[] | undefined;
}
const useClassTabBarViewModel = ({ urlType, id }: IClassTabBarViewModel) => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
      label: "Informasi",
      to: `/admin/products/${urlType}/information`,
    },
    {
      label: "Pengaturan",
      to: `/admin/products/${urlType}/settings`,
    },
    {
      label: "Informasi Tambahan",
      to: `/admin/products/${urlType}/additional-information`,
    },
    {
      label: "Materi",
      to: `/admin/products/${urlType}/sylabus`,
    },
    {
      label: "Sertifikat",
      to: `/admin/products/${urlType}/certificate`,
    },
  ];

  const breadcrumbs = [
    {
      title: "Manajemen Produk",
      path: "/admin/products/",
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

  return {
    urls,
    selectedFollupValue,
    handleFollupChange,
    follupValues,
    breadcrumbs,
  };
};

export default useClassTabBarViewModel;
