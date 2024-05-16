const useNewRewardViewModel = () => {
  // TODO: move/write business logic here

  const breadcrumbs = [
    {
      title: "Reward Affiliasi",
      path: "/admin/affiliate/reward",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Tambah Reward",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return { breadcrumbs };
};

export default useNewRewardViewModel;
