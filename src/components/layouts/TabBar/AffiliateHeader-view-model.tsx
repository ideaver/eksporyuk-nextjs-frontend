import { useState } from "react";

export interface IAffiliateHeaderViewModel {
  urlType: "order" | "commission";
  id: string | string[] | undefined;
}
const useAffiliateHeaderViewModel = ({
  urlType,
  id,
}: IAffiliateHeaderViewModel) => {
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

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

  return { urls, selectedFollupValue, handleFollupChange, follupValues };
};

export default useAffiliateHeaderViewModel;
