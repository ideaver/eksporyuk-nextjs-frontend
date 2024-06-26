import { useState } from "react";

export interface IClassTabBarViewModel {
  urlType: "create" | "edit" | "detail";
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
      to: `/admin/product-management/courses/${urlType}/information?id=${id}`,
    },
    // {
    //   label: "Informasi Tambahan",
    //   to: `/admin/product-management/courses/${urlType}/additional-information?id=${courseId}`,
    // },
    {
      label: "Section",
      to: `/admin/product-management/courses/${urlType}/sylabus?id=${id}`,
    },
    {
      label: "Sertifikat",
      to: `/admin/product-management/courses/${urlType}/certificate?id=${id}`,
    },
  ];

  const breadcrumbs = [
    {
      title: "Manajemen Kelas",
      path: "/admin/product-management/courses/",
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
