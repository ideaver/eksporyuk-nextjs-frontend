import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Form/TextField",
  component: TextField,
  argTypes: {
    onClickPreffixIcon: { action: "clicked" },
    onClickSuffixIcon: { action: "clicked" },
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    clickablePreffixIcon: false,
    clickableSuffixIcon: false,
  },
};
export const ClickTest: Story = {
  args: {
    preffixIcon: "magnifier",
    suffixIcon: "setting-4",
    placeholder: "Search...",
    clickablePreffixIcon: true,
    onClickPreffixIcon: () => {
      confirm("Its Working Preffix Icon");
    },
    clickableSuffixIcon: true,
    onClickSuffixIcon: () => {
      confirm("Its Working Suffix Icon");
    },
  },
};
