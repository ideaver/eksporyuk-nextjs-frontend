import {
  OmzetReferralLinkQuery,
  PeriodEnum,
  SalesDataQuery,
  TotalSalesAndOmzetQuery,
  useOmzetsReferralLinkQuery,
  useOrderCountsByCustomPeriodQuery,
  usePopularCoursesQuery,
  useSalesDataQueryQuery,
  useTopOmzetItemsQuery,
  useTopSalesItemsQuery,
  useTotalSalesAndOmzetsQuery,
  useUserCompetitorsQueryQuery,
  useUserCountQuery,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { QueryResult } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { RootState } from "@/app/store/store";
import {
  changeLeadPeriod,
  changeNewMemberPeriod,
  changeOmzetPeriod,
  changeOrderCountPeriod,
  changeSalesPeriod,
} from "@/features/reducers/dashboard/dashboardReducer";

export const useTotalSales = () => {
  const date = useMemo(() => new Date(), []);
  const dispatch = useDispatch();

  const period = useSelector((state: RootState) => state.dashboard.salesPeriod);

  const handleChangeSalesPeriod = (e: number) => {
    dispatch(changeSalesPeriod(e));
  };
  const timeReductionMap: any = { 1: 7, 2: 7, 3: 30 };
  const timeReduction = timeReductionMap[period] || 3;

  const pastDate = useMemo(() => {
    const pd = new Date(date);
    pd.setDate(date.getDate() - timeReduction);
    return pd;
  }, [date, timeReduction]);

  const [dateEnd, setDateEnd] = useState<string>();
  const [dateStart, setDateStart] = useState<string>();

  const [series, setSeries] = useState<any>();
  const [categories, setCategories] = useState<any>();

  //convert to ISOstring
  useEffect(() => {
    setDateEnd(date.toISOString());
    setDateStart(pastDate.toISOString());
    totalSales.refetch();
  }, [date, timeReduction]);

  const totalSales = useTotalSalesAndOmzetsQuery({
    variables: {
      totalSalesAndOmzet: {
        start: dateStart,
        end: dateEnd,
      },
    },
  });

  const chartSales = useSalesDataQueryQuery({
    variables: {
      salesData: {
        period:
          period === 1
            ? PeriodEnum.Daily
            : period === 2
            ? PeriodEnum.Daily
            : PeriodEnum.Weekly,
        start: dateStart,
        end: dateEnd,
      },
    },
    onCompleted: () => {
      setSeries(chartSales.data?.salesDataQuery?.map((value) => value.sales));
      setCategories(
        chartSales.data?.salesDataQuery?.map((value: any) => {
          const date = new Date(value?.period);
          return formatDate(date.toString()).split(" ").slice(0, 2).join(" ");
        })
      );
    },
  });

  const totalSalesData: any = totalSales?.data?.totalSalesAndOmzet;

  return {
    totalSalesData,
    categories,
    series,
    handleChangeSalesPeriod,
    period,
  };
};

export const useTotalOmzet = () => {
  const date = useMemo(() => new Date(), []);
  const dispatch = useDispatch();

  const period = useSelector((state: RootState) => state.dashboard.omzetPeriod);

  const handleChangeOmzetPeriod = (e: number) => {
    dispatch(changeOmzetPeriod(e));
  };

  const timeReductionMap: any = { 1: 1, 2: 7, 3: 30 };
  const timeReduction = timeReductionMap[period] || 1;

  const pastDate = useMemo(() => {
    const pd = new Date(date);
    pd.setDate(date.getDate() - timeReduction);
    return pd;
  }, [date, timeReduction]);

  const [dateEnd, setDateEnd] = useState<string>();
  const [dateStart, setDateStart] = useState<string>();

  const [series, setSeries] = useState<any>();
  const [categories, setCategories] = useState<any>();

  //convert to ISOstring
  useEffect(() => {
    setDateEnd(date.toISOString());
    setDateStart(pastDate.toISOString());
  }, [date, timeReduction]);

  const totalOmzet = useTotalSalesAndOmzetsQuery({
    variables: {
      totalSalesAndOmzet: {
        // 7 hari ke belakang
        start: dateStart,
        end: dateEnd,
      },
    },
  });

  const chartOmzet = useSalesDataQueryQuery({
    variables: {
      salesData: {
        period:
          period === 1
            ? PeriodEnum.Daily
            : period === 2
            ? PeriodEnum.Daily
            : PeriodEnum.Weekly,
        start: dateStart,
        end: dateEnd,
      },
    },
    onCompleted: async () => {
      setSeries(chartOmzet.data?.salesDataQuery?.map((value) => value.omzet));
      setCategories(
        chartOmzet.data?.salesDataQuery?.map((value: any) => {
          const date = new Date(value?.period);
          return formatDate(date.toString()).split(" ").slice(0, 2).join(" ");
        })
      );
    },
  });

  const totalOmzetData: any = totalOmzet?.data?.totalSalesAndOmzet;

  return {
    totalOmzetData,
    categories,
    series,
    period,
    handleChangeOmzetPeriod,
  };
};

export const useTotalLead = () => {
  const date = useMemo(() => new Date(), []);
  const dispatch = useDispatch();

  const period = useSelector((state: RootState) => state.dashboard.leadPeriod);

  const handleChangeLeadPeriod = (e: number) => {
    dispatch(changeLeadPeriod(e));
  };

  const timeReductionMap: any = { 1: 1, 2: 7, 3: 30 };
  const timeReduction = timeReductionMap[period] || 1;

  const pastDate = useMemo(() => {
    const pd = new Date(date);
    pd.setDate(date.getDate() - timeReduction);
    return pd;
  }, [date, timeReduction]);

  const [dateEnd, setDateEnd] = useState<string>();
  const [dateStart, setDateStart] = useState<string>();

  const [series, setSeries] = useState<any>();
  const [categories, setCategories] = useState<any>();

  //convert to ISOstring
  useEffect(() => {
    setDateEnd(date.toISOString());
    setDateStart(pastDate.toISOString());
    chartLead.refetch();
  }, [date, timeReduction]);

  const totalLead = useTotalSalesAndOmzetsQuery({
    variables: {
      totalSalesAndOmzet: {
        // 7 hari ke belakang
        start: dateStart,
        end: dateEnd,
      },
    },
  });

  const chartLead = useSalesDataQueryQuery({
    variables: {
      salesData: {
        period:
          period === 1
            ? PeriodEnum.Daily
            : period === 2
            ? PeriodEnum.Daily
            : PeriodEnum.Weekly,
        start: dateStart,
        end: dateEnd,
      },
    },
    onCompleted: () => {
      setSeries(chartLead.data?.salesDataQuery?.map((value) => value.lead));
      setCategories(
        chartLead.data?.salesDataQuery?.map((value: any) => {
          const date = new Date(value?.period);
          return formatDate(date.toString()).split(" ").slice(0, 2).join(" ");
        })
      );
    },
  });

  const totalLeadData: any = totalLead?.data?.totalSalesAndOmzet;

  return {
    totalLeadData,
    categories,
    series,
    period,
    handleChangeLeadPeriod,
  };
};

export const useOrderCountByCustomPeriod = () => {
  const date = useMemo(() => new Date(), []);
  const dispatch = useDispatch();

  const period = useSelector(
    (state: RootState) => state.dashboard.orderCountPeriod
  );

  const handleChangeOrderCountPeriod = (e: number) => {
    dispatch(changeOrderCountPeriod(e));
  };

  const timeReductionMap: any = { 1: 365, 2: 30 };
  const timeReduction = timeReductionMap[period] || 356;

  const pastDate = useMemo(() => {
    const pd = new Date(date);
    pd.setDate(date.getDate() - timeReduction);
    return pd;
  }, [date, timeReduction]);

  const [dateEnd, setDateEnd] = useState<string>();
  const [dateStart, setDateStart] = useState<string>();

  const [series, setSeries] = useState<any>();
  const [categories, setCategories] = useState<any>();

  //convert to ISOstring
  useEffect(() => {
    setDateEnd(date.toISOString());
    setDateStart(pastDate.toISOString());
  }, [date, timeReduction]);

  const orderCountByCustomPeriod = useOrderCountsByCustomPeriodQuery({
    variables: {
      orderCountByCustomPeriod: {
        start: dateStart,
        end: dateEnd,
        period: period === 1 ? PeriodEnum.Monthly : PeriodEnum.Weekly,
      },
    },
    onCompleted: () => {
      setSeries([
        {
          name: "Sales",
          data: orderCountByCustomPeriod?.data?.orderCountByCustomPeriod?.map(
            (value: any) => value?.totalOrder
          ),
        },
        {
          name: "Omzet",
          data: orderCountByCustomPeriod?.data?.orderCountByCustomPeriod?.map(
            (value: any) => value?.totalOmzet
          ),
        },
      ]);
      setCategories(
        orderCountByCustomPeriod?.data?.orderCountByCustomPeriod?.map(
          (value: any) => {
            const datePeriod = new Date(value?.period);
            const fromatedDate =
              period === 1
                ? `${formatDate(datePeriod.toString())
                    .split(" ")
                    .slice(1, 3)
                    .join(" ")}`
                : `${formatDate(datePeriod.toString()).split(" ").join(" ")}`;
            return fromatedDate;
          }
        )
      );
    },
  });
  return { series, categories, period, handleChangeOrderCountPeriod };
};

export const useNewMember = () => {
  const date = useMemo(() => new Date(), []);
  const dispatch = useDispatch();

  const period = useSelector(
    (state: RootState) => state.dashboard.newMemberPeriod
  );

  const handleChangeNewMemberPeriod = (e: number) => {
    dispatch(changeNewMemberPeriod(e));
  };

  const timeReductionMap: any = { 1: 1, 2: 7, 3: 30 };
  const timeReduction = timeReductionMap[period] || 1;

  const pastDate = useMemo(() => {
    const pd = new Date(date);
    pd.setDate(date.getDate() - timeReduction);
    return pd;
  }, [date, timeReduction]);

  const [dateEnd, setDateEnd] = useState<string>();
  const [dateStart, setDateStart] = useState<string>();

  useEffect(() => {
    setDateEnd(date.toISOString());
    setDateStart(pastDate.toISOString());
  }, [date, pastDate]);

  const newMemberTotal = useUserCountQuery({
    variables: {
      where: {
        createdAt: {
          lte: dateEnd,
          gte: dateStart,
        },
      },
    },
  });
  return { newMemberTotal, period, handleChangeNewMemberPeriod };
};

export const useReferralLink = () => {
  const { data } = useOmzetsReferralLinkQuery();
  return { data };
};

export const useUserCompetitor = () => {
  const date = useMemo(() => new Date(), []);

  // const [period, setPeriod] = useState(1);

  const timeReduction = 365;

  const pastDate = useMemo(() => {
    const pd = new Date(date);
    pd.setDate(date.getDate() - timeReduction);
    return pd;
  }, [date, timeReduction]);

  const [dateEnd, setDateEnd] = useState<string>();
  const [dateStart, setDateStart] = useState<string>();

  useEffect(() => {
    setDateEnd(date.toISOString());
    setDateStart(pastDate.toISOString());
  }, [date, pastDate]);

  const { data } = useUserCompetitorsQueryQuery({
    variables: {
      userCompetitorQuery: {
        future: dateEnd,
        past: dateStart,
        take: 10,
      },
    },
  });

  return { data };
};

export const useTopSales = () => {
  const { data } = useTopSalesItemsQuery({
    variables: {
      topSalesItem: {
        take: 10,
      },
    },
  });
  return { data };
};

export const useTopOmzet = () => {
  const { data } = useTopOmzetItemsQuery({
    variables: {
      topOmzetItem: {
        take: 10,
      },
    },
  });
  return { data };
};

export const usePopularCourse = () => {
  const { data } = usePopularCoursesQuery({
    // variables: {
    //    popularCourse:{
    //     take: 4
    //    }
    // },
  });
  return { data };
};

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
export interface DashboardTableRow {
  title: string;
  img: string;
  value: string;
}

export interface DashboardTableProps {
  title: string;
  value: string;
  data: DashboardTableRow[];
}

export const dashboardTableMocks: DashboardTableRow[] = [
  {
    title: "Kelas Bimbingan EksporYuk",
    img: "/media/products/1.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Ekspor Yuk Automation",
    img: "/media/products/2.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
    img: "/media/products/3.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Jasa Website Ekspor Bisnis",
    img: "/media/products/4.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Legalitas Ekspor",
    img: "/media/products/5.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Kelas Bimbingan EksporYuk",
    img: "/media/products/1.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Ekspor Yuk Automation",
    img: "/media/products/2.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Bundling Kelas Ekspor + Aplikasi EYA",
    img: "/media/products/3.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Jasa Website Ekspor Bisnis",
    img: "/media/products/4.png",
    value: "Rp. 1.476.619.696",
  },
  {
    title: "Legalitas Ekspor",
    img: "/media/products/5.png",
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
      title: "Admin",
      path: "/admin/dashboard",
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

  // simplefy number
  function simplifyNumber(n: string): string {
    const number = parseInt(n);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(0) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + "k";
    } else {
      return number.toString();
    }
  }

  return {
    breadcrumbs,
    simplifyNumber,
  };
};

const dashboardViewModel = {
  useDashboardViewModel,
  usePackages,
};

export default dashboardViewModel;
