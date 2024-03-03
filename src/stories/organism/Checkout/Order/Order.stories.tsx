import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Order from "./Order";

const meta = {
    title: "Organism/Order",
    component: Order,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Order>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <Order {...args} />,
    args: {
        title: "Pesanan Anda",
        totalHarga: "Rp. 1.000.000",
        totalLabel: "Total",
        kelas: [
            {
                icon: "calendar",
                labelKelas: "Kelas Bimbingan EksporYuk",
                labelHarga: "Rp. 1.000.000",
            }
        ],
        pesanan: [
            {
                labelPesanan: "Subtotal",
                hargaPesanan: "Rp. 1.000.000",
            },
            {
                labelPesanan: "Biaya Transaksi",
                hargaPesanan: "Rp. 1.000.000",
            },
            {
                labelPesanan: "Kupon (EKSPORYUK)",
                hargaPesanan: "- Rp. 699.000",
            },
        ]
    },
};
