import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";

import { useRewardsCatalogCreateOneMutation } from "@/app/service/graphql/gen/graphql";
import { RewardsTypeEnum } from "@/app/service/graphql/gen/graphql";

export const breadcrumbs = [
  {
    title: "Reward Affiliasi",
    path: "/admin/affiliate/reward",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Tambah Reward",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const useNewRewardViewModel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Local states
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [rewardName, setRewardName] = useState("");
  const [rewardDesc, setRewardDesc] = useState("");
  const [pointsRequired, setPointsRequired] = useState(0);
  const [endSales, setEndSales] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [rewardsCatalogCreateMutation] = useRewardsCatalogCreateOneMutation();

  const handleRewardsCatalogCreateOneMutation = async ({
    rewardName,
    rewardDesc,
    pointsRequired,
    endSales,
  }: any) => {
    const data = await rewardsCatalogCreateMutation({
      variables: {
        data: {
          title: rewardName,
          rewardsType: RewardsTypeEnum.Cash,
          pointsRequired: Number(pointsRequired),
          endSales,
          description: rewardDesc,
        },
      },
    });

    return data;
  };

  const onSubmit = async () => {
    // Check if any required field is empty
    if (!rewardName || !rewardDesc || !pointsRequired || !endSales) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const data = await handleRewardsCatalogCreateOneMutation({
        rewardName,
        rewardDesc,
        pointsRequired,
        endSales,
      });
      const result = data.data;
      console.log(result);
      setRewardName("");
      setRewardDesc("");
      setEndSales("");
      setPreviewImages([]);
      setPointsRequired(0);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/admin/affiliate/reward");
    }
  };

  return {
    previewImages,
    setPreviewImages,
    rewardName,
    setRewardName,
    rewardDesc,
    setRewardDesc,
    pointsRequired,
    setPointsRequired,
    endSales,
    setEndSales,
    handleFileChange,
    handleFileClick,
    fileInputRef,
    onSubmit,
    errorMessage,
  };
};

export default useNewRewardViewModel;
