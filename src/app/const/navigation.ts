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
      { title: "Dashboard Admin", to: "/admin/dashboard", icon: "category" },
      {
        title: "Manajemen Afiliasi",
        to: "/admin/affiliate",
        icon: "gift",
        subItems: [
          {
            title: "Manajemen Komisi",
            to: "/admin/affiliate/commission",
            icon: "cube-2",
          },
          {
            title: "Manajemen Afiliator",
            to: "/admin/affiliate/affiliator",
            icon: "cube-2",
          },
          { title: "Manajemen Kupon", to: "/admin/affiliate/coupon/information", icon: "cube-2" },
          { title: "Manajemen Rewards", to: "/admin/affiliate/reward", icon: "cube-2" },
        ],
      },
      {
        title: "Manajemen Produk",
        to: "/admin/products",
        icon: "basket",
      },
      { title: "Manajemen Order", to: "/admin/orders", icon: "delivery-3" },
      {
        title: "Manajemen Mentor",
        to: "/admin/mentors",
        icon: "lots-shopping",
      },
      {
        title: "Manajemen Member",
        to: "/admin/members",
        icon: "people",
      },
      {
        title: "Manajemen Artikel",
        to: "/admin/articles",
        icon: "tablet-text-up",
      },
      { title: "Manajemen Buyer", to: "/admin/buyers", icon: "parcel" },
      {
        title: "Support Center",
        to: "/admin/support",
        icon: "message-question",
      },
      {
        title: "Manajemen Notifikasi",
        to: "/admin/notifications",
        icon: "notification-on",
      },
      {
        title: "Manajemen Feedback & Reports",
        to: "/admin/feedback",
        icon: "message-notif",
      },
    ],
    section: "Menu Admin",
  },
];
