/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import {
  CompletionStatusEnum,
  StudentFindOneQuery,
} from "@/app/service/graphql/gen/graphql";
import { CardInfo } from "@/stories/molecules/Cards/CardInfo/CardInfo";
import { ColorList } from "@/types/general/utilities";

const CoursePage = ({
  data,
}: {
  data: StudentFindOneQuery["studentFindOne"];
}) => {
  return (
    <>
      <div className="row">
        <div className="col gy-5 gy-lg-0">
          <CardInfo
            borderWidth="0"
            description="Enrolled Course"
            icon="book-open"
            showBorder
            title={data?.enrollments?.length.toString() ?? "0"}
          />
        </div>
        <div className="col gy-5 gy-lg-0">
          <CardInfo
            borderWidth="0"
            description="Active Course"
            icon="bookmark"
            showBorder
            title={
              data?.enrollments
                ?.filter(
                  (e) => e.completionStatus != CompletionStatusEnum.Completed
                )
                .length.toString() ?? "0"
            }
          />
        </div>
        <div className="col gy-5 gy-lg-0">
          <CardInfo
            borderWidth="0"
            description="Completed Course"
            icon="brifecase-tick"
            showBorder
            title={
              data?.enrollments
                ?.filter(
                  (e) => e.completionStatus == CompletionStatusEnum.Completed
                )
                .length.toString() ?? "0"
            }
          />
        </div>
      </div>
      <KTCard className=" mt-5">
        <KTCardBody>
          <div className="d-flex justify-content-between">
            <h3>Progress Belajar Siswa</h3>
            {/* <button className="btn btn-secondary">Lihat Semua</button> */}
          </div>
          <div className="mt-5">
            <div className="col">
              {data?.enrollments?.map((enrollment, index) => {
                const courseProgress = enrollment.lessonProgresses?.filter((lp) => lp.isCompleted === true).length
                const courseTotal = enrollment.lessonProgresses?.length
                const progress = Math.round(((courseProgress ?? 0) / (courseTotal ?? 0)) * 100)
                return (
                  <ProgressCard
                    key={index}
                    img="/media/illustrations/sketchy-1/17.png"
                    progress={progress}
                    title="Kelas Bimbingan EksporYuk"
                    subtitle={
                      <>
                        {" "}
                        Sudah menyelesaikan{" "}
                        <span className="text-black fw-bold">{courseProgress}</span> dari{" "}
                        <span className="text-black fw-bold">{courseTotal}</span> Kelas
                      </>
                    }
                  />
                );
              })}
              {/* Might be used later */}
              {/* <div className="mt-5">
          <ProgressCard
                img="/media/illustrations/sketchy-1/15.png"
                progress={15}
                title="Ekspor Yuk Automation"
                color="warning"
                subtitle={
                  <>
                    {" "}
                    Sudah menyelesaikan{" "}
                    <span className="text-black fw-bold">15</span> dari{" "}
                    <span className="text-black fw-bold">100</span> Materi
                  </>
                }
              />
          </div> */}
            </div>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
};

interface IProgressCard {
  img: string;
  title: string;
  subtitle: JSX.Element;
  progress: number;
  color?: ColorList;
}
const ProgressCard = ({
  img,
  title,
  subtitle,
  progress,
  color = "primary",
}: IProgressCard) => {
  return (
    <div className="row">
      <div className="col-lg-2 gy-5 gy-lg-0 align-self-center">
        <img
          className=""
          src={img}
          width={157}
          style={{
            height: "100%",
          }}
          alt=""
        />
      </div>
      <div className="col-lg-10 gy-5 gy-lg-0 ">
        <div className={`card bg-light-${color} card-xl-stretch`}>
          <div className="card-body my-3">
            <h5
              className={`card-title fw-bold text-${color} fs-5 mb-3 d-block`}
            >
              {title}
            </h5>
            <div className="py-1">
              <span className="text-gray-900 fs-1 fw-bold me-2">
                {progress}%
              </span>
              <span className="fw-semibold text-muted fs-7">{subtitle}</span>
            </div>
            <div className={`progress h-7px bg-${color} bg-opacity-50 mt-7`}>
              <div
                className={`progress-bar bg-${color}`}
                role="progressbar"
                style={{
                  width: `${progress + "%"}`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
