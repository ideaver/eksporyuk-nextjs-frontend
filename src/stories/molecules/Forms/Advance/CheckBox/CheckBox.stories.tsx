import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckBoxInput } from "./CheckBox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Form/Advance/CheckBoxInput",
  component: CheckBoxInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CheckBoxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = (args: any) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div
      className="d-flex justify-content-between"
      data-kt-buttons="true"
    >
      <CheckBoxInput
        {...args}
        checked={selectedValue === "option1"}
        onChange={handleChange}
        value="option1"
      >
        Option 1
      </CheckBoxInput>
      <CheckBoxInput
        {...args}
        checked={selectedValue === "option2"}
        onChange={handleChange}
        value="option2"
      >
        Option 2
      </CheckBoxInput>
    </div>
  );
};

Display.args = {
  name: "checkbox",
  children: "Option 1",
  value: "option1",
  checked: false,
};
