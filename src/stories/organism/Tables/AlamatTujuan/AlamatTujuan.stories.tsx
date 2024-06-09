import type { Meta, StoryObj } from "@storybook/react";
import { AlamatTujuan } from "./AlamatTujuan";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const meta = {
  title: "Organism/AlamatTujuan",
  component: AlamatTujuan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof AlamatTujuan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <AlamatTujuan {...args} />,
  args: {
    className: "w-100",
    title: "Order",
        data: [
            {
                title: `Alamat Tujuan`,
                rows: [
                  {
                    icon: "/media/svg/card-logos/document.svg",
                    title: (
                        <p className="text-center text-muted fs-6 fw-bold">Produk yang dibeli adalah produk non-fisik. <br /> Tidak ada proses pengiriman produk ke alamat pembeli.</p>
                    ),
                  },
                ],
              },
            // Add more sections as needed
          ],
  },
};
