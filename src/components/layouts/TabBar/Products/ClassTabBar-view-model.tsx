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
      to: `/admin/courses/${urlType}/information`,
    },
    // {
    //   label: "Informasi Tambahan",
    //   to: `/admin/courses/${urlType}/additional-information`,
    // },
    {
      label: "Section",
      to: `/admin/courses/${urlType}/sylabus`,
    },
    // TODO [Certificate Course] Later
    // {
    //   label: "Sertifikat",
    //   to: `/admin/courses/${urlType}/certificate`,
    // },
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
