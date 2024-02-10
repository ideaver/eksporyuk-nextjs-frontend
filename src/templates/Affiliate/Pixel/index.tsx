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

interface PixelPageProps { }

const PixelPage = ({ }: PixelPageProps) => {
    const {
        breadcrumbs,
        pixelModalState,
        setPixelModalState,
        follupValues,
        selectedFollupValue,
        handleFollupChange,
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
        <div className="modal fade" tabIndex={-1} id="kt_pengaturan_id_modal">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Pengaturan ID Pixel</h5>
                        <div
                            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <KTIcon iconName="cross" className="fs-2x" />
                        </div>
                    </div>

                    <div className="modal-body">
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
                    </div>

                    <div className="modal-footer justify-content-center gap-4">
                        <Buttons buttonColor="secondary" classNames="fw-bold" data-bs-dismiss="modal">
                            Batal
                        </Buttons>
                        <Buttons data-bs-dismiss="modal" classNames="fw-bold" >Simpan Pengaturan</Buttons>
                    </div>
                </div>
            </div>
        </div>
    );
};