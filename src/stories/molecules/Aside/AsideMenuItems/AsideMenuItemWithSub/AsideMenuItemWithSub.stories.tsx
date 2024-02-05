import type { Meta, StoryObj } from "@storybook/react";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import clsx from "clsx";
import { AsideMenuItem } from "../AsideMenuItem/AsideMenuItem";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/AsideMenu/AsideMenuItemWithSub",
  component: AsideMenuItemWithSub,
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
          "menu bg-dark p-10 menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
        )}
      >
        <AsideMenuItemWithSub {...args}>
          <AsideMenuItem title="Aside Menu Item Child" to="/"></AsideMenuItem>
        </AsideMenuItemWithSub>
      </div>
    </div>
  ),
} satisfies Meta<typeof AsideMenuItemWithSub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    title: "Aside Menu Item With Sub",
    to: "/tes",
  },
};
export const ItemWithIcon: Story = {
  args: {
    title: "Aside Menu Item With Sub With Icon",
    to: "/tes",
    icon: "element-11",
  },
};
export const ItemWithBullet: Story = {
  args: {
    title: "Aside Menu Item With Sub With Bullet",
    to: "/tes",
    hasBullet: true,
  },
};
