import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { HeaderTitle } from "./HeaderTitle";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Header/HeaderTitle",
  component: HeaderTitle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  render: (args) => (
    <div className="toolbar d-flex align-items-stretch">
      {/* begin::Toolbar container */}
      <div
        className={` py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between`}
      >
        <HeaderTitle {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof HeaderTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
  },
};
