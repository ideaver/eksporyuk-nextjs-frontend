import type { Meta, StoryObj } from "@storybook/react";
import { OrderDetails } from "./OrderDetails";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const meta = {
  title: "Organism/OrderDetails",
  component: OrderDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof OrderDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <OrderDetails {...args} />,
  args: {
    className: "w-100",
    data: [
      {
        title: `Order INV`,
        id: "7196",
        rows: [
          {
            kuantiti: "I",
            harga: "Rp 100.000",
            total: 10000000,
            value: (
              <div className="text-dark">
                <Buttons
                  buttonColor="secondary"
                  classNames="btn-sm fw-bold fs-5 me-5"
                >
                  Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk
              </div>
            ),
          },
          {
            harga: "Subtotal",
            total: 10000000,
          },
          {
            harga: "Ongkos Kirim",
            total: 10000000,
          },
          {
            harga: "Diskon",
            total: 10000000,
          },
          {
            harga: (
              <p className="text-dark mt-4">Total Harga</p>
            ),
            total: 10000000,
          },
        ],
      },
      // Add more sections as needed
    ],
  },
};
