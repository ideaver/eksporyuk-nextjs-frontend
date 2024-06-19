import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { postDataAPI } from "@/app/service/api/rest-service";
import {
  SortOrder,
  useCertificateTemplateCreateOneMutation,
  useCertificateTemplateFindManyQuery,
  useUserFindOneQuery,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import { changeCertificateTemplateId } from "@/features/reducers/course/courseReducer";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const CertificatePage = ({}) => {
  // const [selectedCertificate, setSelectedCertificate] = useState(0);
  const [
    createCertificateMutation,
    {
      data: createdCertificateData,
      loading: createdCertificateLoading,
      error: createdCertificateError,
    },
  ] = useCertificateTemplateCreateOneMutation();
  const { data: session, status } = useSession();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserFindOneQuery({
    variables: {
      where: {
        id: session?.user.id,
      },
    },
  });
  const dispatch = useDispatch();
  const currentCourseSelector = useSelector((state: RootState) => state.course);
  const { data, loading, error, refetch } = useCertificateTemplateFindManyQuery(
    {
      variables: {
        orderBy: {
          id: SortOrder.Desc,
        },
      },
    }
  );
  const router = useRouter();
  const isDetail = router.query.action === "detail";

  const certificateTemplateImageRef = useRef<HTMLInputElement>(null);

  const [
    showCreateCertificateTemplateModal,
    setShowCreateCertificateTemplateModal,
  ] = useState(false);
  const [showCertificateTutorialModal, setShowCertificateTutorialModal] =
    useState(false);

  const [certificateTemplateImage, setCertificateTemplateImage] =
    useState<File>();

  const convertFile = async (file: any, session: any, filename: string) => {
    try {
      // const newFile = stringToFile(file, filename);
      const response = await postDataAPI({
        endpoint: "upload/file",
        body: {
          file: file,
        },
        fields: {
          userId: session,
        },
        isMultipartRequest: true,
      });
      const url = response?.data;
      return url;
    } catch (error) {
      return null;
    }
  };

  const handleCreateCertificateTemplate = async () => {
    if (!certificateTemplateImage) {
      return;
    }
    if (userData?.userFindOne?.id === undefined) {
      return;
    }
    try {
      const filePath = await convertFile(
        certificateTemplateImage,
        userData?.userFindOne?.id,
        certificateTemplateImage.name
      );
      await createCertificateMutation({
        variables: {
          data: {
            name: "Certificate Template",
            file: {
              connect: {
                path: filePath,
              },
            },
          },
        },
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Template Sertifikat berhasil dibuat",
      });
      setShowCreateCertificateTemplateModal(false);
      refetch();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.toString(),
      });
      setShowCreateCertificateTemplateModal(false);
    }
  };
  return (
    <>
      {currentCourseSelector.errorMessage && (
        <Alert
          label={currentCourseSelector.errorMessage as string}
          title="Terjadi Masalah"
          alertColor="danger"
        ></Alert>
      )}
      <KTCard className="">
        <KTCardBody>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="mb-0">Sertifikat</h3>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowCreateCertificateTemplateModal(true);
              }}
            >
              Tambah Sertifikat
            </button>
          </div>
          <h5 className="mt-5 text-muted">Pilih Sertifikat</h5>
          {loading && <h3>Loading...</h3>}
          {!loading && (
            <div className="row mt-5">
              <div className="col-6">
                <div
                  data-kt-buttons="true"
                  style={{ height: "300px", width: "100%" }}
                >
                  <label
                    className={`btn btn-outline  d-flex flex-stack text-start p-6 mb-5 ${
                      currentCourseSelector.certificateTemplateId === 0
                        ? "btn-outline-dashed btn-active-light-primary active"
                        : ""
                    }`}
                    style={{ height: "100%" }}
                  >
                    <div className="d-flex align-items-center me-2">
                      <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="plan"
                          value=""
                          checked={
                            currentCourseSelector.certificateTemplateId === 0
                          }
                          onClick={() => {
                            if (isDetail) {
                              return;
                            }
                            dispatch(changeCertificateTemplateId(0));
                          }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">
                          Tidak menggunakan sertifikat
                        </h2>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              {data?.certificateTemplateFindMany?.map((certificate, index) => {
                return (
                  <div className="col-6 mb-5" key={index}>
                    <div
                      data-kt-buttons="true"
                      style={{ height: "300px", width: "100%" }}
                    >
                      <label
                        className={`btn btn-outline  d-flex flex-stack text-start p-6 mb-5 ${
                          currentCourseSelector.certificateTemplateId ===
                          certificate?.id
                            ? "btn-outline-dashed btn-active-light-primary active"
                            : ""
                        }`}
                        style={{ height: "100%" }}
                      >
                        <div className="d-flex align-items-center me-2">
                          <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="plan"
                              value={certificate?.id}
                              checked={
                                currentCourseSelector.certificateTemplateId ===
                                certificate?.id
                              }
                              onClick={() => {
                                if (isDetail) {
                                  return;
                                }
                                dispatch(
                                  changeCertificateTemplateId(certificate?.id)
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="ms-5 p-10">
                          <img
                            className="img-fluid rounded"
                            src={certificate?.filePath ?? ""}
                            alt={certificate?.name}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </KTCardBody>
      </KTCard>
      <Modal
        show={showCreateCertificateTemplateModal}
        centered={true}
        size="lg"
      >
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
          active={createdCertificateLoading}
          spinner
        >
          <div className="modal-header">
            <h2>Tambah Template Sertifikat</h2>
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              onClick={() => {
                setShowCreateCertificateTemplateModal(false);
              }}
            >
              <KTIcon className="fs-1" iconName="cross" />
            </div>
          </div>

          <div className="modal-body">
            <h3 className="mb-5 required">Contoh Sertifikat yang benar</h3>
            <Buttons
              buttonColor="primary"
              classNames="btn-lg"
              onClick={() => {
                setShowCertificateTutorialModal(true);
              }}
            >
              Lihat Contoh Sertifikat
            </Buttons>
            <div className="mb-3 mt-5">
              <h4 className="required fw-bold text-gray-700">
                Upload Sertifikat
              </h4>
              <div
                className="border-dashed border-primary rounded p-3 mb-5"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  if (certificateTemplateImageRef.current) {
                    certificateTemplateImageRef.current?.click();
                  }
                }}
              >
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCertificateTemplateImage(e.target.files[0]);
                    }
                  }}
                  className="d-none"
                  accept=".jpg, .jpeg, .png"
                  id="certificate-template"
                  ref={certificateTemplateImageRef}
                />
                <label style={{ cursor: "pointer" }}>
                  {certificateTemplateImage ? (
                    <div className="d-flex flex-wrap">
                      <div className="position-relative">
                        <label htmlFor="foto-produk">
                          {certificateTemplateImage ? (
                            <img
                              src={
                                certificateTemplateImage
                                  ? URL.createObjectURL(
                                      certificateTemplateImage
                                    )
                                  : undefined
                              }
                              alt=""
                              className="img-fluid rounded object-fit-cover m-2"
                              // style={{ maxHeight: "400px" }}
                            />
                          ) : (
                            <div>
                              <h4>Loading</h4>
                            </div>
                          )}
                        </label>
                        <i
                          className="bi bi-x-circle position-absolute m-2"
                          style={{
                            fontSize: "20px",
                            color: "red",
                            top: "-10px",
                            right: "-5px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering file input
                            setCertificateTemplateImage(undefined);
                          }}
                        ></i>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-row align-items-center gap-3">
                      <div>
                        <i
                          className="bi bi-upload"
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </div>
                      <div>
                        <h5 className="m-0">Pilih file untuk diupload</h5>
                        <small className="text-muted">
                          File yang diupload dapat berformat .JPG, .PNG dan
                          .JPEG
                        </small>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer mx-auto">
            <Buttons
              buttonColor="secondary"
              classNames="btn-lg"
              onClick={() => {
                setShowCreateCertificateTemplateModal(false);
              }}
            >
              Batal
            </Buttons>
            <Buttons
              buttonColor="primary"
              classNames="btn-lg"
              onClick={handleCreateCertificateTemplate}
            >
              Kirim
            </Buttons>
          </div>
        </LoadingOverlayWrapper>
      </Modal>
      <Modal show={showCertificateTutorialModal} centered={true} size="lg">
        <div className="modal-header">
          <h2>Contoh Penggunaan Template Sertifikat</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={() => {
              setShowCertificateTutorialModal(false);
            }}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>

        <div className="modal-body">
          <h2>Perhatikan Nama dalam sertifikat haruslah berada di tengah</h2>
          <img
            src="/images/placeholders/certificate-tutorial.png"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="modal-footer mx-auto">
          <Buttons
            buttonColor="secondary"
            classNames="btn-lg"
            onClick={() => {
              setShowCertificateTutorialModal(false);
            }}
          >
            Kembali
          </Buttons>
        </div>
      </Modal>
    </>
  );
};

export default CertificatePage;
