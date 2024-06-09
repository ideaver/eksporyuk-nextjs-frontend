import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import useReminderFormViewModel, { ReminderFormTableList } from "./ReminderForm-view-model";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";

const ReminderForm = () => {
    const {
        breadcrumbs,
        addNewCouponTabsData,
        follupValues,
        selectedFollupValue,
        handleFollupChange,
    } = useReminderFormViewModel();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <>
                    <PageTitle breadcrumbs={breadcrumbs}>Tambah Kupon Baru</PageTitle>
                    <ReminderFormContent
                        follupValues={follupValues}
                        selectedFollupValue={selectedFollupValue.join(',')}
                        handleFollupChange={handleFollupChange}
                        navLinks={addNewCouponTabsData}
                        urlType="test-reminder-form"
                    />
                </>
            )}
        </>
    );
};

export default ReminderForm;

const ReminderFormContent = ({
    follupValues,
    selectedFollupValue,
    handleFollupChange,
    navLinks,
    urlType,
}: {
    urlType: "test-reminder-form"
    navLinks: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const [selectedTab, setSelectedTab] = useState(navLinks[0].href);
    const router = useRouter();
    const pathname = usePathname();

    const isOpeningFacebookPixel = router.pathname.startsWith('/test-reminder-form');

    const urls = [
        {
            label: "Informasi Reminder",
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
        <div className="row">
            <div className="col-3 sticky-top">
                <KTCard className="">
                    <KTCardBody>
                        <h2 className="fw-bold text-gray-700 pb-4">
                            Status
                        </h2>
                        <div className="d-flex">
                            <Dropdown
                                styleType="outline"
                                props={{ id: "couponName" }}
                                options={[
                                    { label: "Aktif", value: "status1" },
                                    { label: "Non-Aktif", value: "status2" },
                                ]}
                                onValueChange={() => { }}
                            />
                        </div>
                        <p className="fw-bold fs-5 text-muted pt-2">
                            Atur Status
                        </p>
                    </KTCardBody>
                </KTCard>
            </div>

            <div className="col-9">
                <div>
                    <TabLink className="mb-5" links={urls} />
                    <div>
                        <div>
                            <KTCard>
                                <KTCardBody>
                                    <h2 className="pb-3">Informasi Reminder</h2>
                                    <div>
                                        <h4 className="required fw-bold text-gray-700">Media Reminder</h4>
                                        <div
                                            className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
                                            data-kt-buttons="true"
                                        >
                                            {follupValues.map((value, index) => (
                                                <RadioInput
                                                    key={value}
                                                    className={selectedFollupValue.includes(value) ? "active" : ""}
                                                    name="follup"
                                                    value={value}
                                                    checked={selectedFollupValue.includes(value)}
                                                    onChange={handleFollupChange}
                                                >
                                                    {value === "Email" ? "Email" : value === "WhatsApp" ? "WhatsApp" : value === "SMS" ? "SMS" : `Follow-Up ${index + 1}`}
                                                </RadioInput>
                                            ))}
                                        </div>
                                        <p className="fw-bold fs-6 text-muted">Pilih melalui apa reminder dikirim</p>
                                    </div>
                                    <h4 className="required fw-bold text-gray-700">Nama Reminder</h4>

                                    <div className="">
                                        <TextField
                                            classNames=""
                                            styleType="outline"
                                            size="medium"
                                            placeholder="H-10 Masa Langganan"
                                        />
                                        <p className="fw-bold fs-6 text-muted">Nama/Judul Reminder</p>
                                    </div>
                                    <h4 className="required fw-bold text-gray-700 pt-4">Tipe Reminder</h4>
                                    <div className="">
                                        <Dropdown
                                            styleType="outline"
                                            props={{ id: "couponName" }}
                                            options={[
                                                { label: "Facebook", value: "akuisisi1" },
                                                { label: "Instagram", value: "akuisisi2" },
                                            ]}
                                            onValueChange={() => { }}
                                        />
                                        <p className="fw-bold fs-6 text-muted">Pilih tipe reminder</p>
                                    </div>
                                    <div className="pt-4">
                                        <h4 className="fw-bold text-gray-700">Batas Penggunaan Kupon oleh Affiliasi</h4>
                                        <div className="d-flex">
                                            <Dropdown
                                                styleType="outline"
                                                props={{ id: "couponName" }}
                                                options={[
                                                    { label: "Kelas Bimbingan Eksporyuk", value: "KBE" },
                                                    { label: "Kelas Bimbingan VVIP", value: "vvip" },
                                                ]}
                                                onValueChange={() => { }}
                                            />
                                            <Buttons
                                                mode="light"
                                                classNames="ms-6"
                                                buttonColor="danger"
                                                size="small"
                                            >
                                                <KTIcon iconName="cross" className="fs-2" />
                                            </Buttons>
                                        </div>
                                        <div className="d-flex pt-3">
                                            <Dropdown
                                                styleType="outline"
                                                props={{ id: "couponName" }}
                                                options={[
                                                    { label: "Pilih Produk", value: "PP" },
                                                    { label: "Materi Dasar", value: "MDasar" },
                                                ]}
                                                onValueChange={() => { }}
                                            />
                                            <Buttons
                                                mode="light"
                                                classNames="ms-6"
                                                buttonColor="danger"
                                                size="small"
                                            >
                                                <KTIcon iconName="cross" className="fs-2" />
                                            </Buttons>
                                        </div>
                                        <div className="pt-3">
                                            <Buttons
                                                buttonColor="primary"
                                                mode="light"
                                            ><KTIcon iconName="plus" className="fs-2" />Tambahkan Produk</Buttons>
                                        </div>
                                    </div>
                                    <div className="pt-8">
                                        <h4 className="required fw-bold text-gray-700">Waktu Reminder</h4>
                                        <div className="d-flex">
                                            <div className="w-50 pe-2">
                                                <Dropdown
                                                    styleType="outline"
                                                    props={{ id: "couponName" }}
                                                    options={[
                                                        { label: "6", value: "6" },
                                                        { label: "7", value: "7" },
                                                    ]}
                                                    onValueChange={() => { }}
                                                />
                                            </div>
                                            <div className="w-50 ps-2">
                                                <Dropdown
                                                    styleType="outline"
                                                    props={{ id: "couponName" }}
                                                    options={[
                                                        { label: "Jam", value: "Jam" },
                                                        { label: "1 Jam", value: "1 Jam" },
                                                    ]}
                                                    onValueChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <p className="fw-bold fs-6 text-muted pt-6">Berdasarkan input yang diberikan, maka reminder akan dikirimkan <br />
                                            <span className="text-dark">6 Jam sebelum masa berlangganan produk "Kelas Bimbingan Eksporyuk" berakhir melalui E-mail.</span>
                                        </p>
                                    </div>

                                </KTCardBody>
                            </KTCard>
                        </div>
                    </div>
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

        </div>
    )
}

