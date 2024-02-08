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
    items: [
      {
        icon: "/media/svg/card-logos/profil.svg",
        title: "Nama",
        value: 'Abdul Halim Abdullah',
      },
      {
        icon: "/media/svg/card-logos/email.svg",
        title: "Email",
        value: 'abdulhalim@gmail.com',
      },
      {
        icon: "/media/svg/card-logos/telepon.svg",
        title: "No. Telepon",
        value: '+6141 234 567',
      },
    ],
    className: "w-100",
  },
};
