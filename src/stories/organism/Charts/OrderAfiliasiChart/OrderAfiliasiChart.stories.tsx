import type { Meta, StoryObj } from "@storybook/react";
import { OrderAfiliasiChart } from "./OrderAfiliasiChart";

const meta = {
  title: "Organism/OrderAfiliasiChart",
  component: OrderAfiliasiChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof OrderAfiliasiChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <OrderAfiliasiChart {...args} />,
  args: {
    chartColorPembayaran: "warning",
    chartColorProses: "info",
    chartColorPengiriman: "gray-300",
    chartHeight: "200px",
    className: "mb-5 mb-xl-10",
    series: [55, 30, 33],
    categories: ["Pembayaran", "Proses", "Pengiriman"],
    title: "Order Afiliasi Aktif",
    subTitle: "Order afiliasi yang belum selesai",
    dataPembayaran: 55,
    dataProses: 30,
    dataPengiriman: 33,
    labelPembayaran: "Pembayaran",
    labelProses: "Proses",
    labelPengiriman: "Pengiriman",
  },
};
