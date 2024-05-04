import { KTIcon } from "@/_metronic/helpers";
import { Badge } from "@/stories/atoms/Badge/Badge";

interface Row {
    icon?: string;
    breadcrumb?: string;
    value?: string | JSX.Element;
    jumlahSiswa?: number
    topics?: number
    lesson?: number
    quiz?: number
    assignment?: number
}

interface Table {
    title?: string;
    id?: string;
    width?: string;
    rows: Row[];
}

type KelasProps = {
    className?: string;
    data: Table[];
};

export const Kelas: React.FC<KelasProps> = ({ className, data }) => {
    const formatToRupiah = (value: number) => {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        });
    };
    function formatNumber(value: number) {
        return value.toLocaleString('id-ID');
    }

    return (
        <div className={`${className}`}>
                {data.map((table, index) => (
                    <div key={index}>
                        {/* begin::Body */}
                        <div className="py-3">
                            <div className="table-responsive">
                                <table className="table gy-3">
                                    <thead>
                                        <tr className='fw-bold uppercase text-muted'>
                                            <th className={`rounded-start text-uppercase ${table.width}`}>Nama Course</th>
                                            <th className='min-w-200px text-end text-uppercase'>Jumlah Siswa</th>
                                            <th className='w-100px text-end text-uppercase'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="w-100">
                                                <th className="">
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex flex-column">
                                                            <div className="d-flex text-dark fw-bold text-start fs-6 mb-0 text-dark">
                                                                {row.value}
                                                                <div>
                                                                    Kelas Bimbingan Ekspor Yuk <br />
                                                                    <span className="fs-6 text-gray-500">
                                                                        {row.topics} Topic, {row.lesson} Lesson, {row.quiz} Quiz, {row.assignment} Assignment
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className={``}>
                                                            <div className={`text-end fw-bold fs-5 text-muted`}>
                                                                {formatNumber(Number(row.jumlahSiswa))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className={``}>
                                                            <div className={`text-end fw-bold fs-5 text-muted`}>
                                                                <Badge
                                                                    badgeColor={row.breadcrumb === 'Published' ? 'success' : 'danger'}
                                                                    label={row.breadcrumb || 'Published'}
                                                                    classNames="p-4"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                    {/* end::Table body */}
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};