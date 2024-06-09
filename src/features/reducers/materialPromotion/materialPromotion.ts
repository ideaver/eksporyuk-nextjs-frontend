// import { UserRoleEnum } from "@/app/service/graphql/gen/graphql";

import { MaterialPromotionPlatformTypeEnum } from "@/app/service/graphql/gen/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MaterialPromotionState {
  materialType: MaterialPromotionPlatformTypeEnum;
  contentMaterialPromotionFirst: string;
  contentMaterialPromotionSecond: string;
  titleMaterialPromotion: string;
  videoUrl: string;
}

const initialState: MaterialPromotionState = {
  materialType: MaterialPromotionPlatformTypeEnum.Banner,
  titleMaterialPromotion: "",
  contentMaterialPromotionFirst: "",
  contentMaterialPromotionSecond: "",
  videoUrl: "",
};

export const materialPromotionSlice = createSlice({
  name: "materialPromotion",
  initialState,
  reducers: {
    changeTitleMaterialPromotion: (state, action: PayloadAction<string>) => {
      state.titleMaterialPromotion = action.payload;
    },
    changeContentMaterialPromotionFirst: (
      state,
      action: PayloadAction<string>
    ) => {
      state.contentMaterialPromotionFirst = action.payload;
    },
    changeContentMaterialPromotionSecond: (
      state,
      action: PayloadAction<string>
    ) => {
      state.contentMaterialPromotionSecond = action.payload;
    },
    changeMaterialType: (
      state,
      action: PayloadAction<MaterialPromotionPlatformTypeEnum>
    ) => {
      state.materialType = action.payload;
    },
    changeVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoUrl = action.payload;
    },
  },
});

export const {
  changeContentMaterialPromotionFirst,
  changeContentMaterialPromotionSecond,
  changeMaterialType,
  changeTitleMaterialPromotion,
  changeVideoUrl,
} = materialPromotionSlice.actions;

export default materialPromotionSlice.reducer;
