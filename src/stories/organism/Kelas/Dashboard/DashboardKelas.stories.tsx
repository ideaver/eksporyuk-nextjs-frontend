import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import DashboardKelas from "./DashboardKelas";

const meta = {
    title: "Organism/DashboardKelas",
    component: DashboardKelas,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof DashboardKelas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <DashboardKelas {...args} />,
    args: {
        rows: [
            {
                icon: "/media/svg/card-logos/document.svg",
                title: "Kelas Bimbingan EksporYuk",
                subTitle: "Dikirim pada 8/1/2024, 14.42 WIB",
                presentase: 70,
                totalPresentase: 100,
                colorPrecentage: "primary",
                colorSubtle: "secondary-subtle",
                backgroundColor: "primary-subtle",
            },
        ],
    },
};
