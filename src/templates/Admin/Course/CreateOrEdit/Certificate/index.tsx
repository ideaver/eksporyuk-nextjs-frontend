import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { useCertificateTemplateFindManyQuery } from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import { changeCertificateTemplateId } from "@/features/reducers/course/courseReducer";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const CertificatePage = ({}) => {
  // const [selectedCertificate, setSelectedCertificate] = useState(0);
  const dispatch = useDispatch();
  const currentCourseSelector = useSelector((state: RootState) => state.course);
  const { data, loading, error } = useCertificateTemplateFindManyQuery();
  const router = useRouter();
  const isDetail = router.query.action === "detail";
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
          <h3 className="mb-5">Sertifikat</h3>
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
                    className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-6 mb-5"
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
                        className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-6 mb-5"
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
                                dispatch(changeCertificateTemplateId(0));
                              }}
                            />
                          </div>
                        </div>
                        <div className="ms-5 p-10">
                          <img
                            className="img-fluid rounded"
                            src={certificate?.exampleTemplateCertificatePath}
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
    </>
  );
};

export default CertificatePage;
