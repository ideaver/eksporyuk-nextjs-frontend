import { useState } from "react";

const useClassTabBarViewModel = () => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
      label: "Informasi",
      to: `/admin/affiliate/coupon/information`,
    },
    {
      label: "Affiliasi",
      to: `/admin/affiliate/coupon/affiliation`,
    },
    {
      label: "Penggunaan",
      to: `/admin/affiliate/coupon/usage`,
    },
  ];

  const breadcrumbs = [
    {
      title: "Manajemen Komisi",
      path: "/admin/affiliate/affiliator",
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
