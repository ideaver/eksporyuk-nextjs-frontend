import { PageTitle } from "@/_metronic/layout/core";
import useCreateDocumentViewModel, { breadcrumbs } from "./Document-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { ChangeEvent, useMemo } from "react";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import SweetAlert2 from "react-sweetalert2";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useRouter } from "next/router";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import {
  CompanyDocumentTypeEnum,
  TermOrFaqTypeEnum,
} from "@/app/service/graphql/gen/graphql";

const CreateDocument = () => {
  const router = useRouter();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const {
    filePDF,
    filePDFPreview,
    handleFileChange,
    swalProps,
    setSwalProps,
    handleSOPFileCreateOne,
    content,
    setContent,
    isLoading,
    handleEksporFileCreateOne,
    filePDFEkspor,
    filePDFPreviewEkspor,
    handleFileChangeEkspor,
    titleEkspor,
    setTitleEkspor,
    titleSOP,
    setTitleSOP,
    titleCommodity,
    setTitleCommodity,
    handleFileChangeCommodity,
    filePDFPreviewCommodity,
    filePDFCommodity,
    descriptionCommodity,
    setDescriptionCommodity,
    instructionCommodity,
    setInstructionCommodity,
    handleCommodityCreateOne,
    titleTermOrFaq,
    setTitleTermOrFaq,
    contentTermOrFaq,
    setContentTermOrFaq,
    termOrFaqType,
    setTermOrFaqType,
    handleTermOrFaqCreteOne,
    documentEksporType,
    setDocumentEksporType,
    descriptionEkspor,
    setDescriptionEkspor,
    instructionEkspor,
    setInstructionEkspor,
    mainFunction,
    setMainFunction,
  } = useCreateDocumentViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Dokumen</PageTitle>
      <LoadingOverlayWrapper
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
        active={isLoading}
        spinner
      >
        <KTCard>
          <KTCardBody>
            {/* <h4 className="fw-bold text-gray-700">Judul SOP</h4>
          <TextField placeholder="Judul SOP" />
          <h5 className="text-muted mt-2 mb-5">Masukan judul SOP</h5> */}
            <h2 className="mb-5">SOP</h2>

            <div className="">
              <h4>Judul SOP</h4>
              <TextField
                placeholder="masukan judul"
                props={{
                  value: titleSOP,
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    setTitleSOP(e.target.value);
                  },
                }}
              />
              <h5 className="text-muted mt-1 mb-4">Masukan Judul SOP</h5>
              <h4 className="fw-bold text-gray-700">SOP File</h4>
              <div className=" rounded" style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="d-none"
                  accept=".pdf"
                  id="input-pdf"
                />
                {filePDFPreview ? (
                  <label
                    className="d-flex bg-light-primary align-items-center rounded border border-primary border-dashed "
                    htmlFor="input-pdf"
                  >
                    <div className="m-4 mx-10">
                      <div className="d-flex">
                        <img
                          src="/media/svg/files/pdf.svg"
                          width={60}
                          height={60}
                          alt="xlsx icon"
                        />
                        <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                          <h4>{filePDFPreview}</h4>
                          <h5 className="text-muted">
                            Klik untuk mengganti file
                          </h5>
                        </div>
                      </div>
                    </div>
                  </label>
                ) : (
                  <label
                    htmlFor="input-pdf"
                    className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">
                      <div className="mt-1 text-muted fw-bold mb-0">
                        <div className="d-flex">
                          <img
                            src="/media/svg/files/upload.svg"
                            width={50}
                            height={50}
                            alt="xlsx icon"
                          />
                          <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                            <h4>Pilih file yang ingin di upload</h4>
                            <h5 className="text-muted">
                              File yang diupload harus berformat .PDF
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>
            <h4 className="fw-bold text-gray-700 mt-5">Content SOP</h4>
            <div
              style={{
                height: "225px",
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
                style={{ height: "70%" }}
                onChange={(e) => {
                  setContent(e);
                }}
              />
            </div>
            <h5 className="text-muted mb-5">Masukan content SOP</h5>
            <div className="d-flex justify-content-end align-content-center">
              <Buttons disabled={!filePDF} onClick={handleSOPFileCreateOne}>
                Tambah SOP
              </Buttons>
            </div>
          </KTCardBody>
        </KTCard>
        <KTCard className="mt-5">
          <KTCardBody>
            {/* <h4 className="fw-bold text-gray-700">Judul SOP</h4>
          <TextField placeholder="Judul SOP" />
          <h5 className="text-muted mt-2 mb-5">Masukan judul SOP</h5> */}
            <h2 className="mb-5">Ekspor Dokumen</h2>
            <h4>Judul Ekspor Dokumen</h4>
            <TextField
              placeholder="masukan judul"
              props={{
                value: titleEkspor,
                onChange: (e: any) => {
                  setTitleEkspor(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">Masukan judul ekspor dokumen</h5>

            <div className="mt-5">
              <h4 className="fw-bold text-gray-700">Ekspor Dokumen File</h4>
              <div className=" rounded" style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  onChange={handleFileChangeEkspor}
                  className="d-none"
                  accept=".pdf"
                  id="input-pdf-ekspor"
                />
                {filePDFPreviewEkspor ? (
                  <label
                    className="d-flex bg-light-primary align-items-center rounded border border-primary border-dashed "
                    htmlFor="input-pdf-ekspor"
                  >
                    <div className="m-4 mx-10">
                      <div className="d-flex">
                        <img
                          src="/media/svg/files/pdf.svg"
                          width={60}
                          height={60}
                          alt="xlsx icon"
                        />
                        <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                          <h4>{filePDFPreviewEkspor}</h4>
                          <h5 className="text-muted">
                            Klik untuk mengganti file
                          </h5>
                        </div>
                      </div>
                    </div>
                  </label>
                ) : (
                  <label
                    htmlFor="input-pdf-ekspor"
                    className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">
                      <div className="mt-1 text-muted fw-bold mb-0">
                        <div className="d-flex">
                          <img
                            src="/media/svg/files/upload.svg"
                            width={50}
                            height={50}
                            alt="xlsx icon"
                          />
                          <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                            <h4>Pilih file yang ingin di upload</h4>
                            <h5 className="text-muted">
                              File yang diupload harus berformat .PDF
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            <h4 className="mt-5">Tipe Dokumen</h4>
            <Dropdown
              styleType="solid"
              value={documentEksporType}
              options={[
                {
                  label: "Additional",
                  value: CompanyDocumentTypeEnum.Additional,
                },
                { label: "Customs", value: CompanyDocumentTypeEnum.Customs },
                {
                  label: "Financial",
                  value: CompanyDocumentTypeEnum.Financial,
                },
                {
                  label: "Regulatory",
                  value: CompanyDocumentTypeEnum.Regulatory,
                },
                {
                  label: "Sales And Invoice",
                  value: CompanyDocumentTypeEnum.SalesAndInvoice,
                },
                {
                  label: "Transportation",
                  value: CompanyDocumentTypeEnum.Transportation,
                },
                { label: "Other", value: CompanyDocumentTypeEnum.Other },
              ]}
              onValueChange={(e) => {
                setDocumentEksporType(e as CompanyDocumentTypeEnum);
              }}
            />
            <h5 className="text-muted mt-1">Masukan tipe ekspor dokumen</h5>

            <h4 className="mt-5">Deskripsi</h4>
            <Textarea
              placeholder="masukan judul"
              props={{
                value: descriptionEkspor,
                onChange: (e: any) => {
                  setDescriptionEkspor(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">
              Masukan deskripsi ekspor dokumen
            </h5>

            <h4 className="mt-5">Instruksi</h4>
            <Textarea
              placeholder="masukan judul"
              props={{
                value: instructionEkspor,
                onChange: (e: any) => {
                  setInstructionEkspor(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">
              Masukan deskripsi ekspor dokumen
            </h5>
            <h4 className="mt-5">Fungsi Utama</h4>

            {mainFunction.map((value, index) => {
              return (
                <div className="d-flex mt-5" key={index}>
                  <div className="w-100">
                    <TextField
                      placeholder="masukan fungsi"
                      props={{
                        value: value,
                        onChange: (e: any) => {
                          setMainFunction((prev) =>
                            prev.map((val, i) =>
                              i === index ? e.target.value : val
                            )
                          );
                        },
                      }}
                    ></TextField>
                  </div>
                  <div className="ms-5">
                    <Buttons
                      icon="cross"
                      buttonColor="danger"
                      showIcon={true}
                      onClick={() =>
                        setMainFunction((prev) =>
                          prev.filter((e, i) => i != index)
                        )
                      }
                    ></Buttons>
                  </div>
                </div>
              );
            })}
            <Buttons
              showIcon={true}
              mode="light"
              classNames="mt-5 mb-5"
              onClick={() => {
                setMainFunction((prev) => [...prev, ""]);
              }}
            >
              Tambahkan Fungsi Utama
            </Buttons>
            <h5 className="text-muted mt-1">
              Masukan fungsi utama ekspor dokumen
            </h5>

            <div className="d-flex justify-content-end align-content-center mt-5">
              <Buttons
                disabled={!filePDFEkspor}
                onClick={handleEksporFileCreateOne}
              >
                Tambah ekspor dokumen
              </Buttons>
            </div>
          </KTCardBody>
        </KTCard>

        <KTCard className="mt-5">
          <KTCardBody>
            {/* <h4 className="fw-bold text-gray-700">Judul SOP</h4>
          <TextField placeholder="Judul SOP" />
          <h5 className="text-muted mt-2 mb-5">Masukan judul SOP</h5> */}
            <h2 className="mb-5">Komoditas Ekspor</h2>
            <h4>Judul Komotidas Ekspor</h4>
            <TextField
              placeholder="masukan judul"
              props={{
                value: titleCommodity,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setTitleCommodity(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">Masukan judul komoditas</h5>

            <div className="mt-5">
              <h4 className="fw-bold text-gray-700">Komoditas File</h4>
              <div className=" rounded" style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  onChange={handleFileChangeCommodity}
                  className="d-none"
                  accept=".pdf"
                  id="input-pdf-commodity"
                />
                {filePDFPreviewCommodity ? (
                  <label
                    className="d-flex bg-light-primary align-items-center rounded border border-primary border-dashed "
                    htmlFor="input-pdf-commodity"
                  >
                    <div className="m-4 mx-10">
                      <div className="d-flex">
                        <img
                          src="/media/svg/files/pdf.svg"
                          width={60}
                          height={60}
                          alt="xlsx icon"
                        />
                        <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                          <h4>{filePDFPreviewCommodity}</h4>
                          <h5 className="text-muted">
                            Klik untuk mengganti file
                          </h5>
                        </div>
                      </div>
                    </div>
                  </label>
                ) : (
                  <label
                    htmlFor="input-pdf-commodity"
                    className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">
                      <div className="mt-1 text-muted fw-bold mb-0">
                        <div className="d-flex">
                          <img
                            src="/media/svg/files/upload.svg"
                            width={50}
                            height={50}
                            alt="xlsx icon"
                          />
                          <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                            <h4>Pilih file yang ingin di upload</h4>
                            <h5 className="text-muted">
                              File yang diupload harus berformat .PDF
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>
            <h4 className="mt-5">Informasi Komotidas Ekspor</h4>
            <Textarea
              placeholder="masukan Informasi"
              props={{
                value: descriptionCommodity,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setDescriptionCommodity(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">Masukan informasi komoditas</h5>

            <h4 className="mt-5">Instruksi Komotidas Ekspor</h4>
            <Textarea
              placeholder="masukan instruksi"
              props={{
                value: instructionCommodity,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setInstructionCommodity(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">Masukan instruksi komoditas</h5>
            <div className="d-flex justify-content-end align-content-center mt-5">
              <Buttons
                disabled={!filePDFCommodity}
                onClick={handleCommodityCreateOne}
              >
                Tambah komoditas ekspor
              </Buttons>
            </div>
          </KTCardBody>
        </KTCard>

        <KTCard className="mt-5">
          <KTCardBody>
            {/* <h4 className="fw-bold text-gray-700">Judul SOP</h4>
          <TextField placeholder="Judul SOP" />
          <h5 className="text-muted mt-2 mb-5">Masukan judul SOP</h5> */}
            <h2 className="mb-5">Term Or FAQ</h2>
            <h4>Judul Term Or FAQ</h4>
            <TextField
              placeholder="masukan judul"
              props={{
                value: titleTermOrFaq,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setTitleTermOrFaq(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mt-1">Masukan judul terms or FAQ</h5>

            <h4 className="fw-bold text-gray-700 mt-5">Konten Term Or FAQ</h4>
            <div
              style={{
                height: "225px",
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
                value={contentTermOrFaq}
                style={{ height: "70%" }}
                onChange={(e) => {
                  setContentTermOrFaq(e);
                }}
              />
            </div>
            <h5 className="text-muted mb-5">Masukan content term or FAQ</h5>

            <h4 className="fw-bold text-gray-700 mt-5">Tipe Term Or FAQ</h4>
            <Dropdown
              value={termOrFaqType}
              options={[
                { value: TermOrFaqTypeEnum.Faq, label: "FAQ" },
                { value: TermOrFaqTypeEnum.Term, label: "Term" },
                {
                  value: TermOrFaqTypeEnum.PrivacyPolicy,
                  label: "Privacy Policy",
                },
              ]}
              onValueChange={(value) =>
                setTermOrFaqType(value as TermOrFaqTypeEnum)
              }
            ></Dropdown>
            <h5 className="text-muted mb-5 mt-5">Pilih tipe term or FAQ</h5>

            <div className="d-flex justify-content-end align-content-center mt-5">
              <Buttons
                disabled={!titleTermOrFaq}
                onClick={handleTermOrFaqCreteOne}
              >
                Tambah Term or FAQ
              </Buttons>
            </div>
          </KTCardBody>
        </KTCard>
        <SweetAlert2
          {...swalProps}
          didOpen={() => {
            // run when swal is opened...
          }}
          didClose={async () => {
            console.log("closed");
            await router.push("/admin/document");
            router.reload();
            setSwalProps({});
          }}
        />
      </LoadingOverlayWrapper>
    </>
  );
};

export default CreateDocument;
