import { useState } from "react";

export interface BuyerFormTableList {
    imageSrc: string;
    title: string;
  }

  const navLinks = [
    {
        name: 'Facebook Pixel',
        href: "test-add-new-coupon/facebook-pixel"
    },
    {
        name: 'Tiktok Pixel',
        href: "test-add-new-coupon/tiktok-pixel"
    },
    {
        name: 'Google Tab Manager',
        href: "test-add-new-coupon/google-tab-manager"
    }
  ]
  
  const useBuyerFormViewModel = () => {
    const follupValues = ["follup-1", "follup-2", "follup-3"];
    const [selectedFollupValue, setSelecteFollupValue] = useState("");
    const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelecteFollupValue(event.target.value);
      };
    const addNewCouponTabsData = navLinks;
    const breadcrumbs = [
      {
        title: "Buyer",
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
  
  export default useBuyerFormViewModel;
  