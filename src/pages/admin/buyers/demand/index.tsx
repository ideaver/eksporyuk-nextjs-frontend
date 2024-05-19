import TabBuyerLayout from "@/components/layouts/Aside/Buyers/BuyerTab";
import Demand from "@/templates/Admin/Buyer/FromBuyer/Demand";
import { NextPage } from "next";

const DemandPage: NextPage = () => {
  return (
    <TabBuyerLayout>
      <Demand />
    </TabBuyerLayout>
  );
};

export default DemandPage;
