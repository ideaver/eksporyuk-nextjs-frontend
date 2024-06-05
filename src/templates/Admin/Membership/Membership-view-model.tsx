import {
  QueryMode,
  SortOrder,
  useMembershipCategoryDeleteOneMutation,
  useMembershipCategoryFindLengthQuery,
  useMembershipCategoryFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { Dispatch, SetStateAction, useState } from "react";

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
];

interface PaginationProps {
  membershipTake: number;
  membershipSkip: number;
  membershipFindSearch: string | undefined;
  setMembershipTake: Dispatch<SetStateAction<number>>;
  setMembershipSkip: Dispatch<SetStateAction<number>>;
}

const usePagination = ({
  membershipTake,
  membershipSkip,
  membershipFindSearch,
  setMembershipSkip,
  setMembershipTake,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const membershipLength = useMembershipCategoryFindLengthQuery({
    variables: {
      where: {},
    },
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setMembershipSkip((page - 1) * membershipTake);
    // if (currentPage >= 2) {
    //   setArticleFindSkip(0);
    // }
  };

  const length: any = membershipLength.data?.membershipCategoryFindMany?.length;

  const calculateTotalPage = () => {
    return Math.ceil(length / membershipTake);
  };
  return {
    membershipLength,
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
  };
};

const useMembershipViewModel = () => {
  const [membershipTake, setMembershipTake] = useState(10);
  const [membershipSkip, setMembershipSkip] = useState(0);

  const [membershipFindSearch, setMembershipFindSearch] = useState("");
  const [orderBy, setOrderBy] = useState(SortOrder.Desc);

  const membershipFindMany = useMembershipCategoryFindManyQuery({
    variables: {
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            name: {
              contains: membershipFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      take: parseInt(membershipTake.toString()),
      skip: membershipSkip,
    },
  });
  const [membershipDeleteOne] = useMembershipCategoryDeleteOneMutation();

  const {
    membershipLength,
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
  } = usePagination({
    membershipTake,
    membershipSkip,
    membershipFindSearch,
    setMembershipSkip,
    setMembershipTake,
  });

  return {
    membershipLength,
    membershipDeleteOne,
    setOrderBy,
    orderBy,
    setMembershipTake,
    membershipSkip,
    setMembershipSkip,
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    membershipTake,
    membershipFindMany,
    membershipFindSearch,
    setMembershipFindSearch,
  };
};

export default useMembershipViewModel;
