import type { Meta, StoryObj } from "@storybook/react";
import { PixelTable } from "./PixelTable";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const meta = {
  title: "Organism/PixelTable",
  component: PixelTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof PixelTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <PixelTable {...args} />,
  args: {
    className: "w-100",
    data: [
      {
        width: "min-w-700px",
        rows: [
          {
            breadcrumb: (
              <Badge badgeColor={"primary"} label="Hubungkan" classNames="p-4" />
            ),
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  <img src="" alt=""/>Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk
              </div>
            ),
          },
          {
            breadcrumb: (
              <Badge badgeColor={"primary"} label="Hubungkan" classNames="p-4" />
            ),
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  <img src="" alt=""/>Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk
              </div>
            ),
          },
        ],
      },
      // Add more sections as needed
    ],
  },
};
