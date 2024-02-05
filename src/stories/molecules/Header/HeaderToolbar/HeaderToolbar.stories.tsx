import type { Meta, StoryObj } from "@storybook/react";
import { HeaderToolbar } from "./HeaderToolbar";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Header/HeaderToolbar",
  component: HeaderToolbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

} satisfies Meta<typeof HeaderToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    title: "Aside Menu Item",
    to: "/",
  },
};
