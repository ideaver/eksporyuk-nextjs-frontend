import { useState } from "react";
import { useRouter } from "next/router";

const useClassTabBarViewModel = () => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];
  const router = useRouter();
  const { id } = router.query;

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
      label: "Informasi",
      to: `/admin/affiliate/coupon/${id}/information`,
    },
    {
      label: "Affiliasi",
      to: `/admin/affiliate/coupon/${id}/affiliation`,
    },
    // {
    //   label: "Penggunaan",
    //   to: `/admin/affiliate/coupon/${id}/usage`,
    // },
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
