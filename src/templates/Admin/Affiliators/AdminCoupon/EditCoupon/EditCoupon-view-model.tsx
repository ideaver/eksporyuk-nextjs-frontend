import {
  CouponFindOneQuery,
  DiscountTypeEnum,
  usePlatformCouponUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

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
  {
    title: "Semua Coupon",
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

export interface IEditCoupon {
  id: string | string[] | undefined;
  data: CouponFindOneQuery;
}

const useEditCouponViewModel = ({ id, data }: IEditCoupon) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(data.couponFindOne?.platformCoupon?.code);
  const [status, setStatus] = useState(
    data.couponFindOne?.isActive ? "true" : "false"
  );
  const [discountType, setDiscountType] = useState(data.couponFindOne?.type);
  const [discount, setDiscount] = useState(data.couponFindOne?.value);
  const [addDate, setAddDate] = useState(
    data.couponFindOne?.endDate ? true : false
  );
  const [date, setDate] = useState(data.couponFindOne?.endDate);

  const [couponUpdateOne] = usePlatformCouponUpdateOneMutation();

  const handleCouponUpdateOne = async () => {
    setLoading(true);
    try {
      await couponUpdateOne({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            code: {
              set: code,
            },
            coupon: {
              update: {
                data: {
                  endDate: addDate ? date : null,
                  type: {
                    set: discountType,
                  },
                  value: {
                    set: discount,
                  },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.push("/admin/affiliate/admin-coupon");
    }
  };

  return {
    loading,
    handleCouponUpdateOne,
    code,
    setCode,
    status,
    setStatus,
    discount,
    discountType,
    setDiscount,
    setDiscountType,
    addDate,
    setAddDate,
    date,
    setDate,
  };
};

export default useEditCouponViewModel;
