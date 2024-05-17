import { RootState } from "@/app/store/store";
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
import { useDispatch, useSelector } from "react-redux";
import {
  InternationalTradeDeliveryTypeEnum,
  useBuyerCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";

const useResetBuyerState = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
    router.push("/admin/buyers");
  };
  return { resetBuyerState };
};

export const useBuyerInformationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { resetBuyerState } = useResetBuyerState();

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

  // validation
  const buyerSchema = Yup.object().shape({
    demand: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Demand diperlukan"),
    demandQuantity: Yup.string()
      .min(1, "Minimal 1 simbol")
      .max(50, "Maksimal 100 simbol")
      .required("Jumlah demand diperlukan"),
    price: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("price diperlukan"),
  });

  const DemandFormik = useFormik({
    initialValues: {
      demand: demand,
      demandQuantity: demandQuantity,
      price: price,
    },
    validationSchema: buyerSchema,
    onSubmit: (values) => {
      if (status === "authenticated") {
        try {
          buyerCreateOne();
          resetBuyerState();
        } catch (error) {
          console.log(error);
        } finally {
          router.push("/admin/buyers");
        }
      }
    },
  });
  return { formik: DemandFormik, response };
};

const AbbreviationHandler = () => {
  const dispatch = useDispatch();
  const abbreviation = useSelector(
    (state: RootState) => state.buyer.abbreviation
  );

  const handleChangeAbbreviation = (value: "Ton" | "Kg" | "Pcs") => {
    dispatch(changeAbbreviation(value));
  };
  return {
    abbreviation,
    handleChangeAbbreviation,
  };
};

const ShippingTermsHandler = () => {
  const dispatch = useDispatch();
  const shippingTerms = useSelector(
    (state: RootState) => state.buyer.shippingTerms
  );

  const handleChangeShippingTerms = (
    value: InternationalTradeDeliveryTypeEnum
  ) => {
    dispatch(changeShippingTerms(value));
  };
  return {
    shippingTerms,
    handleChangeShippingTerms,
  };
};

const useDemandViewModel = () => {
  const shippingOption = Object.entries(InternationalTradeDeliveryTypeEnum).map(
    ([value, label]) => ({ value: label, label })
  );

  const { resetBuyerState } = useResetBuyerState();

  const abbreviationHandler = AbbreviationHandler();
  const shippingTermsHandler = ShippingTermsHandler();

  return {
    resetBuyerState,
    shippingOption,
    ...abbreviationHandler,
    ...shippingTermsHandler,
  };
};

export default useDemandViewModel;
