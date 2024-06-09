import { useState } from "react";


export interface IBuyerFormHeaderViewModel {
  urlType: "test-buyer-form"
  id: string | string[] | undefined;
}
const useBuyerFormHeaderViewModel = ({
  urlType,
  id,
}: IBuyerFormHeaderViewModel) => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
        label: "Informasi Buyer",
        to: `/affiliate/${urlType}/informasi-buyer`,
    },
    {
        label: "Demand",
        to: `/affiliate/${urlType}/demand`,
    },
];


  const breadcrumbs = [
    {
      title: "Tambah Buyer Baru",
      path: "/affiliate/test-buyer-form",
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

export default useBuyerFormHeaderViewModel;
