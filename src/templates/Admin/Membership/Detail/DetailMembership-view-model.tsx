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
  const [membershipType, setMembershipType] = useState(
    data.membershipCategoryFindOne?.membershipType
  );
  const [price, setPrice] = useState(data.membershipCategoryFindOne?.price);
  const [duration] = useState(data.membershipCategoryFindOne?.durationDay);
  const [benefits] = useState(data.membershipCategoryFindOne?.benefits);
  const [courses] = useState(data.membershipCategoryFindOne?.benefitCourses);

  return {
    courses,
    nameMembership,
    descriptionMembership,
    membershipType,
    price,
    duration,
    benefits,
  };
};

export default useDetailMembershipViewModel;