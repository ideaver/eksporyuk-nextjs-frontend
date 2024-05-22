import { useState } from "react";

export interface IClassTabBarViewModel {
  id?: string | string[] | undefined;
}
const useClassTabBarViewModel = ({ id }: IClassTabBarViewModel) => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
      label: "Informasi Buyer",
      to: `/admin/buyers/buyer-information`,
    },
    {
      label: "Demand",
      to: `/admin/buyers/demand`,
    },
  ];

  const breadcrumbs = [
    {
      title: "Manajemen Produk",
      path: "/admin/buyers/",
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
