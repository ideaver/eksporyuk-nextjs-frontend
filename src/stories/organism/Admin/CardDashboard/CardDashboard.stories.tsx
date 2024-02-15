import type { Meta, StoryObj } from "@storybook/react";
import { CardDashboard } from "./CardDasboard";
import { KTIcon } from "@/_metronic/helpers";

const meta = {
  title: "Organism/CardDashboard",
  component: CardDashboard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CardDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  render: (args) => <CardDashboard {...args} />,
  args: {
    className: "w-500",
    color: "primary",
    title: "Saldo Saat Ini",
    price: '2435673200',
    items: [
        {
            titleItem: 'Produk',
            subTitle: 'Income',
            value: 'Rp 1.2 M',
            icon: (
                <KTIcon iconName='category' className='fs-1' />
            ),
            iconValue: (
                <KTIcon iconName='arrow-up' className='fs-5 text-success ms-1' />
            ),
            colorItem: 'success',

        },
        {
            titleItem: 'Kelas',
            subTitle: 'Income',
            value: 'Rp 1.2 M',
            icon: (
                <KTIcon iconName='category' className='fs-1' />
            ),
            iconValue: (
                <KTIcon iconName='arrow-up' className='fs-5 text-success ms-1' />
            ),
            colorItem: 'success',

        },
        {
            titleItem: 'Komisi Afiliasi',
            subTitle: 'Exspenses',
            value: 'Rp 1.2 M',
            icon: (
                <KTIcon iconName='category' className='fs-1' />
            ),
            iconValue: (
                <KTIcon iconName='arrow-down' className='fs-5 text-danger ms-1' />
            ),
            colorItem: 'danger',

        },
        {
            titleItem: 'Instructor',
            subTitle: 'Exspenses',
            value: 'Rp 1.2 M',
            icon: (
                <KTIcon iconName='category' className='fs-1' />
            ),
            iconValue: (
                <KTIcon iconName='arrow-down' className='fs-5 text-danger ms-1' />
            ),
            colorItem: 'danger',

        },
    ]
  },
};
