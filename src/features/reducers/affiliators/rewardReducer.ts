import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";

interface RewardState {
  namaReward: string;
  fotoProduk: string;
  deskripsiReward: string;
  hargaPoint: string;
  akhirMasaBerlaku: string;
  status: string;
}

const initialState: RewardState = {
  namaReward: "",
  fotoProduk: "",
  deskripsiReward: "",
  hargaPoint: "",
  akhirMasaBerlaku: "2024-06-01",
  status: "published",
}

export const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    changeNamaReward: (state, action: PayloadAction<string>) => {
      state.namaReward = action.payload;
    },
    changeFotoProduk: (state, action: PayloadAction<string>) => {
      state.fotoProduk = action.payload;
    },
    changeDeskripsiReward: (state, action: PayloadAction<string>) => {
      state.deskripsiReward = action.payload;
    },
    changeHargaPoint: (state, action: PayloadAction<string>) => {
      state.hargaPoint = action.payload;
    },
    changeAkhirMasaBerlaku: (state, action: PayloadAction<string>) => {
      state.akhirMasaBerlaku = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  }
});

export const {
  changeNamaReward,
  changeFotoProduk,
  changeDeskripsiReward,
  changeHargaPoint,
  changeAkhirMasaBerlaku,
  changeStatus,
} = rewardSlice.actions;

export default rewardSlice.reducer;
