import { useState } from "react";


export interface IReminderFormHeaderViewModel {
  urlType: "test-reminder-form"
  id: string | string[] | undefined;
}
const useReminderFormHeaderViewModel = ({
  urlType,
  id,
}: IReminderFormHeaderViewModel) => {
  const follupValues = ["Email", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  const urls = [
    {
        label: "Informasi Reminder",
        to: `/affiliate/${urlType}/informasi-reminder`,
    },
    {
        label: "Pesan",
        to: `/affiliate/${urlType}/pesan`,
    },
];


  const breadcrumbs = [
    {
      title: "Tambah Kupon Baru",
      path: "/affiliate/test-reminder-form",
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

export default useReminderFormHeaderViewModel;
