import {
  MembershipCategoryFindOneQuery,
  QueryMode,
  useCourseFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { GroupBase, OptionsOrGroups } from "react-select";
import { CourseOptionType } from "../../Affiliators/RewardManagement/Create/NewReward/NewReward-view-model";
import { useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Membership",
    path: "/admin/membership",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
  {
    title: "Manajemen Membership",
    path: "/admin/membership",
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

export interface IDetailMembership {
  id: string | string[] | undefined;
  data: MembershipCategoryFindOneQuery;
}

const useDetailMembershipViewModel = ({ id, data }: IDetailMembership) => {
  const [nameMembership, setNameMembership] = useState(
    data.membershipCategoryFindOne?.name
  );
  const [descriptionMembership, setDetailMembership] = useState(
    data.membershipCategoryFindOne?.description
  );

  const [price, setPrice] = useState(data.membershipCategoryFindOne?.price);
  const [duration] = useState(data.membershipCategoryFindOne?.durationDay);
  const [benefits] = useState(data.membershipCategoryFindOne?.benefits);
  const [courses] = useState(data.membershipCategoryFindOne?.benefitCourses);
  const [affiliateCommission] = useState(
    data.membershipCategoryFindOne?.affiliateCommission
  );
  const [affiliateFirstCommission] = useState(
    data.membershipCategoryFindOne?.affiliateCommission
  );
  const [subscriberListId, setSubscriberListId] = useState(
    data.membershipCategoryFindOne?.subscriberListId
  );
  const [benefitService] = useState(
    data.membershipCategoryFindOne?.membershipBenefitServiceEnum
  );
  console.log(benefitService);

  return {
    benefitService,
    affiliateCommission,
    affiliateFirstCommission,
    courses,
    nameMembership,
    descriptionMembership,
    price,
    duration,
    benefits,
    subscriberListId,
  };
};

export default useDetailMembershipViewModel;
