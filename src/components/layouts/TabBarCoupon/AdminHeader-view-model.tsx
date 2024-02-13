import { useState } from "react";


export interface IAdminHeaderViewModel {
  urlType: "test-add-new-coupon"
  id: string | string[] | undefined;
}
const useAdminHeaderViewModel = ({
  urlType,
  id,
}: IAdminHeaderViewModel) => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
      label: "Facebook Pixel",
      to: `/affiliate/${urlType}/facebook-pixel`,
    },
    {
      label: "Tiktok Pixel",
      to: `/affiliate/${urlType}/tiktok-pixel`,
    },
    {
      label: "Google Tab Manager",
      to: `/affiliate/${urlType}/google-tab-manager`,
    },
  ];


  const breadcrumbs = [
    {
      title: "Tambah Kupon Baru",
      path: "/affiliate/test-add-new-coupon",
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

export default useAdminHeaderViewModel;
