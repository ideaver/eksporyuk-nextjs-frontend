import type { Meta, StoryObj } from "@storybook/react";
import IllustrationCard from "./IllustrationCard";
import { Buttons } from "../../Buttons/Buttons";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Cards/IllustrationCard",
  component: IllustrationCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof IllustrationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    title: (
      <h1 className="text-white">
        Your current balance is{" "}
        <span className="text-danger">Rp 21.687.000 </span>
        You can withdraw now.
      </h1>
    ),
    description: (
      <div className="d-flex flex-wrap gap-3 mt-5">
        <Buttons classNames=" w-100 w-sm-auto">Withdraw Now</Buttons>
        <Buttons buttonColor="secondary" classNames="w-100 w-sm-auto">
          How To
        </Buttons>
      </div>
    ),
    image: "/media/illustrations/sigma-1/17.png",
  },
};
