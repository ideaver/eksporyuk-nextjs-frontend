import type { Meta, StoryObj } from "@storybook/react";
import { Charts } from "./Charts";

const meta = {
    title: "Organism/Charts",
    component: Charts,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Charts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => (
            <Charts {...args} />
    ),
    args: {
    },
};
