import type { Meta, StoryObj } from "@storybook/react";
import Builder from "./Builder";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organism/Tables/Builder",
  component: Builder,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Builder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveItem: Story = {
  args: {
    className: "mb-5 mb-xl-10",
    items: [
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Sudah Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      {
        idOrder: "INV 7196",
        namaProduk: "Kelas Bimbingan Ekspor Yuk",
        tier: "I",
        totalKomisi: 698342,
        status: "Belum Dibayar",
      },
      
    ],
  },
};
