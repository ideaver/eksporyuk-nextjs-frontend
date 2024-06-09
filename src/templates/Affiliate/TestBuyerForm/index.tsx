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
import useBuyerFormViewModel from "./BuyerForm-view-model";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { KTModal } from "@/_metronic/helpers/components/KTModal";

const BuyerForm = () => {
    const {
        breadcrumbs,
        addNewCouponTabsData,
        follupValues,
        selectedFollupValue,
        handleFollupChange,
    } = useBuyerFormViewModel();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <>
                    <PageTitle breadcrumbs={breadcrumbs}>Tambah Buyer Baru</PageTitle>
                    <BuyerFormContent
                        follupValues={follupValues}
                        selectedFollupValue={selectedFollupValue}
                        handleFollupChange={handleFollupChange}
                        navLinks={addNewCouponTabsData}
                        urlType="test-buyer-form"
                    />
                </>
            )}
        </>
    );
};

export default BuyerForm;

const BuyerFormContent = ({
    follupValues,
    selectedFollupValue,
    handleFollupChange,
    urlType,
}: {
    urlType: "test-buyer-form"
    navLinks: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

    const urls = [
        {
            label: "Informasi Buyer",
            to: `/affiliate/${urlType}/informasi-buyer`,
        },
        {
            label: "Demand",
            to: `/affiliate/${urlType}/demand`,
        },
    ];

    const {
        addNewCouponTabsData,
    } = useBuyerFormViewModel();

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <TabLink className="mb-5" links={urls} />
            <div>
                <div>
                    <KTCard>
                        <KTCardBody>
                            <div className="">
                                <h2 className="pb-3">Informasi Buyer</h2>
                                <div>
                                    <h4 className="required fw-bold text-gray-700 pt-2">Nama Buyer</h4>
                                    <TextField
                                        styleType="outline"
                                        size="medium"
                                        placeholder="Rejesh Kapoor"
                                    />
                                    <p className="fw-bold fs-6 text-muted">Nama lengkap buyer</p>
                                </div>
                            </div>
                            <div className="">
                                <h4 className="required fw-bold text-gray-700 pt-2">Nama Perusahaan</h4>
                                <div className="d-flex">
                                    <TextField
                                        classNames=""
                                        styleType="outline"
                                        size="medium"
                                        placeholder="Mumbai Merchants Pt. Ltd."
                                    />
                                </div>
                                <p className="fw-bold fs-6 text-muted">Nama perusahaan buyer</p>
                            </div>
                            <div className="">
                                <h4 className="required fw-bold text-gray-700 pt-2">Negara</h4>
                                <div className="">
                                    <Dropdown
                                        styleType="outline"
                                        props={{ id: "couponName" }}
                                        options={[
                                            { label: "Pilih Negara", value: "negara" },
                                            { label: "Indonesia", value: "indonesia" },
                                            { label: "USA Amerika", value: "usa" },
                                            { label: "Belanda", value: "belanda" },
                                        ]}
                                        onValueChange={() => { }}
                                    />
                                    <p className="fw-bold fs-6 text-muted">Asal negara buyer</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <h4 className="required fw-bold text-gray-700">Alamat Perusahaan</h4>
                                <TextField
                                    classNames="form-control"
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Masukkan Text Di sini"
                                />
                                <p className="fw-bold fs-6 text-muted">Alamat perusahaan buyer</p>
                            </div>
                            <div className="pt-2">
                                <h4 className="fw-bold text-gray-700">E-mail</h4>
                                <Textarea
                                    rows={4}
                                    classNames="form-control"
                                    styleType="outline"
                                    size="large"
                                    placeholder="Masukkan e-mail buyer"
                                />
                                <p className="fw-bold fs-6 text-muted">E-mail buyer</p>
                            </div>
                            <div className="pt-2">
                                <h4 className="fw-bold text-gray-700">No. Telepon</h4>
                                <TextField
                                    classNames="form-control"
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Masukkan no telepon buyer"
                                />
                                <p className="fw-bold fs-6 text-muted">No. telepon buyer</p>
                            </div>

                            {/* <div>
                                <KTModal
                                    dataBsTarget="kt_modal" 
                                    title="Coba Modal" 
                                    bodyText="This is an example modal."
                                    fade 
                                    onClose={handleCloseModal} 
                                    nameButtonModal="Buyerkan Kupon"
                                >
                                    <div>ini s</div>
                                </KTModal>
                            </div> */}

                        </KTCardBody>
                    </KTCard>
                </div>
                <div className="pt-10">
                    <div className="modal-footer d-flex justify-content-end">
                        <Buttons
                            buttonColor="secondary" classNames="fw-bold">
                            Batal
                        </Buttons>
                        <Buttons onClick={() => { }} buttonColor="primary" classNames="fw-bold ms-6">Tambahkan Kupon</Buttons>
                    </div>
                </div>
            </div>
        </div>

    )
}

