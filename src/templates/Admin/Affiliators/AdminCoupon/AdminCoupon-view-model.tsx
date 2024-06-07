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

export const useCoursesDropdown = () => {
  const { data, refetch } = useCourseFindManyQuery({
    variables: {
      take: 10,
    }
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
      options: [...prevOptions, ...fetchedOptions],
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
  const [date, setDate] = useState<Date>(new Date("2025-05-01"));
  const [connectCourse, setConnectCourse] = useState<number>();
  const [maxClaim, setMaxClaim] = useState<number>();

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

  const [couponCreateOne] = useCouponCreateOneMutation();

  const hanldeCouponCreateOne = async () => {
    dispatch(changeCouponLoading(true));
    try {
      await couponCreateOne({
        variables: {
          data: {
            startDate: new Date(),
            value: parseInt(discount as string),
            type: discountType,
            endDate: addDate ? date : null,
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
            courseCoupon: {
              connect: {
                id: connectCourse,
              }
            }
          },
        },
      });
      await couponFindMany.refetch();
    } catch (error) {
      console.log(error);
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
    setMaxClaim
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

  const [couponDeleteMany] = useCouponDeleteManyMutation();
  const [couponDeleteOne] = useCouponDeleteOneMutation();
  const [couponUpdateOne] = useCouponUpdateOneMutation();

  const { currentPage, calculateTotalPage, couponLength, handlePageChange } =
    usePagination({
      couponSearch,
      couponSkip,
      couponStatus,
      couponTake,
      setCouponSkip,
      setCouponTake,
    });

  const {
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
  } = useCheckbox(couponFindMany);

  const handleDeleteMany = async () => {
    try {
      await couponDeleteMany({
        variables: {
          where: {
            id: {
              in: checked,
            },
          },
        },
      });
      await couponFindMany.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      router.reload();
    }
  };

  useEffect(() => {
    dispatch(changeCouponLoading(false));
  }, [dispatch]);

  return {
    couponTake,
    setOrderBy,
    couponDeleteOne,
    couponUpdateOne,
    handleDeleteMany,
    couponDeleteMany,
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
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
    couponFindMany,
  };
};

export default useAdminCouponViewModel;
