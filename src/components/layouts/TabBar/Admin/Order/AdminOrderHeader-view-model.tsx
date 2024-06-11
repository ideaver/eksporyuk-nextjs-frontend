import { useState } from "react";

import {
  OrderFindOneQuery,
  OrderStatusEnum,
  useFollowUpDeleteOneMutation,
  useFollowUpFindManyQuery,
  useOrderStatusCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import {
  changeContent,
  changeId,
  changeName,
} from "@/features/reducers/followup/followupReducer";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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

export function getProductType(cartItems: any[]) {
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
              badgeColor={getStatusBadgeColor(
                data?.statuses?.[data?.statuses?.length - 1]?.status
              )}
              label={data?.statuses?.[data?.statuses?.length - 1]?.status ?? ""}
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
  const dispatch = useDispatch();
  const router = useRouter();

  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");
  const [followUpTamplate, setFollowUpTamplate] = useState<string | undefined>(
    ""
  );

  // followup find many
  const followUpFindMany = useFollowUpFindManyQuery();

  const handleFollupChange = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    setSelecteFollupValue(event.target.value);

    const filterContent = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name == event.target.value
    )[0];

    setFollowUpTamplate(filterContent?.content);
  };

  // Status Update
  const [orderStatusCreateOneMutation, orderStatusCreateOneResult] =
    useOrderStatusCreateOneMutation();
  const { data: session } = useSession();

  const updateOrderStatusHandler = async (status: OrderStatusEnum) => {
    try {
      await orderStatusCreateOneMutation({
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
            status: status,
          },
        },
      });
      return orderStatusCreateOneResult;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const [followUpDeleteOne] = useFollowUpDeleteOneMutation();
  const handleSendFollowUp = () => {
    const contentReplaced = followUpTamplate
      ?.replace(/\[\[nama\]\]/g, `${data?.createdByUser.name}`)
      .replace(/\[\[tanggal-pembelian\]\]/g, formatDate(data?.createdAt))
      .replace(/\[\[email\]\]/g, `${data?.createdByUser.email}`)
      .replace(/\[\[nomor-telepon\]\]/g, `${data?.createdByUser.phoneId}`)
      .replace(/\[\[kupon\]\]/g, `${data?.coupon?.affiliatorCoupon?.code}`);
    const encodedMessage = encodeURIComponent(`${contentReplaced}`);

    return `https://api.whatsapp.com/send?phone=${data?.createdByUser.phoneId}&text=${encodedMessage}`;
  };

  const handleDeleteFollowUp = async (name: string) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];

    try {
      await followUpDeleteOne({
        variables: {
          where: {
            id: editFolup?.id,
          },
        },
      });
      await followUpFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditState = (name: any) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];
    console.log(editFolup);
    dispatch(changeName(`${editFolup?.name}`));
    dispatch(changeContent(`${editFolup?.content}`));
    dispatch(changeId(editFolup?.id as number));
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
    // {
    //   label: "Komisi Affiliasi",
    //   to: `/admin/${urlType}/${id}/commission-affiliate`,
    // },
  ];

  // First Section START
  const orderCardData = orderCard(data);
  const buyersDetailData = buyersDetail(data);
  const affiliateDetailData = affiliateDetail(data);
  const productType = getProductType(data?.cart.cartItems ?? []);

  let orderTableDatas = [orderCardData, buyersDetailData];

  if (productType !== "Service") {
    orderTableDatas.push(affiliateDetailData);
  }
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
    handleSendFollowUp,
    handleDeleteFollowUp,
    handleEditState,
    followUpTamplate,
    setFollowUpTamplate,
    followUpFindMany,
    urls,
    selectedFollupValue,
    handleFollupChange,
    follupValues,
    orderTableDatas,
    breadcrumbs,
    showOrderStatusModal,
    setShowOrderStatusModal,
    updateOrderStatusHandler,
    orderStatusCreateOneResult,
  };
};

export default useAdminOrderHeaderViewModel;
