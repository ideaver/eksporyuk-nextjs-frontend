/* eslint-disable jsx-a11y/anchor-is-valid */

import { getCSS, getCSSVariableValue } from "@/_metronic/assets/ts/_utils";
import { toAbsoluteUrl } from "@/_metronic/helpers";
import currencyFormatter from "@/_metronic/helpers/Formatter";
import { useThemeMode } from "@/_metronic/partials";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useEffect, useRef } from "react";

type ChartOptionsParams = {
  chartColor?: string;
  chartHeight?: number;
  series: number[];
  categories: string[];
};

type TopSalesProps = ChartOptionsParams & {
  className: string;
  title?: string;
  items: ListTopSales[];
};

const TopSales: React.FC<TopSalesProps> = ({
  className,
  categories,
  series,
  chartColor,
  chartHeight = 100,
  title = "Top Sales",
  items,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const refreshChart = () => {
      if (!chartRef.current) {
        return;
      }
      const chart = new ApexCharts(
        chartRef.current,
        chartOptions({ categories, series, chartColor, chartHeight })
      );
      if (chart) {
        chart.render();
      }

      return chart;
    };

    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode, chartColor, chartHeight, categories, series]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex flex-column p-0">
        {/* begin::Stats */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{title}</span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table align-middle gs-0 gy-5">
              {/* begin::Table head */}
              <thead>
                <tr>
                  <th className="p-0 w-50px"></th>
                  <th className="p-0 min-w-200px"></th>
                  <th className="p-0 min-w-100px"></th>
                  <th className="p-0 min-w-40px"></th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: "1px dashed #A1A5B7" }}
                  >
                    <th>
                      <div className="symbol symbol-40px me-2">
                        <img
                          src={item.icon}
                          className="h-50 align-self-center"
                          alt=""
                        />
                      </div>
                    </th>
                    <td>
                      <a
                        href="#"
                        className="text-dark fw-bold text-hover-primary mb-1 fs-6"
                      >
                        {item.title}
                      </a>
                      <span className="text-muted fw-semibold d-block fs-7">
                        {item.salesValue} Sales
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 me-2">
                        <div
                          className={`progress h-6px bg-${item.colorSubtle} w-100`}
                        >
                          <div
                            className={`progress-bar bg-${item.colorPrecentage}`}
                            role="progressbar"
                            style={{ width: `${item.precentageValue}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <span className="text-muted text-start fs-7 fw-semibold">
                       {item.precentageValue?.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div
          ref={chartRef}
          className="mixed-widget-7-chart card-rounded-bottom"
        ></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

function chartOptions({
  categories,
  series,
  chartColor,
  chartHeight,
}: ChartOptionsParams): ApexOptions {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const strokeColor = getCSSVariableValue("--bs-gray-300");
  const baseColor = getCSSVariableValue("--bs-" + chartColor);
  const lightColor = getCSSVariableValue("--bs-" + chartColor + "-light");

  return {
    series: [
      {
        name: "Net Profit",
        data: series,
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return currencyFormatter(val);
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
}

export { TopSales };
