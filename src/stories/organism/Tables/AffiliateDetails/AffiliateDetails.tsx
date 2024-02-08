/* eslint-disable jsx-a11y/anchor-is-valid */



type AffiliateDetailsProps = {
    className: string;
    title?: string
    emailUser?: string
    nameUser?: string
    teleponUser?: string
    kuponUser?: string
};

const AffiliateDetails: React.FC<AffiliateDetailsProps> = ({
    className = "w-100",
    title = "Detail Affiliasi",
    emailUser = 'dwirahma@gmail.com',
    nameUser = 'Dwi Rahma',
    teleponUser = '+6141 234 567',
    kuponUser = 'AYOEKSPOR'
}) => {
    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className="card-body d-flex flex-column p-0">
                {/* begin::Stats */}
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">{title}</span>
                    </h3>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className="card-body py-3">
                    {/* begin::Table container */}
                    <div className="table-responsive">
                        {/* begin::Table */}
                        <table className="table align-middle gs-0 gy-5">
                            {/* begin::Table head */}
                            <thead>
                                <tr>
                                    <th className="p-0 min-w-50px"></th>
                                    <th className="p-0 min-w-100px"></th>
                                </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/profil.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Nama
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-between w-100 me-2 text-end">
                                            <div className="max-w-50">
                                                <img src="/media/svg/card-logos/profil-affiliasi.svg" alt="" />
                                            </div>
                                            <div className="d-flex justify-content-end max-w-50">
                                                <div className={`text-end fw-bold max-w-50 fs-5 text-muted ms-1`}>
                                                    {nameUser}
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/email.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Email
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold fs-5 text-muted `}>
                                                    {emailUser}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/telepon.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    No. Telepon
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold text-muted fs-5 `}>
                                                    {teleponUser}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="symbol symbol-30px me-2">
                                                <img
                                                    src={'/media/svg/card-logos/kupon.svg'}
                                                    className=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="text-muted fw-bold text-hover-primary text-start fs-6 mb-0">
                                                    Kupon
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="d-flex flex-column w-100 me-2">
                                            <div className={``}>
                                                <div className={`text-end fw-bold text-muted fs-5 `}>
                                                    {kuponUser}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            {/* end::Table body */}
                        </table>
                        {/* end::Table */}
                    </div>
                    {/* end::Table container */}
                </div>
                {/* end::Stats */}
            </div>
            {/* end::Body */}
        </div>
    );
};


export { AffiliateDetails };
