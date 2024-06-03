import {
  MentorFindManyQuery,
  QueryMode,
  SortOrder,
  useMentorFindLengthQuery,
  useMentorFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { setDefaultResultOrder } from "dns";
import { useEffect, useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Mentor",
    path: "/admin/mentors",
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

// Pagination related functions
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mentorFindSkip, setMentorFindSkip] = useState(0);
  const [mentorFindTake, setMentorFindTake] = useState(100);
  const mentorLength = useMentorFindLengthQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setMentorFindSkip((page - 1) * mentorFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (mentorLength.data?.mentorFindMany?.length ?? 0) / mentorFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    mentorFindSkip,
    setMentorFindSkip,
    mentorFindTake,
    setMentorFindTake,
    handlePageChange,
    calculateTotalPage,
    mentorLength,
  };
};

// Checkbox related functions
const useCheckbox = (mentorFindMany: QueryResult<MentorFindManyQuery>) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (mentorFindMany.data?.mentorFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (mentorFindMany.data?.mentorFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [mentorFindMany.data?.mentorFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(mentorFindMany.data?.mentorFindMany)
        ? mentorFindMany.data?.mentorFindMany?.map((item) => ({
            id: item.id,
            value: !selectAll,
          }))
        : []
    );
  };

  return {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
  };
};

const useMentorViewModel = () => {
  // Query and Modal
  const {
    currentPage,
    setCurrentPage,
    mentorFindSkip,
    setMentorFindSkip,
    mentorFindTake,
    setMentorFindTake,
    handlePageChange,
    calculateTotalPage,
    mentorLength,
  } = usePagination();
  const [showMentorSelectModal, setShowMentorSelectModal] = useState(false);
  const [mentorFindSearch, setMentorFindSearch] = useState("");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  const mentorFindMany = useMentorFindManyQuery({
    variables: {
      take: parseInt(mentorFindTake.toString()),
      skip: mentorFindSkip,
      orderBy: [
        {
          updatedAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            user: {
              is: {
                name: {
                  contains: mentorFindSearch,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                email: {
                  contains: mentorFindSearch,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            id: {
              contains: mentorFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
  });

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(mentorFindMany);

  return {
    orderBy,
    setOrderBy,
    showMentorSelectModal,
    setShowMentorSelectModal,
    mentorFindMany,
    mentorFindTake,
    setMentorFindTake,
    mentorFindSkip,
    setMentorFindSkip,
    mentorFindSearch,
    setMentorFindSearch,
    mentorLength,
    currentPage,
    setCurrentPage,
    handlePageChange,
    handleSingleCheck,
    handleSelectAllCheck,
    selectAll,
    checkedItems,
    calculateTotalPage,
  };
};
export default useMentorViewModel;
