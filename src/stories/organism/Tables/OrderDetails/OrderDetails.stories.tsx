import type { Meta, StoryObj } from "@storybook/react";
import { OrderDetails } from "./OrderDetails";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";

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
    className: "w-100",
    invoiceNumber: "7196",
    subscription: 'Berlangganan - Awal',
    transactionDate: '13/01/2023',
    buttonValue: 'Aa',
    statusPayment: PaymentConfirmation.Confirmed,
    buttonPayment: PaymentMethod.Mandiri,
    
  },
};
