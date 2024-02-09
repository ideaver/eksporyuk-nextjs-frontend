import type { Meta, StoryObj } from "@storybook/react";
import { BuktiPembayaran } from "./BuktiPembayaran";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const meta = {
  title: "Organism/BuktiPembayaran",
  component: BuktiPembayaran,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof BuktiPembayaran>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <BuktiPembayaran {...args} />,
  args: {
    className: "w-100",
    title: "Order",
        data: [
            {
                title: `Bukti Pembayaran`,
                rows: [
                  {
                    icon: "/media/svg/card-logos/document.svg",
                    title: "BUKTI PEMBAYARAN.JPG",
                    subTitle: "Dikirim pada 8/1/2024, 14.42 WIB",
                    value: (
                        <>
                          <Buttons
                            buttonColor="secondary"
                            classNames="btn-sm fs-5 ms-5"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </Buttons>
                        </>
                      ),
                  },
                ],
              },
            // Add more sections as needed
          ],
  },
};
