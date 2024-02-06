import type { Meta, StoryObj } from "@storybook/react";
import ListCard from "./ListCard";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Tables/ListCard",
  component: ListCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    items: [
      {
        icon: {
          name: "abstract-24",
          color: "light-info",
          textColor: "text-info",
        },
        title: "Kelas Bimbingan EksporYuk",
        row1Value: 51,
        row2Value: 30,
        row3Value: "Rp 12.253.245",
      },
      {
        icon: {
          name: "flask",
          color: "light-success",
          textColor: "text-success",
        },
        title: "Ekspor Yuk Automation",
        row1Value: 51,
        row2Value: 30,
        row3Value: "Rp 12.253.245",
      },
      {
        icon: {
          name: "abstract-33",
          color: "light-danger",
          textColor: "text-danger",
        },
        title: "Bundling Kelas Ekspor + Aplikasi EYA",
        row1Value: 51,
        row2Value: 30,
        row3Value: "Rp 12.253.245",
      },
      {
        icon: {
          name: "abstract-19",
          color: "light-primary",
          textColor: "text-primary",
        },
        title: "Jasa Website Ekspor Bisnis",
        row1Value: 51,
        row2Value: 30,
        row3Value: "Rp 12.253.245",
      },
      {
        icon: {
          name: "technology-2",
          color: "light-warning",
          textColor: "text-warning",
        },
        title: "Legalitas Ekspor",
        row1Value: 51,
        row2Value: 30,
        row3Value: "Rp 12.253.245",
      },
    ],
  },
};
