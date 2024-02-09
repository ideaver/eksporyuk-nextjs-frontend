export interface PromotionTableList {
  imageSrc: string;
  title: string;
}

const promotionTable: PromotionTableList[] = [
  {
    imageSrc: "/media/products/1.png",
    title: "Promo Kemerdekaan",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
  {
    imageSrc: "/media/products/1.png",
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
  },
];

const tabsData = [
  {
    id: "kt_tab_pane_4",
    name: "Social Media #1",
    message: (
      <p>
        PENTING :<br />
        <br />
        kesempatan terbaik untuk
        <br />
        dapat levidio the feed akan
        <br />
        segera berakhir
        <br />
        <br />
        Harga akan naik BESOK.
        <br />
        Dan ini serius, kalau ga percaya
        <br />
        silakan cek harganya besok
        <br />
        setelah tengah malam
        <br />
        <br />
        -&gt; KLIK DISINI (LINK AFFILIASI)
        <br />
        jadi tunggu apalagi?
        <br />
        BESOK tengah malam harga naik
        <br />
        <br />
        -&gt; KLIK DISINI (LINK AFFILIASI)
        <br />
        <br />
        Jabat Erat,
        <br />
        <br />
        NAMA AFFILIATE
      </p>
    ),
  },
  {
    id: "kt_tab_pane_5",
    name: "Social Media #2",
    message: (
      <p>
        PENTING :<br />
        <br />
        kesempatan terbaik untuk
        <br />
        dapat levidio the feed akan
        <br />
        segera berakhir
        <br />
        <br />
        Harga akan naik BESOK.
        <br />
        Dan ini serius, kalau ga percaya
        <br />
        silakan cek harganya besok
        <br />
        setelah tengah malam
        <br />
        <br />
        -&gt; KLIK DISINI (LINK AFFILIASI)
        <br />
        jadi tunggu apalagi?
        <br />
        BESOK tengah malam harga naik
        <br />
        <br />
        -&gt; KLIK DISINI (LINK AFFILIASI)
        <br />
        <br />
        Jabat Erat,
        <br />
        <br />
        NAMA AFFILIATE
      </p>
    ),
  },
  {
    id: "kt_tab_pane_6",
    name: "Social Media #3",
    message: (
      <p>
        PENTING :<br />
        <br />
        kesempatan terbaik untuk
        <br />
        dapat levidio the feed akan
        <br />
        segera berakhir
        <br />
        <br />
        Harga akan naik BESOK.
        <br />
        Dan ini serius, kalau ga percaya
        <br />
        silakan cek harganya besok
        <br />
        setelah tengah malam
        <br />
        <br />
        -&gt; KLIK DISINI (LINK AFFILIASI)
        <br />
        jadi tunggu apalagi?
        <br />
        BESOK tengah malam harga naik
        <br />
        <br />
        -&gt; KLIK DISINI (LINK AFFILIASI)
        <br />
        <br />
        Jabat Erat,
        <br />
        <br />
        NAMA AFFILIATE
      </p>
    ),
  },
  // Add more data as needed
];

const imageData = [
  {
    src: "/images/placeholders/banner-2.png",
    alt: "",
  },
  {
    src: "/images/placeholders/banner-1.png",
    alt: "",
  },
  {
    src: "/images/placeholders/banner-2.png",
    alt: "",
  },
  // Add more data as needed
];

const usePromotionViewModel = () => {
  const promotionTableData = promotionTable;
  const promotionTabsData = tabsData;
  const promotionImages = imageData;
  const breadcrumbs = [
    {
      title: "Dashboard",
      path: "/affiliate",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return {
    breadcrumbs,
    promotionTableData,
    promotionTabsData,
    promotionImages,
  };
};

export default usePromotionViewModel;
