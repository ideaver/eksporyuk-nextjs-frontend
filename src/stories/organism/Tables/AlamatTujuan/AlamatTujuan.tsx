import { KTIcon } from "@/_metronic/helpers";

interface Row {
    icon: string;
    title: string | JSX.Element;
}

interface Table {
    title: string | JSX.Element;
    rows: Row[];
}

type OrderDetailsProps = {
    className?: string;
    title?: string;
    data: Table[];
};

export const AlamatTujuan: React.FC<OrderDetailsProps> = ({ className, data }) => {
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
                                    {table.title}
                                </span>
                            </h3>
                        </div>
                        {/* end::Header */}
                        {/* begin::Body */}
                        <div className="card-body py-3">
                            {/* begin::Table container */}
                            <div className="px-20">
                                {/* begin::Table */}
                                    {table.rows.map((row, rowIndex) => (
                                        <div key={rowIndex}>
                                            {row.title}
                                        </div>
                                    ))}
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