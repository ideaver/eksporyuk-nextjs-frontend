import type { Meta, StoryObj } from "@storybook/react";
import { TopSales } from "./TopSales";

const meta = {
  title: "Organism/TopSales",
  component: TopSales,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TopSales>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <TopSales {...args} />,
  args: {
    chartColor: "primary",
    chartHeight: "200px",
    className: "mb-5 mb-xl-10",
    series: [30, 20, 50, 45, 30, 40, 60, 30],
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
};
