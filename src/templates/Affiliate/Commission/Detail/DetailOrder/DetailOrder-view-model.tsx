import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const paymentProof = [
  {
    title: `Bukti Pembayaran`,
    rows: [
      {
        icon: "/media/svg/card-logos/document.svg",
        title: "BUKTI PEMBAYARAN.JPG",
        subTitle: "Dikirim pada 8/1/2024, 14.42 WIB",
        value: (
          <>
            <Buttons buttonColor="secondary" classNames="btn-sm fs-5 ms-5">
              <i className="bi bi-eye-fill"></i>
            </Buttons>
          </>
        ),
      },
    ],
  },
];

const addressDetail = [
  {
    title: `Alamat Tujuan`,
    rows: [
      {
        icon: "/media/svg/card-logos/document.svg",
        title: (
          <p className="text-center text-muted fs-6 fw-bold">
            Produk yang dibeli adalah produk non-fisik. <br /> Tidak ada proses
            pengiriman produk ke alamat pembeli.
          </p>
        ),
      },
    ],
  },
  // Add more sections as needed
];
const orderDetail = (orderId: string) => {
  return [
    {
      title: `Order INV`,
      id: orderId,
      rows: [
        {
          kuantiti: "I",
          harga: "Rp 100.000",
          total: 10000000,
          value: (
            <div className="text-dark">
              <Buttons
                buttonColor="secondary"
                classNames="btn-sm fw-bold fs-5 me-5 "
              >
                Aa
              </Buttons>
              Kelas Bimbingan Ekspor Yuk
            </div>
          ),
        },
        {
          harga: "Subtotal",
          total: 10000000,
        },
        {
          harga: "Ongkos Kirim",
          total: 10000000,
        },
        {
          harga: "Diskon",
          total: 10000000,
        },
        {
          harga: <p className="text-dark mt-4">Total Harga</p>,
          total: 10000000,
        },
      ],
    },
  ];
};

export interface IDetailOrderProps {
  orderId: string;
}

const useDetailOrderViewModel = ({ orderId }: IDetailOrderProps) => {
  // First Section START
  const paymentProofData = paymentProof;
  const addressDetailData = addressDetail;
  const orderDatas = {
    paymentProof: paymentProofData,
    addressDetail: addressDetailData,
  };
  // First Section END

  // Second Section START
  const orderDetailData = orderDetail(orderId);
  // Second Section END


  return {
    orderDatas,
    orderDetailData,
  };
};

export default useDetailOrderViewModel;
