import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useRouter } from "next/router";
import ClassTabBar from "../../TabBar/Buyers/BuyerTabBar";
import { useNavigation } from "./BuyersTab-view-model";

interface TabBuyerLayoutProps {
  children?: React.ReactNode;
}

const TabBuyerLayout = ({ children }: TabBuyerLayoutProps) => {
  const { handleNext, handlePrevious } = useNavigation();
  const router = useRouter();
  return (
    <>
      <ClassTabBar />
      {children}
      <div className={"row flex-end mt-10"}>
        {router.pathname !== "/admin/buyers/buyer-information" && (
          <Buttons
            mode="light"
            classNames={"col-lg-2 me-lg-5"}
            onClick={handlePrevious}
          >
            Sebelumnya
          </Buttons>
        )}

        <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} onClick={handleNext}>
          {router.pathname === "/admin/buyers/demand" ? "Kirim" : "Selanjutnya"}
        </Buttons>
      </div>
    </>
  );
};
export default TabBuyerLayout;
