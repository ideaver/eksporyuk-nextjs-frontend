import LoadingOverlay from "react-loading-overlay-ts";
import ClassTabBar from "../../TabBar/Buyers/BuyerTabBar";
import { useBuyerInformationForm } from "@/templates/Admin/Buyer/FromBuyer/Demand/Demand-view-model";

interface TabBuyerLayoutProps {
  children?: React.ReactNode;
}

const TabBuyerLayout = ({ children }: TabBuyerLayoutProps) => {
  return (
    <>
      <ClassTabBar />
      {children}
    </>
  );
};
export default TabBuyerLayout;
