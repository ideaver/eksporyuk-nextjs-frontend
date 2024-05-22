/* eslint-disable jsx-a11y/anchor-is-valid */
import { getCSS, getCSSVariableValue } from "@/_metronic/assets/ts/_utils";
import currencyFormatter from "@/_metronic/helpers/Formatter";
import { useThemeMode } from "@/_metronic/partials";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { ColorList } from "@/types/general/utilities";
import ApexCharts, { ApexOptions } from "apexcharts";
import React, { useEffect, useRef, useState } from "react";

interface ChartProps {
  /**
   * What Name Series to use
   */
  nameSeries?: "Not Paid" | "Paid";

  /**
   * What Data Series to use
   */
  dataSeries: number[] | [30, 40, 90, 70];

  /**
   * What Categories from XAxis to use
   */
  categoriesXAxis: string[] | ["Feb", "Mar", "Apr", "May"];
  classNames?: string;
  showLabel?: boolean;
  /**
   * What labelColorBG to use
   */
  labelColorBG?: "danger-subtle" | "success-subtle";
  /**
   * What textColor to use
   */
  textColor?: "danger" | "success";
  children?: React.ReactNode;
  /**
   * What Label Icon to use
   */
  labelIcon?: "arrow-up" | "arrow-down";

  /**
   * Label Content
   */

  label?: string;

  /**
   * subLabel Content
   */

  subLabel?: string;
  /**
   * value Content
   */

  value?: string;
  /**
   * title Content
   */

  title?: string;
  /**
   * subTitle Content
   */

  subTitle?: string;

  /**
   * What Label Chart Color to use
   */

  labelChartColor?: ColorList;

  /**
   * What Label Chart Color to use
   */

  fullHeightChart?: boolean;

  /**
   * What Border Chart Color to use
   */

  borderChartColor?: ColorList;

  /**
   * What Name Series to use
   */
  baseChartColor?: ColorList;

  /**
   * What Name Series to use
   */
  lightChartColor?:
    | "danger-light"
    | "success-light"
    | "primary-light"
    | "warning-light"
    | "info-light"
    | "dark-light";

  /**
   * toolbar dropdown option
   */
  dropdownOptions?: { value: string; label: string }[];

  // dropdown value
  dropdownValue?: any;

  /**
   * toolbar dropdown click handler
   */
  onDropdownValueChanged: (value: string | number) => void;
  onClick?: () => void;
}

export const Charts = ({
  labelColorBG = "success-subtle",
  textColor = "success",
  children,
  labelIcon = "arrow-down",
  classNames,
  labelChartColor = "secondary",
  borderChartColor = "secondary",
  baseChartColor = "primary",
  lightChartColor = "primary-light",
  nameSeries,
  dataSeries,
  categoriesXAxis,
  onClick,
  label,
  subLabel = "Sub Label",
  title,
  subTitle,
  value,
  fullHeightChart = false,
  dropdownOptions = [
    { value: "1", label: "Hari Ini" },
    { value: "2", label: "Minggu Ini" },
    { value: "3", label: "Bulan Ini" },
  ],
  dropdownValue,
  onDropdownValueChanged,
}: ChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const refreshMode = () => {
      if (!chartRef.current) {
        return;
      }

      const height = parseInt(getCSS(chartRef.current, "height"));
      const chart = new ApexCharts(
        chartRef.current,
        getChartOptions(height, {
          labelChartColor: labelChartColor,
          baseChartColor: baseChartColor,
          lightChartColor: lightChartColor,
          borderChartColor: borderChartColor,
          nameSeries: nameSeries,
          dataSeries: dataSeries,
          categoriesXAxis: categoriesXAxis,
        })
      );
      if (chart) {
        chart.render();
      }
      return chart;
    };

    const chart = refreshMode();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [
    chartRef,
    mode,
    labelChartColor,
    baseChartColor,
    lightChartColor,
    borderChartColor,
    nameSeries,
    dataSeries,
    categoriesXAxis,
  ]);

  const labelColorHandler = (mode: string, labelColorBG: string): string => {
    switch (mode) {
      case "danger":
        return `bg-${labelColorBG}`;
      case "success":
        return `bg-${labelColorBG}`;
      default:
        return `bg-${labelColorBG}`;
    }
  };

  const textColorHandler = (mode: string, textColor: string): string => {
    switch (mode) {
      case "danger":
        return `text-${textColor}`;
      case "success":
        return `text-${textColor}`;
      default:
        return `text-${textColor}`;
    }
  };

  const iconHandler = (mode: string, labelIcon: string): string => {
    switch (mode) {
      case "danger":
        return `bi bi-${labelIcon}`;
      case "primary":
        return `bi bi-${labelIcon}`;
      default:
        return `bi bi-${labelIcon}`;
    }
  };

  const [selectedValue, setSelectedValue] = useState("Hari Ini");

  // Fungsi untuk menangani perubahan nilai pada dropdown
  const handleDropdownChange = (value: React.SetStateAction<string>) => {
    setSelectedValue(value);
  };

  return (
    <div className={`card ${classNames}`}>
      {/* begin::Header */}
      {title == null && subTitle == null ? (
        <div className="card-header border-0 pb-0">
          <div className="card-title items-center text-center my-auto flex-column">
            <div className="d-flex flex-row items-center text-center ">
              <div
                className="card-label fw-bold mb-1"
                style={{ fontSize: "50px" }}
              >
                {value}
              </div>
              {label != null ? (
                <span
                  className={`fw-bold fs-7 rounded border p-2 align-self-center ${labelColorHandler(
                    mode,
                    labelColorBG
                  )} ${textColorHandler(mode, textColor)}`}
                >
                  <i
                    className={`bi ${iconHandler(
                      mode,
                      labelIcon
                    )} ${textColorHandler(mode, textColor)}`}
                  ></i>{" "}
                  {label}
                </span>
              ) : (
                <></>
              )}
            </div>
            <span className="text-muted mt-1 fw-semibold fs-7">{subLabel}</span>
          </div>

          {/* begin::Toolbar */}
          <div className="card-toolbar" data-kt-buttons="true">
            <Dropdown
              styleType="solid"
              onValueChange={onDropdownValueChanged}
              value={dropdownValue}
              options={dropdownOptions}
            />
          </div>
          {/* end::Toolbar */}
        </div>
      ) : (
        <>
          <div className="card-header border-0 pb-0 pt-5">
            <div className="card-title items-center text-center my-auto flex-column">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">{title}</span>
              </h3>
              <span className="text-muted mt-1 fw-semibold fs-7">
                {subTitle}
              </span>
            </div>

            {/* begin::Toolbar */}
            <div className="card-toolbar" data-kt-buttons="true">
              <Dropdown
                styleType="solid"
                onValueChange={onDropdownValueChanged}
                options={[
                  { value: "1", label: "Hari Ini" },
                  { value: "2", label: "Minggu Ini" },
                  { value: "3", label: "Bulan Ini" },
                ]}
              />
            </div>
            {/* end::Toolbar */}
          </div>
          <div className="card-header border-0 pb-0 flex-column">
            <div className="d-flex flex-row items-center text-center ">
              <div
                className="card-label fw-bold mb-1 pe-5"
                style={{ fontSize: "50px" }}
              >
                {value}
              </div>
              {label != null ? (
                <span
                  className={`fw-bold fs-7 rounded border p-2 align-self-center ${labelColorHandler(
                    mode,
                    labelColorBG
                  )} ${textColorHandler(mode, textColor)}`}
                >
                  <i
                    className={`bi ${iconHandler(
                      mode,
                      labelIcon
                    )} ${textColorHandler(mode, textColor)}`}
                  ></i>{" "}
                  {label}
                </span>
              ) : (
                <></>
              )}
            </div>
            <span className="text-muted mt-1 fw-semibold fs-7">{subLabel}</span>
          </div>
        </>
      )}
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div
          ref={chartRef}
          id="chart"
          style={{ height: fullHeightChart ? "100%" : "350px" }}
        ></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

function getChartOptions(
  height: number,
  {
    labelChartColor = "danger",
    borderChartColor = "gray",
    baseChartColor = "info",
    lightChartColor = "info-light",
    nameSeries = "Net Profit",
    dataSeries = [30],
    categoriesXAxis = ["Feb"],
  }
): ApexOptions {
  const labelColor = getCSSVariableValue(`--bs-${labelChartColor}`);
  const borderColor = getCSSVariableValue(`--bs-${borderChartColor}`);
  const baseColor = getCSSVariableValue(`--bs-${baseChartColor}`);
  const lightColor = getCSSVariableValue(`--bs-${lightChartColor}`);

  return {
    series: [
      {
        name: `${nameSeries}`,
        data: dataSeries,
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: height,
      toolbar: {
        show: false,
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
      categories: categoriesXAxis,
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
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
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
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
