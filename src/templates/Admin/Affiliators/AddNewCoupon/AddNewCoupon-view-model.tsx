const useAddNewCouponViewModel = () => {
  const breadcrumbs = [
    {
      title: "Manajemen Produk",
      path: "/admin/affiliators",
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

  return { breadcrumbs };
};

export default useAddNewCouponViewModel;
