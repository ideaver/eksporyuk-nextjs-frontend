import type { Meta, StoryObj } from "@storybook/react";
import { OrderDetails } from "./OrderDetails";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";

const meta = {
  title: "Organism/OrderDetails",
  component: OrderDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof OrderDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <OrderDetails {...args} />,
  args: {
    items: [
      {
        icon: "/media/svg/card-logos/date-orderdetails.svg",
        title: "Tanggal Pembelian",
        value: '13/01/2023',
      },
      {
        icon: "/media/svg/card-logos/tipe-orderdetails.svg",
        title: "Tipe Order",
        value: 'Berlangganan - Awal',
      },
      {
        icon: "/media/svg/card-logos/status-orderdetails.svg",
        title: "Status",
        value: PaymentConfirmation.Confirmed,
      },
      {
        icon: "/media/svg/card-logos/payment-orderdetails.svg",
        title: "Metode Pembayaran",
        value: PaymentMethod.Mandiri,
      },
    ],
    className: "w-100",
  },
};
