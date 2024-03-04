import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CourseDetail } from "./CourseDetail";

const meta = {
    title: "Organism/CourseDetail",
    component: CourseDetail,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CourseDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <CourseDetail {...args} />,
    args: {
        title: "Course Detail",
        categories: "Categories",
        subCategories: "Kelas EksporYuk",
        materialIncludes: "Material Includes",
        subMaterialIncludes: [
            {
                listMaterial: "Flexible deadlines",
            },
            {
                listMaterial: "Hours of on-demand video",
            },
            {
                listMaterial: "25+ downloadable reading material",
            },
            {
                listMaterial: "Certificate of completion",
            },
        ],
        requirements: "Requirements",
        subRequirements: "No prior knowledge is required on the topics discussed",
        audience: "Audience",
        subAudience: [
            {
                listAudience: "Anyone hoping for self-improvement",
            },
            {
                listAudience: "Anyone looking to find ways to balance life",
            },
        ]

    }
}
