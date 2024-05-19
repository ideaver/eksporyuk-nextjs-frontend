const useAffiliatorHeaderViewModel = ({ id }: any) => {
  const urls = [
    {
      label: "Profile",
      to: `/admin/affiliate/affiliator/detail/${id}/profile`,
    },
    {
      label: "Riwayat Affiliasi",
      to: `/admin/affiliate/affiliator/detail/${id}/riwayat-affiliasi`,
    },
    {
      label: "Social Profile",
      to: `/admin/affiliate/affiliator/detail/${id}/social-profile`,
    },
    {
      label: "Informasi Rekening",
      to: `/admin/affiliate/affiliator/detail/${id}/informasi-rekening`,
    },
    {
      label: "Riwayat Order",
      to: `/admin/affiliate/affiliator/detail/${id}/riwayat-order`,
    },
  ];

  const breadcrumbs = [
    {
      title: "User",
      path: "/admin/affiliate/affiliator",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Detail Affiliator",
      path: `/admin/affiliate/affiliator/detail/${id}/profile`,
      isSeparator: true,
      isActive: true,
    },
  ];

  return {
    urls,
    breadcrumbs,
  };
};

export default useAffiliatorHeaderViewModel;
