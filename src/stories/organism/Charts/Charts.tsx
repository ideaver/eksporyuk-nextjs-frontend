/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils'
import { useThemeMode } from '@/_metronic/partials'

interface ChartProps {
    /**
      * What Name Series to use
    */
    nameSeries?:
    | "Not Paid"
    | "Paid"

    /**
      * What Data Series to use
    */
    dataSeries: number[]
    | [30, 40, 90, 70]

    /**
      * What Categories from XAxis to use
    */
    categoriesXAxis: string[]
    | ['Feb', 'Mar', 'Apr', 'May'];
    classNames?: string;
    showLabel?: boolean;
    /**
     * What labelColorBG to use
    */
    labelColorBG?:
    | "danger-subtle"
    | "success-subtle";
    /**
      * What textColor to use 
    */
    textColor?:
    | 'danger'
    | 'success';
    children?: React.ReactNode;
    /**
      * What Label Icon to use
    */
    labelIcon?:
    | "arrow-up"
    | "arrow-down";

    /**
      * What Label Chart Color to use
    */

    labelChartColor?:
    | "danger"
    | "success"
    | "primary"
    | "warning"
    | "info"
    | "dark"
    | "light";

    /**
      * What Border Chart Color to use
    */

    borderChartColor?:
    | "danger"
    | "success"
    | "primary"
    | "warning"
    | "info"
    | "dark"
    | "light";

    /**
      * What Name Series to use
    */
    baseChartColor?:
    | "danger"
    | "success"
    | "primary"
    | "warning"
    | "info"
    | "dark"
    | "light";

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

    onClick?: () => void;
}

export const Charts = ({
    labelColorBG = "danger-subtle",
    textColor = "danger",
    children,
    labelIcon = "arrow-down",
    classNames,
    labelChartColor,
    borderChartColor,
    baseChartColor,
    lightChartColor,
    nameSeries,
    dataSeries,
    categoriesXAxis,
    onClick,
}: ChartProps) => {

    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()
    const refreshMode = () => {

        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))
        const chart = new ApexCharts(chartRef.current, getChartOptions(height, {

            labelChartColor: labelChartColor,
            baseChartColor: baseChartColor,
            lightChartColor: lightChartColor,
            borderChartColor: borderChartColor,
            nameSeries: nameSeries,
            dataSeries: dataSeries,
            categoriesXAxis: categoriesXAxis,

        }))
        if (chart) {
            chart.render()
        }
        return chart
    }

    useEffect(() => {
        const chart = refreshMode()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, mode, labelChartColor, baseChartColor, lightChartColor, borderChartColor, nameSeries, dataSeries, categoriesXAxis])

    const labelColorHandler = (mode: string, labelColorBG: string): string => {
        switch (mode) {
            case "danger":
                return `bg-${labelColorBG}`;
            case "success":
                return `bg-${labelColorBG}`;
            default:
                return `bg-${labelColorBG}`;
        }

    }

    const textColorHandler = (mode: string, textColor: string): string => {
        switch (mode) {
            case "danger":
                return `text-${textColor}`;
            case "success":
                return `text-${textColor}`;
            default:
                return `text-${textColor}`;
        }
    }

    const iconHandler = (mode: string, labelIcon: string): string => {
        switch (mode) {
            case "danger":
                return `bi bi-${labelIcon}`;
            case "primary":
                return `bi bi-${labelIcon}`;
            default:
                return `bi bi-${labelIcon}`;
        }
    }

    const [selectedValue, setSelectedValue] = useState('Hari Ini');

    // Fungsi untuk menangani perubahan nilai pada dropdown
    const handleDropdownChange = (value: React.SetStateAction<string>) => {
        setSelectedValue(value);
    };

    return (
        <div className={`card ${classNames}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pb-0'>
                <div className='card-title flex-row items-center text-center my-auto flex'>
                    <div className='card-label fw-bold mb-1' style={{ fontSize: "50px" }}>2</div>
                    <span className={`fw-bold fs-7 rounded border p-2 ${labelColorHandler(mode, labelColorBG)} ${textColorHandler(mode, textColor)}`}>
                        <i className={`bi ${iconHandler(mode, labelIcon)} ${textColorHandler(mode, textColor)}`}></i> 40%
                    </span>
                </div>


                {/* begin::Toolbar */}
                <div className='card-toolbar' data-kt-buttons='true'>
                    <div className='mt-5 pt-5'>
                        <button
                            className="btn btn-secondary btn-sm mt-5"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {selectedValue}
                            <span className="bi bi-chevron-down ps-5"></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-secondary dropdown-menu-end w-50">
                            <li>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDropdownChange('Hari Ini')}
                                >
                                    Hari Ini
                                </a>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDropdownChange('Bulan Ini')}
                                >
                                    Bulan Ini
                                </a>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDropdownChange('Sepanjang Waktu')}
                                >
                                    Sepanjang Waktu
                                </a>
                            </li>
                        </ul>
                        {/* Render konten sesuai dengan nilai yang dipilih */}
                        <div>
                            {selectedValue === 'Hari Ini'}
                            {selectedValue === 'Bulan Ini'}
                            {selectedValue === 'Sepanjang Waktu'}
                        </div>


                    </div>

                </div>
                {/* end::Toolbar */}
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className='card-body'>
                {/* begin::Chart */}
                <div ref={chartRef} id='chart' style={{ height: '350px' }}></div>
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

function getChartOptions(height: number, {
    labelChartColor = 'danger',
    borderChartColor = 'gray',
    baseChartColor = 'info',
    lightChartColor = 'info-light',
    nameSeries = 'Net Profit',
    dataSeries = [30, 40, 90, 70],
    categoriesXAxis = ['Feb', 'Mar', 'Apr', 'May'],
}): ApexOptions {
    const labelColor = getCSSVariableValue(`--bs-${labelChartColor}`)
    const borderColor = getCSSVariableValue(`--bs-${borderChartColor}`)
    const baseColor = getCSSVariableValue(`--bs-${baseChartColor}`)
    const lightColor = getCSSVariableValue(`--bs-${lightChartColor}`)

    return {
        series: [
            {
                name: `${nameSeries}`,
                data: dataSeries,
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'area',
            height: 350,
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
            type: 'solid',
            opacity: 1,
        },
        stroke: {
            curve: 'smooth',
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
                    fontSize: '12px',
                },
            },
            crosshairs: {
                position: 'front',
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
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return '$' + val + ' thousands'
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
    }
}
