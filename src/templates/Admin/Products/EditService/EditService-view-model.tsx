import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { postDataAPI } from "@/app/service/api/rest-service";
import {
  ProductServiceFindFirstQuery,
  useGetAllListSubscribersQuery,
  useProductServiceUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { GroupBase, OptionsOrGroups } from "react-select";
import { OptionType } from "../../Course/CreateOrEdit/Information/Information-view-model";

export interface IEditProduct {
  id: string | string[] | undefined;
  data: ProductServiceFindFirstQuery | undefined;
}

export const breadcrumbs = [
  {
    title: "Menejemen Produk",
    path: "/admin/product-management/products",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

// export const useAllListSubscriberDropdown = () => {
//   const dispatch = useDispatch();

//   return {
//     loadOptions,
//     getAllListSubscriber,
//     inputSubscriberListId,
//     handleInputSubscriberListId,
//   };
// };

const useEditServiceViewModel = ({ data, id }: IEditProduct) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  // Local states
  const [serviceType, setServiceType] = useState<any>(
    data?.productServiceFindFirst?.productServiceCategory
  );
  const [serviceName, setServiceName] = useState(
    data?.productServiceFindFirst?.name
  );
  const [serviceDesc, setServiceDesc] = useState(
    data?.productServiceFindFirst?.description
  );
  const [serviceImages, setServiceImages] = useState<any>(
    data?.productServiceFindFirst?.images
  );
  const [serviceCost, setServiceCost] = useState<any>(
    data?.productServiceFindFirst?.basePrice
  );
  const [serviceDiscountCost, setServiceDiscountCost] = useState<any>(
    data?.productServiceFindFirst?.salePrice
  );
  const [itemObjectives, setItemObjectives] = useState<any>(
    data?.productServiceFindFirst?.benefits
  );
  const [itemPortfolios, setItemPortfolios] = useState<any>(
    data?.productServiceFindFirst?.portofolio
  );
  const [status, setStatus] = useState<any>(
    data?.productServiceFindFirst?.isActive === true ? "Aktif" : "Tidak Aktif"
  );
console.log( data?.productServiceFindFirst?.subscriberListId)
  const [dataSubscriberListId, setDataSubscriberListId] = useState<any>(
    data?.productServiceFindFirst?.subscriberListId
  );
  const [inputSubscriberListId, setInputSubscriberListId] = useState<any>("");

  const getAllListSubscriber = useGetAllListSubscribersQuery({
    onCompleted(data) {
      const result =
        data?.getAllListSubscriber?.map((list) => ({
          value: list.list_id,
          label: `${list.list_id} - ${list.list_name}`,
        })) ?? [];
      // Check if subscriberListId is not null
      if (dataSubscriberListId) {
        // Search for the subscriberListId in the result
        const selectedOption = result.find(
          (option) => option.value === dataSubscriberListId
        );
        // If found, set inputSubscriberListId to the found object
        if (selectedOption) {
          setInputSubscriberListId(selectedOption);
          setDataSubscriberListId(selectedOption.value);
        }
      }
    },
  });

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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [itemObjective, setItemObjective] = useState<string[]>(itemObjectives);
  const [itemPortfolio, setItemPortfolio] = useState<string[]>(itemPortfolios);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Benefits & portfolio
  useEffect(() => {
    setItemObjective(itemObjectives);
    setItemPortfolio(itemPortfolios);
  }, [itemObjectives, itemPortfolios]);

  useEffect(() => {
    setItemObjectives(itemObjective);
    setItemPortfolios(itemPortfolio);
  }, [itemObjective, itemPortfolio]);

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

  // Currency stuff
  const handleChangeServiceCost = (price: string) => {
    setServiceCost(price);
  };

  const handleChangeServiceDiscountCost = (price: string) => {
    setServiceDiscountCost(price);
  };

  // Status handler
  const handleStatusChange = (status: string) => {
    setStatus(status === "true");
  };

  const handleInputSubscriberListId = (value: any) => {
    setInputSubscriberListId(value);
    setDataSubscriberListId(value.value);
  };

  // Image handler stuff
  const convertImgToURL = async (image: any) => {
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

        if (newImageObjects.length === files.length) {
          const updatedImages = [...serviceImages, ...newImageObjects];
          setServiceImages(updatedImages);
          setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles]);
        }
      };

      reader.readAsDataURL(file);
      newSelectedFiles.push(file);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = serviceImages.filter(
      (_: any, index: any) => index !== indexToRemove
    );

    setServiceImages(updatedImages);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Image handler end

  // Graphql, mutation operation
  const [productServiceUpdateOneMutation] =
    useProductServiceUpdateOneMutation();

  const handleProductServiceUpdateOneMutation = async ({
    serviceType,
    serviceName,
    serviceDesc,
    serviceImages,
    serviceCost,
    serviceDiscountCost,
    itemObjectives,
    itemPortfolios,
    status,
  }: any) => {
    const data = await productServiceUpdateOneMutation({
      variables: {
        where: {
          id: Number(id),
        },
        data: {
          name: {
            set: serviceName,
          },
          subscriberListId: {
            set: dataSubscriberListId,
          },
          description: {
            set: serviceDesc,
          },
          productServiceCategory: {
            set: serviceType,
          },
          images: {
            set: serviceImages,
          },
          basePrice: {
            set: Number(serviceCost),
          },
          benefits: {
            set: itemObjectives,
          },
          portofolio: {
            set: itemPortfolios,
          },
          salePrice: {
            set: Number(serviceDiscountCost),
          },
          isActive: {
            set: Boolean(status),
          },
        },
      },
    });

    return data;
  };

  // Submit data
  const onSubmit = async () => {
    setIsLoading(true);

    try {
      // Upload images
      const uploadPromises = selectedFiles.map((file) => convertImgToURL(file));
      const uploadedImages = await Promise.all(uploadPromises);
      const uploadImgArray = uploadedImages.map((path) => ({ path }));

      const data = await handleProductServiceUpdateOneMutation({
        serviceType,
        serviceName,
        serviceDesc,
        serviceImages: uploadImgArray,
        serviceCost,
        serviceDiscountCost,
        itemObjectives,
        itemPortfolios,
        status,
      });
      const result = data;
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
      await router.push("/admin/product-management/products");
      router.reload();
    }
  };

  return {
    serviceType,
    setServiceType,
    serviceName,
    setServiceName,
    serviceDesc,
    setServiceDesc,
    serviceImages,
    setServiceImages,
    serviceCost,
    setServiceCost,
    inputSubscriberListId,
    handleInputSubscriberListId,
    loadOptions,
    serviceDiscountCost,
    setServiceDiscountCost,
    itemObjectives,
    setItemObjectives,
    itemPortfolios,
    setItemPortfolios,
    status,
    setStatus,
    handleChangeServiceCost,
    handleChangeServiceDiscountCost,
    handleStatusChange,
    convertImgToURL,
    handleFileChange,
    handleRemoveImage,
    handleFileClick,
    fileInputRef,
    itemObjective,
    addObjectiveItem,
    removeObjectiveItem,
    handleInputObjectiveChange,
    itemPortfolio,
    addPortfolioItem,
    removePortfolioItem,
    handleInputPortfolioChange,
    onSubmit,
    isLoading,
  };
};

export default useEditServiceViewModel;
