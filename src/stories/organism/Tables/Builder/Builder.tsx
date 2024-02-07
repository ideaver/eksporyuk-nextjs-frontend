/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon, toAbsoluteUrl } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import React from "react";

interface BuilderProps {
    /**
     * Classname for Builder
     */
    className?: string;
    sumberTraffic?: string;
    view?: number;
    lead?: number;
    sale?: number;
    nilai?: number;
    items: ListBuilder[];
    title?: string;
    subTitle?: string;
    toolbar?: JSX.Element[]
}

const Builder = ({
    className,
    title = "Data Akuisisi",
    subTitle = "Per Januari 2024",
    items,
    toolbar = [
        <Dropdown
            key="1"
            styleType="solid"
            onValueChange={() => { }}
            options={[
                { value: "1", label: "Semua Produk" },
                { value: "2", label: "Semua Tier" },
                { value: "3", label: "Semua Status" },
            ]}
        />,
        <Dropdown
            key="2"
            styleType="solid"
            onValueChange={() => { }}
            options={[
                { value: "1", label: "Semua Produk" },
                { value: "2", label: "Semua Tier" },
                { value: "3", label: "Semua Status" },
            ]}
        />,
        <Dropdown
            key="3"
            styleType="solid"
            onValueChange={() => { }}
            options={[
                { value: "1", label: "Semua Produk" },
                { value: "2", label: "Semua Tier" },
                { value: "3", label: "Semua Status" },
            ]}
        />

    ]
}: BuilderProps) => {
    const formatToRupiah = (value: number) => {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });
    };
    return (
        <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className="d-flex flex-stack">
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">
                            {title}
                        </span>
                        <span className="text-muted mt-1 fw-semibold fs-7">
                            {subTitle}
                        </span>
                    </h3>
                </div>

                <div className="d-flex">
                    {toolbar.map((item, index) => (
                        <div key={index} className="card-toolbar mx-5">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className="card-body py-3">
                {/* begin::Table container */}
                <div className="table-responsive">
                    {/* begin::Table */}
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 align-middle gs-0 gy-3">
                        {/* begin::Table body */}
                        <thead>
                            <tr className='fw-bold uppercase text-muted'>
                                <th className='min-w-250px rounded-start'>ID ORDER
                                    <i className="bi bi-arrow-up ms-2"></i>
                                    <i className="bi bi-arrow-down "></i>
                                </th>
                                <th className='w-100px text-center'>NAMA PRODUK
                                    <i className="bi bi-arrow-up ms-2"></i>
                                    <i className="bi bi-arrow-down "></i>
                                </th>
                                <th className='w-150px text-center'>TIER
                                    <i className="bi bi-arrow-up ms-2"></i>
                                    <i className="bi bi-arrow-down "></i>
                                </th>
                                <th className='w-200px text-center'>TOTAL KOMISI
                                    <i className="bi bi-arrow-up ms-2"></i>
                                    <i className="bi bi-arrow-down "></i>
                                </th>
                                <th className='w-150px text-end'>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className=" w-50px">
                                        <div className="text-start text-dark fw-bold p-0">
                                            {item.idOrder}
                                        </div>
                                    </td>
                                    <td className="p-0 min-w-200px">
                                        <div className="text-gray-500 fw-bold text-hover-primary text-center mb-1 fs-6">
                                            {item.namaProduk}
                                        </div>
                                    </td>
                                    <td className="text-start p-0 min-w-70px">
                                        <span className="text-gray-500 fw-bold d-block text-center fs-6">
                                            {item.tier}
                                        </span>
                                    </td>
                                    <td className="text-start p-0 min-w-70px">
                                        <span className="text-gray-500 fw-bold d-block text-center fs-6">
                                            {formatToRupiah(item.totalKomisi)}
                                        </span>
                                    </td>{" "}
                                    <td className="text-end p-0 min-w-100px">
                                        {" "}
                                        <span className="text-dark fw-bold d-block fs-6">
                                            {item.status}
                                        </span>
                                    </td>{" "}
                                </tr>
                            ))}
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
        </div>
    );
};

export default Builder;
