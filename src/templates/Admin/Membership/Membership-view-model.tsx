import {
  QueryMode,
  SortOrder,
  useMembershipCategorySoftDeleteMutation,
  useMembershipCategoryFindLengthQuery,
  useMembershipCategoryFindManyQuery,
  useMembershipCategoryDuplicateLazyQuery,
  useMembershipCategoryUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Membership",
    path: "/admin/product-management/subscriber",
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
  const [swalProps, setSwalProps] = useState({});

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
  const [membershipDeleteOne] = useMembershipCategorySoftDeleteMutation();

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

  const [membershipUpdateOne] = useMembershipCategoryUpdateOneMutation();

  const handleMembershipActivateOne = async (id: number) => {
    try {
      await membershipUpdateOne({
        variables: {
          where: {
            id,
          },
          data: {
            isActive: {
              set: true,
            },
          },
        },
      });
      await membershipFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const [membershipDuplicateOne] = useMembershipCategoryDuplicateLazyQuery();

  const handleMembershipDuplicateOne = async (id: number) => {
    try {
      const response = await membershipDuplicateOne({
        variables: {
          where: {
            id,
          },
        },
      });
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "Berhasil Terduplikasi",
        icon: "success",
        confirmButtonText: "OK",
      });
      await membershipFindMany.refetch();
    } catch (error) {
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return {
    handleMembershipDuplicateOne,
    swalProps,
    setSwalProps,
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
    handleMembershipActivateOne,
  };
};

export default useMembershipViewModel;
