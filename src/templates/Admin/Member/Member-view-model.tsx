import {
  QueryMode,
  SortOrder,
  StudentFindManyQuery,
  useStudentFindLengthQuery,
  useStudentFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { useEffect, useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Member",
    path: "/admin/members",
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
  const [studentFindSkip, setStudentFindSkip] = useState(0);
  const [studentFindTake, setStudentFindTake] = useState(100);
  const studentLength = useStudentFindLengthQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setStudentFindSkip((page - 1) * studentFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (studentLength.data?.studentFindMany?.length ?? 0) / studentFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    studentFindSkip,
    setStudentFindSkip,
    studentFindTake,
    setStudentFindTake,
    handlePageChange,
    calculateTotalPage,
    studentLength,
  };
};

// Checkbox related functions
const useCheckbox = (studentFindMany: QueryResult<StudentFindManyQuery>) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (studentFindMany.data?.studentFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (studentFindMany.data?.studentFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [studentFindMany.data?.studentFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(studentFindMany.data?.studentFindMany)
        ? studentFindMany.data?.studentFindMany?.map((item) => ({
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

const useMemberViewModel = () => {
  // Query and Modal
  const {
    currentPage,
    setCurrentPage,
    studentFindSkip,
    setStudentFindSkip,
    studentFindTake,
    setStudentFindTake,
    handlePageChange,
    calculateTotalPage,
    studentLength,
  } = usePagination();
  const [studentFindSearch, setStudentFindSearch] = useState("");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  const studentFindMany = useStudentFindManyQuery({
    variables: {
      take: parseInt(studentFindTake.toString()),
      skip: studentFindSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            user: {
              is: {
                name: {
                  contains: studentFindSearch,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                email: {
                  contains: studentFindSearch,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            id: {
              contains: studentFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
  });

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(studentFindMany);

  return {
    orderBy,
    setOrderBy,
    studentFindMany,
    studentFindTake,
    setStudentFindTake,
    studentFindSkip,
    setStudentFindSkip,
    studentFindSearch,
    setStudentFindSearch,
    studentLength,
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
export default useMemberViewModel;
