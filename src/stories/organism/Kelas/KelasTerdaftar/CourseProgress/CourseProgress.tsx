/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Dropdown1, useThemeMode } from '@/_metronic/partials'
import { KTCard, KTCardBody, KTIcon } from '@/_metronic/helpers'
import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { KTTable } from '@/_metronic/helpers/components/KTTable'
import { KTTableBody } from '@/_metronic/helpers/components/KTTableBody'
import { CardInfo } from '@/stories/molecules/Cards/CardInfo/CardInfo'

type Props = {
    className: string
    chartColor: string
    strokeColor: string
    chartHeight: string
    title?: string;
    presentase?: number;
    totalPresentase?: number;
    colorPrecentage?: string;
    colorSubtle?: string;
    backgroundColor?: string;
    datas: Row[]
    table: Table[]
}

type Row = {
    color?: string;
    backgroundColor?: string;
    icon: string
    description?: string
    subDescription?: string
}

type Table = {
    iconTable: string
    label?: string
    description?: string
}



const CourseProgress: React.FC<Props> = ({ className, chartColor, chartHeight, strokeColor, title, presentase, totalPresentase, colorPrecentage, colorSubtle, backgroundColor, datas, table }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()
    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const chart = new ApexCharts(
            chartRef.current,
            chartOptions(chartHeight, chartColor, strokeColor)
        )
        if (chart) {
            chart.render()
        }

        return chart
    }

    useEffect(() => {
        const chart = refreshChart()
        return () => {
            if (chart) {
                chart.destroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartRef, mode])

    const chunkArray = (array: any[], size: number) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const chunkedData = chunkArray(datas, 2);

    return (
        <>
            <div className='shadow-sm rounded bg-white'>
                <KTCard className={`shadow-sm rounded min-h-250px bg-${backgroundColor} ${className}`}>
                    <KTCardBody className='pb-20'>
                        <h1 className='card-title fw-bold text-white '>Course Progress</h1>
                        <div className=''>
                            <div className={`d-flex align-items-center justify-content-between w-100 pb-2 bg-${backgroundColor}`}>
                                <span className="text-gray-300 fw-semibold fs-4">{presentase}/{totalPresentase}</span>
                                <span className="text-gray-300 fw-semibold fs-4">{presentase}% {presentase === 100 && "(Completed)"}</span>
                            </div>
                            <div className={`d-flex flex-column w-100 me-2 pb-2 w-100 bg-${backgroundColor}`}>
                                <div
                                    className={`progress h-8px bg-${colorSubtle} w-100`}
                                >
                                    <div
                                        className={`progress-bar bg-${colorPrecentage}`}
                                        role="progressbar"
                                        style={{ width: `${presentase}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                    </KTCardBody>

                </KTCard>
                <div className='mt-n20 position-relative justify-content-around px-6'>
                    {chunkedData.map((row, rowIndex) => (
                        <div key={rowIndex} className='row g-0'>
                            {row.map((item, itemIndex) => (
                                <div key={itemIndex} className={`col bg-${item.backgroundColor} px-8 pt-8 pb-2 rounded-2 ${itemIndex === 0 ? 'me-5' : ''} mb-5`}>
                                    <KTIcon iconName={item.icon} className={`fs-2x text-${item.color} d-block mb-2`} />
                                    <p className={`text-gray-700 fw-bold fs-1 lh-1`}>
                                        {item.description} <br />
                                        <span className='fw-bold text-gray-500 fs-5'>{item.subDescription}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>


                <div className='px-6 '>
                    <Buttons size='small' classNames='fw-bold fs-6 w-100 mb-4'>{presentase === 100 ? "Download Sertifikat" : "Lanjutkan Belajar"}</Buttons>
                    <KTTable utilityGY={1}>
                        {table.map((item, index) => (
                            <KTTableBody key={index} >
                                <td className='w-60'>
                                    <div className="d-flex align-items-center">
                                        <KTIcon
                                            iconName={item.iconTable}
                                            className="fs-2hx text-primary me-3"
                                        ></KTIcon>
                                        <div className="d-flex align-middle">
                                            <p className="text-gray-500 fw-bold text-start fs-5 mb-0">
                                                {item.label}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className='w-40'>
                                    <p className="text-gray-500 fw-bold pt-3 text-end fs-5">
                                        {item.description}
                                    </p>
                                </td>

                            </KTTableBody>
                        ))}
                    </KTTable>
                </div>
            </div>
        </>
    )
}

const chartOptions = (
    chartHeight: string,
    chartColor: string,
    strokeColor: string
): ApexOptions => {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const color = getCSSVariableValue('--bs-' + chartColor)

    return {
        series: [
            {
                name: 'Net Profit',
                data: [30, 45, 32, 70, 40, 40, 40],
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'area',
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
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: strokeColor,
                opacity: 0.5,
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
            opacity: 0,
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 3,
            colors: [strokeColor],
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
                show: false,
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
            crosshairs: {
                show: false,
                position: 'front',
                stroke: {
                    color: borderColor,
                    width: 1,
                    dashArray: 3,
                },
            },
        },
        yaxis: {
            min: 0,
            max: 80,
            labels: {
                show: false,
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
            marker: {
                show: false,
            },
        },
        colors: ['transparent'],
        markers: {
            colors: [color],
            strokeColors: [strokeColor],
            strokeWidth: 3,
        },
    }
}

export { CourseProgress }
