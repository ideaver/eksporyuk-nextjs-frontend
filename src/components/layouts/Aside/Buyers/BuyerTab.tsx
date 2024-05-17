import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useRouter } from "next/router";
import ClassTabBar from "../../TabBar/Buyers/BuyerTabBar";
import useBuyerTabViewModel, { useNavigation } from "./BuyersTab-view-model";
import { useDispatch } from "react-redux";
import {
  changeAbbreviation,
  changeBuyerName,
  changeCompanyAddress,
  changeCompanyName,
  changeCountry,
  changeDemand,
  changeDemandQuantity,
  changeEmail,
  changePrice,
  changeShippingTerms,
  changeTelephoneNumber,
} from "@/features/reducers/buyers/buyersReducer";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";

interface TabBuyerLayoutProps {
  children?: React.ReactNode;
}

const TabBuyerLayout = ({ children }: TabBuyerLayoutProps) => {
  const { handleNext, handlePrevious } = useNavigation();
  const { response, buyerCreateOne, resetBuyerState } = useBuyerTabViewModel();
  const router = useRouter();

  const dispatch = useDispatch();

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

        {router.pathname === "/admin/buyers/demand" ? (
          <Buttons
            classNames={"col-lg-2 mt-5 mt-lg-0"}
            onClick={() => {
              try {
                buyerCreateOne();
                resetBuyerState();
              } catch (error) {
                console.log(error);
              } finally {
                router.push("/admin/buyers");
              }
            }}
          >
            Kirim
          </Buttons>
        ) : (
          <Buttons classNames={"col-lg-2 mt-5 mt-lg-0"} onClick={handleNext}>
            Selanjutnya
          </Buttons>
        )}
      </div>
    </>
  );
};
export default TabBuyerLayout;
