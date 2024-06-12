import { UnknownAction } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postDataAPI } from "@/app/service/api/rest-service";
import {
  useGetAllListSubscribersQuery,
  useProductServiceCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeServiceCost,
  changeServiceDesc,
  changeServiceDiscountCost,
  changeServiceImages,
  changeServiceName,
  changeServiceObjective,
  changeServicePortfolio,
  changeServiceStatus,
  changeServiceType,
  changeSubscriberListId,
  changeUploadImages,
} from "@/features/reducers/products/serviceReducer";
import { GroupBase, OptionsOrGroups } from "react-select";
import { OptionType } from "../../Course/CreateOrEdit/Information/Information-view-model";
import useProductsViewModel from "../Products-view-model";

export const breadcrumbs = [
  {
    title: "Semua Service",
    path: "/admin/product-management/products",
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

  // useEffect(() => {
  //   setItemObjective(serviceObjective);
  // }, [serviceObjective]);

  useEffect(() => {
    dispatch(changeServiceObjective(itemObjective));
  }, [itemObjective, dispatch]);

  const addObjectiveItem = () => {
    setItemObjective((prevItems) => [...prevItems, ""]);
  };

  const removeObjectiveItem = (index: number) => {
    setItemObjective((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleInputObjectiveChange = (index: number, newValue: string) => {
    setItemObjective((prevItems) =>
      prevItems.map((item, i) => (i === index ? newValue : item))
    );
  };

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

  useEffect(() => {
    dispatch(changeServicePortfolio(itemPortfolio));
  }, [itemPortfolio, dispatch]);

  const addPortfolioItem = () => {
    setItemPortfolio((prevItems) => [...prevItems, ""]);
  };

  const removePortfolioItem = (index: number) => {
    setItemPortfolio((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleInputPortfolioChange = (index: number, newValue: string) => {
    setItemPortfolio((prevItems) =>
      prevItems.map((item, i) => (i === index ? newValue : item))
    );
  };

  return {
    itemPortfolio,
    addPortfolioItem,
    removePortfolioItem,
    handleInputPortfolioChange,
  };
};

export const useAllListSubscriberDropdown = () => {
  const dispatch = useDispatch();
  const [inputSubscriberListId, setInputSubscriberListId] = useState<any>("");
  const subscriberListId = useSelector(
    (state: RootState) => state.service.subscriberListId
  );

  const getAllListSubscriber = useGetAllListSubscribersQuery({
    onCompleted(data) {
      const result =
        data?.getAllListSubscriber?.map((list) => ({
          value: list.list_id,
          label: `${list.list_id} - ${list.list_name}`,
        })) ?? [];
      // Check if subscriberListId is not null
      if (subscriberListId) {
        // Search for the subscriberListId in the result
        const selectedOption = result.find(
          (option) => option.value === subscriberListId
        );
        // If found, set inputSubscriberListId to the found object
        if (selectedOption) {
          setInputSubscriberListId(selectedOption);
        }
      }
    },
  });

  const handleInputSubscriberListId = (value: any) => {
    setInputSubscriberListId(value);

    dispatch(changeSubscriberListId(value.value));
  };

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) {
    const result =
      getAllListSubscriber.data?.getAllListSubscriber?.map((list) => ({
        value: list.list_id,
        label: `${list.list_id} - ${list.list_name}`,
      })) ?? [];
    await getAllListSubscriber.refetch();

    return {
      options: result,
      hasMore: false,
    };
  }

  return {
    loadOptions,
    getAllListSubscriber,
    inputSubscriberListId,
    handleInputSubscriberListId,
  };
};

const useCreateServiceViewModel = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  // Local state
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Currency stuff
  const serviceCost = useSelector(
    (state: RootState) => state.service.serviceCost
  );

  const serviceDiscountCost = useSelector(
    (state: RootState) => state.service.serviceDiscountCost
  );

  const handleChangeServiceCost = (price: string) => {
    dispatch(changeServiceCost(price));
  };

  const handleChangeServiceDiscountCost = (price: string) => {
    dispatch(changeServiceDiscountCost(price));
  };

  // Status handler
  const serviceStatus = useSelector(
    (state: RootState) => state.service.serviceStatus
  );

  const handleStatusChange = (status: string) => {
    dispatch(changeServiceStatus(status === "true"));
  };

  // Image handler stuff
  const serviceImages = useSelector(
    (state: RootState) => state.service.serviceImages || []
  );

  const uploadImages = useSelector(
    (state: RootState) => state.service.uploadImages || []
  );

  // Upload image first
  const convertImg = async (image: any) => {
    const blob = image?.slice(0, image?.size);
    const newFile = new File([blob] as any, image?.name as string);
    const body = {
      file: newFile,
      userId: session?.user.id,
    };

    const response = await postDataAPI({
      endpoint: "upload/file",
      body,
      isMultipartRequest: true,
    });

    const url = await response?.data;
    return response?.data;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImageObjects: { path: string; fileType: string }[] = [];
    // const newImgObj: { path: string }[] = [];
    const newSelectedFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = async () => {
        // for preview images only
        newImageObjects.push({
          path: reader.result as string,
          fileType: "PNG",
        });

        // upload to the backend
        // newImgObj.push({
        //   path: await convertImg(files[i]) as string,
        // })

        if (newImageObjects.length === files.length) {
          const updatedImages = [...serviceImages, ...newImageObjects];
          // const updatedImg = [...uploadImages, ...newImgObj];
          // dispatch(changeUploadImages(updatedImg));
          dispatch(changeServiceImages(updatedImages));
          setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles]);
        }
      };

      reader.readAsDataURL(file);
      newSelectedFiles.push(file);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = serviceImages.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedImg = updatedImages.filter(
      (_, index) => index !== indexToRemove
    );
    dispatch(changeServiceImages(updatedImages)); // Dispatch action to update images
    dispatch(changeUploadImages(updatedImg));
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Image handler end

  const serviceObjective = useSelector(
    (state: RootState) => state.service.serviceObjective
  );

  const servicePortfolio = useSelector(
    (state: RootState) => state.service.servicePortfolio
  );

  // Graphql, mutation operation
  const { productServiceFindMany } = useProductsViewModel();

  const [productServiceCreateMutation] = useProductServiceCreateOneMutation({
    onCompleted: () => {
      productServiceFindMany.refetch();
    },
  });

  const handleProductServiceCreateMutation = async ({
    serviceType,
    serviceName,
    serviceDesc,
    serviceCost,
    serviceStatus,
    serviceObjective,
    servicePortfolio,
    uploadImages,
    serviceDiscountCost,
    subscriberListId,
  }: any) => {
    const variables = {
      data: {
        name: serviceName,
        description: serviceDesc,
        productServiceCategory: serviceType,
        subscriberListId: subscriberListId,
        images: {
          connect: uploadImages,
        },
        basePrice: Number(serviceCost),
        isActive: serviceStatus,
        benefits: {
          set: serviceObjective,
        },
        portofolio: {
          set: servicePortfolio,
        },
        salePrice: Number(serviceDiscountCost),
      },
    };
    const data = await productServiceCreateMutation({
      variables: variables,
    });

    return data;
  };

  const resetFormData = () => {
    dispatch(changeServiceName(""));
    dispatch(changeServiceType(""));
    dispatch(changeServiceDesc(""));
    dispatch(changeServiceCost(""));
    dispatch(changeUploadImages([]));
    dispatch(changeServiceStatus(false));
    dispatch(changeServiceObjective([]));
    dispatch(changeServicePortfolio([]));
    dispatch(changeServiceImages([]));
    dispatch(changeServiceDiscountCost(""));
    dispatch(changeSubscriberListId(""));
  };
  const subscriberListId = useSelector(
    (state: RootState) => state.service.subscriberListId
  );
  // Submit all data
  const onSubmit = async () => {
    if (
      !serviceType ||
      !serviceName ||
      !serviceDesc ||
      !serviceCost ||
      !uploadImages ||
      !serviceObjective ||
      !servicePortfolio
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      // Upload images
      const uploadPromises = selectedFiles.map((file) => convertImg(file));
      const uploadedImages = await Promise.all(uploadPromises);
      const uploadImgArray = uploadedImages.map((path) => ({ path }));

      const data = await handleProductServiceCreateMutation({
        serviceType,
        serviceName,
        serviceDesc,
        serviceCost,
        serviceStatus,
        serviceObjective,
        servicePortfolio,
        uploadImages: uploadImgArray,
        serviceDiscountCost,
        subscriberListId,
      });
      const result = data.data;
      dispatch(changeServiceObjective([]));
      dispatch(changeServicePortfolio([]));
      resetFormData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      await router.push("/admin/product-management/products");
      router.reload();
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
    fileInputRef,
    handleRemoveImage,
    onSubmit,
    errorMessage,
    isLoading,
    handleChangeServiceDiscountCost,
    serviceDiscountCost,
  };
};

export default useCreateServiceViewModel;
