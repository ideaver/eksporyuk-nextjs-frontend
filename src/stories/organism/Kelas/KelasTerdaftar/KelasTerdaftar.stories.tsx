import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import KelasTerdaftar from "./KelasTerdaftar";

const meta = {
    title: "Organism/KelasTerdaftar",
    component: KelasTerdaftar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof KelasTerdaftar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <KelasTerdaftar {...args} />,
    args: {
        rows: [
            {
                image: "/media/books/img-72.jpg",
                icon: "/media/avatars/300-5.jpg",
                title: "Ekspor Yuk Automation (EYA)",
                nameIcon: "Mentor EksporYuk",
                presentase: 100,
                totalPresentase: 100,
                colorPrecentage: "success",
                colorSubtle: "light-success",
                width: 350,
                path: "/",
            },
            {
                image: "/media/books/img-72.jpg",
                icon: "/media/avatars/300-5.jpg",
                title: "Ekspor Yuk Automation (EYA)",
                nameIcon: "Mentor EksporYuk",
                presentase: 100,
                totalPresentase: 100,
                colorPrecentage: "success",
                colorSubtle: "light-success",
                width: 350,
                path: "/",
            },
            {
                image: "/media/books/img-72.jpg",
                icon: "/media/avatars/300-5.jpg",
                title: "Ekspor Yuk Automation (EYA)",
                nameIcon: "Mentor EksporYuk",
                presentase: 100,
                totalPresentase: 100,
                colorPrecentage: "success",
                colorSubtle: "light-success",
                width: 350,
                path: "/",
            },
            {
                image: "/media/books/img-72.jpg",
                icon: "/media/avatars/300-5.jpg",
                title: "Ekspor Yuk Automation (EYA)",
                nameIcon: "Mentor EksporYuk",
                presentase: 100,
                totalPresentase: 100,
                colorPrecentage: "success",
                colorSubtle: "light-success",
                width: 350,
                path: "/",
            },
            {
                image: "/media/books/img-72.jpg",
                icon: "/media/avatars/300-5.jpg",
                title: "Ekspor Yuk Automation (EYA)",
                nameIcon: "Mentor EksporYuk",
                presentase: 100,
                totalPresentase: 100,
                colorPrecentage: "success",
                colorSubtle: "light-success",
                width: 350,
                path: "/",
            },
        ],
    },
};
