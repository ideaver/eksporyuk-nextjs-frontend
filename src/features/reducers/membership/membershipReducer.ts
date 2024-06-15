import { MembershipBenefitServiceEnum } from "@/app/service/graphql/gen/graphql";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface membershipState {
  name: string;
  description: string;
  duration: number;
  price: string;
  subscriberListId: string;
  benefits: string;
  courses: { value: number; label: string }[];
  affiliateFirstCommision: number;
  affiliateCommision: number;
  benefitService: MembershipBenefitServiceEnum[];
}
const initialState: membershipState = {
  name: "",
  description: "",
  duration: 0,
  price: "0",
  subscriberListId: "",
  benefits: "",
  courses: [],
  affiliateFirstCommision: 100,
  affiliateCommision: 100,
  benefitService: [],
};

export const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
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
    changeSubscriberListId: (state, action: PayloadAction<string>) => {
      state.subscriberListId = action.payload;
    },
    changePrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    changeCourses: (
      state,
      action: PayloadAction<{ value: number; label: string }[]>
    ) => {
      state.courses = action.payload;
    },
    changeAffiliateCommission: (state, action: PayloadAction<number>) => {
      state.affiliateCommision = action.payload;
    },
    changeAffiliateFirstCommission: (state, action: PayloadAction<number>) => {
      state.affiliateFirstCommision = action.payload;
    },
    changeBenefitService: (
      state,
      action: PayloadAction<MembershipBenefitServiceEnum[]>
    ) => {
      state.benefitService = action.payload;
    },
  },
});

export const {
  changeName,
  changeDescription,
  changeBenefits,
  changePrice,
  changeDuration,
  changeCourses,
  changeAffiliateCommission,
  changeAffiliateFirstCommission,
  changeSubscriberListId,
  changeBenefitService,
} = membershipSlice.actions;

export default membershipSlice.reducer;
