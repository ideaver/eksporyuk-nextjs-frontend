import { MenuComponent } from "@/_metronic/assets/ts/components";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { ColorList } from "@/types/general/utilities";
import { useEffect, useState } from "react";

interface IPixelProps { }


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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
                data-bs-target="#kt_id_pixel_modal">Hubungkan</Buttons>
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
        id: "kt_tab_pane_1",
        name: "Facebook Pixel",
        message: (
            <>
                <div>
                    <h4 className="fw-bold text-gray-700">Facebook/Meta Pixel ID</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="1234567890"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Checkout Page</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
            </>
        ),
    },
    {
        id: "kt_tab_pane_2",
        name: "Tiktok Pixel",
        message: (
            <>
                <div>
                    <h4 className="fw-bold text-gray-700">Facebook/Meta Pixel ID</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="1234567890"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Checkout Page</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
            </>
        ),
    },
    {
        id: "kt_tab_pane_3",
        name: "Google Tab Manager",
        message: (
            <>
                <div>
                    <h4 className="fw-bold text-gray-700">Facebook/Meta Pixel ID</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="1234567890"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Checkout Page</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="fw-bold text-gray-700">Event pada Saat Menekan Beli Sekarang</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="outline"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                </div>
            </>
        ),
    },
    // Add more data as needed
];

const usePixelViewModel = ({ }: IPixelProps) => {
    const [pixelModalState, setPixelModalState] = useState<any>({
        startDate: new Date(),
        endDate: new Date(),
    });
    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

    const pixelTabsData = tabsData;
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

    return { breadcrumbs, pixelModalState, setPixelModalState, follupValues, selectedFollupValue, handleFollupChange, pixelTabsData };
};

export default usePixelViewModel;

