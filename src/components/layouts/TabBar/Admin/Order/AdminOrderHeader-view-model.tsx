import { useState } from "react";

import {
  OrderFindOneQuery,
  OrderStatusEnum,
  useOrderStatusUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { useSession } from "next-auth/react";
function getStatusBadgeColor(status: OrderStatusEnum | undefined) {
  switch (status) {
    case OrderStatusEnum.Pending:
      return "warning";
    case OrderStatusEnum.Processing:
      return "primary";
    case OrderStatusEnum.Done:
      return "success";
    case OrderStatusEnum.Shipped:
      return "info";
    case OrderStatusEnum.Delivered:
      return "success";
    case OrderStatusEnum.Cancelled:
      return "danger";
    case OrderStatusEnum.Returned:
      return "primary";
    default:
      return "info";
  }
}

function getProductType(cartItems: any[]) {
  const types: any = [];
  cartItems.forEach((item) => {
    if (item.productId !== null) types.push("Product");
    if (item.bundleId !== null) types.push("Bundle");
    if (item.courseId !== null) types.push("Course");
    if (item.membershipCategoryId !== null) types.push("Membership Category");
    if (item.productServiceId !== null) types.push("Service");
  });
  return types.join(", ");
}
const orderCard = (data: OrderFindOneQuery["orderFindOne"]) => {
  const latestStatus = data?.statuses?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
  return [
    {
      title: `Order Detail (${data?.id})`,
      rows: [
        {
          icon: "calendar",
          title: "Tanggal Pembelian",
          value: formatDate(data?.createdAt),
        },
        {
          icon: "wallet",
          title: "Jenis Produk",
          value: getProductType(data?.cart.cartItems ?? []),
        },
        {
          icon: "delivery",
          title: "Status",
          value: (
            <Badge
              badgeColor={getStatusBadgeColor(latestStatus?.status)}
              label={latestStatus?.status ?? ""}
            />
          ),
        },
      ],
    },
  ];
};

const buyersDetail = (data: OrderFindOneQuery["orderFindOne"]) => {
  return [
    {
      title: "Detail Pembeli",
      rows: [
        {
          icon: "profile-circle",
          title: "Nama",
          value: (
            <div className="d-flex  align-items-center justify-content-end p-0 ">
              <img
                className="symbol symbol-30px symbol-circle"
                src={
                  data?.createdByUser.avatarImageId ??
                  "/media/avatars/300-1.jpg"
                }
                width={30}
                height={30}
                alt=""
              />{" "}
              <span className="text-muted ms-5">
                {data?.createdByUser.name}
              </span>
            </div>
          ),
        },
        {
          icon: "sms",
          title: "Email",
          value: data?.createdByUser.email ?? "",
        },
        {
          icon: "phone",
          title: "No. Telepon",
          value: data?.createdByUser.phoneId?.toString() ?? "",
        },
      ],
    },
  ];
};
const affiliateDetail = (data: OrderFindOneQuery["orderFindOne"]) => {
  return [
    {
      title: "Detail Affiliasi",
      rows: [
        {
          icon: "profile-circle",
          title: "Nama",
          value: (
            <div className="d-flex align-items-center p-0 justify-content-end">
              <img
                className="symbol symbol-30px symbol-circle"
                src={
                  data?.coupon?.affiliatorCoupon?.createdBy.user
                    .avatarImageId ?? "/media/avatars/blank.png"
                }
                width={30}
                height={30}
                alt=""
              />{" "}
              <span className="text-muted ms-5">
                {data?.coupon?.affiliatorCoupon?.createdBy.user.name ??
                  "Tidak Tersedia"}
              </span>
            </div>
          ),
        },
        {
          icon: "sms",
          title: "Email",
          value:
            data?.coupon?.affiliatorCoupon?.createdBy.user.email ??
            "Tidak Tersedia",
        },
        {
          icon: "phone",
          title: "No. Telepon",
          value:
            data?.coupon?.affiliatorCoupon?.createdBy.user.phoneId?.toString() ??
            "Tidak Tersedia",
        },
        {
          icon: "discount",
          title: "Kupon",
          value: data?.coupon?.affiliatorCoupon?.code ?? "Tidak Tersedia",
        },
      ],
    },
  ];
};

export interface IAdminOrderHeaderViewModel {
  urlType: "orders" | "commission";
  id: string | string[] | undefined;
  data: OrderFindOneQuery["orderFindOne"];
}
const useAdminOrderHeaderViewModel = ({
  urlType,
  id,
  data,
}: IAdminOrderHeaderViewModel) => {
  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
  };

  // Status Update
  const [orderStatusUpdateOneMutation, orderStatusUpdateResult] =
    useOrderStatusUpdateOneMutation();
  const { data: session } = useSession();
  const updateOrderStatusHandler = async (status: OrderStatusEnum) => {
    try {
     await orderStatusUpdateOneMutation({
        variables: {
          data: {
            order: {
              connect: {
                id: data?.id,
              },
            },
            changedBy: {
              connect: {
                id: session?.user.id,
              },
            },
            status: {
              set: status,
            },
          },
          where: {
            id: data?.id,
          },
        },
      })
      return orderStatusUpdateResult
    } catch (error) {
      return error
    }
  };

  const urls = [
    {
      label: "Detail Order",
      to: `/admin/${urlType}/${id}/detail-order`,
    },
    {
      label: "Riwayat Order",
      to: `/admin/${urlType}/${id}/history-order`,
    },
    {
      label: "Komisi Affiliasi",
      to: `/admin/${urlType}/${id}/commission-affiliate`,
    },
  ];

  // First Section START
  const orderCardData = orderCard(data);
  const buyersDetailData = buyersDetail(data);
  const affiliateDetailData = affiliateDetail(data);
  const orderTableDatas = [
    orderCardData,
    buyersDetailData,
    affiliateDetailData,
  ];
  // First Section END

  const breadcrumbs = [
    {
      title: "Manajemen Produk",
      path: "/admin/orders",
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
      title: "Semua Produk",
      path: "/admin/orders",
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

  return {
    urls,
    selectedFollupValue,
    handleFollupChange,
    follupValues,
    orderTableDatas,
    breadcrumbs,
    showOrderStatusModal,
    setShowOrderStatusModal,
    updateOrderStatusHandler,
    orderStatusUpdateResult,
  };
};

export default useAdminOrderHeaderViewModel;
