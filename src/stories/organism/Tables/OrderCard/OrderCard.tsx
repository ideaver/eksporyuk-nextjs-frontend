import { KTIcon } from "@/_metronic/helpers";

interface Row {
    icon: string;
    title: string;
    value: string | JSX.Element;
}

interface Table {
    title: string;
    rows: Row[];
}

type OrderDetailsProps = {
    className?: string;
    title?: string;
    data: Table[];
};

export const OrderCard: React.FC<OrderDetailsProps> = ({ className, data }) => {
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
                            <div className="table-responsive">
                                {/* begin::Table */}
                                <table className="table align-middle gs-0 gy-5">
                                    {/* begin::Table body */}
                                    <tbody>
                                        {table.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <th className="">
                                                    <div className="d-flex align-items-center mt-2">
                                                        <KTIcon
                                                            iconName={row.icon}
                                                            className="fs-2hx me-3"
                                                        ></KTIcon>
                                                        <div className="d-flex flex-column">
                                                            <p className="text-muted fw-bold text-start fs-6 mb-0">
                                                                {row.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className={``}>
                                                            <div className={`text-end fw-bold fs-5 `}>
                                                                {row.value}
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