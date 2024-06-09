import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import useKelasTerdaftarViewModel, { CardProps, cardData } from "./KelasTerdaftar-view-model";
import KelasTerdaftar from "@/stories/organism/Kelas/KelasTerdaftar/KelasTerdaftar";

interface KelasTerdaftarPageProps { }

const KelasTerdaftarPage = ({ }: KelasTerdaftarPageProps) => {
    const {
        breadcrumbs,
        selectedFollupValue,
        handleFollupChange,
    } = useKelasTerdaftarViewModel();
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Kelas Terdaftar</PageTitle>
            <KTCard>
                <KTCardBody>
                    <div className="mb-10">
                        <Head />
                    </div>
                    <Card data={cardData} />
                    <Footer />
                </KTCardBody>
            </KTCard>
        </>
    );
};

export default KelasTerdaftarPage;

const Head = () => {
    return (
        <div className="row justify-content-between gy-5">
            <div className="col-lg-auto">
                <TextField
                    styleType="solid"
                    preffixIcon="magnifier"
                    placeholder="Search"
                ></TextField>
            </div>
            <div className="row col-lg-auto gy-3">
                <div className="col-lg-auto d-flex align-items-center justify-content-center">
                    <p className="min-w-70px text-end text-gray-700 fw-bold my-auto me-2">Sort By:</p>
                    <Dropdown
                        styleType="solid"
                        options={[
                            { label: "Completion (Tertinggi-Terendah)", value: "all" },
                            { label: "Selesai", value: "done" },
                            { label: "Belum Selesai", value: "undone" },
                        ]}
                        onValueChange={() => { }}
                    />
                </div>

            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div className="row justify-content-between">
            <div className="col-auto">
                <Dropdown
                    styleType="solid"
                    options={[
                        { label: "10", value: 10 },
                        { label: "20", value: 20 },
                        { label: "30", value: 30 },
                    ]}
                    onValueChange={() => { }}
                />
            </div>
            <div className="col-auto">
                <Pagination
                    total={10}
                    current={1}
                    maxLength={5}
                    onPageChange={() => { }}
                ></Pagination>
            </div>
        </div>
    );
};

const Card = ({ data }: CardProps) => {
    return (
        <>
            <KelasTerdaftar
                rows={data}
            />
        </>
    );
};

