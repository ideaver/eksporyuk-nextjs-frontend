import dynamic from "next/dynamic";

export const listCardItems = [
  {
    icon: {
      name: "abstract-24",
      color: "light-info",
      textColor: "text-info",
    },
    title: "Kelas Bimbingan EksporYuk",
    row1Value: 51,
    row2Value: 30,
    row3Value: "Rp 12.253.245",
  },
  {
    icon: {
      name: "flask",
      color: "light-success",
      textColor: "text-success",
    },
    title: "Ekspor Yuk Automation",
    row1Value: 51,
    row2Value: 30,
    row3Value: "Rp 12.253.245",
  },
  {
    icon: {
      name: "abstract-33",
      color: "light-danger",
      textColor: "text-danger",
    },
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
    row1Value: 51,
    row2Value: 30,
    row3Value: "Rp 12.253.245",
  },
  {
    icon: {
      name: "abstract-19",
      color: "light-primary",
      textColor: "text-primary",
    },
    title: "Jasa Website Ekspor Bisnis",
    row1Value: 51,
    row2Value: 30,
    row3Value: "Rp 12.253.245",
  },
  {
    icon: {
      name: "technology-2",
      color: "light-warning",
      textColor: "text-warning",
    },
    title: "Legalitas Ekspor",
    row1Value: 51,
    row2Value: 30,
    row3Value: "Rp 12.253.245",
  },
];

export interface TableRowData {
  source: string;
  view: number;
  lead: number;
  sale: number;
  value: string;
}

export interface AkuisisiTableProps {
  data: TableRowData[];
}

export const akuisisTableData: TableRowData[] = [
  {
    source: "copy_link",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
  {
    source: "Email",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
  {
    source: "Facebook Organik",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
  {
    source: "Facebook",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
  {
    source: "Instagram",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
  {
    source: "Instagram Story ",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
  {
    source: "Line",
    view: 52235,
    lead: 1797,
    sale: 1012,
    value: "Rp. 1.476.619.696",
  },
];

const useAffiliateDashboardViewModel = () => {
  const breadcrumbs = [
    {
      title: "Affiliasi",
      path: "/affiliate/dashboard",
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
  const BigChart = dynamic(
    () =>
      import("@/stories/organism/Charts/BigCharts/BigCharts").then(
        (module) => module.BigChart
      ),
    {
      ssr: false,
    }
  );

  const Charts = dynamic(
    () =>
      import("@/stories/organism/Charts/Charts").then(
        (module) => module.Charts
      ),
    {
      ssr: false,
    }
  );
  const mockData = {
    series: [
      {
        name: "Sales",
        data: Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 1000000)
        ),
      },
      {
        name: "Omzet",
        data: Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 1000000)
        ),
      },
    ],
    categories: [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "Jun 2024",
      "Jul 2024",
      "Aug 2024",
      "Sep 2024",
      "Oct 2024",
      "Nov 2024",
      "Dec 2024",
    ],
  };

  return { breadcrumbs, BigChart, Charts, mockData };
};

export default useAffiliateDashboardViewModel;
