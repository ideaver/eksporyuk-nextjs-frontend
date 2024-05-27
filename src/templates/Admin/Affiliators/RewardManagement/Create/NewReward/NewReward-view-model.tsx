import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";

import { useRewardsCatalogCreateOneMutation } from "@/app/service/graphql/gen/graphql";
import { RewardsTypeEnum } from "@/app/service/graphql/gen/graphql";

import { RootState } from "@/app/store/store";
import {
  changeAkhirMasaBerlaku,
  changeDeskripsiReward,
  changeFotoProduk,
  changeHargaPoint,
  changeNamaReward,
  changeStatus,
} from "@/features/reducers/affiliators/rewardReducer";

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

const useNewRewardViewModel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const currentId = session?.user.id;

  // Local states
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [rewardName, setRewardName] = useState("");
  const [rewardDesc, setRewardDesc] = useState("");
  const [pointsRequired, setPointsRequired] = useState(0);
  const [endSales, setEndSales] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redux states
  const status = useSelector((state: RootState) => state.reward.status);

  const [namaReward, setNamaReward] = useField(
    (state: RootState) => state.reward.namaReward,
    (value) => changeNamaReward(value),
  );

  const [fotoProduk, setFotoProduk] = useField(
    (state: RootState) => state.reward.fotoProduk,
    (value) => changeFotoProduk(value),
  );

  const [deskripsiReward, setDeskripsiReward] = useField(
    (state: RootState) => state.reward.deskripsiReward,
    (value) => changeDeskripsiReward(value),
  );

  const [hargaPoint, setHargaPoint] = useField(
    (state: RootState) => state.reward.hargaPoint,
    (value) => changeHargaPoint(value),
  );

  const [akhirMasaBerlaku, setAkhirMasaBerlaku] = useField(
    (state: RootState) => state.reward.akhirMasaBerlaku,
    (value) => changeAkhirMasaBerlaku(value),
  );

  const handleStatusChange = (status: string) => {
    dispatch(changeStatus(status));
  };

  const handleChangeHargaPoint = (price: string) => {
    dispatch(changeHargaPoint(price));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeFotoProduk(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [rewardsCatalogCreateMutation] = useRewardsCatalogCreateOneMutation();

  const handleRewardsCatalogCreateOneMutation = async ({
    namaReward,
    deskripsiReward,
    hargaPoint,
    endSales,
  }: any) => {
    const data = await rewardsCatalogCreateMutation({
      variables: {
        data: {
          title: namaReward,
          rewardsType: RewardsTypeEnum.Cash,
          pointsRequired: Number(hargaPoint),
          endSales,
          description: deskripsiReward,
          createdBy: {
            connect: {
              id: currentId
            }
          }
        },
      },
    });

    return data;
  };

  const resetForm = () => {
    dispatch(changeNamaReward(""));
    dispatch(changeDeskripsiReward(""));
    dispatch(changeHargaPoint(""));
    dispatch(changeAkhirMasaBerlaku(""));
    dispatch(changeStatus("published"));
    dispatch(changeFotoProduk(""));
  }

  const onSubmit = async () => {
    // Check if any required field is empty
    if (!namaReward || !deskripsiReward || !hargaPoint || !akhirMasaBerlaku) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const data = await handleRewardsCatalogCreateOneMutation({
        namaReward,
        deskripsiReward,
        hargaPoint,
        akhirMasaBerlaku,
      });
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
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
    namaReward,
    setNamaReward,
    fotoProduk,
    deskripsiReward,
    setDeskripsiReward,
    hargaPoint,
    setHargaPoint,
    akhirMasaBerlaku,
    setAkhirMasaBerlaku,
    handleStatusChange,
    status,
    handleChangeHargaPoint,
  };
};

export default useNewRewardViewModel;
