/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSS, getCSSVariableValue } from "@/_metronic/assets/ts/_utils";
import { useThemeMode } from "@/_metronic/partials";

type ChartOptionsParams = {
  className?: string;
  chartColorPembayaran?: string;
  chartColorProses?: string;
  chartColorPengiriman?: string;
  chartHeight?: number;
  dataPembayaran?: number;
  dataProses?: number;
  dataPengiriman?: number;
  labelPembayaran?: string;
  labelProses?: string;
  labelPengiriman?: string;
};

type OrderAfiliasiChartProps = ChartOptionsParams & {
  title?: string;
  subTitle?: string;
  series: number[];
  categories: string[];
};

const OrderAfiliasiChart: React.FC<OrderAfiliasiChartProps> = ({
  className,
  chartColorPembayaran = "warning",
  chartHeight = 100,
  chartColorProses = "info",
  chartColorPengiriman = "gray-300",
  series,
  title = "Order Afiliasi Aktif",
  subTitle = "Order afiliasi yang belum selesai",
  dataPembayaran = 55,
  dataProses = 30,
  dataPengiriman = 33,
  labelPembayaran = "Pembayaran",
  labelProses = "Proses",
  labelPengiriman = "Pengiriman",
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
        chartOptions(
          chartColorPembayaran,
          chartHeight,
          chartColorProses,
          chartColorPengiriman,
          dataPembayaran,
          dataProses,
          dataPengiriman,
          labelPembayaran,
          labelProses,
          labelPengiriman
        )
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
    chartColorPembayaran,
    chartColorPengiriman,
    chartColorProses,
    chartHeight,
    chartRef,
    dataPembayaran,
    dataPengiriman,
    dataProses,
    labelPembayaran,
    labelPengiriman,
    labelProses,
    mode,
  ]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Beader */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">{title}</span>
          <span className="text-muted fw-semibold fs-7">{subTitle}</span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          <div ref={chartRef} className="mixed-widget-4-chart"></div>
        </div>

        <div className="d-flex justify-content-between pt-5">
          <div>
            <h3
              className={`text-center fw-bolder text-${chartColorPembayaran} mb-3 pe-3`}
            >
              --
              <span className="fw-bold text-gray-500 fs-5 ps-2">
                Menunggu Pembayaran
              </span>
            </h3>
            <p className="text-start fs-6 "></p>
          </div>
          <div>
            <p>- - - - - - -</p>
          </div>
          <div>
            <p className="text-end fw-bold fs-4">{dataPembayaran}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h3
              className={`text-center fw-bolder text-${chartColorProses} mb-3 pe-3`}
            >
              --
              <span className="fw-bold text-gray-500 fs-5 ps-2">
                Pesanan Diproses
              </span>
            </h3>
            <p className="text-start fs-6 "></p>
          </div>
          <div>
            <p>- - - - - - - - - - - -</p>
          </div>
          <div>
            <p className="text-end fw-bold fs-4">{dataProses}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h3
              className={`text-center fw-bolder text-${chartColorPengiriman} mb-3 pe-3`}
            >
              --
              <span className="fw-bold text-gray-500 fs-5 ps-2">
                Proses Pengiriman
              </span>
            </h3>
            <p className="text-start fs-6 "></p>
          </div>
          <div>
            <p>- - - - - - - - - - -</p>
          </div>
          <div>
            <p className="text-end fw-bold fs-4">{dataPengiriman}</p>
          </div>
        </div>

        {/* <a href='#' className={`btn btn-${chartColorPembayaran} w-100 py-3`}>
                    Take Action
                </a> */}
      </div>
      {/* end::Body */}
    </div>
  );
};

const chartOptions = (
  chartColorPembayaran: string,
  chartHeight: number,
  chartColorProses: string,
  chartColorPengiriman: string,
  dataPembayaran = 55,
  dataProses = 30,
  dataPengiriman = 33,
  labelPembayaran = "Pembayaran",
  labelProses = "Proses",
  labelPengiriman = "Pengiriman"
): ApexOptions => {
  const baseColor = getCSSVariableValue("--bs-" + chartColorPembayaran);
  const secondColor = getCSSVariableValue("--bs-" + chartColorProses);
  const thirdColor = getCSSVariableValue("--bs-" + chartColorPengiriman);
  const lightColor = getCSSVariableValue(
    "--bs-" + chartColorPembayaran + "-light"
  );
  const labelColor = getCSSVariableValue("--bs-gray-700");

  return {
    series: [dataPembayaran, dataProses, dataPengiriman],
    chart: {
      fontFamily: "inherit",
      height: chartHeight,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%",
        },
        dataLabels: {
          name: {
            show: false,
            fontWeight: "700",
          },
          value: {
            color: labelColor,
            fontSize: "30px",
            fontWeight: "700",
            offsetY: 12,
            show: true,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        track: {
          background: lightColor,
          strokeWidth: "100%",
        },
      },
    },
    colors: [baseColor, secondColor, thirdColor],
    stroke: {
      lineCap: "round",
    },
    labels: [labelPembayaran, labelProses, labelPengiriman],
  };
};

export { OrderAfiliasiChart };
