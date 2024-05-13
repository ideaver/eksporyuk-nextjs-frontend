import { useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Order",
    path: "/admin/orders",
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

const useAdminOrderViewModel = () => {
  const [exportModalState, setExportModalState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return { exportModalState, setExportModalState, };
};

export default useAdminOrderViewModel;
