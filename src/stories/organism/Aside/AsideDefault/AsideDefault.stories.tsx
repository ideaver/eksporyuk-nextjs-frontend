import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { AsideDefault } from "./AsideDefault";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/AsideMenu/AsideDefault",
  component: AsideDefault,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof AsideDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {},
};
