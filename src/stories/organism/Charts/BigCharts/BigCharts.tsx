/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "@/_metronic/partials";
import { getCSS, getCSSVariableValue } from "@/_metronic/assets/ts/_utils";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import currencyFormatter from "@/_metronic/helpers/Formatter";

type ChartOptionsParams = {
  labelChartColor?: string;
  borderChartColor?: string;
  baseChartColor?: string;
  secondaryChartColor?: string;
  series: ApexAxisChartSeries;
  categories: string[];
};

type BigChartProps = ChartOptionsParams & {
  className?: string;
  title?: string;
  subTitle?: string;
  toolbar?: JSX.Element;
  footer?: JSX.Element;
  useDefaultFooter?: boolean;
  onDropdownValueChange?: (value: string | number) => void;
};

const BigChart = ({
  className,
  series,
  categories,
  labelChartColor = "gray-500",
  borderChartColor = "gray-200",
  baseChartColor = "primary",
  secondaryChartColor = "gray-300",
  title = "Riwayat Order Affiliasi",
  subTitle = "Sales (Jumlah Pembelian) dan Omzet (Dalam hitungan Juta)",
  onDropdownValueChange,
  toolbar = (
    <Dropdown
      styleType="solid"
      onValueChange={onDropdownValueChange ?? function () {}}
      options={[
        { value: "1", label: "12 Bulan Terakhir" },
        { value: "2", label: "30 Hari Terakhir" },
      ]}
    />
  ),
  footer,
  useDefaultFooter = true,
}: BigChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const refreshChart = () => {
      if (!chartRef.current) {
        return;
      }

      const height = parseInt(getCSS(chartRef.current, "height"));

      const chart = new ApexCharts(
        chartRef.current,
        getChartOptions(height, {
          series: series,
          categories: categories,
          labelChartColor,
          borderChartColor,
          baseChartColor,
          secondaryChartColor,
        })
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
  }, [
    baseChartColor,
    borderChartColor,
    categories,
    chartRef,
    labelChartColor,
    mode,
    secondaryChartColor,
    series,
  ]);

  return (
    <div className={`card ${className}`}>
      {title || subTitle || toolbar ? (
        <>
          {/* begin::Header */}
          <div className="card-header border-0 pt-5">
            {/* begin::Title */}
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">{title}</span>

              <span className="text-muted fw-semibold fs-7">{subTitle}</span>
            </h3>
            {/* end::Title */}

            {/* begin::Toolbar */}
            <div className="card-toolbar">
              {/* begin::Menu */}
              {toolbar ? toolbar : <></>}
              {/* end::Menu */}
            </div>
            {/* end::Toolbar */}
          </div>
          {/* end::Header */}
        </>
      ) : (
        <></>
      )}

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div
          ref={chartRef}
          id="kt_charts_widget_1_chart"
          style={{ height: "350px" }}
        />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
      {/* begin::Footer */}
      <div className="card-footer border-0 d-flex flex-row">
        {useDefaultFooter && footer === undefined
          ? series.map((item, index) => (
              <li key={index} className="d-flex align-items-center px-2">
                <span
                  className={`bullet bullet-vertical me-3 min-h-20px min-w-10px ${
                    index % 2 === 0 ? "bg-primary" : "bg-secondary"
                  }`}
                ></span>
                {item.name}
              </li>
            ))
          : footer}
      </div>
      {/* end::Footer */}
    </div>
  );
};

export { BigChart };

function getChartOptions(
  height: number,
  {
    labelChartColor,
    borderChartColor,
    baseChartColor,
    secondaryChartColor,
    series,
    categories,
  }: ChartOptionsParams
): ApexOptions {
  const labelColor = getCSSVariableValue(`--bs-${labelChartColor}`);
  const borderColor = getCSSVariableValue(`--bs-${borderChartColor}`);
  const baseColor = getCSSVariableValue(`--bs-${baseChartColor}`);
  const secondaryColor = getCSSVariableValue(`--bs-${secondaryChartColor}`);

  return {
    series: series,
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
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
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}
