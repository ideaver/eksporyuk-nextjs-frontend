import type { Meta, StoryObj } from "@storybook/react";
import { Kelas } from "./Kelas";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const meta = {
  title: "Organism/Kelas",
  component: Kelas,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Kelas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <Kelas {...args} />,
  args: {
    className: "w-100",
    data: [
      {
        width: "min-w-600px",
        rows: [
          {
            breadcrumb: "Published",
            topics: 2,
            lesson: 3,
            quiz: 4,
            assignment: 5,
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  <img src="" alt=""/>Aa
                </Buttons>
              </div>
            ),
            jumlahSiswa: 2200
          },
          {
            breadcrumb: "Private",
            topics: 4,
            lesson: 12,
            quiz: 0,
            assignment: 0,
            jumlahSiswa: 2200,
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  <img src="" alt=""/>Aa
                </Buttons>
              </div>
            ),
          },
          {
            breadcrumb: "Private",
            topics: 4,
            lesson: 12,
            quiz: 0,
            assignment: 0,
            jumlahSiswa: 2200,
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  <img src="" alt=""/>Aa
                </Buttons>
              </div>
            ),
          },
          {
            breadcrumb: "Private",
            topics: 4,
            lesson: 12,
            quiz: 0,
            assignment: 0,
            jumlahSiswa: 2200,
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  <img src="" alt=""/>Aa
                </Buttons>
              </div>
            ),
          },
        ],
      },
      // Add more sections as needed
    ],
  },
};
