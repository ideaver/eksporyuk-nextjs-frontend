import { useState, useRef, ChangeEvent } from "react";

import { useRewardsRedeemCreateOneMutation, RewardsRedeemCreateOneMutation } from "@/app/service/graphql/gen/graphql";
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
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [rewardName, setRewardName] = useState("");
  const [rewardDesc, setRewardDesc] = useState("");
  const [pointsRequired, setPointsRequired] = useState(0);
  const [endSales, setEndSales] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [rewardsRedeemCreateMutation] = useRewardsRedeemCreateOneMutation();

  const handleRewardsRedeemCreateMutation = async ({ rewardName, rewardDesc, pointsRequired, endSales }: any) => {
    const data = await rewardsRedeemCreateMutation({
      variables: {
        data: {
          rewardsCatalog: {
            create: {
              title: rewardName,
              rewardsType: RewardsTypeEnum.Product,
              pointsRequired: Number(pointsRequired),
              endSales,
              description: rewardDesc,
            },
            connect: {
              id: 26
            }
          },
          user: {
            connect: {
              id: "26"
            }
          }
        }
      }
    });

    return data;
  }

  const onSubmit = async () => {
    try {
      const data = await handleRewardsRedeemCreateMutation({ rewardName, rewardDesc, pointsRequired, endSales });
      const result = data.data;
      console.log(result);
      setRewardName("");
      setRewardDesc("")
      setEndSales("")
      setPreviewImages([])
      setPointsRequired(0);
    } catch (error) {
      alert(error);
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
  };
};

export default useNewRewardViewModel;
