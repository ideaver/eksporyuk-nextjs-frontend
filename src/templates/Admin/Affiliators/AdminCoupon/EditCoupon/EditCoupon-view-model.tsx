import {
  CouponFindOneQuery,
  DiscountTypeEnum,
  usePlatformCouponUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import useAdminCouponViewModel from "../AdminCoupon-view-model";

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
  const [date, setDate] = useState(new Date(data.couponFindOne?.endDate));
  console.log(date);

  const [connectCourse, setConnectCourse] = useState<number | undefined | null>(data.couponFindOne?.courseCoupon?.course?.id);
  const [maxClaim, setMaxClaim] = useState<number | undefined | null>(data.couponFindOne?.maxClaimPerUser);

  const [couponUpdateOne] = usePlatformCouponUpdateOneMutation();
  const { couponFindMany } = useAdminCouponViewModel();

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
                  endDate: {
                    set: addDate ? date : null,
                  },
                  type: {
                    set: discountType,
                  },
                  value: {
                    set: Number(discount),
                  },
                  isActive: {
                    set: status === "true" ? true : false,
                  },
                  maxClaimPerUser: {
                    set: Number(maxClaim),
                  },
                  courseCoupon: {
                    update: {
                      data: {
                        course: {
                          connect: {
                            id: Number(connectCourse),
                          }
                        }
                      }
                    }
                  }
                },
              },
            },
          },
        },
      });
      // await couponFindMany.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // await router.push("/admin/affiliate/admin-coupon");
      // router.reload();
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
    maxClaim,
    setMaxClaim,
    connectCourse,
    setConnectCourse
  };
};

export default useEditCouponViewModel;
