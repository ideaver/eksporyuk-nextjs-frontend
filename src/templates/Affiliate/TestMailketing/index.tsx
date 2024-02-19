import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import useMailketingViewModel from "./Mailketing-view-model";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";

const Mailketing = () => {
    const {
        breadcrumbs,
        addNewCouponTabsData,
        follupValues,
        selectedFollupValue,
        handleFollupChange,
    } = useMailketingViewModel();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <>
                    <PageTitle breadcrumbs={breadcrumbs}>Mailketing SMTP</PageTitle>
                    <MailketingContent
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

export default Mailketing;

const MailketingContent = ({
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
    } = useMailketingViewModel();
    return (
        <div className="row">
            <div className="col-3">
                <div className="min-w-250px sticky-top" style={{ position: 'fixed', top: 0, zIndex: 9999, marginTop: 104 }}>
                    <KTCard shadow>
                        <KTCardBody>
                            <h2 className="fw-bold text-gray-700 pb-4">
                                Token API Mailketing
                            </h2>
                            <div className="d-flex">
                                <TextField
                                    classNames=""
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Token API"
                                />
                            </div>
                            <p className="fw-bold fs-7 text-muted pt-2">
                                Fill with API Token from MailKeting <br />
                                <span>Mailketing, login mailketing,</span> <br />
                                <span>Integration &gt; generate token</span>
                            </p>
                            <div>
                                <Buttons classNames="fw-bold mt-6">
                                    Connect
                                </Buttons>
                            </div>
                        </KTCardBody>
                    </KTCard>
                </div>
            </div>
            <div className="col-9">
                <div>
                    <KTCard shadow>
                        <KTCardBody>
                            <h2 className="pb-5">Pengaturan</h2>
                            <div>
                                <h4 className="fw-bold text-gray-700">Nama E-mail Pengirim</h4>
                                <TextField
                                    classNames=""
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Kelas EkporYuk"
                                />
                                <p className="fw-bold fs-6 text-muted">Nama yang akan ditampilkan sebagai pengirim email</p>

                            </div>
                            <div className="">
                                <h4 className="fw-bold text-gray-700 pt-4">Alamat E-mail Pengirim</h4>
                                <Dropdown
                                    styleType="outline"
                                    props={{ id: "alamat-email" }}
                                    options={[
                                        { label: "admin@eksporyuk.com", value: "admin" },
                                        { label: "adminkelas@eksporyuk.com", value: "adminkelas" },
                                    ]}
                                    onValueChange={() => { }}
                                />
                                <p className="fw-bold fs-6 text-muted">Alamat email pengirim</p>
                            </div>
                            <div className="">
                                <h4 className="fw-bold text-gray-700 pt-4">Auto Capture Register WP → List Mailketing</h4>
                                <Dropdown
                                    styleType="outline"
                                    props={{ id: "kode-member" }}
                                    options={[
                                        { label: "29505 - Membership Eksporyuk", value: "member" },
                                        { label: "205 - Membership VVIP Eksporyuk", value: "member-vvip" },
                                    ]}
                                    onValueChange={() => { }}
                                />
                                <p className="fw-bold fs-6 text-muted">Setiap pengguna baru yang terdaftar akan tersimpan di list ini</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Buttons onClick={() => { }} buttonColor="primary" classNames="fw-bold mt-6">Simpan Pengaturan</Buttons>
                            </div>
                        </KTCardBody>
                    </KTCard>
                </div>

                <div className="pt-10">
                    <KTCard shadow>
                        <KTCardBody>
                            <h2 className="">Test Mailketing <br />
                                <span className="text-muted fs-5">Test Integrasi Mailketing dengan mengirimkan e-mail</span>
                            </h2>

                            <div className="pt-8">
                                <h4 className="fw-bold text-gray-700">Kirim Ke</h4>
                                <TextField
                                    classNames=""
                                    styleType="outline"
                                    size="medium"
                                    placeholder="user@gmail.com"
                                />
                            </div>
                            <div className="pt-8">
                                <h4 className="fw-bold text-gray-700">Subject</h4>
                                <TextField
                                    classNames=""
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Testing"
                                />
                            </div>
                            <div className="pt-8">
                                <h4 className="fw-bold text-gray-700">Isi Pesan</h4>
                                <Textarea
                                    rows={5}
                                    classNames=""
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Test Orang"
                                />
                            </div>
                            <div className="d-flex justify-content-end mt-4">
                                <Buttons onClick={() => { }} buttonColor="primary" classNames="fw-bold mt-6">Kirim Test E-mail</Buttons>
                            </div>
                        </KTCardBody>
                    </KTCard>
                </div>
            </div>
            <div className="pt-10">
            </div>

        </div>
    )
}

