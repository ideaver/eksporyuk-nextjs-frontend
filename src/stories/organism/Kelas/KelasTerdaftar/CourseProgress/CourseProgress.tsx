/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import { KTCard, KTCardBody, KTIcon } from '@/_metronic/helpers'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { KTTable } from '@/_metronic/helpers/components/KTTable'
import { KTTableBody } from '@/_metronic/helpers/components/KTTableBody'

type Props = {
    className: string
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

const CourseProgress: React.FC<Props> = ({ className, presentase, totalPresentase, colorPrecentage, colorSubtle, backgroundColor, datas, table }) => {
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


export { CourseProgress }
