import { MenuComponent } from "@/_metronic/assets/ts/components";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface IGenerateLinkProps { }

interface GenerateLinkViewModel {
    breadcrumbs: any[];
    isModalOpen: boolean;
    handleModalOpen: () => void;
    handleModalClose: () => void;
}


export interface TableRow {
    icon?: string;
    breadcrumb?: string | JSX.Element;
    value?: string | JSX.Element;
}

export interface TableProps {
    data: TableRow[];
}

export const tableData: TableRow[] = [
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Promo Kemerdekaan
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
    {
        breadcrumb: (
            <Buttons mode="light"
                data-bs-toggle="modal"
                data-bs-target="#kt_generate_modal"
            >Generate Link</Buttons>
        ),
        value: (
            <div className="text-dark">
                <Buttons
                    buttonColor="secondary"
                    classNames="btn-sm fw-bold fs-5 me-5"
                >
                    <img src="" alt="" />Aa
                </Buttons>
                Kelas Bimbingan Ekspor Yuk + Aplikasi EYA
            </div>
        ),
    },
];




const useGenerateLinkViewModel = ({ }: IGenerateLinkProps) => {
    const follupValues = ["follup-1", "follup-2", "follup-3"];
    const [selectedFollupValue, setSelecteFollupValue] = useState("");
    const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelecteFollupValue(event.target.value);
      };
    const breadcrumbs = [
        {
            title: "Affiliasi",
            path: "/affiliate/pixel",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
        },
    ];

    return { breadcrumbs, follupValues, selectedFollupValue, setSelecteFollupValue, handleFollupChange };
};

export default useGenerateLinkViewModel;
