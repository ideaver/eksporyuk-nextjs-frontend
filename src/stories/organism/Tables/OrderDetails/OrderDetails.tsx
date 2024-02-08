/* eslint-disable jsx-a11y/anchor-is-valid */

import { useThemeMode } from "@/_metronic/partials";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { subscribe } from "diagnostics_channel";
import { useEffect, useRef, useState } from "react";



type OrderDetailsProps = {
    className: string;
    statusPayment?: PaymentConfirmation
    buttonPayment?: PaymentMethod
    invoiceNumber?: string
    transactionDate?: string
    subscription?: string
    buttonValue?: string
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
    className = "w-100",
    statusPayment = PaymentConfirmation.Confirmed,
    buttonPayment = PaymentMethod.Mandiri,
    invoiceNumber = "7196",
    transactionDate = '13/01/2023',
    subscription = 'Berlangganan - Awal',
    buttonValue = 'Aa'
}) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const { mode } = useThemeMode();






    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className="card-body d-flex flex-column p-0">
                {/* begin::Stats */}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Order Details (INV {invoiceNumber})</span>
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
                                    <th className="p-0 min-w-50px"></th>
                                    <th className="p-0 min-w-100px"></th>
                                </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/date-orderdetails.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Tanggal Pembelian
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold fs-5 text-muted `}>
                                                    {transactionDate}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/tipe-orderdetails.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Tipe Order
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold fs-5 text-muted `}>
                                                    {subscription}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/status-orderdetails.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Status
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold fs-5 `}>
                                                    <Badge
                                                        badgeColor={statusPayment === PaymentConfirmation.Confirmed ? "success" : "danger"}
                                                        label={statusPayment}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/payment-orderdetails.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Metode Pembayaran
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold fs-5 `}>
                                                    <Buttons buttonColor="secondary" classNames="btn-sm fw-bold fs-5 me-5" >
                                                        {buttonValue}
                                                    </Buttons>
                                                    {buttonPayment}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            {/* end::Table body */}
                        </table>
                        {/* end::Table */}
                    </div>
                    {/* end::Table container */}
                </div>
                {/* end::Stats */}
            </div>
            {/* end::Body */}
        </div>
    );
};


export { OrderDetails };
