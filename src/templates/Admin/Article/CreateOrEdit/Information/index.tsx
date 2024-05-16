import { PageTitle } from "@/_metronic/layout/core";
import useInformationViewModel, { breadcrumbs } from "./Information-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";

const InformationPage = () => {
  const router = useRouter();
  const {
    thumbnail,
    handleFileChange,
    handleStatusChange,
    status,
    inputContent,
    setInputContent,
    inputTitle,
    setInputTitle,
    inputUrlVideo,
    setInputUrlVideo,
    category,
    handleCategoryChange,
    typeOption,
  } = useInformationViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Artikel</PageTitle>
      <div className="row gx-8">
        <Aside
          typeOption={typeOption}
          category={category}
          handleCategoryChange={handleCategoryChange}
          thumbnail={thumbnail}
          handleFileChange={handleFileChange}
          handleStatusChange={handleStatusChange}
          status={status}
        />
        <div className="col-lg-8">
          <KTCard className="">
            <KTCardBody>
              <h3 className="mb-5">Tulis Artikel</h3>
              <h5 className="required">Judul Artikel</h5>
              <TextField
                placeholder="Masukan judul artikel"
                props={{
                  value: inputTitle,
                  onChange: setInputTitle,
                }}
              />
              <h5 className="text-muted mt-3">Masukan judul artikel</h5>
              <h5 className="mt-5">URL Video</h5>
              <TextField
                placeholder="Masukan URL video"
                props={{
                  value: inputUrlVideo,
                  onChange: setInputUrlVideo,
                }}
              />
              <h5 className="text-muted mt-3">
                Masukan URL video jika diperlukan
              </h5>
              <h5 className="required mt-5">Konten Artikel</h5>
              <Textarea
                placeholder="Masukan konten artikel yang ingin anda bagikan"
                classNames="min-h-250px"
                props={{
                  value: inputContent,
                  onChange: setInputContent,
                }}
              />
              <h5 className="text-muted mt-3">Masukan konten artikel</h5>
            </KTCardBody>
          </KTCard>
          <div className="d-flex flex-end mt-6 gap-4">
            <Buttons
              buttonColor="secondary"
              onClick={() => {
                router.push("/admin/articles");
              }}
            >
              Batal
            </Buttons>
            <Buttons>Simpan</Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

interface TypeOption {
  value: string;
  label: string;
}

const Aside = ({
  thumbnail,
  status,
  category,
  handleCategoryChange,
  handleFileChange,
  handleStatusChange,
  typeOption,
}: {
  typeOption: TypeOption[];
  thumbnail: string;
  status: string;
  category: string;
  handleCategoryChange: (e: string) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (e: string) => void;
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
                src={thumbnail}
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
          <h3 className="mb-5">Kategori</h3>
          <Dropdown
            options={typeOption}
            value={category}
            onValueChange={(value) => handleCategoryChange(value as string)}
          ></Dropdown>
          <p className="text-muted fw-bold mt-5">Atur Kategori</p>
          <Buttons
            showIcon={true}
            mode="light"
            classNames="mt-5 text-start"
            onClick={() => {
              //   setIsEdit(false)
              //   setShowModal(true);
            }}
          >
            Tambah Kategori
          </Buttons>
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
            onValueChange={(value) => handleStatusChange(value as string)}
          ></Dropdown>
          <p className="text-muted fw-bold mt-5">Atur Status</p>
        </KTCardBody>
      </KTCard>
    </div>
  );
};

export default InformationPage;
