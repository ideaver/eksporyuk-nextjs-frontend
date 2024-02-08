import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Image from "next/image";

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

export interface IDetailOrderProps {
  orderId: string;
}

const useDetailOrderViewModel = ({ orderId }: IDetailOrderProps) => {
  const orderCardData = orderCard(orderId);
  const buyersDetailData = buyersDetail;
  const affiliateDetailData = affiliateDetail;
  const orderTableDatas = [
    orderCardData,
    buyersDetailData,
    affiliateDetailData,
  ];
  return {
    orderTableDatas,
  };
};

export default useDetailOrderViewModel;
