import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPassword } from "./ForgotPassword";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Forms/ForgotPassword",
  component: ForgotPassword,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof ForgotPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: () => (
    <div className="mx-auto w-50">
      <ForgotPassword />
    </div>
  ),
  args: {},
};
