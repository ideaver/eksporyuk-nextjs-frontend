/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon, toAbsoluteUrl } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
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
    seachbar?: JSX.Element
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
    ],
    seachbar = (
        <TextField
            placeholder="Search..."
            preffixIcon="magnifier"
            clickablePreffixIcon={true}
            onClickPreffixIcon={() => {
                confirm("Preffix Icon Clicked");
            }}
        />
    )

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
                <div className="d-flex bg-gray-400 rounded ms-5">
                    {seachbar}
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
            <div className="card-body py-5">
                {/* begin::Table container */}
                <div className="table-responsive">
                    {/* begin::Table */}
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 align-middle gs-0 gy-3">
                        {/* begin::Table body */}
                        <thead>
                            <tr className='fw-bold uppercase text-muted'>
                                <th className='min-w-150px rounded-start'>ID ORDER
                                    <i className="bi bi-arrow-up ms-2"></i>
                                    <i className="bi bi-arrow-down "></i>
                                </th>
                                <th className='w-400px text-start'>NAMA PRODUK
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
                                        <div className="text-gray-500 fw-bold text-hover-primary text-start mb-1 fs-6">
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
                                        <span className={`fw-bold d-block text-center rounded fs-6 ${item.status === 'Belum Dibayar' ? 'text-danger' : 'text-success'}  ${item.status === 'Belum Dibayar' ? 'bg-danger-subtle' : 'bg-success-subtle'}`}>
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
