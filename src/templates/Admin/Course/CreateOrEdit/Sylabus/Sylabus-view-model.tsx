import { RootState } from "@/app/store/store";
import {
  changeObjective,
  changeQuizs,
} from "@/features/reducers/products/productReducer";
import { ICreateQuizData } from "@/types/contents/products/IQuizData";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ObjectiveHandler = () => {
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const dispatch = useDispatch();
  const currentObjectiveSelector = useSelector(
    (state: RootState) => state.product.objective
  );
  const [items, setItems] = useState<string[]>(currentObjectiveSelector);

  const addItem = () => {
    if (!isDetail) {
      setItems((prevItems) => [...prevItems, ""]);
    }
  };

  const removeItem = (index: number) => {
    if (!isDetail) {
      setItems((prevItems) => prevItems.filter((item, i) => i !== index));
    }
  };

  const handleInputChange = (index: number, newValue: string) => {
    if (!isDetail) {
      setItems((prevItems) =>
        prevItems.map((item, i) => (i === index ? newValue : item))
      );
    }
  };
  if (!isDetail) {
    dispatch(changeObjective(items));
  }

  return {
    items,
    addItem,
    removeItem,
    handleInputChange,
  };
};

export const HandleQuizSubmit = (value: ICreateQuizData) => {
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const dispatch = useDispatch();
  const currentQuizSelector = useSelector(
    (state: RootState) => state.product.quizs
  );
  if (isDetail) {
    return;
  }
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
