import { PageTitle } from "@/_metronic/layout/core";
import useDetailArticleViewModel, {
  IDetailArticle,
  breadcrumbs,
} from "./DetailArticle-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";

const DetailArticle = ({ id, data }: IDetailArticle) => {
  const { thumbnail, content, title, status, category, target } =
    useDetailArticleViewModel({
      id,
      data,
    });
  const router = useRouter();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Artikel</PageTitle>
      <div className="row gx-8">
        <Aside
          status={status}
          category={category ?? [{ value: 0, label: "none" }]}
          thumbnail={thumbnail}
        />
        <div className="col-lg-8">
          <KTCard className="">
            <KTCardBody>
              <h3 className="mb-5">Detail Artikel</h3>
              <h4 className="">Judul Artikel</h4>
              <h5 className="my-4 mx-4">{title}</h5>
              <h4 className="mt-5">Target Artikel</h4>
              <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
                {target?.map((e: any, index) => (
                  <Buttons
                    key={index}
                    classNames="fit-content"
                    buttonColor="secondary"
                  >
                    <span>{e}</span>
                  </Buttons>
                ))}
              </div>
              <h4 className="mt-5">Konten Artikel</h4>
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
                router.push(`/admin/articles/edit/${id}`);
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
  thumbnail:
    | {
        __typename?: "File" | undefined;
        path: string;
      }
    | undefined;
  status: boolean | undefined;
  category: { value: any; label: any }[];
}) => {
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
      <KTCard className="mt-5">
        <KTCardBody className="d-flex flex-column">
          <h3 className="mb-5">Kategori</h3>
          <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
            {category?.map((e: any, index) => (
              <Buttons
                key={e.value + index}
                classNames="fit-content"
                // icon="cross"
                buttonColor="secondary"
                // showIcon
                // onClick={() => {
                //   handleCategoryChange(
                //     category.filter((v) => v.value !== e.value)
                //   );
                // }}
              >
                <span>{e?.label}</span>
              </Buttons>
            ))}
          </div>

          {/* <Dropdown
                options={typeOption}
                value={category}
                onValueChange={(value) => handleCategoryChange(value as string)}
              ></Dropdown> */}
          <p className="text-muted fw-bold mt-5">Semua Kategori</p>
          {/* <Buttons
            showIcon={true}
            mode="light"
            data-bs-toggle="modal"
            data-bs-target="#kt_add_category_modal"
            classNames="mt-5 text-start"
          >
            Tambah Kategori
          </Buttons> */}
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

export default DetailArticle;
