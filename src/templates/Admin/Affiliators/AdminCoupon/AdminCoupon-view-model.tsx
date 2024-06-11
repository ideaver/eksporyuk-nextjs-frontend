import {
  AffiliatorCouponFindManyQuery,
  AffiliatorFindManyQuery,
  DiscountTypeEnum,
  PlatformCouponFindManyQuery,
  QueryMode,
  SortOrder,
  useAffiliatorCouponFindManyQuery,
  useCouponCreateOneMutation,
  useCouponDeleteManyMutation,
  useCouponDeleteOneMutation,
  useCouponFindOneQuery,
  useCouponUpdateOneMutation,
  usePlatformCouponFindManyQuery,
  useCourseFindManyQuery,
  useSoftDeletePlatformCouponLazyQuery,
} from "@/app/service/graphql/gen/graphql";
import { changeCouponLoading } from "@/features/reducers/affiliators/couponReducer";
import { QueryResult } from "@apollo/client";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { OptionsOrGroups, GroupBase } from "react-select";
import { ApolloError } from "@apollo/client";

type CourseOptionType = {
  value: number;
  label: string;
};

export const breadcrumbs = [
  {
    title: "Manajeman Kupon",
    path: "/admin/affiliate/admin-coupon",
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

// Kupon hanya bisa digunakan di kelas
export const AddAllowedCourses = (courses: any, setCourses: any) => {
  const [allowCourses, setAllowCourses] = useState<any>([]);

  const addAllowedCourse = (course: any) => {
    const updatedCourses = allowCourses ? [...allowCourses, course] : [course];

    setAllowCourses(updatedCourses);
    setCourses(updatedCourses);
  };

  const removeAllowedCourse = (index: number) => {
    const updatedCourses = allowCourses?.filter(
      (_: any, courseIndex: any) => courseIndex !== index
    );

    setAllowCourses(updatedCourses);
  };

  useEffect(() => {
    setAllowCourses(allowCourses);
  }, [allowCourses]);

  return {
    allowCourses,
    setAllowCourses,
    addAllowedCourse,
    removeAllowedCourse,
  };
};

// Kupon tidak bisa digunakan di kelas
export const AddNotAllowedCourses = (courses: any, setCourses: any) => {
  const [notAllowCourses, setNotAllowCourses] = useState<any>([]);

  const addNotAllowedCourse = (course: any) => {
    const updatedCourses = notAllowCourses
      ? [...notAllowCourses, course]
      : [course];

    setNotAllowCourses(updatedCourses);
    setCourses(updatedCourses);
  };

  const removeNotAllowedCourse = (index: number) => {
    const updatedCourses = notAllowCourses?.filter(
      (_: any, courseIndex: any) => courseIndex !== index
    );

    setNotAllowCourses(updatedCourses);
  };

  useEffect(() => {
    setNotAllowCourses(notAllowCourses);
  }, [notAllowCourses]);

  return {
    notAllowCourses,
    setNotAllowCourses,
    addNotAllowedCourse,
    removeNotAllowedCourse,
  };
};

// Dropdown list of courses
export const useCoursesDropdown = () => {
  const { data, refetch } = useCourseFindManyQuery({
    variables: {
      take: 10,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<CourseOptionType, GroupBase<CourseOptionType>>
  ) {
    const result =
      data?.courseFindMany?.map((course) => ({
        value: course.id,
        label: course.title,
      })) ?? [];

    const newOptions = result.filter(
      (option) =>
        !prevOptions.some(
          (prevOption) =>
            (prevOption as CourseOptionType).value === option.value
        )
    );

    const response = await refetch({
      skip: prevOptions.length,
      where: {
        title: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    const fetchedOptions =
      response.data?.courseFindMany?.map((course) => ({
        value: course.id,
        label: course.title,
      })) ?? [];

    return {
      options: newOptions,
      hasMore: fetchedOptions.length > 0,
    };
  }

  return { loadOptions };
};

export const useCouponForm = () => {
  const { couponFindMany } = useAdminCouponViewModel();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [editId, setEditId] = useState<number>();

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("true");
  const [discountType, setDiscountType] = useState(DiscountTypeEnum.Amount);
  const [discount, setDiscount] = useState<string>("0");
  const [addDate, setAddDate] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [connectCourse, setConnectCourse] = useState<number>();
  const [maxClaim, setMaxClaim] = useState<number>();
  const [allowedCourses, setAllowedCourses] = useState<any>([]);
  const [notAllowedCourses, setNotAllowedCourses] = useState<any>([]);
  const [swalProps, setSwalProps] = useState({});
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [desc, setDesc] = useState<string>("");

  // Kupon hanya bisa digunakan di kelas
  const selectedCourses = allowedCourses.map((item: any) => ({
    id: item.value,
  }));

  // Kupon tidak bisa digunakan di kelas
  const notAllowedCourse = notAllowedCourses.map((item: any) => ({
    id: item.value,
  }));

  // Kupon hanya bisa digunakan di kelas
  const {
    allowCourses,
    setAllowCourses,
    addAllowedCourse,
    removeAllowedCourse,
  } = AddAllowedCourses(allowedCourses, setAllowedCourses);

  // Kupon tidak bisa digunakan di kelas
  const {
    notAllowCourses,
    setNotAllowCourses,
    addNotAllowedCourse,
    removeNotAllowedCourse,
  } = AddNotAllowedCourses(notAllowedCourses, setNotAllowedCourses);

  const selectedAllowedCoursesIds = allowedCourses.map(
    (item: any) => item.value
  );
  const selectedNotAllowedCoursesIds = notAllowedCourses.map(
    (item: any) => item.value
  );

  const couponSchema = Yup.object().shape({
    code: Yup.string()
      .max(50, "Maksimal 50 simbol")
      .required("code diperlukan"),
  });

  const couponForm = useFormik({
    initialValues: {
      code,
    },
    validationSchema: couponSchema,
    onSubmit: () => {},
  });

  const resetForm = () => {
    setMaxClaim(0);
    setDiscount("0");
    setStatus("true");
    setCode("");
    setAllowedCourses([]);
    setNotAllowedCourses([]);
  };

  const [couponCreateOne] = useCouponCreateOneMutation();

  const hanldeCouponCreateOne = async () => {
    dispatch(changeCouponLoading(true));
    try {
      const res = await couponCreateOne({
        variables: {
          data: {
            startDate: addDate ? startDate : new Date(),
            value: parseInt(discount as string),
            type: discountType,
            endDate: addDate ? endDate : null,
            isActive: status == "true" ? true : false,
            maxClaimPerUser: Number(maxClaim),
            platformCoupon: {
              create: {
                code,
                createdBy: {
                  connect: {
                    id: session?.user.id,
                  },
                },
              },
            },
            description: desc,
            // courseCoupon: {
            //   connect: {
            //     id: connectCourse,
            //   }
            // }
            avaibilities: {
              create: {
                onlyAvailableToCourse: {
                  connect: selectedCourses,
                },
                notAvailableToCourse: {
                  connect: notAllowedCourse,
                },
              },
            },
          },
        },
      });

      if (res.data?.couponCreateOne) {
        setSwalProps({
          show: true,
          title: "Berhasil",
          text: "Kupon berhasil ditambahkan",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      await couponFindMany.refetch();
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan saat menambahkan kupon",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      dispatch(changeCouponLoading(false));
    }
  };

  return {
    editId,
    setEditId,
    hanldeCouponCreateOne,
    couponForm,
    status,
    setStatus,
    setCode,
    code,
    discountType,
    setDiscountType,
    discount,
    setDiscount,
    addDate,
    setAddDate,
    date,
    setDate,
    connectCourse,
    setConnectCourse,
    maxClaim,
    setMaxClaim,
    allowCourses,
    setAllowCourses,
    addAllowedCourse,
    removeAllowedCourse,
    notAllowCourses,
    setNotAllowCourses,
    addNotAllowedCourse,
    removeNotAllowedCourse,
    swalProps,
    setSwalProps,
    resetForm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setDesc,
    desc,
  };
};

const usePagination = ({
  couponTake,
  couponSkip,
  couponSearch,
  couponStatus,
  setCouponSkip,
  setCouponTake,
}: {
  couponTake: number;
  couponSkip: number;
  couponSearch: string;
  couponStatus: string;
  setCouponSkip: Dispatch<SetStateAction<number>>;
  setCouponTake: Dispatch<SetStateAction<number>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const couponLength = usePlatformCouponFindManyQuery({
    variables: {
      where: {
        OR: [
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: couponSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
            coupon: {
              is: {
                isActive: {
                  equals:
                    couponStatus === "true"
                      ? true
                      : couponStatus === "false"
                      ? false
                      : null,
                },
              },
            },
          },
          {
            code: {
              contains: couponSearch,
              mode: QueryMode.Insensitive,
            },
            coupon: {
              is: {
                isActive: {
                  equals:
                    couponStatus === "true"
                      ? true
                      : couponStatus === "false"
                      ? false
                      : null,
                },
              },
            },
          },
        ],
      },
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCouponSkip((page - 1) * couponTake);
  };

  const length: number | undefined =
    couponLength.data?.platformCouponFindMany?.length;

  const calculateTotalPage = () => {
    return Math.ceil(
      (couponLength.data?.platformCouponFindMany?.length ?? 0) / couponTake
    );
  };

  useEffect(() => {
    if (couponSearch.length > 0 || couponStatus != "all") {
      setCurrentPage(1);
      setCouponSkip(0);
    }
  }, [couponSearch, couponStatus, setCouponSkip]);

  return {
    currentPage,
    calculateTotalPage,
    couponLength,
    handlePageChange,
  };
};

const useCheckbox = (
  couponFindMany: QueryResult<PlatformCouponFindManyQuery>
) => {
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
    if (couponFindMany.data?.platformCouponFindMany) {
      setCheckedItems(
        couponFindMany.data.platformCouponFindMany.map((item) => ({
          id: item.id,
          value: false,
        }))
      );
    }
  }, [couponFindMany.data?.platformCouponFindMany]);

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

const useAdminCouponViewModel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [couponSkip, setCouponSkip] = useState(0);
  const [couponTake, setCouponTake] = useState(10);
  const [couponSearch, setCouponSearch] = useState("");
  const [couponStatus, setCouponStatus] = useState<string>("all");
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  const couponFindMany = usePlatformCouponFindManyQuery({
    variables: {
      take: parseInt(couponTake.toString()),
      skip: couponSkip,
      orderBy: [
        {
          coupon: {
            createdAt: orderBy,
          },
        },
      ],
      where: {
        OR: [
          {
            createdBy: {
              is: {
                user: {
                  is: {
                    name: {
                      contains: couponSearch,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
            coupon: {
              is: {
                isActive: {
                  equals:
                    couponStatus === "true"
                      ? true
                      : couponStatus === "false"
                      ? false
                      : null,
                },
              },
            },
          },
          {
            code: {
              contains: couponSearch,
              mode: QueryMode.Insensitive,
            },
            coupon: {
              is: {
                isActive: {
                  equals:
                    couponStatus === "true"
                      ? true
                      : couponStatus === "false"
                      ? false
                      : null,
                },
              },
            },
          },
        ],
      },
    },
  });

  const couponData = couponFindMany.data?.platformCouponFindMany?.filter(
    (coupon) => !coupon.code.includes("DELETED")
  );
  console.log(couponData);

  const [couponUpdateOne] = useCouponUpdateOneMutation();
  const [softDeleteCoupon, response] = useSoftDeletePlatformCouponLazyQuery();

  const handleDeleteCoupon = async (id: number) => {
    try {
      await softDeleteCoupon({
        variables: {
          where: {
            id: id,
          },
        },
      });
      await couponFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const { currentPage, calculateTotalPage, couponLength, handlePageChange } =
    usePagination({
      couponSearch,
      couponSkip,
      couponStatus,
      couponTake,
      setCouponSkip,
      setCouponTake,
    });

  useEffect(() => {
    dispatch(changeCouponLoading(false));
  }, [dispatch]);

  return {
    couponData,
    handleDeleteCoupon,
    couponTake,
    setOrderBy,
    couponUpdateOne,
    setCouponSkip,
    setCouponTake,
    currentPage,
    calculateTotalPage,
    couponLength,
    handlePageChange,
    couponSearch,
    setCouponSearch,
    couponStatus,
    setCouponStatus,
    couponFindMany,
  };
};

export default useAdminCouponViewModel;
