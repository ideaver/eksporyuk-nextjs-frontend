import { PageTitle } from "@/_metronic/layout/core";
import useDetailMaterialViewModel, {
  IDetailMaterialPromotion,
  breadcrumbs,
} from "./DetailMaterialPromotion-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { MaterialPromotionPlatformTypeEnum } from "@/app/service/graphql/gen/graphql";
import Link from "next/link";

const DetailMaterialPromotion = ({ id, data }: IDetailMaterialPromotion) => {
  const router = useRouter();
  const { title, type, urlVIdeo, firstContent, secondContent, image } =
    useDetailMaterialViewModel({ id, data });
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Material Promotion</PageTitle>
      <div className="row gx-8">
        {type !== MaterialPromotionPlatformTypeEnum.Banner ? null : (
          <Aside thumbnail={image} />
        )}
        <div
          className={
            type === MaterialPromotionPlatformTypeEnum.Banner ? "col-lg-8" : ""
          }
        >
          <KTCard className="">
            <KTCardBody>
              <h3 className="mb-5">Detail Material Promotion</h3>
              <h4 className="">Judul</h4>
              <h5 className="my-4 mx-4">{title}</h5>
              <h4 className="mt-5">Tipe</h4>
              <p className="mx-4">{type}</p>
              {type === MaterialPromotionPlatformTypeEnum.Banner ? null : (
                <>
                  <h4 className="mt-5">URL Video</h4>
                  <p>{urlVIdeo}</p>
                </>
              )}

              <h4 className="mt-5">Konten Pertama</h4>
              <div className="my-2 mx-2">
                <div
                  dangerouslySetInnerHTML={{ __html: firstContent as string }}
                />
              </div>
              <h4 className="mt-5">Konten Kedua</h4>

              <div className="my-2 mx-2">
                <div
                  dangerouslySetInnerHTML={{ __html: secondContent as string }}
                />
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
            <Link
              className="btn btn-primary"
              href={"/admin/articles/material-promotion/edit/" + id}
            >
              Edit
            </Link>
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
                src={thumbnail?.path ?? "/media/svg/files/blank-image.svg"}
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

export default DetailMaterialPromotion;
