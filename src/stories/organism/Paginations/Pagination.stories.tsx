import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Pagination",
  component: Pagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.current);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination
        {...args}
        current={currentPage}
        onPageChange={handlePageChange}
      />
      <p>Current page: {currentPage}</p>
    </div>
  );
};

Display.args = {
  current: 1,
  total: 10,
  maxLength: 5,
};
