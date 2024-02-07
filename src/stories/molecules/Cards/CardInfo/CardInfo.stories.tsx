import type { Meta, StoryObj } from "@storybook/react";
import { CardInfo } from "./CardInfo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Cards/CardInfo",
  component: CardInfo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CardInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    title: "Card Info",
    icon: "abstract-14",
    description: "This is a card info",
    showBorder: true,
  },
};
