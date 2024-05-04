import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

interface Row {
    className?: string;
    icon: string;
    nameIcon: string;
    image: string;
    title?: string;
    presentase?: number;
    totalPresentase?: number;
    colorPrecentage?: string;
    colorSubtle?: string;
    backgroundColor?: string;
    width: number;
    path?: string;
}

interface KelasTerdaftarProps {
    rows: Row[];
    className?: string;
}

const KelasTerdaftar: React.FC<KelasTerdaftarProps> = ({ rows, className }) => {
    return (
        <div className={`gy-5 g-xl-8 mb-10 ${className}`}>
            <div className="row row-cols-1 row-cols-md-3 g-8">
                {rows.map((row, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100">
                            <div className="w-100">
                                <Image
                                    className={`symbol w-100`}
                                    src={row.image}
                                    width={row.width}
                                    height={200}
                                    alt={"A"}
                                ></Image>
                            </div>
                            <Link href={`${row.path}`}>
                                <div className="py-4">
                                    <h2 className={`min-w-${row.width}px text-gray-800 cursor-pointer text-hover-primary`}>{row.title}</h2>
                                </div>
                            </Link>
                            <div className="pb-6">
                                <div className={`fw-bold text-end d-flex align-items-center min-w-${row.width}px`}>
                                    <Image
                                        className="symbol symbol-50px symbol-circle me-4"
                                        src={row.icon}
                                        width={36}
                                        height={36}
                                        alt={row.nameIcon}
                                    ></Image>
                                    <h5 className="text-gray-600">{row.nameIcon}</h5>
                                </div>
                            </div>
                            <div className={`d-flex align-items-center justify-content-between w-100 pt-4`}>
                                <span className="text-gray-500 fw-bold fs-4">{row.presentase} dari {row.totalPresentase} materi</span>
                                <span className="text-gray-800 fw-bold fs-4">{row.presentase}% {row.presentase === 100 && "(Completed)"}</span>
                            </div>
                            <div className={`d-flex flex-column w-100 me-2 py-3 w-100`}>
                                <div
                                    className={`progress h-8px bg-${row.colorSubtle} w-100`}
                                >
                                    <div
                                        className={`progress-bar bg-${row.colorPrecentage}`}
                                        role="progressbar"
                                        style={{ width: `${row.presentase}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className={`text-end w-100 py-4`}>
                                <Buttons
                                    classNames="fw-bold fs-6 "
                                    buttonColor="primary"
                                    mode="light"
                                    size="small"
                                    onClick={() => { }}
                                >
                                    {row.presentase === 100 ? "Download Sertifikat" : "Lanjutkan Belajar"}
                                </Buttons>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KelasTerdaftar;
