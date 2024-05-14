import { RootState } from "@/app/store/store";
import {
  changeDemand,
  changeDemandQuantity,
  changeDestinationPort,
  changeShippingTerms,
} from "@/features/reducers/buyers/buyersReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const useDemandViewModel = () => {
  const [inputDemand, setInputDemand] = useField(
    (state: RootState) => state.buyer.demand,
    (value) => changeDemand(value)
  );
  const [inputDemandQuantity, setInputDemandQuantity] = useField(
    (state: RootState) => state.buyer.demandQuantity,
    (value) => changeDemandQuantity(value)
  );
  const [inputDestinationPort, setInputDestinationPort] = useField(
    (state: RootState) => state.buyer.destinationPort,
    (value) => changeDestinationPort(value)
  );
  const [inputShippingTerms, setInputShippingTerms] = useField(
    (state: RootState) => state.buyer.shippingTerms,
    (value) => changeShippingTerms(value)
  );

  return {
    inputDemand,
    setInputDemand,
    inputDemandQuantity,
    setInputDemandQuantity,
    inputShippingTerms,
    setInputShippingTerms,
    inputDestinationPort,
    setInputDestinationPort,
  };
};

export default useDemandViewModel;
