import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import useLanggananViewModel, { TableProps, tableData } from "./Langganan-view-model";

interface LanggananPageProps { }

const LanggananPage = ({ }: LanggananPageProps) => {
    const {
        breadcrumbs,
        selectedFollupValue,
        handleFollupChange,
    } = useLanggananViewModel();
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Langganan</PageTitle>
            <KTCard>
                <KTCardBody>
                    <div className="mb-10">
                        <Head />
                    </div>
                    <Table data={tableData} />
                    <Footer />
                </KTCardBody>
            </KTCard>
        </>
    );
};

export default LanggananPage;

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
                <div className="col-lg-auto">
                    <Dropdown
                        styleType="solid"
                        options={[
                            { label: "Semua Status", value: "all" },
                            { label: "Aktif", value: "active" },
                            { label: "Tidak Aktif", value: "inactive" },
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

const Table = ({ data }: TableProps) => {
    return (
        <>
            <KTTable
                responsive="table-responsive"
                rounded
                utilityGY={3}

            >
                <KTTableHead
                    textColor="text-muted"
                >
                    <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
                    <th className="fw-bold text-muted min-w-300px">NAMA PRODUK</th>
                    <th className="fw-bold text-muted text-end min-w-200px">
                        MASA AKTIF <i className="bi bi-arrow-up"></i><i className="bi bi-arrow-down"></i>
                    </th>
                    <th className="fw-bold text-muted text-end min-w-200px">
                        AKHIR AKTIF <i className="bi bi-arrow-up"></i><i className="bi bi-arrow-down"></i>
                    </th>
                    <th className="fw-bold text-muted text-end min-w-200px">STATUS</th>
                </KTTableHead>
                {data.map((row, index) => (
                    <KTTableBody key={index}>
                        <td className="fw-bold">{row.idLangganan}</td>
                        <td className="fw-bold">
                            <Link
                                className="text-dark text-hover-primary"
                                href={
                                    "order/" + row.idLangganan.replace(" ", "") + "/detail-order/"
                                }
                            >
                                {row.namaProduk}
                            </Link>
                        </td>
                        <td className="fw-bold text-muted text-end">
                            {row.masaAktif}
                        </td>
                        <td className="fw-bold text-muted text-end">{row.akhirAktif} <br />{row.subAkhirAktif}</td>
                        <td className="text-end">
                            <Badge label={row.status} badgeColor={row.badgeColor} />
                        </td>
                    </KTTableBody>
                ))}
            </KTTable>
        </>
    );
};

