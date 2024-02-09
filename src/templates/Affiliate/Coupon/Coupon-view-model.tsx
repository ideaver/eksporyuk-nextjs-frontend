import { CouponProps, ProductProps } from "@/types/contents/coupon/coupon-types";
import { ColorList } from "@/types/general/utilities";

export interface CouponTableProps {
  name: string;
  mainCouponName: string;
  value: string;
  usage: number;
  status: { label: string; color: ColorList };
}

const couponData: CouponTableProps[] = [
  {
    name: "BELAJARJADISUKSES",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Aktif", color: "success" },
  },
  {
    name: "BELAJARJADISUKSES",
    mainCouponName: "EKSPORYUK",
    value: "Rp 100.000",
    usage: 41,
    status: { label: "Aktif", color: "success" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Aktif", color: "success" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Butuh Persetujuan", color: "warning" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Tidak Aktif", color: "danger" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Buka", color: "success" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Tidak Aktif", color: "danger" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Butuh Persetujuan", color: "warning" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Aktif", color: "success" },
  },
  {
    name: "-",
    mainCouponName: "EKSPORYUK",
    value: "50%",
    usage: 41,
    status: { label: "Tidak Aktif", color: "danger" },
  },
];

const couponDetails: CouponProps[] = [
    {
      title: "Kupon Anda",
      cards: [
        {
          showBorder: true,
          className: "h-100",
          icon: "barcode",
          title: "Kode Kupon",
          description: "AYOKITAEKSPOR",
          descriptionColor: "gray-500",
          iconColor: "primary",
        },
        {
          showBorder: true,
          className: "h-100",
          icon: "notification-circle",
          title: "Status",
          badgeText: "Aktif",
          badgeColor: "success",
          iconColor: "primary",
        },
        {
          showBorder: true,
          className: "h-100",
          icon: "chart-simple-2",
          title: "Penggunaan",
          description: "10 Kali Penggunaan",
          descriptionColor: "gray-500",
          iconColor: "primary",
        },
      ],
    },
    {
      title: "Kupon Utama",
      cards: [
        {
          showBorder: true,
          className: "h-100",
          icon: "barcode",
          title: "Kode Kupon",
          description: "AYOKITAEKSPOR",
          descriptionColor: "gray-500",
          iconColor: "primary",
        },
        {
          showBorder: true,
          className: "h-100",
          icon: "notification-circle",
          title: "Status",
          badgeText: "Aktif",
          badgeColor: "success",
          iconColor: "primary",
        },
        {
          showBorder: true,
          className: "h-100",
          icon: "discount",
          title: "Diskon",
          description: "50%",
          descriptionColor: "gray-500",
          iconColor: "primary",
        },
        {
          showBorder: true,
          className: "h-100",
          icon: "chart-simple-2",
          title: "Penggunaan",
          description: "10 Kali Penggunaan",
          descriptionColor: "gray-500",
          iconColor: "primary",
        },
      ],
    },
  ]

  const couponProducts: ProductProps[] =  [
    {
      image: "/media/products/1.png",
      name: "kelas Bimbingan EksporYuk",
    },
    {
      image: "/media/products/2.png",
      name: "Ekspor Yuk Automation",
    },
    {
      image: "/media/products/3.png",
      name: "Bundling Kelas Ekspor + Aplikasi EYA",
    },
  ]

const useCouponViewModel = () => {
  const couponTable = couponData;
  const couponDetailsData = couponDetails;
    const couponProductsData = couponProducts;
  const breadcrumbs = [
    {
      title: "Dashboard",
      path: "/affiliate/dashboard",
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
  return { breadcrumbs, couponTable, couponDetailsData, couponProductsData};
};

export default useCouponViewModel;
