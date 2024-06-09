import { PageTitle } from "@/_metronic/layout/core";
import useDetailNewsViewModel, {
  IDetailNews,
  breadcrumbs,
} from "./DetailNews-view-model";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { useRouter } from "next/router";

const DetailNews = ({ id, data }: IDetailNews) => {
  const router = useRouter();
  const { content, title, type, image } = useDetailNewsViewModel({ id, data });
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail News</PageTitle>
      <div className="row gx-8">
        <Aside thumbnail={image} />
        <div className="col-lg-8">
          <KTCard className="">
            <KTCardBody>
              <h3 className="mb-5">Detail News</h3>
              <h4 className="">Judul</h4>
              <h5 className="my-4 mx-4">{title}</h5>
              <h4 className="mt-5">Tipe</h4>
              <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
                <Buttons classNames="fit-content" buttonColor="secondary">
                  <span>{type}</span>
                </Buttons>
              </div>
              <div className="my-2 mx-4">
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
            <Buttons
              onClick={() => {
                router.push(`/admin/articles/news/edit/${id}`);
              }}
            >
              Edit
            </Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

const Aside = ({ thumbnail }: { thumbnail: any }) => {
  return (
    <div className="col-lg-4">
      <KTCard>
        <KTCardBody className="d-flex flex-column">
          <h3>Thumbnail</h3>

          <input
            type="file"
            // onChange={handleFileChange}
            className="d-none"
            accept=".jpg, .jpeg, .png"
            id="thumbnail-input"
          />
          <label
            className="card shadow align-self-center mt-5"
            style={{
              maxWidth: 150,
            }}
          >
            <div
              className="border-0 px-2 py-1 bg-white shadow position-absolute top-0 end-0 rounded-circle"
              style={{ transform: "translate(50%, -50%)" }}
            ></div>
            <div className="card-body">
              <img
                src={thumbnail ?? "/media/svg/files/blank-image.svg"}
                alt="thumbnail"
                className="img-fluid rounded object-fit-cover"
              />
            </div>
          </label>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

export default DetailNews;
