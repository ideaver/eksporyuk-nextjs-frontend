import { KTCard, KTCardBody, KTIcon } from '@/_metronic/helpers'
import { KTTable } from '@/_metronic/helpers/components/KTTable'
import { KTTableBody } from '@/_metronic/helpers/components/KTTableBody'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { Dropdown } from '@/stories/molecules/Forms/Dropdown/Dropdown'
import { TextField } from '@/stories/molecules/Forms/Input/TextField'
import React from 'react'

type OrderProps = {
    title?: string
    className?: string
    totalLabel?: string
    totalHarga?: string
    kelas?: TableKelas[]
    pesanan?: TablePesanan[]
}

type TableKelas = {
    icon: string
    labelKelas?: string
    labelHarga?: string
}

type TablePesanan = {
    labelPesanan?: string
    hargaPesanan?: string
}

const Order: React.FC<OrderProps> = ({ title, className, kelas, pesanan, totalLabel, totalHarga }) => {
    return (
        <>
            <KTCard>
                <KTCardBody>
                    <div className={`relative ${className}`}>
                        <div className='text-start'>
                            <h1>{title}</h1>
                        </div>

                        <KTTable>
                            {kelas?.map((table, index) => (
                                <KTTableBody key={index}>
                                    <td className='min-w-300px'>
                                        <div className="d-flex align-items-center mt-2">
                                            <KTIcon
                                                iconName={table.icon}
                                                className="fs-2hx me-3"
                                            ></KTIcon>
                                            <div className="d-flex align-middle">
                                                <p className="text-muted fw-bold text-start fs-6 mb-0">
                                                    {table.labelKelas}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='min-w-100px'>
                                        <p className="text-primary fw-bold pt-3 text-end fs-4 ">
                                            {table.labelHarga}
                                        </p>
                                    </td>
                                </KTTableBody>
                            ))}
                        </KTTable>

                        <KTCard className='bg-success'>
                            <KTCardBody>
                                <KTTable utilityGY={1}>
                                    {pesanan?.map((table, index) => (
                                        <KTTableBody key={index} className='text-light'>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <p className="fw-bold text-start fs-6 mb-0">
                                                        {table.labelPesanan}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <p className="fw-bold text-end fs-6 mb-0">
                                                        {table.hargaPesanan}
                                                    </p>
                                                </div>
                                            </td>
                                        </KTTableBody>
                                    ))}
                                </KTTable>
                                <div className='text-light d-flex align-items-end'>
                                    <div className='col-6'>
                                        <div className="d-flex flex-column">
                                            <p className="fw-bold text-start fs-1 mb-0">
                                                {totalLabel}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-6 '>
                                        <div className="d-flex flex-column">
                                            <p className="fw-bold text-end fs-1 mb-0">
                                                {totalHarga}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </KTCardBody>
                        </KTCard>
                        <h3 className='mt-8 text-gray-700'>Kupon</h3>
                        <div className='d-flex justify-content-between gap-10'>
                            <div className='w-100'>
                                <TextField
                                    size='small'
                                ></TextField>
                            </div>
                            <div>
                                <Buttons
                                    mode='light'
                                    buttonColor='primary'
                                    classNames='fw-bold'
                                    size='small'
                                >Apply</Buttons>
                            </div>
                        </div>
                        <div className=''>
                            <h3 className='mt-8 text-gray-700'>Metode Pembayaran</h3>
                            <Dropdown
                                styleType="outline"
                                options={[
                                    { label: "Gopay", value: 10 },
                                    { label: "20", value: 20 },
                                    { label: "30", value: 30 },
                                ]}
                                onValueChange={() => { }}
                            />
                        </div>
                        <div className='pt-10'>
                            <Buttons
                                mode='normal'
                                buttonColor='primary'
                                classNames='fw-bold w-100'
                                size='medium'
                            >Beli Sekarang</Buttons>
                        </div>
                    </div>
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default Order