import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

import React from 'react';

interface Row {
    className?: string;
    icon: string 
    title: string;
    subTitle: string;
    presentase: number;
    totalPresentase: number;
    colorPrecentage: string;
    colorSubtle: string;
    backgroundColor?: string;
}

interface DashboardKelasProps {
    rows: Row[];
    className?: string;
}

const DashboardKelas: React.FC<DashboardKelasProps> = ({ rows, className }) => {
    return (
        <div className={`relative ${className}`}>
            {/* begin::Body */}
            {rows.map((row, index) => (
                <div className="row pt-6" key={index}>
                    <div className="col-xl-2">
                        <img src={row.icon} alt="" className="w-100 text-center" />
                    </div>
                    <div className={`col-xl-10 bg-${row.backgroundColor} rounded px-6 pt-6 pb-4`} >
                        <h4 className={`text-${row.colorPrecentage}`}>{row.title}</h4>
                        <div className="py-6">
                            <h2 className="">{row.presentase}%
                                <span className="text-muted fs-6"> Sudah menyelesaikan <span className="text-dark">{row.presentase}</span> dari <span className="text-dark">{row.totalPresentase}</span> Materi</span></h2>
                        </div>
                        <div className="d-flex flex-column w-100 me-2 pb-4">
                            <div
                                className={`progress h-6px bg-${row.colorSubtle} w-100`}
                            >
                                <div
                                    className={`progress-bar bg-${row.colorPrecentage}`}
                                    role="progressbar"
                                    style={{ width: `${row.presentase}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* end::Body */}
        </div>
    );
};

export default DashboardKelas;


