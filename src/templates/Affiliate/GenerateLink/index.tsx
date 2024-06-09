import { PageTitle } from "@/_metronic/layout/core";
import useGenerateLinkViewModel, {
    TableProps,
    TableRow,
    tableData
} from "./GenerateLink-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";
import Flatpickr from "react-flatpickr";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

interface GenerateLinkPageProps { }

const GenerateLinkPage = ({ }: GenerateLinkPageProps) => {
    const {
        breadcrumbs, follupValues, selectedFollupValue, setSelecteFollupValue, handleFollupChange
    } = useGenerateLinkViewModel({});
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Generate Link</PageTitle>
            <KTCard>
                <KTCardBody>
                    <div className="mb-10">
                        <Head />
                    </div>
                    {/* <Table data={tableData} /> */}
                    <QueryTableGenerateLink />
                    <Footer />
                </KTCardBody>
            </KTCard>
            <GenerateModal
                follupValues={follupValues}
                selectedFollupValue={selectedFollupValue}
                handleFollupChange={handleFollupChange}
            />
        </>
    );
};

export default GenerateLinkPage;

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

// const Table = ({ data }: TableProps) => {
//     return (
//         <div className="table-responsive mb-10">
//             <table className="table">
//                 <thead>
//                     <tr className='fw-bold uppercase text-gray-500'>
//                         <th className={`rounded-start text-uppercase min-w-500px`}>nama produk<i className="bi bi-arrow-up ms-3"></i><i className="bi bi-arrow-down"></i></th>
//                         <th className='w-200px text-end text-uppercase'>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((row, index) => (
//                         <tr key={index}>
//                             <th className="">
//                                 <div className="d-flex align-items-center">
//                                     <div className="d-flex flex-column">
//                                         <div className="text-gray-500 fw-bold text-start fs-6 mb-0 text-dark">
//                                             {row.value}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </th>
//                             <td>
//                                 <div className="d-flex flex-column w-100 me-2">
//                                     <div className={``}>
//                                         <div className={`text-end fw-bold fs-5 text-gray-500`}>
//                                             {row.breadcrumb}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

const QueryTableGenerateLink = () => {
    const [generateLinkData, setGenerateLinkData] = useState<TableRow[]>([]);

    const GET_GENERATE_LINK = gql`
    query {
  courseFindMany {
    updatedAt
    title
    status
    startDate
    sellingPrice
    prerequisites
    outcome
    objective
    maxEnrollment
    level
    isCertificationProvided
    id
    endDate
    description
    createdById
    basePrice
    createdAt
  }
}`;

// Generate Link Kurang data Untuk Icon dan Button. Button > Mutation buat Push data

    const { loading, error, data } = useQuery(GET_GENERATE_LINK);

    useEffect(() => {
        if (data && data.courseFindMany) {
            const generateLinkData = data.courseFindMany.map((data: any) => ({
                icon: data.icon,
                value: data.title,
                breadcrumb: "Generate Link",
            }));
            setGenerateLinkData(generateLinkData);
        }
    }, [data])

    console.log(`GET_GENERATE_LINK`, data, loading, error);

    return (
        <div className="table-responsive mb-10">
            <table className="table">
                <thead>
                    <tr className='fw-bold uppercase text-gray-500'>
                        <th className={`rounded-start text-uppercase min-w-500px`}>nama produk<i className="bi bi-arrow-up ms-3"></i><i className="bi bi-arrow-down"></i></th>
                        <th className='w-200px text-end text-uppercase'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {generateLinkData.map((user, index) => (
                        <tr key={index}>
                            <th className="">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column">
                                        <div className="text-gray-500 fw-bold text-start fs-6 mb-0 text-dark">
                                            <div className="text-dark">
                                                <Buttons
                                                    buttonColor="secondary"
                                                    classNames="btn-sm fw-bold fs-5 me-5"
                                                >
                                                    <img src="" alt="" />{user.icon}
                                                </Buttons>
                                                {user.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <td>
                                <div className="d-flex flex-column w-100 me-2">
                                    <div className={``}>
                                        <div className={`text-end fw-bold fs-5 text-gray-500`}>
                                            <Buttons mode="light"
                                                data-bs-toggle="modal"
                                                data-bs-target="#kt_generate_modal"
                                            >{user.breadcrumb}</Buttons>
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

const GenerateModal = ({
    follupValues,
    selectedFollupValue,
    handleFollupChange,
}: {
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalClose = () => {
        setModalOpen(false);
    };
    return (
        <div>
            <KTModal
                dataBsTarget="kt_generate_modal"
                fade
                modalSize="lg"
                modalCentered
                title="Generate Link"
                subTitle="Produk: Kelas Bimbingan EksporYuk"
                subTitleColor="gray-500"
                subTitleWeight="bold"
                buttonClose={
                    <Buttons buttonColor='secondary' classNames="text-gray-900 fw-bold" data-bs-dismiss="modal">Tutup</Buttons>
                }
                buttonSubmit={
                    <Buttons classNames="fw-bold">Generate</Buttons>
                }
                onClose={handleModalClose}
                footerContentCentered
            >
                <div>
                    <h4 className="fw-bold text-gray-700">Halaman Penjualan/Sales Landing Page</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="solid"
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
                    <p className="fw-bold fs-6 text-gray-500 mt-1">
                        Link menuju ke halaman landing / sales page
                    </p>
                </div>
                <div>
                    <h4 className="fw-bold text-gray-700">Halaman Checkout</h4>
                    <div className="d-flex">
                        <TextField
                            styleType="solid"
                            size="medium"
                            placeholder="https://member.eksporyuk.com/aff/6267/6068/checkout"
                        />
                        <Buttons
                            buttonColor="secondary"
                            size="small"
                            classNames="ms-5 fw-bold min-w-100px"
                        >
                            Copy URL
                        </Buttons>
                    </div>
                    <p className="fw-bold fs-6 text-gray-500 mt-1">
                        Link menuju ke halaman checkout product
                    </p>
                </div>
                {/* Checkbox */}
                <div>
                    <div className="mt-10 mb-2">
                        <CheckBoxInput
                            className={selectedFollupValue === 'Aktifkan Parameter Akuisisi' ? "active" : ""}
                            name="follup"
                            value={'Aktifkan Parameter Akuisisi'}
                            checked={selectedFollupValue === 'Aktifkan Parameter Akuisisi'}
                            onChange={handleFollupChange}
                        >
                            {`Aktifkan Parameter Akuisisi`}
                            <p className="fw-bold fs-6 text-gray-500 mt-2">
                                Parameter akuisisi data berfungsi jika anda ingin mengetahui asal lead atau pembeli anda
                            </p>
                        </CheckBoxInput>
                    </div>
                    <div className="">
                        <h4 className="fw-bold text-gray-700">
                            Parameter Akuisisi
                        </h4>
                        <div className="d-flex">
                            <div className="w-50 pe-3">
                                <Dropdown
                                    styleType="outline"
                                    props={{ id: "couponName" }}
                                    options={[
                                        { label: "Facebook", value: "akuisisi1" },
                                        { label: "Instagram", value: "akuisisi2" },
                                    ]}
                                    onValueChange={() => { }}
                                />
                            </div>
                            <div className="w-50 ps-3">
                                <TextField
                                    classNames="me-6"
                                    styleType="outline"
                                    size="medium"
                                    placeholder="ID, isi dengan identifikasi apapun"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 mb-2">
                        <CheckBoxInput
                            className={selectedFollupValue === 'Aktifkan Parameter Kupon' ? "active" : ""}
                            name="follup"
                            value={'Aktifkan Parameter Kupon'}
                            checked={selectedFollupValue === 'Aktifkan Parameter Kupon'}
                            onChange={handleFollupChange}
                        >
                            {`Aktifkan Parameter Kupon`}
                            <p className="fw-bold fs-6 text-gray-500 mt-2">
                                Parameter kupon akan otomatis menggunakan kupon yang dipilih pada pembelian produk
                            </p>
                        </CheckBoxInput>
                    </div>
                </div>
                <div>
                    <h4 className="fw-bold text-gray-700">
                        Parameter Kupon
                    </h4>
                    <Dropdown
                        styleType="outline"
                        props={{ id: "couponName" }}
                        options={[
                            { label: "EKSPORYUK", value: "mainCoupon1" },
                            { label: "Kupon Utama 2", value: "mainCoupon2" },
                        ]}
                        onValueChange={() => { }}
                    />
                </div>
            </KTModal>
        </div>


    );
};


