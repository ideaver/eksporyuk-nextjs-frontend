export interface IAffiliateHeaderViewModel {
  urlType: "order" | "commission";
  id: string | string[] | undefined;
}
const useAffiliateHeaderViewModel = ({
  urlType,
  id,
}: IAffiliateHeaderViewModel) => {
  const urls = [
    {
      label: "Detail Order",
      to: `/affiliate/${urlType}/${id}/detail-order`,
    },
    {
      label: "Riwayat Order",
      to: `/affiliate/${urlType}/${id}/history-order`,
    },
    {
      label: "Komisi Affiliasi",
      to: `/affiliate/${urlType}/${id}/commission-affiliate`,
    },
  ];

  return { urls };
};

export default useAffiliateHeaderViewModel;
