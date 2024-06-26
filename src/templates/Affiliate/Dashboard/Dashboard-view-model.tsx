import dynamic from "next/dynamic";

export const listCardItems: ListItem[] = [
  {
    icon: {
      name: "abstract-24",
      color: "light-info",
      textColor: "text-info",
    },
    title: "Kelas Bimbingan EksporYuk",
    rows: [
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
    ],
  },
  {
    icon: {
      name: "flask",
      color: "light-success",
      textColor: "text-success",
    },
    title: "Ekspor Yuk Automation",
    rows: [
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
    ],
  },
  {
    icon: {
      name: "abstract-33",
      color: "light-danger",
      textColor: "text-danger",
    },
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
    rows: [
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
    ],
  },
  {
    icon: {
      name: "abstract-19",
      color: "light-primary",
      textColor: "text-primary",
    },
    title: "Jasa Website Ekspor Bisnis",
    rows: [
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
    ],
  },
  {
    icon: {
      name: "technology-2",
      color: "light-warning",
      textColor: "text-warning",
    },
    title: "Legalitas Ekspor",
    rows: [
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
      {
        name: "Total Lead",
        value: "51",
      },
    ],
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

const usePackages = () => {
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
  const OrderAffiliateChart = dynamic(
    () =>
      import(
        "@/stories/organism/Charts/OrderAfiliasiChart/OrderAfiliasiChart"
      ).then((module) => module.OrderAfiliasiChart),
    {
      ssr: false,
    }
  );
  const TopSalesChart = dynamic(
    () =>
      import("@/stories/organism/Charts/TopSalesChart/TopSales").then(
        (module) => module.TopSales
      ),
    {
      ssr: false,
    }
  );

  return {
    BigChart,
    Charts,
    OrderAffiliateChart,
    TopSalesChart,
  };
};

const useDashboardViewModel = () => {
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

  return {
    breadcrumbs,
    mockData,
  };
};

const dashboardViewModel = {
  useDashboardViewModel,
  usePackages,
};

export default dashboardViewModel;
