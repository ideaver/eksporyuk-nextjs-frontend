import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Form/Textarea",
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

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
