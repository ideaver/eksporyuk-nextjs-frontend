import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Form/Advance/Switch",
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Switch>;

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
      <Switch
        {...args}
        checked={selectedValue === "Admin"}
        onChange={handleChange}
        value="Admin"
      >
        Admin Dashboard
      </Switch>
      <Switch
        {...args}
        checked={selectedValue === "Admin2"}
        onChange={handleChange}
        value="Admin2"
      >
        Admin Dashboard
      </Switch>
    </div>
  );
};

Display.args = {
  name: "switch",
  children: "Admin",
  value: "Admin",
  checked: false,
};
