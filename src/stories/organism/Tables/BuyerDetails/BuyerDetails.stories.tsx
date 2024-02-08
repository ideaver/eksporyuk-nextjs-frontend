import type { Meta, StoryObj } from "@storybook/react";
import { BuyerDetails } from "./BuyerDetails";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";

const meta = {
  title: "Organism/BuyerDetails",
  component: BuyerDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof BuyerDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <BuyerDetails {...args} />,
  args: {
    className: "w-100",
    title: 'Detail Pembeli',
    emailUser: 'abdulhalim@gmail.com',
    teleponUser: '+6141 234 567',
    
  },
};
