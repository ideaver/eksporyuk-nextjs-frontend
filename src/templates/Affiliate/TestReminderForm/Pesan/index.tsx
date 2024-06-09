import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import useReminderFormViewModel from "../ReminderForm-view-model";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";


interface Pesan {
    nama: string;
}

interface PesanContentProps {
    pesanValue: Pesan[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    navLinks: any;
    urlType: string;
}

const Pesan = () => {
    const {
        breadcrumbs,
        addNewCouponTabsData,
        selectedFollupValue,
        handleFollupChange,
    } = useReminderFormViewModel();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const pesanValue = [
        "({affiliate-name})",
        "(({memberurly})",
        "(({sitename}))",
        "({siteurly}",
        "({forder-id})",
        "{{invoice-id}",
        "{order-grand-total}",
        "{buyer-name}",
        "{buyer-email}",
        "{buyer-phone}",
        "{product-name}",
        "{{quantity}}",
        "({confirm-url})",
        "({order-day})",
        "({close-time})",
        "({affiliate-name}}",
        "{affiliate-email}",
        "{affiliate-phone}",
        "{affiliate-tier}",
        "{commission}",
        "{forder-detail}}",
        "{forder-meta}}",
        "{{payment-gateway}}",
        "{{product-info}}"
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Reminder Baru</PageTitle>
            <PesanContent
                pesanValue={pesanValue}
                selectedFollupValue={selectedFollupValue.join(',')}
                handleFollupChange={handleFollupChange}
                navLinks={addNewCouponTabsData}
                urlType="test-reminder-form"
            />
        </>
    );
};

export default Pesan;


const PesanContent = ({
    pesanValue,
    selectedFollupValue,
    handleFollupChange,
    navLinks,
    urlType,
}: {
    urlType: "test-reminder-form"
    navLinks: any;
    pesanValue: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const [selectedTab, setSelectedTab] = useState(navLinks[0].href);
    const router = useRouter();
    const pathname = usePathname();

    const isOpeningFacebookPixel = router.pathname.startsWith('/test-reminder-form');

    const urls = [
        {
            label: " Reminder",
            to: `/affiliate/${urlType}/informasi-reminder`,
        },
        {
            label: "Pesan",
            to: `/affiliate/${urlType}/pesan`,
        },
    ];


    const handleTabClick = (tabId: string) => {
        setSelectedTab(tabId);
    };
    const {
        addNewCouponTabsData,
    } = useReminderFormViewModel();
    return (
        <div>
            <div>
                <KTCard>
                    <KTCardBody>
                        <h2 className="pb-3"> Pesan</h2>
                        <div>
                            <h4 className="required fw-bold text-gray-700">Shortcode</h4>
                            <div
                                className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
                                data-kt-buttons="true"
                            >
                                <div className="d-flex flex-wrap">
                                    {pesanValue.map((item, index) => (
                                        <div className="d-flex justify-content-between align-items-center mx-2 mb-2" key={index}>
                                            {item !== "-" && (
                                                <Buttons buttonColor="secondary" classNames="btn p-2 d-flex ">
                                                    <p className="m-0 flex-grow-1">{item}</p>
                                                    <KTIcon iconName="copy" className="fs-1 text-hover-primary" />
                                                </Buttons>
                                            )}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                        <h4 className="required fw-bold text-gray-700 pt-6">Pesan Reminder</h4>

                        <div className="">
                            <Textarea
                                classNames=""
                                styleType="outline"
                                size="medium"
                                placeholder="Masukkan Pesan Reminder"
                            />
                        </div>


                    </KTCardBody>
                </KTCard>
                <div className="pt-10">
                    <div className="modal-footer d-flex justify-content-end">
                        <Buttons
                            buttonColor="secondary" classNames="fw-bold">
                            Batal
                        </Buttons>
                        <Buttons buttonColor="primary" classNames="fw-bold ms-6">Tambahkan Kupon</Buttons>
                    </div>
                </div>
            </div>
        </div>

    )
}




