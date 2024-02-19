import { PageTitle } from "@/_metronic/layout/core";
import {
    AkuisisiTableProps,
    akuisisTableData,
    listCardItems,
} from "./Dashboard-view-model";
import ListCard from "@/stories/organism/Tables/ListCard/ListCard";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import dashboardViewModel from "./Dashboard-view-model";
import { CardInfo } from "@/stories/molecules/Cards/CardInfo/CardInfo";
import DashboardKelas from "@/stories/organism/Kelas/Dashboard/DashboardKelas";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Kelas } from "@/stories/organism/Tables/KelasTable/Kelas";

const Dashboard = ({ }) => {
    const { breadcrumbs, mockData } = dashboardViewModel.useDashboardViewModel();

    const { BigChart, Charts, OrderAffiliateChart, TopSalesChart } =
        dashboardViewModel.usePackages();

    const rows = [
        {
            icon: '/media/svg/brand-logos/whatsapp.svg',
            title: 'Kelas Bimbingan EksporYuk',
            subTitle: 'Subtitle 1',
            presentase: 50,
            totalPresentase: 100,
            colorPrecentage: 'primary',
            colorSubtle: 'primary-subtle',
            backgroundColor: 'light-primary',
        },
        {
            icon: '/media/svg/brand-logos/whatsapp.svg',
            title: 'Kelas Bimbingan EksporYuk',
            subTitle: 'Subtitle 2',
            presentase: 75,
            totalPresentase: 100,
            colorPrecentage: 'warning',
            colorSubtle: 'warning-subtle',
            backgroundColor: 'light-warning',
        },
    ];

    const data = [
        {
            width: "min-w-600px",
            rows: [
                {
                    breadcrumb: "Published",
                    topics: 2,
                    lesson: 3,
                    quiz: 4,
                    assignment: 5,
                    value: (
                        <div className="text-dark">
                            <Buttons
                                buttonColor="secondary"
                                classNames="btn-sm fw-bold fs-5 me-5"
                            >
                                <img src="" alt="" />Aa
                            </Buttons>
                        </div>
                    ),
                    jumlahSiswa: 2200
                },
                {
                    breadcrumb: "Published",
                    topics: 4,
                    lesson: 12,
                    quiz: 0,
                    assignment: 0,
                    jumlahSiswa: 2200,
                    value: (
                        <div className="text-dark">
                            <Buttons
                                buttonColor="secondary"
                                classNames="btn-sm fw-bold fs-5 me-5"
                            >
                                <img src="" alt="" />Aa
                            </Buttons>
                        </div>
                    ),
                },
                {
                    breadcrumb: "Published",
                    topics: 4,
                    lesson: 12,
                    quiz: 0,
                    assignment: 0,
                    jumlahSiswa: 2200,
                    value: (
                        <div className="text-dark">
                            <Buttons
                                buttonColor="secondary"
                                classNames="btn-sm fw-bold fs-5 me-5"
                            >
                                <img src="" alt="" />Aa
                            </Buttons>
                        </div>
                    ),
                },
                {
                    breadcrumb: "Private",
                    topics: 4,
                    lesson: 12,
                    quiz: 0,
                    assignment: 0,
                    jumlahSiswa: 2200,
                    value: (
                        <div className="text-dark">
                            <Buttons
                                buttonColor="secondary"
                                classNames="btn-sm fw-bold fs-5 me-5"
                            >
                                <img src="" alt="" />Aa
                            </Buttons>
                        </div>
                    ),
                },
            ],
        },
    ]



    const length = rows.length;
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Dashboard Kelas</PageTitle>
            <div className="gy-5 g-xl-8 mb-10">
                <div className="row d-flex justify-content-between gy-5">
                    <div className="col-xl-4">
                        <div className="shadow-sm rounded">
                            <CardInfo
                                borderType="solid"
                                className="h-100"
                                title="2"
                                titleSize={1}
                                marginBottom={0}
                                icon="abstract-14"
                                description="Enrolled Course"
                                iconColor="secondary"
                                showBorder={true}
                            ></CardInfo>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="shadow-sm rounded">
                            <CardInfo
                                borderType="solid"
                                className="h-100"
                                title="1"
                                titleSize={1}
                                marginBottom={0}
                                icon="bill"
                                description="Active Course"
                                iconColor="secondary"
                                showBorder={true}
                            ></CardInfo>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="shadow-sm rounded">
                            <CardInfo
                                borderType="solid"
                                className="h-100"
                                title="1"
                                titleSize={1}
                                marginBottom={0}
                                icon="notification-circle"
                                iconColor="secondary"
                                showBorder={true}
                                description="Completed Course"
                            ></CardInfo>
                        </div>
                    </div>
                </div>
            </div>

            <KTCard shadow>
                <KTCardBody>
                    <div>
                        <div className="d-flex pt-5 pb-5 justify-content-between">
                            <h3 className="align-items-start flex-column">
                                <p className="fw-bold fs-3 mb-1">
                                    Lanjutkan Progress Belajarmu <br />
                                    <span className="text-muted fs-6">
                                        Lanjutkan progress {length} kelas yang belum kamu selesaikan
                                    </span>
                                </p>
                            </h3>
                            <div className="align-middle ps-20 ms-20">
                                <Buttons mode="normal" buttonColor="secondary" size="small">Lihat Semua</Buttons>
                            </div>
                        </div>
                    </div>
                    <DashboardKelas className="pe-3"
                        rows={rows}
                    />
                </KTCardBody>
            </KTCard>

            <KTCard shadow className="mt-10">
                <KTCardBody>
                    <div className="d-flex pt-5 pb-5 justify-content-between">
                        <h3 className="align-items-start flex-column">
                            <p className="fw-bold fs-3 mb-1">
                                My Courses <br />
                                <span className="text-muted fs-6">
                                    Kelas terpopuler dari 12 kelas yang anda buat
                                </span>
                            </p>
                        </h3>
                        <div className="align-middle ps-20 ms-20">
                            <Buttons mode="normal" buttonColor="secondary" size="small">Lihat Semua</Buttons>
                        </div>
                    </div>
                    <Kelas
                        data={data}
                    />
                </KTCardBody>
            </KTCard>
        </>
    );
};

export default Dashboard;

const AkuisisiTable = ({ data }: AkuisisiTableProps) => {
    return (
        <KTCard className="h-100">
            <KTCardBody>
                <div className="mb-5 ">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Data Akuisisi</span>
                    </h3>
                    <span className="text-muted mt-1 fw-semibold fs-7">
                        per Januari 2024
                    </span>
                </div>
                <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fw-bold text-muted">
                                <th className="min-w-150px">SUMBER TRAFFIC</th>
                                <th>VIEW</th>
                                <th>LEAD</th>
                                <th>SALE</th>
                                <th className="text-end min-w-125px">NILAI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-bold">{row.source}</td>
                                    <td className="fw-bold text-muted">{row.view}</td>
                                    <td className="fw-bold text-muted">{row.lead}</td>
                                    <td className="fw-bold text-muted">{row.sale}</td>
                                    <td className="fw-bold text-muted text-end">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </KTCardBody>
        </KTCard>
    );
};
