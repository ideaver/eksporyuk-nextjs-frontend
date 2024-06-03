import { RootState } from "@/app/store/store";
import {
  changeObjective,
  changeQuizs,
} from "@/features/reducers/products/productReducer";
import { ICreateQuizData } from "@/types/contents/products/IQuizData";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ObjectiveHandler = () => {
  const dispatch = useDispatch();
  const currentObjectiveSelector = useSelector(
    (state: RootState) => state.product.objective
  );
  const [items, setItems] = useState<string[]>(currentObjectiveSelector);

  const addItem = () => {
    setItems((prevItems) => [...prevItems, ""]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleInputChange = (index: number, newValue: string) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? newValue : item))
    );
  };

  dispatch(changeObjective(items));

  return {
    items,
    addItem,
    removeItem,
    handleInputChange,
  };
};

export const HandleQuizSubmit = (value: ICreateQuizData) => {
  const dispatch = useDispatch();
  const currentQuizSelector = useSelector(
    (state: RootState) => state.product.quizs
  );

  dispatch(changeQuizs(currentQuizSelector.concat(value)));

  return true;
};

const useAdditionalInformationViewModel = () => {
  const { items, addItem, removeItem, handleInputChange } = ObjectiveHandler();
  return {
    items,
    addItem,
    removeItem,
    handleInputChange,
  };
};

export default useAdditionalInformationViewModel;
