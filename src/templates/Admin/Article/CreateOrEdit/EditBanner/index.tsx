import { ChangeEvent, SetStateAction, useMemo } from "react";
import useEditBannerViewModel, {
  breadcrumbs,
  IEditBanner,
} from "./EditBanner-view-model";
import dynamic from "next/dynamic";
import { PageTitle } from "@/_metronic/layout/core";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { UserRoleEnum } from "@/app/service/graphql/gen/graphql";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";

const EditBanner = ({ id, data }: IEditBanner) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const router = useRouter();

  const {
    content,
    handleBannerUpdateOne,
    handleUpdateFile,
    image,
    isLoading,
    setContent,
    setStatus,
    setTarget,
    setTitle,
    status,
    target,
    title,
  } = useEditBannerViewModel({ id, data });

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Banner</PageTitle>
      <LoadingOverlayWrapper
        active={isLoading}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(255, 255, 255, 0.8)",
          }),
          spinner: (base) => ({
            ...base,
            width: "100px",
            "& svg circle": {
              stroke: "rgba(3, 0, 0, 1)",
            },
          }),
        }}
        spinner
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleBannerUpdateOne();
          }}
        >
          <div className="row gx-8">
            <Aside
              handleFileChange={handleUpdateFile}
              setStatus={(val) => setStatus(val)}
              status={status}
              thumbnail={image}
            />
            <div className="col-lg-8">
              <KTCard className="">
                <KTCardBody>
                  <h3 className="mb-5">Tulis Banner</h3>

                  <h5 className="required">Judul</h5>
                  <TextField
                    placeholder="Masukan judul"
                    props={{
                      value: title,
                      onChange: (e: any) => {
                        setTitle(e.target.value);
                      },
                    }}
                  />
                  <h5 className="text-muted mt-3">Masukan judul</h5>

                  <h5 className=" mt-5">Target Banner</h5>
                  <div className="d-flex flex-wrap gap-1 mx-2 mb-2">
                    {target?.map((e, index) => (
                      <Buttons
                        key={index}
                        classNames="fit-content"
                        icon="cross"
                        buttonColor="secondary"
                        showIcon
                        onClick={() => {
                          setTarget((prev) => prev?.filter((val) => val != e));
                        }}
                      >
                        <span>{e}</span>
                      </Buttons>
                    ))}
                  </div>
                  <Dropdown
                    options={[
                      {
                        value: UserRoleEnum.Student,
                        label: "Student",
                      },
                      {
                        value: UserRoleEnum.Affiliator,
                        label: "Affiliator",
                      },
                      {
                        value: UserRoleEnum.Mentor,
                        label: "Mentor",
                      },
                      {
                        value: UserRoleEnum.Customer,
                        label: "Customer",
                      },
                    ]}
                    onValueChange={(val) => {
                      setTarget((prev) => [
                        ...(prev ?? []),
                        val as UserRoleEnum,
                      ]);
                    }}
                  />

                  <h5 className=" mt-5">Konten</h5>
                  <div
                    style={{
                      height: "220px",
                      resize: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    <ReactQuill
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          [
                            "link",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["clean"],
                        ],
                      }}
                      theme="snow"
                      value={content}
                      style={{ height: "100%" }}
                      onChange={(e) => {
                        setContent(e);
                      }}
                    />
                  </div>

                  <h5 className="text-muted mt-3">Masukan konten</h5>
                </KTCardBody>
              </KTCard>

              <div className="d-flex flex-end mt-6 gap-4">
                <Buttons
                  buttonColor="secondary"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Batal
                </Buttons>
                <Buttons type="submit">Simpan</Buttons>
              </div>
            </div>
          </div>
        </form>
      </LoadingOverlayWrapper>
    </>
  );
};

const Aside = ({
  thumbnail,
  status,
  setStatus,
  handleFileChange,
}: {
  thumbnail: any;
  status: string;
  setStatus: (value: string) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="col-lg-4">
      <KTCard>
        <KTCardBody className="d-flex flex-column">
          <h3>Thumbnail</h3>

          <input
            type="file"
            onChange={handleFileChange}
            className="d-none"
            accept=".jpg, .jpeg, .png"
            id="thumbnail-input"
          />
          <label
            htmlFor="thumbnail-input"
            className="card shadow align-self-center mt-5"
            style={{
              maxWidth: 150,
            }}
          >
            <div
              className="border-0 px-2 py-1 bg-white shadow position-absolute top-0 end-0 rounded-circle"
              style={{ transform: "translate(50%, -50%)" }}
            >
              <KTIcon iconName="pencil" />
            </div>
            <div className="card-body">
              <img
                src={thumbnail ?? "/media/svg/files/blank-image.svg"}
                alt=""
                className="img-fluid rounded object-fit-cover"
              />
            </div>
          </label>
          <p className="text-muted fw-bold text-center mt-5">
            Format gambar yang diterima adalah .jpg, .jpeg dan .png
          </p>
        </KTCardBody>
      </KTCard>
      <KTCard className="mt-5">
        <KTCardBody className="d-flex flex-column">
          <h3 className="mb-5">Status</h3>
          <Dropdown
            options={[
              { value: "published", label: "Published" },
              { value: "private", label: "Private" },
            ]}
            value={status}
            onValueChange={(value) => {
              setStatus(value as string);
            }}
          ></Dropdown>
          <p className="text-muted fw-bold mt-5">Atur Status</p>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

export default EditBanner;
