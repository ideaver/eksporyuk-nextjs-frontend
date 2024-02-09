import type { Meta, StoryObj } from "@storybook/react";
import { CouponContents } from "./CouponContents";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Contents/CouponContents",
  component: CouponContents,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof CouponContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    coupons: [
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
    ],
    products: [
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
    ],
  },
};
