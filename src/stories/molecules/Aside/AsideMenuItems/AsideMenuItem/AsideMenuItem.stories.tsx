import type { Meta, StoryObj } from "@storybook/react";
import { AsideMenuItem } from "./AsideMenuItem";
import clsx from "clsx";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/AsideMenu/AsideMenuItem",
  component: AsideMenuItem,
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
          "menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
        )}
      >
        <AsideMenuItem {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof AsideMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    title: "Aside Menu Item",
    to: "/",
  },
};
export const NonActiveItem: Story = {
  args: {
    title: "Aside Menu Item",
    to: "/tes", //non active if the target link not same as path,
  },
};
export const ItemWithIcon: Story = {
  args: {
    title: "Aside Menu Item",
    to: "/",
    icon: "element-11",
  },
};
export const ItemWithBullet: Story = {
  args: {
    title: "Aside Menu Item",
    to: "/",
    hasBullet: true
  },
};
