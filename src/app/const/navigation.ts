import { MenuSection } from "@/types/navigation/menu";

export const memberAffiliatorMenus: MenuSection[] = [
  {
    section: "Menu Member",
    items: [
      { title: "Dashboard Member", to: "/home", icon: "category" },
      { title: "Order Saya", to: "/member/order", icon: "basket" },
      { title: "Langganan", to: "/member/langganan", icon: "timer" },
      { title: "Katalog Produk", to: "/dwde", icon: "cube-2" },
      {
        title: "Komunitas",
        to: "/dwde",
        icon: "abstract-39",
        subItems: [{ title: "Komunitas 1", to: "/dwde/d", icon: "cube-2" }],
      },
    ],
  },
  {
    section: "Menu Kelas",
    items: [
      { title: "Dashboard Kelas", to: "/kelas/dashboard", icon: "category" },
      {
        title: "Kelas",
        to: "/kelas",
        icon: "book-open",
        subItems: [
          {
            title: "Kelas Terdaftar",
            to: "/kelas/kelas/kelas-terdaftar/semua-kelas",
            icon: "cube-2",
          },
          {
            title: "Kelas Detail",
            to: "/kelas/kelas/kelas-detail",
            icon: "cube-2",
          },
          { title: "Katalog Kelas", to: "/kelas/kelas/dwde", icon: "cube-2" },
          { title: "Whishlist", to: "/kelas/kelas/dwde", icon: "cube-2" },
        ],
      },
      { title: "Reviews", to: "/dwde", icon: "star" },
      { title: "My Quiz Attempts", to: "/dwde", icon: "note-2" },
      { title: "Tanya Jawab", to: "/dwde", icon: "message-text-2" },
      { title: "Reviews", to: "/dwde", icon: "cube-2" },
    ],
  },
  {
    section: "Menu Affiliasi",
    items: [
      {
        title: "Dashboard Affiliasi",
        to: "/affiliate/dashboard",
        icon: "category",
      },
      { title: "Komisi", to: "/affiliate/commission", icon: "bill" },
      {
        title: "Bantuan Promosi",
        to: "/affiliate/promotion",
        icon: "rescue",
      },
      {
        title: "Generate Link",
        to: "/affiliate/generate-link",
        icon: "fasten",
      },
      { title: "Order Affiliasi", to: "/affiliate/order", icon: "basket" },
      { title: "Kupon", to: "/affiliate/coupon", icon: "barcode" },
      { title: "Pixel", to: "/affiliate/pixel", icon: "data" },
      { title: "Leaderboard", to: "/affiliate/leaderboard", icon: "ranking" },
      {
        title: "Tambah Kupon Baru",
        to: "/affiliate/test-add-new-coupon/facebook-pixel",
        icon: "barcode",
      },
      {
        title: "Buyer Form",
        to: "/affiliate/test-buyer-form/informasi-buyer",
        icon: "barcode",
      },
      {
        title: "Reminder Form",
        to: "/affiliate/test-reminder-form/informasi-reminder",
        icon: "barcode",
      },
      {
        title: "Mailketing SMTP",
        to: "/affiliate/test-mailketing",
        icon: "barcode",
      },
    ],
  },
];

export const adminMenus: MenuSection[] = [
  {
    items: [
      { title: "Dashboard Admin", to: "/home", icon: "category" },
      { title: "Order Saya", to: "/member/order", icon: "basket" },
      { title: "Langganan", to: "/member/langganan", icon: "timer" },
      { title: "Katalog Produk", to: "/dwde", icon: "cube-2" },
      {
        title: "Komunitas",
        to: "/dwde",
        icon: "abstract-39",
        subItems: [{ title: "Komunitas 1", to: "/dwde/d", icon: "cube-2" }],
      },
    ],
    section: "Menu Admin",
  },
];