import type { Meta, StoryObj } from "@storybook/react";
import { Instructor } from "./Instructor";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTIcon } from "@/_metronic/helpers";

const meta = {
  title: "Organism/Instructor",
  component: Instructor,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Instructor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <Instructor {...args} />,
  args: {
    className: "w-100",
    title: `Instructor`,
    data: [
      {
        iconTable: "/media/avatars/300-14.jpg",
        nameInstructor: 'Grace Green',
      },
      {
        iconTable: "/media/avatars/300-14.jpg",
        nameInstructor: 'Grace Green',
      },
    ],
  },
};
