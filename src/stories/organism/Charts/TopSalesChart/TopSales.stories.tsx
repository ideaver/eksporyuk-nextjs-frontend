import type { Meta, StoryObj } from "@storybook/react";
import { TopSales } from "./TopSales";

const meta = {
  title: "Organism/TopSales",
  component: TopSales,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TopSales>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <TopSales {...args} />,
  args: {
    items: [
      {
        icon: "/media/svg/brand-logos/whatsapp.svg",
        title: "Whatsapp",
        salesValue: 1476619696,
        precentageValue: 70,
        colorPrecentage: "success",
        colorSubtle: "success-subtle",
      },
      {
        icon: "/media/svg/brand-logos/instagram-2-1.svg",
        title: "Instagram",
        salesValue: 21321,
        precentageValue: 70,
        colorPrecentage: "warning",
        colorSubtle: "warning-subtle",
      },
      {
        icon: "/media/svg/brand-logos/facebook-5.svg",
        title: "Facebook",
        salesValue: 123,
        precentageValue: 70,
        colorPrecentage: "primary",
        colorSubtle: "primary-subtle",
      },
      {
        icon: "/media/svg/brand-logos/tiktok.svg",
        title: "Tiktok",
        salesValue: 123,
        precentageValue: 70,
        colorPrecentage: "info",
        colorSubtle: "info-subtle",
      },
      {
        icon: "/media/svg/brand-logos/google-icon.svg",
        title: "E-mail",
        salesValue: 123,
        precentageValue: 70,
        colorPrecentage: "success",
        colorSubtle: "success-subtle",
      },
    ],
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    chartHeight: 200,
    chartColor: "success",
    className: "mb-5 mb-xl-10",
    series: [55, 30, 33, 55, 30, 33, 55, 30, 33],
  },
};
