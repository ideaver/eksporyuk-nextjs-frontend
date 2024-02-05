/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils'
import { useThemeMode } from '@/_metronic/partials'

interface ChartProps {
    classNames?: string;
    /**
     * Button Type
    */
    type?: 'submit' | 'dropdown' | 'button';
    showLabel?: boolean;
    /**
     * What dropdown button color to use
    */
    labelColorBG?:
        | "danger-subtle"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "info"
        | "light"
        | "dark";

    size?:
    | 'small'
    | 'medium'
    | 'large';

    children?: React.ReactNode;
    /**
      * Button Icon name
    */
    icon?: string;
    /**
      * Label Icon name
    */
    labelIcon?: string;
}

export const Charts = ({
    type = "button",
    showLabel = true,
    labelColorBG = "danger-subtle",
    size = "small",
    children,
    icon = "bi bi-bar-chart",
    labelIcon = "bi bi-arrow-down",
    classNames,
}: ChartProps) => {

    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()
    const refreshMode = () => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(chartRef.current, getChartOptions(height))
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
    }, [chartRef, mode])

    const labelColorHandler = (mode: string, labelColorBG: string): string => {
        switch (mode) {
            case "danger":
            return `bg-${labelColorBG}`;
            case "primary":
            return `bg-${labelColorBG}`;
            case "secondary":
            return `bg-${labelColorBG}`;
            case "success":
            return `bg-${labelColorBG}`;
            case "warning":
            return `bg-${labelColorBG}`;
            case "info":
            return `bg-${labelColorBG}`;
            case "light":
            return `bg-${labelColorBG}`;
            case "dark":
            return `bg-${labelColorBG}`;
            default:
                return `bg-${labelColorBG}`;
        }
        
    }

    

    const fontSizeHandle = (size: string): string => {
        switch (size) {
            case "small":
                return "fs-7";
            case "medium":
                return "fs-5";
            case "large":
                return "fs-3";
            default:
                return "fs-1";
        }
    }

    return (
        <div className={`card ${classNames}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <div className='card-title flex-row items-center text-center my-auto flex'>
                    <div
                     className='card-label fw-bold mb-1' style={{ fontSize: "50px" }} >2</div>
                    <div
                     className={`fw-bold fs-7 rounded text-danger border p-2 ${labelColorHandler(mode, labelColorBG)}`}><i className="bi bi-arrow-down text-danger"></i> 40%</div>
                </div>


                {/* begin::Toolbar */}
                <div className='card-toolbar' data-kt-buttons='true'>
                    <div className='mt-5 pt-5'>
                        <button
                            className="btn btn-secondary btn-sm mt-5"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Hari Ini
                            <span className="bi bi-chevron-down ps-5"></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-secondary dropdown-menu-start">
                            <li><a className="dropdown-item" href="#">Hari Ini</a></li>
                            <li><a className="dropdown-item" href="#">Bulan Ini</a></li>
                            <li><a className="dropdown-item" href="#">Sepanjang Waktu</a></li>
                        </ul>


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

function getChartOptions(height: number): ApexOptions {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const baseColor = getCSSVariableValue('--bs-info')
    const lightColor = getCSSVariableValue('--bs-info-light')

    return {
        series: [
            {
                name: 'Net Profit',
                data: [30, 40, 40, 90, 90, 70, 70],
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
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
