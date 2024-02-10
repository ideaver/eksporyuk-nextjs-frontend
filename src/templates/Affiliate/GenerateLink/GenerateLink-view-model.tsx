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

const tabsData = [
    {
        id: "kt_tab_pane_4",
        name: "Social Media #1",
        message: (
            <p>
                PENTING :<br />
                <br />
                kesempatan terbaik untuk
                <br />
                dapat levidio the feed akan
                <br />
                segera berakhir
                <br />
                <br />
                Harga akan naik BESOK.
                <br />
                Dan ini serius, kalau ga percaya
                <br />
                silakan cek harganya besok
                <br />
                setelah tengah malam
                <br />
                <br />
                -&gt; KLIK DISINI (LINK AFFILIASI)
                <br />
                jadi tunggu apalagi?
                <br />
                BESOK tengah malam harga naik
                <br />
                <br />
                -&gt; KLIK DISINI (LINK AFFILIASI)
                <br />
                <br />
                Jabat Erat,
                <br />
                <br />
                NAMA AFFILIATE
            </p>
        ),
    },
    {
        id: "kt_tab_pane_5",
        name: "Social Media #2",
        message: (
            <p>
                PENTING :<br />
                <br />
                kesempatan terbaik untuk
                <br />
                dapat levidio the feed akan
                <br />
                segera berakhir
                <br />
                <br />
                Harga akan naik BESOK.
                <br />
                Dan ini serius, kalau ga percaya
                <br />
                silakan cek harganya besok
                <br />
                setelah tengah malam
                <br />
                <br />
                -&gt; KLIK DISINI (LINK AFFILIASI)
                <br />
                jadi tunggu apalagi?
                <br />
                BESOK tengah malam harga naik
                <br />
                <br />
                -&gt; KLIK DISINI (LINK AFFILIASI)
                <br />
                <br />
                Jabat Erat,
                <br />
                <br />
                NAMA AFFILIATE
            </p>
        ),
    },
    {
        id: "kt_tab_pane_6",
        name: "Social Media #3",
        message: (
            <p>
                PENTING :<br />
                <br />
                kesempatan terbaik untuk
                <br />
                dapat levidio the feed akan
                <br />
                segera berakhir
                <br />
                <br />
                Harga akan naik BESOK.
                <br />
                Dan ini serius, kalau ga percaya
                <br />
                silakan cek harganya besok
                <br />
                setelah tengah malam
                <br />
                <br />
                -&gt; KLIK DISINI (LINK AFFILIASI)
                <br />
                jadi tunggu apalagi?
                <br />
                BESOK tengah malam harga naik
                <br />
                <br />
                -&gt; KLIK DISINI (LINK AFFILIASI)
                <br />
                <br />
                Jabat Erat,
                <br />
                <br />
                NAMA AFFILIATE
            </p>
        ),
    },
    // Add more data as needed
];

const imageData = [
    {
        src: "/images/placeholders/banner-2.png",
        alt: "",
    },
    {
        src: "/images/placeholders/banner-1.png",
        alt: "",
    },
    {
        src: "/images/placeholders/banner-2.png",
        alt: "",
    },
    // Add more data as needed
];

const useGenerateLinkViewModel = ({ }: IGenerateLinkProps) => {
    const follupValues = ["follup-1", "follup-2", "follup-3"];
    const [selectedFollupValue, setSelecteFollupValue] = useState("");
    const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelecteFollupValue(event.target.value);
      };
    const generateTabsData = tabsData;
    const generateImageData = imageData;
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

    return { breadcrumbs, generateTabsData, generateImageData, follupValues, selectedFollupValue, setSelecteFollupValue, handleFollupChange };
};

export default useGenerateLinkViewModel;
