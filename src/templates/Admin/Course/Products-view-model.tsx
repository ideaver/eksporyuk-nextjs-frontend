import {
  CourseFindManyQuery,
  CourseStatusEnum,
  QueryMode,
  SortOrder,
  useCourseDeleteManyMutation,
  useCourseFindLengthQuery,
  useCourseFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [checkedItems, setCheckedItems] = useState<
    { id: number; value: boolean }[]
  >([]);

  const getCheckedItems = useMemo(() => {
    return checkedItems.filter((item) => item.value).map((e) => e.id);
  }, [checkedItems]);

  const [checked, setChecked] = useState(getCheckedItems);

  useEffect(() => {
    setChecked(getCheckedItems);
  }, [getCheckedItems]);

  useEffect(() => {
    if (courseFindMany.data?.courseFindMany) {
      setCheckedItems(
        courseFindMany.data.courseFindMany.map((item) => ({
          id: item.id,
          value: false,
        }))
      );
    }
  }, [courseFindMany.data?.courseFindMany]);

  const handleSingleCheck = useCallback((index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index].value = !newCheckedItems[index].value;
      const allChecked = newCheckedItems.every((item) => item.value);
      setSelectAll(allChecked);
      return newCheckedItems;
    });
  }, []);

  const handleSelectAllCheck = useCallback(() => {
    setCheckedItems((prevCheckedItems) => {
      const newSelectAll = !selectAll;
      const newCheckedItems = prevCheckedItems.map((item) => ({
        ...item,
        value: newSelectAll,
      }));
      setSelectAll(newSelectAll);
      return newCheckedItems;
    });
  }, [selectAll]);

  return {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
  };
};

// const useCheckbox = (courseFindMany: QueryResult<CourseFindManyQuery>) => {
//   const [selectAll, setSelectAll] = useState(false);
//   const [checkedItems, setCheckedItems] = useState(
//     (courseFindMany.data?.courseFindMany ?? []).map((item) => ({
//       id: item.id,
//       value: false,
//     }))
//   );

//   useEffect(() => {
//     setCheckedItems(
//       (courseFindMany.data?.courseFindMany ?? []).map((item) => ({
//         id: item.id,
//         value: false,
//       }))
//     );
//   }, [courseFindMany.data?.courseFindMany]);

//   const handleSingleCheck = (index: number) => {
//     const newCheckedItems = [...checkedItems];
//     newCheckedItems[index].value = !newCheckedItems[index].value;
//     setCheckedItems(newCheckedItems);
//     setSelectAll(newCheckedItems.every((item) => item.value));
//   };

//   const handleSelectAllCheck = () => {
//     setSelectAll(!selectAll);
//     setCheckedItems(
//       Array.isArray(courseFindMany.data?.courseFindMany)
//         ? courseFindMany.data?.courseFindMany?.map((item) => ({
//             id: item.id,
//             value: !selectAll,
//           }))
//         : []
//     );
//   };

//   return {
//     selectAll,
//     checkedItems,
//     handleSingleCheck,
//     handleSelectAllCheck,
//   };
// };

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
  const [statusFindSearch, setStatusFindSearch] = useState<
    CourseStatusEnum | "all"
  >("all");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const router = useRouter();

  const courseFindMany = useCourseFindManyQuery({
    variables: {
      take: parseInt(courseFindTake.toString()),
      skip: courseFindSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            title: {
              contains: courseFindSearch,
              mode: QueryMode.Insensitive,
            },
            status: {
              equals: statusFindSearch == "all" ? null : statusFindSearch,
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
            status: {
              equals: statusFindSearch == "all" ? null : statusFindSearch,
            },
          },
          {
            id: {
              equals: isNaN(parseInt(courseFindSearch.toString()))
                ? 0
                : parseInt(courseFindSearch.toString()),
            },
            status: {
              equals: statusFindSearch == "all" ? null : statusFindSearch,
            },
          },
        ],
      },
    },
  });
  const {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
  } = useCheckbox(courseFindMany);

  const [courseDeleteMany] = useCourseDeleteManyMutation();

  const handleCourseDeleteMany = async () => {
    try {
      await courseDeleteMany({
        variables: {
          where: {
            id: {
              in: checked,
            },
          },
        },
      });
      await courseFindMany.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      router;
    }
  };
  return {
    handleCourseDeleteMany,
    checked,
    statusFindSearch,
    setStatusFindSearch,
    setOrderBy,
    orderBy,
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
