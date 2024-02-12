import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useAdminHeaderViewModel, {
    IAdminHeaderViewModel,
} from "./AdminHeader-view-model";
import { useRouter } from "next/router";
import { PageTitle } from "@/_metronic/layout/core";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { KTCard, KTCardBody } from "@/_metronic/helpers";

const AdminHeader = ({ urlType, id, children }: IAdminHeaderViewModel & { children?: React.ReactNode }) => {
    const {
        urls,
        handleFollupChange,
        selectedFollupValue,
        follupValues,
        breadcrumbs,
    } = useAdminHeaderViewModel({ urlType, id });
    const router = useRouter();

    return (
        <div>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Kupon Baru</PageTitle>
            <div className="row">
                <div className="col-3">
                    <KTCard>
                        <KTCardBody>
                            <h2 className="fw-bold text-gray-700 pb-4">
                                Status
                            </h2>
                            <div className="d-flex">
                                <Dropdown
                                    styleType="outline"
                                    props={{ id: "couponName" }}
                                    options={[
                                        { label: "Aktif", value: "status1" },
                                        { label: "Non-Aktif", value: "status2" },
                                    ]}
                                    onValueChange={() => { }}
                                />
                            </div>
                            <p className="fw-bold fs-5 text-muted pt-2">
                                Atur Status
                            </p>
                        </KTCardBody>
                    </KTCard>
                </div>
                <div className="col-9">
                    <div>
                        <TabLink className="mb-5" links={urls} />
                    </div>
                    <div className="row gy-5 mb-5">
                        {children} 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;


