import { OrderFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const paymentProof = (data: OrderFindOneQuery["orderFindOne"]) => {
  const latestInvoices = data?.invoices?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
  return [
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
};

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

function getProductName(cartItems: any[]) {
  const types: any = [];
  cartItems.forEach((item, index) => {
    if (item.productId !== null) types.push(item.product?.name);
    if (item.bundleId !== null) types.push(item.bundle?.name);
    if (item.courseId !== null) types.push(item.course?.title);
    if (item.membershipCategoryId !== null) types.push(item.membership?.name);
    if (item.productServiceId !== null) types.push(item.productService?.name);
  });
  return types.filter(Boolean).join(", ");
}
const orderDetail = (data: OrderFindOneQuery["orderFindOne"]) => {
  const latestInvoices = data?.invoices?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
  console.log(data?.cart.totalPrice);
  return [
    {
      title: `Order`,
      id: data?.id.toString() ?? "",
      rows: [
        {
          kuantiti: data?.cart.totalQuantity.toString() ?? "",
          harga: "Total Harga",
          total: data?.cart.totalPrice ?? 0,
          value: (
            <div className="text-dark">
              {getProductName(data?.cart.cartItems ?? [])}
            </div>
          ),
        },
        {
          harga: <p className="text-dark mt-4">Total </p>,
          total: data?.cart.totalPrice ?? 0,
        },
      ],
    },
  ];
};

export interface IDetailOrderProps {
  orderId: string;
  data: OrderFindOneQuery["orderFindOne"];
}

const useDetailOrderViewModel = ({ orderId, data }: IDetailOrderProps) => {
  // First Section START
  const paymentProofData = paymentProof(data);
  const addressDetailData = addressDetail;
  const orderDatas = {
    paymentProof: paymentProofData,
    addressDetail: addressDetailData,
  };
  // First Section END

  // Second Section START
  const orderDetailData = orderDetail(data);
  // Second Section END

  return {
    orderDatas,
    orderDetailData,
  };
};

export default useDetailOrderViewModel;
