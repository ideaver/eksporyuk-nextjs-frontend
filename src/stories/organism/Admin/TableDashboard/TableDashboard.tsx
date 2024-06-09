import { KTIcon, toAbsoluteUrl } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CardInfo } from "@/stories/molecules/Cards/CardInfo/CardInfo";

interface Row {
    icon?: string;
    titleRow?: string;
    subTitleRow?: string;
    price?: number;
}

interface Table {
    iconTable: string | JSX.Element;
    title: string;
    rows: Row[];
}

type TableDashboardProps = {
    className?: string;
    data: Table[];
};

export const TableDashboard: React.FC<TableDashboardProps> = ({ className, data }) => {
    const formatToRupiah = (value: number) => {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        });
    };
    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className="card-body d-flex flex-column p-0">
                {/* begin::Stats */}
                {data.map((table, index) => (
                    <div key={index}>
                        <div className='d-flex justify-content-between align-middle border-0 pt-5'>
                            <h3 className='card-title'>
                                {table.title}
                            </h3>

                            <div className='card-toolbar mb-6'>
                                {/* begin::Menu */}
                                    {table.iconTable}
                            </div>
                        </div>
                        <div className="d-flex border-0 pt-5">
                            <CardInfo title="Komisi" icon="abstract-14" showBorder className="text-center py-0 me-10 " borderType="solid" />
                            <CardInfo title="Komisi" icon="abstract-14" showBorder className="text-center py-0" />
                        </div>
                        {/* end::Header */}
                            {/* begin::Table container */}
                            <KTTable className="table mt-4"
                                dashed
                                rounded
                                color="gray-600"
                                utilityGY={3}
                            >
                                {/* begin::Table body */}
                                <KTTableHead
                                    className=""
                                    fontWeight="bold"
                                    textColor="muted">
                                    <th className='min-w-300px rounded-start text-uppercase'>nama</th>
                                    <th className='min-w-300px text-end text-uppercase'>NOMINAL YANG HARUS DIBAYARKAN</th>
                                </KTTableHead>
                                {table.rows.map((row, rowIndex) => (
                                    <KTTableBody className=""
                                        border="bottom-2"
                                        color="gray-600"
                                        key={rowIndex}>
                                            <td className="border-bottom-2">
                                                <div className="d-flex align-items-start">
                                                    <div className='symbol symbol-45px me-5'>
                                                        <img src={toAbsoluteUrl(`${row.icon}`)} alt='' />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-dark">{row.titleRow}</h3>
                                                        <span className="text-muted fw-bold">{row.subTitleRow}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-end text-dark fs-4 fw-bold align-middle">
                                                {formatToRupiah(Number(row.price))}
                                            </td>
                                    </KTTableBody>
                                ))}
                            </KTTable>
                        {/* end::Stats */}
                    </div>
                ))}
            </div>
            {/* end::Body */}
        </div>
    );
};