import {
  InternationalTradeDeliveryTypeEnum,
  useBuyerCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeBuyerName,
  changeCountry,
  changeCompanyName,
  changeCompanyAddress,
  changeDemand,
  changeDemandQuantity,
  changeAbbreviation,
  changePrice,
  changeEmail,
  changeShippingTerms,
  changeTelephoneNumber,
} from "@/features/reducers/buyers/buyersReducer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

export const useNavigation = () => {
  const router = useRouter();

  const handleNext = () =>
    router.pathname === "/admin/buyers/buyer-information" &&
    router.push("/admin/buyers/demand");
  const handlePrevious = () =>
    router.pathname === "/admin/buyers/demand" &&
    router.push("/admin/buyers/buyer-information");

  return { handleNext, handlePrevious };
};

// Reset buyer state
const useResetBuyerState = () => {
  const dispatch = useDispatch();

  const resetBuyerState = () => {
    dispatch(changeAbbreviation("Ton"));
    dispatch(changeBuyerName(""));
    dispatch(changeCountry(1));
    dispatch(changeCompanyName(""));
    dispatch(changeCompanyAddress(""));
    dispatch(changeDemand(""));
    dispatch(changeDemandQuantity(""));
    dispatch(changePrice(""));
    dispatch(changeEmail(""));
    dispatch(changeShippingTerms(InternationalTradeDeliveryTypeEnum.Cfr));
    dispatch(changeTelephoneNumber(""));
  };
  return { resetBuyerState };
};
const useBuyerTabViewModel = () => {
  // mutation to buyerCreateOne
  const {
    abbreviation,
    companyAddress,
    buyerName,
    companyName,
    country,
    telephoneNumber,
    email,
    price,
    demand,
    demandQuantity,
    shippingTerms,
  } = useSelector((state: RootState) => state.buyer);

  const { data: session, status } = useSession();

  const [buyerCreateOne, response] = useBuyerCreateOneMutation({
    variables: {
      data: {
        abbreviation,
        address: companyAddress,
        buyerName,
        companyName: companyName,
        createdByAdmin: {
          connect: {
            id: session?.user?.id,
          },
        },
        country: {
          connect: {
            id: country,
          },
        },
        phone: telephoneNumber,
        email,
        price,
        productName: demand,
        quantity: Number(demandQuantity),
        deliveryType:
          shippingTerms.toLocaleUpperCase() as InternationalTradeDeliveryTypeEnum,
      },
    },
  });

  const resetBuyerState = useResetBuyerState();

  return {
    ...resetBuyerState,
    buyerCreateOne,
    response,
  };
};
export default useBuyerTabViewModel;
