import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { QueryResult } from "@apollo/client";

import { RootState } from "@/app/store/store";
import {
  changeCouponCode,
  changeIsActive,
  changeFreeDelivery,
  changeEndDate,
  changeStartDate,
  changeValue,
  changeLimitUsage,
  changeAllowAffiliator,
} from "@/features/reducers/affiliators/couponReducer";
import {
  useCouponCreateOneMutation,
  useAffiliatorCouponDeleteOneMutation,
  useCouponUpdateOneMutation,
  AffiliatorFindOneQuery,
  useCouponDeleteManyMutation,
  usePlatformCouponFindManyQuery,
  QueryMode,
} from "@/app/service/graphql/gen/graphql";
import { DiscountTypeEnum } from "@/app/service/graphql/gen/graphql";
import { GroupBase, OptionsOrGroups } from "react-select";

export const usePlatformCouponDropdown = () => {
  const getCategory = usePlatformCouponFindManyQuery({
    variables: {
      where: {},
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>
  ) {
    const result =
      getCategory.data?.platformCouponFindMany?.map((category) => ({
        value: category.id,
        label: category.code.toLocaleLowerCase(),
      })) ?? [];
    await getCategory.refetch({
      skip: prevOptions.length,
      where: {
        code: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });

    return {
      options: result,
      hasMore: true,
    };
  }

  return { loadOptions };
};

const useField = <T extends string | boolean | number>(
  selector: (state: RootState) => T,
  action: (value: T) => UnknownAction
) => {
  const dispatch = useDispatch();
  const initialValue = useSelector(selector);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: T;
    if (typeof initialValue === "boolean") {
      newValue = event.target.checked as T;
    } else if (typeof initialValue === "number") {
      newValue = Number(event.target.value) as T;
    } else {
      newValue = event.target.value as T;
    }
    setValue(newValue);
    dispatch(action(newValue));
  };

  return [value, handleChange] as const;
};

export const dateFormatter = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-based in JavaScript Date
  const day = padZero(date.getDate());

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const useCheckbox = (
  affiliatorFindOne: QueryResult<AffiliatorFindOneQuery>
) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    (affiliatorFindOne?.data?.affiliatorFindOne?.createdCoupons ?? []).map(
      (item) => ({
        id: item.id,
        value: false,
      })
    )
  );

  useEffect(() => {
    setCheckedItems(
      (affiliatorFindOne?.data?.affiliatorFindOne?.createdCoupons ?? []).map(
        (item) => ({
          id: item.id,
          value: false,
        })
      )
    );
  }, [affiliatorFindOne?.data?.affiliatorFindOne?.createdCoupons]);

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index].value = !newCheckedItems[index]?.value;
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item.value));
  };
  // console.log("singleCheck", checkedItems.filter((x) => x.value === true));

  const handleSelectAllCheck = () => {
    setSelectAll(!selectAll);
    setCheckedItems(
      Array.isArray(affiliatorFindOne?.data?.affiliatorFindOne?.createdCoupons)
        ? affiliatorFindOne?.data?.affiliatorFindOne?.createdCoupons?.map(
            (item) => ({
              id: item.id,
              value: !selectAll,
            })
          )
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

const useKuponAffiliasiViewModel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [platformCoupon, setPlatformCoupon] = useState<any>();

  const { id } = router.query;

  const [couponCode, setCouponCode] = useField(
    (state: RootState) => state.coupon.couponCode,
    (value) => changeCouponCode(value)
  );

  const [isActive, setIsActive] = useField(
    (state: RootState) => state.coupon.isActive,
    (value) => changeIsActive(value)
  );

  const [isFreeDelivery, setIsFreeDelivery] = useField(
    (state) => state.coupon.freeDelivery,
    (value) => changeFreeDelivery(value)
  );

  const [endDate, setEndDate] = useField(
    (state: RootState) => state.coupon.endDate,
    (value) => changeEndDate(value)
  );

  const [startDate, setStartDate] = useField(
    (state: RootState) => state.coupon.startDate,
    (value) => changeStartDate(value)
  );

  const [value, setValue] = useField(
    (state: RootState) => state.coupon.value,
    (value) => changeValue(value)
  );

  const [limitUsage, setLimitUsage] = useField(
    (state: RootState) => state.coupon.limitUsage,
    (value) => changeLimitUsage(value)
  );

  const [allowAffiliator, setAllowAffiliator] = useField(
    (state: RootState) => state.coupon.allowAffiliator,
    (value) => changeAllowAffiliator(value)
  );

  const resetFormData = () => {
    dispatch(changeCouponCode(""));
    dispatch(changeEndDate(""));
    dispatch(changeFreeDelivery(false));
    dispatch(changeIsActive(false));
    dispatch(changeLimitUsage(0));
    dispatch(changeStartDate(""));
    dispatch(changeValue(""));
    dispatch(changeAllowAffiliator(false));
  };

  const handleChangeValue = (price: string) => {
    dispatch(changeValue(price));
  };

  const handleStatusChange = (status: string) => {
    dispatch(changeIsActive(status === "true"));
  };

  // Graphql
  const [couponCreateMutation] = useCouponCreateOneMutation();
  const [affiliatorCouponDeleteMutation] =
    useAffiliatorCouponDeleteOneMutation();
  const [couponUpdateMutation] = useCouponUpdateOneMutation();
  const [couponDeleteManyMutation] = useCouponDeleteManyMutation();

  // Mutation Data
  const handleCouponCreateMutation = async ({
    couponCode,
    value,
    endDate,
    isActive,
  }: any) => {
    const data = await couponCreateMutation({
      variables: {
        data: {
          startDate: new Date(),
          value: 0,
          // isActive: Boolean(isActive),
          // endDate,
          type: DiscountTypeEnum.Amount,
          affiliatorCoupon: {
            create: {
              code: couponCode,
              extendedFrom: {
                connect: {
                  id: platformCoupon?.value,
                },
              },
              createdBy: {
                connect: {
                  id: String(id),
                },
              },
            },
          },
        },
      },
    });
    return data;
  };

  const handleAffiliatorCouponDeleteMutation = async (couponId: any) => {
    const data = await affiliatorCouponDeleteMutation({
      variables: {
        where: {
          createdById: {
            equals: String(id),
          },
          id: Number(couponId),
        },
      },
    });

    return data;
  };

  const handleCouponUpdateMutation = async ({
    couponCode,
    isActive,
    value,
    endDate,
    couponId,
  }: any) => {
    const data = await couponUpdateMutation({
      variables: {
        where: {
          id: couponId,
        },
        data: {
          // isActive: {
          //   set: Boolean(isActive),
          // },
          // value: {
          //   set: Number(value),
          // },
          // endDate: {
          //   set: endDate,
          // },
          affiliatorCoupon: {
            update: {
              data: {
                code: {
                  set: couponCode,
                },
                extendedFrom: {
                  connect: {
                    id: platformCoupon?.value,
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  };

  const handleCouponDeleteManyMutation = async (couponIds: number[]) => {
    const data = await couponDeleteManyMutation({
      variables: {
        where: {
          affiliatorCoupon: {
            is: {
              id: {
                in: couponIds,
              },
            },
          },
        },
      },
    });

    return data;
  };

  // Data Mutation
  const onSubmit = async () => {
    if (!couponCode) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const data = await handleCouponCreateMutation({
        couponCode,
        value,
        endDate,
        isActive,
      });
      resetFormData();
      const result = data.data;
      router.reload();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDelete = async (couponId: any) => {
    try {
      console.log("onDelete", couponId);
      const data = await handleAffiliatorCouponDeleteMutation(couponId);
      const result = data.data;
      console.log(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      router.reload();
    }
  };

  const onEdit = async (couponId: any) => {
    if (!couponCode) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const data = await handleCouponUpdateMutation({
        couponCode,
        isActive,
        value,
        endDate,
        couponId,
      });
      const result = data.data;
      resetFormData();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      router.reload();
    }
  };

  const onDeleteMany = async (couponIds: number[]) => {
    try {
      const data = await handleCouponDeleteManyMutation(couponIds);
      const result = data.data;
      router.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    platformCoupon,
    setPlatformCoupon,
    isFreeDelivery,
    setIsFreeDelivery,
    couponCode,
    setCouponCode,
    value,
    setValue,
    endDate,
    setEndDate,
    isActive,
    setIsActive,
    startDate,
    setStartDate,
    limitUsage,
    setLimitUsage,
    handleStatusChange,
    onSubmit,
    allowAffiliator,
    setAllowAffiliator,
    errorMessage,
    onDelete,
    onEdit,
    dateFormatter,
    resetFormData,
    useCheckbox,
    onDeleteMany,
    handleChangeValue,
  };
};

export default useKuponAffiliasiViewModel;
