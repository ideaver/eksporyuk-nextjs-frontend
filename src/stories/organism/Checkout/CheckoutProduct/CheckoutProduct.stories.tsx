import type { Meta, StoryObj } from "@storybook/react";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import CheckoutProduct from "./CheckoutProduct";

const meta = {
    title: "Organism/CheckoutProduct",
    component: CheckoutProduct,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CheckoutProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    render: (args) => <CheckoutProduct {...args} />,
    args: {
        title: "Checkout Product",
        kupon: "EKSPORYUK",
        discount: "10%",
        list1: "Silakan Login terlebih dahulu, jika Anda pernah mendaftar akun di website Eksporyuk ini.",
        list2: "Jika Anda baru dan belum pernah mendaftar akun di website Eksporyuk, silakan lengkapi form dibawah.",
        list3: "Gunakan kupon EKSPORYUK untuk mendapatkan DISKON 50%.",
        list4: "Atau gunakan Link Affiliate Kesayangan anda."
    },
};
