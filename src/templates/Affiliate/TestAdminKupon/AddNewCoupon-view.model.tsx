import { useState } from "react";

export interface AddNewCouponTableList {
    imageSrc: string;
    title: string;
  }
  
  const tabsData = [
    {
        id: "kt_tab_pane_1",
        name: "Facebook Pixel",
    },
    {
        id: "kt_tab_pane_2",
        name: "Tiktok Pixel",

    },
    {
        id: "kt_tab_pane_3",
        name: "Google Tab Manager",
    },
];
  
  const useAddNewCouponViewModel = () => {
    const follupValues = ["follup-1", "follup-2", "follup-3"];
    const [selectedFollupValue, setSelecteFollupValue] = useState("");
    const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelecteFollupValue(event.target.value);
      };
    const addNewCouponTabsData = tabsData;
    const breadcrumbs = [
      {
        title: "Manajemen Produk",
        path: "/affiliate",
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
      breadcrumbs,
      addNewCouponTabsData,
      follupValues,
      selectedFollupValue,
      handleFollupChange,
    };
  };
  
  export default useAddNewCouponViewModel;
  