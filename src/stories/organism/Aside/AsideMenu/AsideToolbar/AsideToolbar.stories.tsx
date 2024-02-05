import type { Meta, StoryObj } from "@storybook/react";
import { AsideToolbar } from "./AsideToolbar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Aside/AsideMenu/AsideToolbar",
  component: AsideToolbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  render: (args) => (
    // <div className="aside">
    <div
      className="aside-toolbar flex-column-auto bg-dark"
      id="kt_aside_toolbar"
    >
      <AsideToolbar></AsideToolbar>
    </div>
    // </div>
  ),
} satisfies Meta<typeof AsideToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonColor: "primary",
  },
};
export const Display: Story = {
  render: (args) => (
    <div className="aside">
      <div className="aside-toolbar flex-column-auto" id="kt_aside_toolbar">
        <AsideToolbar></AsideToolbar>
      </div>
    </div>
  ),
  args: {
    buttonColor: "primary",
  },
};
