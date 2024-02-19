import { PageTitle } from "@/_metronic/layout/core";
import usePixelViewModel, {
    TableProps,
    TableRow,
    tableData
} from "./Pixel-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";
import Flatpickr from "react-flatpickr";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { KTModal } from "@/_metronic/helpers/components/KTModal";

interface PixelPageProps { }

const PixelPage = ({ }: PixelPageProps) => {
    const {
        breadcrumbs,
        pixelModalState,
        setPixelModalState,
        follupValues,
        selectedFollupValue,
        handleFollupChange,
        pixelTabsData,
    } = usePixelViewModel({});
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Pixel</PageTitle>
            <KTCard>
                <KTCardBody>
                    <div className="mb-10">
                        <Head />
                    </div>
                    <Table data={tableData} />
                    <Footer />
                </KTCardBody>
            </KTCard>
            <PixelModal
                date={pixelModalState}
                onChange={([startDate, endDate]) => {
                    setPixelModalState([startDate, endDate]);
                }}
            />
            <FollowUpModal
                follupValues={follupValues}
                selectedFollupValue={selectedFollupValue}
                handleFollupChange={handleFollupChange}
            />
            <SaveAdjustId />
            <IdPixelModal
                tabsData={pixelTabsData}
                follupValues={follupValues}
                selectedFollupValue={selectedFollupValue}
                handleFollupChange={handleFollupChange}
            />
            <SubmitIdPixelModal />
        </>
    );
};

export default PixelPage;

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
            <div className="col-lg-auto">
                <Buttons data-bs-toggle="modal" data-bs-target="#kt_pengaturan_id_modal">
                    Pengaturan ID Pixel
                </Buttons>
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

const Table = ({ data }: TableProps) => {
    return (
        <div className="table-responsive mb-10">
            <table className="table">
                <thead>
                    <tr className='fw-bold uppercase text-muted'>
                        <th className={`rounded-start text-uppercase min-w-500px`}>nama produk<i className="bi bi-arrow-up ms-3"></i><i className="bi bi-arrow-down"></i></th>
                        <th className='w-100px text-end text-uppercase'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <th className="">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column">
                                        <div className="text-muted fw-bold text-start fs-6 mb-0 text-dark">
                                            {row.value}
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <td>
                                <div className="d-flex flex-column w-100 me-2">
                                    <div className={``}>
                                        <div className={`text-end fw-bold fs-5 text-muted`}>
                                            {row.breadcrumb}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PixelModal = ({
    date,
    onChange,
}: {
    date: Date;
    onChange: (value: any) => void;
}) => {
    return (
        <KTModal
            dataBsTarget="kt_pengaturan_id_modal"
            title="Pengaturan ID Pixel"
            fade
            modalCentered
            modalSize="lg"
            buttonClose={
                <Buttons buttonColor="secondary" classNames="fw-bold" data-bs-dismiss="modal">
                    Batal
                </Buttons>
            }
            buttonSubmit={
                <Buttons data-bs-dismiss="modal" classNames="fw-bold" data-bs-toggle="modal" data-bs-target="#tersimpan_pengaturan_id" >Simpan Pengaturan</Buttons>

            }
            footerContentCentered
        >
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
            <div className="mt-8">
                <h4 className="fw-bold text-gray-700">TikTok Pixel ID</h4>
                <div className="d-flex">
                    <TextField
                        styleType="outline"
                        size="medium"
                        placeholder="C545FFHT8ST896F"
                    />
                </div>
            </div>
            <div className="mt-8">
                <h4 className="fw-bold text-gray-700">Google Tag Manager ID</h4>
                <div className="d-flex">
                    <TextField
                        styleType="outline"
                        size="medium"
                        placeholder="GTM-RGUSIRGS"
                    />
                </div>
            </div>
        </KTModal>
    );
};

const SaveAdjustId = () => {
    return (
        <KTModal
            dataBsTarget="tersimpan_pengaturan_id"
            fade
            modalCentered
            modalSize="md"
            footerContentCentered
            buttonClose={
                <Buttons buttonColor="primary" classNames="fw-bold" data-bs-dismiss="modal">
                    Tutup
                </Buttons>
            }
            buttonSubmit={false}
        >
            <div className="d-flex align-items-center justify-content-center">
                <img
                    src={'/media/svg/general/checklist.svg'}
                    className="img-fluid mb-6"
                    alt=""
                    width={100}
                />
            </div>
            <h2 className="text-center text-gray-700 mb-2">Pengaturan tersimpan</h2>
            <p className="text-center text-gray-700 fs-5">Pengaturan ID Pixel berhasil disimpan</p>
        </KTModal>
    )
}

const IdPixelModal = ({
    tabsData,
    follupValues,
    selectedFollupValue,
    handleFollupChange,
}: {
    tabsData: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}) => {
    return (
        <KTModal
            dataBsTarget="kt_id_pixel_modal"
            modalCentered
            fade
            modalSize="lg"
            title="ID Pixel"
            subTitle="Produk: Kelas Bimbingan EksporYuk"
            buttonClose={
                <Buttons buttonColor="secondary" classNames="fw-bold" data-bs-dismiss="modal">
                    Tutup
                </Buttons>
            }
            buttonSubmit={
                <Buttons data-bs-dismiss="modal" classNames="fw-bold" data-bs-toggle="modal" data-bs-target="#submit_id_pixel_modal">Submit Pixel</Buttons>}
        >
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                {tabsData.map((tab: any, index: any) => (
                    <li className="nav-item" key={index}>
                        <a
                            className={`nav-link ${index === 0 ? "active" : ""} fw-bold`}
                            data-bs-toggle="tab"
                            href={`#${tab.id}`}
                        >
                            {tab.name}
                        </a>
                    </li>
                ))}
            </ul>
            <div>
                <div className="tab-content">
                    {tabsData.map((tab: any, index: any) => (
                        <div
                            className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                            id={tab.id}
                            role="tabpanel"
                            key={index}
                        >
                            <div>{tab.message}</div>
                        </div>
                    ))}
                </div>
            </div>
        </KTModal>
    );
};

const SubmitIdPixelModal = () => {
    return (
        <KTModal
            dataBsTarget="submit_id_pixel_modal"
            fade
            title=""
            modalSize="md"
            modalCentered
            buttonClose={
                <Buttons buttonColor="primary" classNames="fw-bold" data-bs-dismiss="modal">
                    Tutup
                </Buttons>
            }
            buttonSubmit={false}
            footerContentCentered
        >
            <div className="d-flex align-items-center justify-content-center">
                <img
                    src={'/media/svg/general/checklist.svg'}
                    className="img-fluid mb-6"
                    alt=""
                    width={100}
                />
            </div>
            <h2 className="text-center text-gray-700 mb-2">Pengaturan Berhasil Diperbarui</h2>
            <p className="text-center text-gray-700 fs-5">Data Pixel Produk Berhasil Diperbarui</p>
        </KTModal>
    )
}