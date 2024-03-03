import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CourseProgress } from "./CourseProgress";

const meta = {
    title: "Organism/CourseProgress",
    component: CourseProgress,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CourseProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <CourseProgress {...args} />,
    args: {
        className: "w-100",
        chartColor: "success",
        strokeColor: "primary",
        chartHeight: '150px',
        presentase: 80,
        totalPresentase: 100,
        colorPrecentage: "info",
        colorSubtle: "light-info",
        backgroundColor: "success",
        datas: [
            {
                icon: "abstract-26",
                description: "ALL",
                subDescription: "Levels",
                color: "primary",
                backgroundColor: "gray-100"
            },
            {
                icon: "abstract-26",
                description: "1291",
                subDescription: "Enrolled",
                color: "primary",
                backgroundColor: "gray-100"
            },
            {
                icon: "time",
                description: "7j 56m",
                subDescription: "Durasi",
                color: "primary",
                backgroundColor: "gray-100"
            },
            {
                icon: "star",
                description: "4.3",
                subDescription: "Reviews",
                color: "primary",
                backgroundColor: "gray-100"
            },
        ],
        table: [
            {
                iconTable: "calendar",
                label: "Enrolled On",
                description: "10 Mei 2024",
            },
            {
                iconTable: "calendar",
                label: "Enrolled On",
                description: "10 Mei 2024",
            },
        ]

    },
};
