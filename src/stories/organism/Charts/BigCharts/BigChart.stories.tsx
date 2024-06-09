import type { Meta, StoryObj } from "@storybook/react";
import { BigChart } from "./BigCharts";
import { getCSSVariableValue } from "@/_metronic/assets/ts/_utils";

const meta = {
  title: "Organism/Charts/BigChart",
  component: BigChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "full",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof BigChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  series: [
    {
      name: "Sales",
      data: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 1000000)
      ),
    },
    {
      name: "Omzet",
      data: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 1000000)
      ),
    },
  ],
  categories: [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
    "Jul 2024",
    "Aug 2024",
    "Sep 2024",
    "Oct 2024",
    "Nov 2024",
    "Dec 2024",
  ],
};

export const Display: Story = {
  render: (args) => <BigChart {...args} />,
  args: {
    ...mockData,
  },
};
