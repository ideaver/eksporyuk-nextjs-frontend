import type { Meta, StoryObj } from "@storybook/react";
import { RadioInput } from "./RadioInput";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Form/Advance/RadioInput",
  component: RadioInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof RadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = (args: any) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div
      className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
      data-kt-buttons="true"
    >
      <RadioInput
        {...args}
        checked={selectedValue === "option1"}
        onChange={handleChange}
        value="option1"
      >
        Option 1
      </RadioInput>
      <RadioInput
        {...args}
        checked={selectedValue === "option2"}
        onChange={handleChange}
        value="option2"
      >
        Option 2
      </RadioInput>
    </div>
  );
};

Display.args = {
  name: "radio",
  children: "Option 1",
  value: "option1",
  checked: false,
};
