import { useState, useRef } from "react";

import { AffiliatorCouponCreateOneMutation, useAffiliatorCouponCreateOneMutation } from "@/app/service/graphql/gen/graphql";

export const breadcrumbs = [
  {
    title: "Manajemen Produk",
    path: "/admin/affiliators",
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

const useAddNewCouponViewModel = () => {
  const [preview, setPreview] = useState<any | null>(
    "https://via.placeholder.com/150"
  );
  const [couponCode, setCouponCode] = useState("");
  const [value, setValue] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef<any>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Handle the file upload logic here
      console.log("Selected file:", file);
    }
  };

  const [affiliatorCouponCreateMutation] = useAffiliatorCouponCreateOneMutation();

  const handleAffiliatorCouponCreateMutation = async ({ couponCode, value, endDate, isFreeDelivery, isActive }: any) => {
    // const data = await affiliatorCouponCreateMutation({
    //   variables: {
    //     data: {
    //       code: couponCode,
    //       coupon: {
    //         create: {
    //           freeDelivery: isFreeDelivery,
    //           startDate: new Date(endDate),
    //           type: "AMOUNT",
    //           value: Number(value),
    //           isActive
    //         }
    //       },
    //       createdBy: {
    //         create: {
    //           user: {
    //             connect: {
    //               username: "hello",
    //               name: null
    //             }
    //           }
    //         }
    //       }
    //     }
    //   },
    // });
    // return data;
  };

  const onSubmit = async () => {
    try {
      const data = await handleAffiliatorCouponCreateMutation({couponCode, value, endDate, isFreeDelivery, isActive})
      // const result = data.data;
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    preview,
    setPreview,
    handleImageClick,
    handleFileChange,
    fileInputRef,
    isFreeDelivery,
    setIsFreeDelivery,
    couponCode,
    setCouponCode,
    value,
    setValue,
    endDate,
    setEndDate,
    isActive,
    setIsActive,
    onSubmit
  };
};

export default useAddNewCouponViewModel;
