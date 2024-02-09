import { KTIcon } from "@/_metronic/helpers";

interface Row {
    icon?: string;
    breadcrumb?: string | JSX.Element;
    value?: string | JSX.Element;
}

interface Table {
    title?: string;
    id?: string;
    width?: string;
    rows: Row[];
}

type PixelTableProps = {
    className?: string;
    data: Table[];
};

export const PixelTable: React.FC<PixelTableProps> = ({ className, data }) => {
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
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">
                                    {table.title} {table.id}
                                </span>
                            </h3>
                        </div>
                        {/* end::Header */}
                        {/* begin::Body */}
                        <div className="card-body py-3">
                            {/* begin::Table container */}
                            <div className="table-responsive">
                                {/* begin::Table */}
                                <table className="table align-middle gs-0 gy-5">
                                    {/* begin::Table body */}
                                    <thead>
                                        <tr className='fw-bold uppercase text-muted'>
                                            <th className={`rounded-start text-uppercase ${table.width}`}>nama produk<i className="bi bi-arrow-up ms-3"></i><i className="bi bi-arrow-down"></i></th>
                                            <th className='w-100px text-end text-uppercase'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <th className="">
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex flex-column">
                                                            <p className="text-muted fw-bold text-start fs-6 mb-0 text-dark">
                                                                {row.value}
                                                            </p>
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
                                    {/* end::Table body */}
                                </table>
                                {/* end::Table */}
                            </div>
                            {/* end::Table container */}
                        </div>
                        {/* end::Stats */}
                    </div>
                ))}
            </div>
            {/* end::Body */}
        </div>
    );
};