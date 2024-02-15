import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useBuyerFormHeaderViewModel, {
    IBuyerFormHeaderViewModel,
} from "./BuyerFormHeader-view-model";
import { useRouter } from "next/router";
import { PageTitle } from "@/_metronic/layout/core";

const BuyerFormHeader = ({ urlType, id, children }: IBuyerFormHeaderViewModel & { children?: React.ReactNode }) => {
    const {
        urls,
        handleFollupChange,
        selectedFollupValue,
        follupValues,
        breadcrumbs,
    } = useBuyerFormHeaderViewModel({ urlType, id });
    const router = useRouter();

    return (
        <div>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Buyer Baru</PageTitle>
            <div>
                <TabLink className="mb-5" links={urls} />
            </div>
            <div className="row gy-5 mb-5">
                {children}
            </div>
        </div>
    );
};

export default BuyerFormHeader;


