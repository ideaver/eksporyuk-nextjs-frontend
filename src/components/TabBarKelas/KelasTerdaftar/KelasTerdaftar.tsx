import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useKelasTerdaftarViewModel, {
    IKelasTerdaftarViewModel,
} from "./KelasTerdaftar-view-model";
import { useRouter } from "next/router";
import { PageTitle } from "@/_metronic/layout/core";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { KTCard, KTCardBody } from "@/_metronic/helpers";

const KelasTerdaftar = ({ urlType, id, children }: IKelasTerdaftarViewModel & { children?: React.ReactNode }) => {
    const {
        urls,
        handleFollupChange,
        selectedFollupValue,
        follupValues,
        breadcrumbs,
    } = useKelasTerdaftarViewModel({ urlType, id });
    const router = useRouter();

    return (
        <>
        <PageTitle breadcrumbs={breadcrumbs}>Kelas Terdaftar</PageTitle>
        <TabLink className="mb-5" links={urls} />
        </>
        
    );
};

export default KelasTerdaftar;


