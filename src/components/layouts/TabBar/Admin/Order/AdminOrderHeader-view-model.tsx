import { useState } from "react";

import Image from "next/image";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const orderCard = (id: string) => {
  return [
    {
      title: `Order Detail (${id})`,
      rows: [
        {
          icon: "calendar",
          title: "Tanggal Pembelian",
          value: "13/01/2023",
        },
        {
          icon: "wallet",
          title: "Tipe Order",
          value: "Berlangganan - Awal",
        },
        {
          icon: "delivery",
          title: "Status",
          value: (
            <Badge badgeColor={"success"} label="Pembayaran Dikonfirmasi" />
          ),
        },
        {
          icon: "two-credit-cart",
          title: "Metode Pembayaran",
          value: (
            <>
              <Buttons
                buttonColor="secondary"
                classNames="btn-sm fw-bold fs-5 me-5"
              >
                Aa
              </Buttons>
              Mandiri
            </>
          ),
        },
      ],
    },
  ];
};

const buyersDetail = [
  {
    title: "Detail Pembeli",
    rows: [
      {
        icon: "profile-circle",
        title: "Nama",
        value: (
          <div className="d-flex  align-items-center justify-content-end p-0 ">
            <Image
              className="symbol symbol-30px symbol-circle"
              src={"/media/avatars/300-1.jpg"}
              width={30}
              height={30}
              alt=""
            />{" "}
            <span className="text-muted ms-5">Abdul Halim Abdullah</span>
          </div>
        ),
      },
      {
        icon: "sms",
        title: "Email",
        value: "abdulhalim@gmail.com",
      },
      {
        icon: "phone",
        title: "No. Telepon",
        value: "+6141 234 567",
      },
    ],
  },
];
const affiliateDetail = [
  {
    title: "Detail Affiliasi",
    rows: [
      {
        icon: "profile-circle",
        title: "Nama",
        value: (
          <div className="d-flex align-items-center p-0 justify-content-end">
            <Image
              className="symbol symbol-30px symbol-circle"
              src={"/media/avatars/300-5.jpg"}
              width={30}
              height={30}
              alt=""
            />{" "}
            <span className="text-muted ms-5">Dwi Rahma</span>
          </div>
        ),
      },
      {
        icon: "sms",
        title: "Email",
        value: "abdulhalim@gmail.com",
      },
      {
        icon: "phone",
        title: "No. Telepon",
        value: "+6141 234 567",
      },
      {
        icon: "discount",
        title: "Kupon",
        value: "AYOEKSPOR",
      },
    ],
  },
];

export interface IAdminOrderHeaderViewModel {
  urlType: "orders" | "commission";
  id: string | string[] | undefined;
}
const useAdminOrderHeaderViewModel = ({
  urlType,
  id,
}: IAdminOrderHeaderViewModel) => {
  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
  const follupValues = ["follup-1", "follup-2", "follup-3"];

  const [selectedFollupValue, setSelecteFollupValue] = useState("");

  const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelecteFollupValue(event.target.value);
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
  const orderCardData = orderCard(id as string);
  const buyersDetailData = buyersDetail;
  const affiliateDetailData = affiliateDetail;
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

  return { urls, selectedFollupValue, handleFollupChange, follupValues, orderTableDatas, breadcrumbs, showOrderStatusModal, setShowOrderStatusModal};
};

export default useAdminOrderHeaderViewModel;
