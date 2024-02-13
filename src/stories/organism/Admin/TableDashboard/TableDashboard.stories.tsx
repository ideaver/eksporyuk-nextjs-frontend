import type { Meta, StoryObj } from "@storybook/react";
import { TableDashboard } from "./TableDashboard";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTIcon } from "@/_metronic/helpers";

const meta = {
  title: "Organism/TableDashboard",
  component: TableDashboard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TableDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <TableDashboard {...args} />,
  args: {
    className: "w-100",
    data: [
      {
        title: `Menunggu Untuk Dibayarkan`,
        iconTable: (
            <KTIcon iconName='category' className='fs-2' />
        ),
        rows: [
          {
            icon: "/media/avatars/300-14.jpg",
            titleRow: "Fajar",
            subTitleRow: "Kelas Bimbingan EksporYuk",
            price: 200000,
          },
          {
            icon: "/media/avatars/300-14.jpg",
            titleRow: "Fajar",
            subTitleRow: "Kelas Bimbingan EksporYuk",
            price: 200000,
          },
          {
            icon: "/media/avatars/300-14.jpg",
            titleRow: "Fajar",
            subTitleRow: "Kelas Bimbingan EksporYuk",
            price: 200000,
          },
          {
            icon: "/media/avatars/300-14.jpg",
            titleRow: "Fajar",
            subTitleRow: "Kelas Bimbingan EksporYuk",
            price: 200000,
          },
        ],
      },
      // Add more sections as needed
    ],
  },
};
