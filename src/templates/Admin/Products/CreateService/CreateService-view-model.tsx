import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store/store";
import {
  changeServiceName,
  changeServiceImages,
  changeServiceDesc,
  changeServiceCost,
  changeServiceType,
  changeServiceObjective,
  changeServiceStatus,
  changeServicePortfolio,
} from "@/features/reducers/products/serviceReducer";

export const breadcrumbs = [
  {
    title: "Semua Service",
    path: "/admin/products",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: ".",
    isSeparator: true,
    isActive: true,
  },
];

const useField = <T extends string | boolean | number>(
  selector: (state: RootState) => T,
  action: (value: T) => UnknownAction
) => {
  const dispatch = useDispatch();
  const initialValue = useSelector(selector);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: T;
    if (typeof initialValue === "boolean") {
      newValue = event.target.checked as T;
    } else if (typeof initialValue === "number") {
      newValue = Number(event.target.value) as T;
    } else {
      newValue = event.target.value as T;
    }
    setValue(newValue);
    dispatch(action(newValue));
  };

  return [value, handleChange] as const;
};

const ObjectiveHandler = () => {
  const dispatch = useDispatch();
  const serviceObjective = useSelector(
    (state: RootState) => state.service.serviceObjective
  );
  const [itemObjective, setItemObjective] =
    useState<string[]>(serviceObjective);

  const addObjectiveItem = () => {
    setItemObjective((prevItems) => [...prevItems, ""]);
  };

  const removeObjectiveItem = (index: number) => {
    setItemObjective((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleInputObjectiveChange = (index: number, newValue: string) => {
    setItemObjective((prevItems) =>
      prevItems.map((item, i) => (i === index ? newValue : item))
    );
  };

  dispatch(changeServiceObjective(itemObjective));

  return {
    itemObjective,
    addObjectiveItem,
    removeObjectiveItem,
    handleInputObjectiveChange,
  };
};

const PortfolioHandler = () => {
  const dispatch = useDispatch();
  const servicePortfolio = useSelector(
    (state: RootState) => state.service.servicePortfolio
  );
  const [itemPortfolio, setItemPortfolio] =
    useState<string[]>(servicePortfolio);

  const addPortfolioItem = () => {
    setItemPortfolio((prevItems) => [...prevItems, ""]);
  };

  const removePortfolioItem = (index: number) => {
    setItemPortfolio((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleInputPortfolioChange = (index: number, newValue: string) => {
    setItemPortfolio((prevItems) =>
      prevItems.map((item, i) => (i === index ? newValue : item))
    );
  };

  dispatch(changeServicePortfolio(itemPortfolio));

  return {
    itemPortfolio,
    addPortfolioItem,
    removePortfolioItem,
    handleInputPortfolioChange,
  };
};

const useCreateServiceViewModel = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redux state & action
  const [serviceType, setServiceType] = useField(
    (state: RootState) => state.service.serviceType,
    (value) => changeServiceType(value)
  );

  const [serviceName, setServiceName] = useField(
    (state: RootState) => state.service.serviceName,
    (value) => changeServiceName(value)
  );

  const [serviceDesc, setServiceDesc] = useField(
    (state: RootState) => state.service.serviceDescription,
    (value) => changeServiceDesc(value)
  );

  const handleStatusChange = (status: string) => {
    dispatch(changeServiceStatus(status === "true"));
  };

  // Currency stuff
  const serviceCost = useSelector(
    (state: RootState) => state.service.serviceCost
  );

  // Status handler
  const serviceStatus = useSelector(
    (state: RootState) => state.service.serviceStatus
  );

  const handleChangeServiceCost = (price: string) => {
    dispatch(changeServiceCost(price));
  };

  // Image handler stuff
  const serviceImages = useSelector(
    (state: RootState) => state.service.serviceImages
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeServiceImages(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const {
    itemObjective,
    addObjectiveItem,
    removeObjectiveItem,
    handleInputObjectiveChange,
  } = ObjectiveHandler();
  const {
    itemPortfolio,
    addPortfolioItem,
    removePortfolioItem,
    handleInputPortfolioChange,
  } = PortfolioHandler();

  return {
    serviceType,
    setServiceType,
    serviceName,
    setServiceName,
    serviceDesc,
    setServiceDesc,
    serviceCost,
    handleChangeServiceCost,
    handleFileChange,
    handleFileClick,
    serviceImages,
    itemObjective,
    addObjectiveItem,
    removeObjectiveItem,
    handleInputObjectiveChange,
    itemPortfolio,
    addPortfolioItem,
    removePortfolioItem,
    handleInputPortfolioChange,
    handleStatusChange,
    serviceStatus,
  };
};

export default useCreateServiceViewModel;
