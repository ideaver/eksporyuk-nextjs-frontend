import TabBuyerLayout from "@/components/layouts/Aside/Buyers/BuyerTab";
import BuyerInformation from "@/templates/Admin/Buyer/FromBuyer/BuyerInformation";
import { NextPage } from "next";

const BuyerInformationPage: NextPage = () => {
  return (
    <TabBuyerLayout>
      <BuyerInformation />
    </TabBuyerLayout>
  );
};

export default BuyerInformationPage;
