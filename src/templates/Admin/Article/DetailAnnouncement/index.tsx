import { PageTitle } from "@/_metronic/layout/core";
import useDetailAnnouncement, {
  IDetailAnnouncement,
} from "./DetailAnnouncement-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import { useRouter } from "next/router";

const DetailAnnouncement = ({ id, data }: IDetailAnnouncement) => {
  const router = useRouter();
  const { content, title, type, course } = useDetailAnnouncement({ id, data });
  return (
    <>
      <PageTitle>Detail Announcement</PageTitle>
      <KTCard className="">
        <KTCardBody>
          <h3 className="mb-5">Detail Announcement</h3>
          <h4 className="">Judul Announcement</h4>
          <p className="fs-5">{title}</p>
          <h4 className="">Judul Announcement</h4>
          <div className="d-flex mt-5">
            <div className="w-100">
              <TextField
                props={{
                  disabled: true,
                  value: type,
                }}
              ></TextField>
            </div>
          </div>
          <h4 className="mt-5">Target Announcement</h4>
          <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
            {course ? (
              <div className="d-flex mt-5">
                <div className="w-100">
                  <TextField
                    props={{
                      disabled: true,
                      value: course.title,
                    }}
                  ></TextField>
                </div>
              </div>
            ) : (
              "Tidak Ada Course"
            )}
          </div>
          <h4 className="mt-5">Konten Announcement</h4>
          <div className="my-2 mx-4 fs-5">
            <div dangerouslySetInnerHTML={{ __html: content as string }} />
          </div>
        </KTCardBody>
      </KTCard>
      <div className="d-flex flex-end mt-6 gap-4">
        <Buttons
          buttonColor="secondary"
          onClick={() => {
            router.back();
          }}
        >
          Kembali
        </Buttons>
        <Link
          className="btn btn-primary"
          href={`/admin/articles/announcement/edit/${id}`}
        >
          Edit
        </Link>
      </div>
    </>
  );
};

export default DetailAnnouncement;
