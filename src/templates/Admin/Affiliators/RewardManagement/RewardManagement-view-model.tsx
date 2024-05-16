// TODO: move/write business logic here

export const rewardsData = [
  {
    id: 1,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 2,
    imageUrl: "path/to/image2.jpg",
    name: "Kelas Bimbingan EksporYuk",
    price: "2.000 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 3,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 4,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Tutup"
  },
  {
    id: 5,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 6,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Tutup"
  },
  {
    id: 7,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 8,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Tutup"
  },
  {
    id: 9,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 10,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  },
  {
    id: 11,
    imageUrl: "path/to/image1.jpg",
    name: "Kaos Anggota EksporYuk",
    price: "150 Poin",
    creationDate: "12 November 2022",
    redemptionCount: 2200,
    status: "Buka"
  }
];

const useRewardManagementViewModel = () => {
  const breadcrumbs = [
    {
      title: "Reward Affiliasi",
      path: "/admin/affiliate/reward",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Semua Reward Affiliasi",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return { breadcrumbs };
};

export default useRewardManagementViewModel;
