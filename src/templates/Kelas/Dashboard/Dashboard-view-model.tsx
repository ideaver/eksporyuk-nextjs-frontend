
const useDashboardViewModel = () => {
  const breadcrumbs = [
    {
      title: "Kelas",
      path: "/kelas/dashboard",
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
  };
};

const dashboardViewModel = {
  useDashboardViewModel,
};

export default dashboardViewModel;
