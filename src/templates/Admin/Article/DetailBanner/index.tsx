import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { Badge } from "@/stories/atoms/Badge/Badge";
import useDetailBannerViewModel, {
  breadcrumbs,
  IDetailBanner,
} from "./DetailBanner-view-model";

const DetailBanner = ({ id, data }: IDetailBanner) => {
  const { content, title, target, image, isPublished } =
    useDetailBannerViewModel({
      id,
      data,
    });
  const router = useRouter();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Banner</PageTitle>
      <div className="row gx-8">
        <Aside status={isPublished} category={target ?? []} thumbnail={image} />
        <div className="col-lg-8">
          <KTCard className="">
            <KTCardBody>
              <h3 className="mb-5">Detail Banner</h3>
              <h4 className="">Judul Banner</h4>
              <h5 className="my-4 mx-4">{title}</h5>
              <h4 className="mt-5">Target Banner</h4>
              <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
                {target?.map((e, index) => (
                  <Buttons
                    key={index}
                    classNames="fit-content"
                    buttonColor="secondary"
                  >
                    <span>{e}</span>
                  </Buttons>
                ))}
              </div>
              <h4 className="mt-5">Konten Banner</h4>
              <div className="my-2 mx-4">
                <div dangerouslySetInnerHTML={{ __html: content as string }} />
              </div>
            </KTCardBody>
          </KTCard>
          <div className="d-flex flex-end mt-6 gap-4">
            <Buttons
              buttonColor="secondary"
              onClick={() => {
                router.push("/admin/articles");
              }}
            >
              Kembali
            </Buttons>
            <Buttons
              onClick={() => {
                router.push(`/admin/articles/banner/edit/${id}`);
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

const Aside = ({
  status,
  category,
  thumbnail,
}: {
  thumbnail: string | undefined;
  status: boolean | undefined;
  category: string[];
}) => {
  return (
    <div className="col-lg-4">
      <KTCard>
        <KTCardBody className="d-flex flex-column">
          <h3>Banner</h3>

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

      <KTCard className="mt-5">
        <KTCardBody className="d-flex flex-column">
          <h3 className="mb-5">Status</h3>
          <div className="d-flex justify-content-center">
            {status ? (
              <Badge
                label="Published"
                classNames="fs-4 px-8 py-2 "
                size="large"
                badgeColor="success"
              />
            ) : (
              <Badge
                label="Private"
                classNames="fs-4 px-8 py-2"
                size="large"
                badgeColor="danger"
              />
            )}
          </div>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

export default DetailBanner;
