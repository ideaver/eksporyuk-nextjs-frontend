import { MembershipTypeEnum } from "@/app/service/graphql/gen/graphql";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface membershipState {
  name: string;
  description: string;
  duration: number;
  membershipType: MembershipTypeEnum;
  price: string;
  benefits: string;
}
const initialState: membershipState = {
  name: "",
  description: "",
  duration: 0,
  membershipType: MembershipTypeEnum.ThreeMonth,
  price: "0",
  benefits: "",
};

export const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    changeMembershipType: (
      state,
      action: PayloadAction<MembershipTypeEnum>
    ) => {
      state.membershipType = action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    changeDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    changeBenefits: (state, action: PayloadAction<string>) => {
      state.benefits = action.payload;
    },
    changePrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
  },
});

export const {
  changeMembershipType,
  changeName,
  changeDescription,
  changeBenefits,
  changePrice,
  changeDuration,
} = membershipSlice.actions;

export default membershipSlice.reducer;
