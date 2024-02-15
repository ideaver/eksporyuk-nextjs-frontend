import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import AsideMenuAdmin from "./AsideMenuAdmin";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Aside/AsideMenu/AsideMenuAdmin",
  component: AsideMenuAdmin,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  render: (args) => (
    <div className="aside-menu flex-column-fluid">
      <div
        id="#kt_aside_menu"
        data-kt-menu="true"
        className={clsx(
          "bg-dark menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
        )}
      >
        <AsideMenuAdmin />
      </div>
    </div>
  ),
} satisfies Meta<typeof AsideMenuAdmin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    title: "Aside Menu Item",
    to: "/",
  },
};
