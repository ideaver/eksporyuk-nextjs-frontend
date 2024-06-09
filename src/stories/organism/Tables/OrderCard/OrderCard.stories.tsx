import type { Meta, StoryObj } from "@storybook/react";
import { OrderCard } from "./OrderCard";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const meta = {
  title: "Organism/OrderCard",
  component: OrderCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <OrderCard {...args} />,
  args: {
    className: "w-100",
    title: "Order",
        data: [
            {
                title: `Order Detail (INV 7196)`,
                rows: [
                  {
                    icon: "calendar",
                    title: "Tanggal Pembelian",
                    value: "13/01/2023",
                  },
                  {
                    icon: "wallet",
                    title: "Tipe Order",
                    value: "Berlangganan - Awal",
                  },
                  {
                    icon: "delivery",
                    title: "Status",
                    value: (
                      <Badge badgeColor={"success"} label="Pembayaran Dikonfirmasi" />
                    ),
                  },
                  {
                    icon: "two-credit-cart",
                    title: "Metode Pembayaran",
                    value: (
                      <>
                        <Buttons
                          buttonColor="secondary"
                          classNames="btn-sm fw-bold fs-5 me-5"
                        >
                          Aa
                        </Buttons>
                        Mandiri
                      </>
                    ),
                  },
                ],
              },
            // Add more sections as needed
          ],
  },
};
