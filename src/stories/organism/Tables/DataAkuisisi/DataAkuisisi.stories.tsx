import type { Meta, StoryObj } from "@storybook/react";
import DataAkuisisi from "./DataAkuisisi";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Tables/DataAkuisisi",
  component: DataAkuisisi,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof DataAkuisisi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    className: "mb-5 mb-xl-10",
    items: [
      {
        sumberTraffic: "Copy_Link",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
      {
        sumberTraffic: "Email",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
      {
        sumberTraffic: "Facebook Organik",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
      {
        sumberTraffic: "Facebook",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
      {
        sumberTraffic: "Instagram",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
      {
        sumberTraffic: "Instagram Story",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
      {
        sumberTraffic: "Line",
        view: 52235,
        lead: 1797,
        sale: 1012,
        nilai: 1476619696,
      },
    ],
  },
};
