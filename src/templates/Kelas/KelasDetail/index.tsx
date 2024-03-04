import { PageTitle } from "@/_metronic/layout/core";
import useKelasDetailViewModel, { HeadProps, SideInstructorProps, SideProps, courseDetailData, dataCardInfo, instructorData, progressData } from "./DetailKelas-view-model";
import { Instructor } from "@/stories/organism/Kelas/KelasTerdaftar/Instructor/Instructor";
import { CourseProgress } from "@/stories/organism/Kelas/KelasTerdaftar/CourseProgress/CourseProgress";
import { CourseInfoMain } from "@/stories/organism/Kelas/KelasTerdaftar/CourseInfoMain/CourseInfoMain";
import { CourseDetail } from "@/stories/organism/Kelas/KelasTerdaftar/CourseDetail/CourseDetail";

interface KelasDetailPageProps { }

const KelasDetailPage = ({ }: KelasDetailPageProps) => {
    const {
        breadcrumbs,
        selectedFollupValue,
        handleFollupChange,
    } = useKelasDetailViewModel();
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Kelas Detail</PageTitle>

            <div className="row row-cols-1 row-cols-md-3 g-8">
                <div className="col-xl-8">
                    <Main dataCardInfo={dataCardInfo[0]} />
                </div>
                <div className="col-xl-4">
                    <Side progressData={progressData[0]} />
                    <SideSecond instructorData={instructorData} />
                </div>
            </div>
        </>
    );
};

export default KelasDetailPage;

const Main = ({ dataCardInfo }: HeadProps) => {
    return (
        <>
            <CourseInfoMain
                {...dataCardInfo}
            />
        </>
    );
};

const Side = ({ progressData }: SideProps) => {
    return (
        <>
            <CourseProgress {...progressData} />
        </>
    );
};

const SideSecond = ({ instructorData }: SideInstructorProps) => {
    return (
        <>
            <Instructor {...instructorData} />
            <div className="py-2"></div>
            <CourseDetail {...courseDetailData} />
        </>
    );
};

