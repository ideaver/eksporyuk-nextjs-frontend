import { RootState } from "@/app/store/store";
import {
  changeAbbreviation,
  changeDemand,
  changeDemandQuantity,
  changePrice,
  changeShippingTerms,
} from "@/features/reducers/buyers/buyersReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InternationalTradeDeliveryTypeEnum } from "@/app/service/graphql/gen/graphql";

const useField = (
  selector: (state: RootState) => string,
  action: (value: string) => UnknownAction
) => {
  const dispatch = useDispatch();
  const initialValue = useSelector(selector);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(action(event.target.value));
  };

  return [value, handleChange];
};

const PriceHandler = () => {
  const dispatch = useDispatch();
  const price = useSelector((state: RootState) => state.buyer.price);

  const handleChangePrice = (price: string) => {
    dispatch(changePrice(price));
  };

  return {
    price,
    handleChangePrice,
  };
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
    ([value, label]) => ({ value, label })
  );

  const priceHandler = PriceHandler();
  const abbreviationHandler = AbbreviationHandler();
  const shippingTermsHandler = ShippingTermsHandler();

  const [inputDemand, setInputDemand] = useField(
    (state: RootState) => state.buyer.demand,
    (value) => changeDemand(value)
  );
  const [inputDemandQuantity, setInputDemandQuantity] = useField(
    (state: RootState) => state.buyer.demandQuantity,
    (value) => changeDemandQuantity(value)
  );
  // const [inputShippingTerms, setInputShippingTerms] = useField(
  //   (state: RootState) => state.buyer.shippingTerms,
  //   (value) => changeShippingTerms(value)
  // );
  // const [inputAbbreviation, setInputAbbreviation] = useField(
  //   (state: RootState) => state.buyer.abbreviation,
  //   (value) => changeAbbreviation(value)
  // );

  const [inputPrice, setInputPrice] = useField(
    (state: RootState) => state.buyer.price,
    (value) => changePrice(value)
  );

  return {
    shippingOption,
    ...priceHandler,
    // inputAbbreviation,
    // setInputAbbreviation,
    ...abbreviationHandler,
    ...shippingTermsHandler,
    inputDemand,
    setInputDemand,
    inputDemandQuantity,
    setInputDemandQuantity,
    // inputShippingTerms,
    // setInputShippingTerms,
    inputPrice,
    setInputPrice,
  };
};

export default useDemandViewModel;
