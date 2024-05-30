const useAffiliatorHeaderViewModel = ({ id }: any) => {
  const urls = [
    {
      label: "Profile",
      to: `/admin/affiliate/affiliator/detail/${id}/profile`,
    },
    // {
    //   label: "Riwayat Affiliasi",
    //   to: `/admin/affiliate/affiliator/detail/${id}/riwayat-affiliasi`,
    // },
    {
      label: "Kupon Affiliasi",
      to: `/admin/affiliate/affiliator/detail/${id}/kupon-affiliasi`,
    },
    // {
    //   label: "Social Profile",
    //   to: `/admin/affiliate/affiliator/detail/${id}/social-profile`,
    // },
    // {
    //   label: "Informasi Rekening",
    //   to: `/admin/affiliate/affiliator/detail/${id}/informasi-rekening`,
    // },
    // {
    //   label: "Riwayat Order",
    //   to: `/admin/affiliate/affiliator/detail/${id}/riwayat-order`,
    // },
  ];

  const breadcrumbs = [
    {
      title: "Manajemen Affiliator",
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
    {
      title: "Semua Affiliator",
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
    breadcrumbs,
  };
};

export default useAffiliatorHeaderViewModel;
