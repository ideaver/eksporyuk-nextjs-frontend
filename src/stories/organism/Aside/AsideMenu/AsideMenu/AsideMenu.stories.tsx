import type { Meta, StoryObj } from "@storybook/react";
import { AsideMenu } from "./AsideMenu";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Aside/AsideMenu/AsideMenu",
  component: AsideMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

} satisfies Meta<typeof AsideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
  },
};
