/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from '@/_metronic/helpers'
import { Dropdown1 } from '@/_metronic/partials'
import React from 'react'

type PropsItem = {
    titleItem?: string
    subTitle?: string
    value?: string
    icon?: string | JSX.Element
    iconValue?: string | JSX.Element
    colorItem?: string
}
type Props = PropsItem & {
    className: string
    color: string
    title?: string
    price?: string
    items: PropsItem[];
}

const CardDashboard: React.FC<Props> = ({
    className,
    color,
    title,
    items,
    price,
}) => {
    const formatToRupiah = (value: number) => {
        return value.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0, 
        });
      };
    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className='card-body p-0'>
                {/* begin::Header */}
                <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
                    {/* begin::Balance */}
                    <div className='d-flex text-center flex-column text-white pt-8'>
                        <span className='m-0 text-white fw-bold fs-3'>{title}</span>
                        <span className='fw-bold fs-2x '>{formatToRupiah(Number(price))}</span>
                    </div>
                    {/* end::Balance */}
                </div>
                {/* end::Header */}
                <div
                    className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
                    style={{ marginTop: '-100px' }}
                >
                    {/* begin::Item */}
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className='d-flex align-items-center mb-6'
                        >
                            <div className='symbol symbol-45px w-40px me-5'>
                                <span className='symbol-label bg-lighten'>
                                    {item.icon}
                                </span>
                            </div>
                            <div className='d-flex align-items-center flex-wrap w-100'>
                                <div className='mb-1 pe-3 flex-grow-1'>
                                    <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bold'>
                                        {item.titleItem}
                                    </a>
                                    <div className='text-gray-400 fw-semibold fs-7'>
                                        {item.subTitle}
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className={`fw-bold fs-5 text-${item.colorItem} pe-1`}>
                                        {item.value}
                                    </div>
                                    {item.iconValue}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* end::Item */}
                </div>
                {/* end::Items */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export { CardDashboard }
