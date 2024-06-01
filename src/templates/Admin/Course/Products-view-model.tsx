import {
  CourseFindManyQuery,
  CourseStatusEnum,
  QueryMode,
  useCourseFindLengthQuery,
  useCourseFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { useEffect, useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Kelas",
    path: "/admin/courses",
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
export function getStatusBadgeColor(status: CourseStatusEnum | undefined) {
  switch (status) {
    case CourseStatusEnum.Archived:
      return "warning";
    case CourseStatusEnum.Draft:
      return "primary";
    case CourseStatusEnum.Published:
      return "success";
    default:
      return "info";
  }
}
// Pagination related functions
const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [courseFindSkip, setCourseFindSkip] = useState(0);
  const [courseFindTake, setCourseFindTake] = useState(10);
  const courseLength = useCourseFindLengthQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCourseFindSkip((page - 1) * courseFindTake);
  };

  const calculateTotalPage = () => {
    return Math.ceil(
      (courseLength.data?.courseFindMany?.length ?? 0) / courseFindTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    courseFindSkip,
    setCourseFindSkip,
    courseFindTake,
    setCourseFindTake,
    handlePageChange,
    calculateTotalPage,
    courseLength,
  };
};

// Checkbox related functions
const useCheckbox = (courseFindMany: QueryResult<CourseFindManyQuery>) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (courseFindMany.data?.courseFindMany ?? []).map((item) => ({
      id: item.id,
      value: false,
    }))
  );

  useEffect(() => {
    setCheckedItems(
      (courseFindMany.data?.courseFindMany ?? []).map((item) => ({
        id: item.id,
        value: false,
      }))
    );
  }, [courseFindMany.data?.courseFindMany]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index].value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(courseFindMany.data?.courseFindMany)
        ? courseFindMany.data?.courseFindMany?.map((item) => ({
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

const useCoursesViewModel = () => {
  // Query and Modal
  const {
    currentPage,
    setCurrentPage,
    courseFindSkip,
    setCourseFindSkip,
    courseFindTake,
    setCourseFindTake,
    handlePageChange,
    calculateTotalPage,
    courseLength,
  } = usePagination();
  // const [showMentorSelectModal, setShowMentorSelectModal] = useState(false);
  const [courseFindSearch, setCourseFindSearch] = useState("");

  const courseFindMany = useCourseFindManyQuery({
    variables: {
      take: parseInt(courseFindTake.toString()),
      skip: courseFindSkip,
      where: {
        OR: [
          {
            title: {
              contains: courseFindSearch,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: courseFindSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
          },
          {
            id: {
              equals: isNaN(parseInt(courseFindSearch.toString()))
                ? 0
                : parseInt(courseFindSearch.toString()),
            },
          },
        ],
      },
    },
  });

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(courseFindMany);
  return {
    courseFindMany,
    courseFindTake,
    setCourseFindTake,
    courseFindSkip,
    setCourseFindSkip,
    courseFindSearch,
    setCourseFindSearch,
    courseLength,
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
export default useCoursesViewModel;
