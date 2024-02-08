/* eslint-disable jsx-a11y/anchor-is-valid */

import { useThemeMode } from "@/_metronic/partials";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { PaymentConfirmation, PaymentMethod } from "@/types/general/payment-method";
import { useEffect, useRef, useState } from "react";



type OrderDetailsProps = {
    className: string;
    title?: string;
    items: ListOrderDetails[];
    statusPayment?: JSX.Element
    buttonPayment?: JSX.Element
    paymentMethod?: PaymentMethod
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
    className,
    title = "Order Details (INV 7196)",
    items,
    statusPayment = (
        <Badge
            badgeColor="success"
            label="Paid"
        />
    ),
    buttonPayment = (
        <Buttons
            buttonColor="secondary"
        />
    ),
    paymentMethod,
}) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const { mode } = useThemeMode();
    const [shouldRender, setShouldRender] = useState(false);
    function isIncludedPaymentMethod(value: string): value is PaymentMethod {
        return Object.values(PaymentMethod).includes(value as PaymentMethod);
    }
    function isPaymentConfirmed(value: string): value is PaymentConfirmation {
        return Object.values(PaymentConfirmation).includes(value as PaymentConfirmation);
    }

    useEffect(() => {
        // Set shouldRender to true when any of the props change
        setShouldRender(true);
    }, [
        title,
    ]);

    // Reset shouldRender to false after rendering
    useEffect(() => {
        setShouldRender(false);
    }, [shouldRender]);


    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className="card-body d-flex flex-column p-0">
                {/* begin::Stats */}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">{title}</span>
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
                                {items.map((item, index) => (
                                    <tr
                                        key={index}
                                    >
                                        <th className="">
                                            <div className="d-flex align-items-center mt-2">
                                                <div className="symbol symbol-30px me-2">
                                                    <img
                                                        src={item.icon}
                                                        className=""
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                        {item.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </th>
                                        {/* <td className="">
                                            <div className="d-flex items-center">
                                                <div className="symbol symbol-30px">
                                                    <img
                                                        src={item.icon}
                                                        className="text-end"
                                                        alt=""
                                                    />
                                                </div>
                                                <p
                                                    className="text-muted fw-bold text-hover-primary min-w-50 text-start pt-2 ps-2 fs-6"
                                                >
                                                    {item.title}
                                                </p>
                                            </div>

                                        </td> */}
                                        <td>
                                            <div className="d-flex flex-column w-100 me-2">
                                                <div
                                                    className={``}
                                                >
                                                    <div
                                                        className={`text-end fw-bold fs-5 ${isIncludedPaymentMethod(item.value) ? "text-dark" : "text-muted"}`}
                                                    >
                                                        {isIncludedPaymentMethod(item.value) && <Buttons buttonColor="secondary" classNames="me-4 btn-sm fw-bold fs-4">Aa</Buttons>}
                                                        {item.value === "Pembayaran Dikonfirmasi" &&
                                                            <Badge
                                                                badgeColor={(isPaymentConfirmed(item.value)) ? "success" : "danger"}
                                                                label={item.value}
                                                            />}
                                                        {item.value !== "Pembayaran Dikonfirmasi" && (
                                                            item.value
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className="">
                      <span className="text-muted text-start fs-7 fw-semibold">
                        {item.precentageValue}%
                      </span>
                    </td> */}
                                    </tr>
                                ))}
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
