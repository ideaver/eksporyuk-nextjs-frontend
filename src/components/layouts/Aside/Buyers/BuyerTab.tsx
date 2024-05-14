import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useRouter } from "next/router";
import ClassTabBar from "../../TabBar/Buyers/BuyerTabBar";

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
