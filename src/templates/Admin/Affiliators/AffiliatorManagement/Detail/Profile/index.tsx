/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from "@/_metronic/helpers";
import useForgotPassword from "@/app/service/utils/auth/forgotPasswordHook";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Alert } from "@/stories/molecules/Alert/Alert";
import ForgotPasswordModal from "../../component/ForgotPasswordModal";
import { formatAddress } from "@/app/service/utils/addressFormatter";

import {
  AffiliatorFindOneQuery,
  IdentificationStatusEnum,
} from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import EditIdentificationModal from "@/components/partials/Modals/Mutations/EditIdentificationStatusModal";

const AffiliatorProfilePage = ({
  data,
}: {
  data: AffiliatorFindOneQuery | undefined;
}) => {
  const userData = data?.affiliatorFindOne?.user;
  const userAddress = userData?.addresses?.find((a: any) => a.name == "true");
  const {
    forgotPasswordModalLoading,
    handleForgotPassword,
    setShowForgotPasswordModal,
    showForgotPasswordModal,
    forgotPasswordSuccess,
    forgotPasswordError,
  } = useForgotPassword();

  const handleDownloadIdentificationCard = async (
    path: string,
    name: string
  ) => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${name}-KTP.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {forgotPasswordSuccess && (
        <Alert
          title="Berhasil"
          label="Berhasil mengirim Email untuk ganti Password"
          prefixIcon="shield-tick"
        />
      )}
      {forgotPasswordError && (
        <Alert title="Gagal" label={forgotPasswordError} alertColor="danger" />
      )}
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>
        </div>

        <div className="card-body p-9">
          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Nama Depan</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {userData?.name ?? "Unknown User"}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Nama Belakang</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {userData?.name ?? "Unknown User"}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Username</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                {userData?.username ?? "test123"}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Alamat</label>

            <div className="col-lg-4">
              <span className="fw-bolder fs-6 text-dark ">
                {formatAddress(userAddress) ?? "JL. Kebun Karet No. 10"}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">E-Mail</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                {userData?.email ?? "test@gmail.com"}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">No. WhatsApp</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                {userData?.phone?.phoneNumber ?? "test"}
              </span>
            </div>
          </div>

          {/* <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">No. WhatsApp</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                Software Engineer
              </span>
            </div>
          </div> */}

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">
              Tanggal Pendaftaran
            </label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                {formatDate(userData?.createdAt) ?? "test"}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Info Rekening</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                {data?.affiliatorFindOne?.creditCards?.[0]?.cardNumber ??
                  "Tidak Ada Rekening"}
              </span>
            </div>
          </div>

          {data?.affiliatorFindOne?.user?.identification ? (
            <div
              className="notice d-flex bg-light-primary justify-content-end align-content-end rounded border-primary border mb-2 p-2"
              style={{ width: "fit-content" }}
            >
              <KTIcon
                iconName="profile-user"
                className="fs-2tx text-primary me-4 mt-2"
              />
              <div className="d-flex flex-stack flex-grow-1"></div>
              <Buttons
                classNames="me-2"
                onClick={() =>
                  handleDownloadIdentificationCard(
                    `${data?.affiliatorFindOne?.user?.identification?.personalDocumentIdPath}`,
                    data?.affiliatorFindOne?.user?.name as string
                  )
                }
              >
                Download KTP
              </Buttons>
              <Buttons
                data-bs-toggle="modal"
                data-bs-target="#kt_edit_status_modal"
              >
                Ubah Status KTP
              </Buttons>
            </div>
          ) : null}

          <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
            <KTIcon iconName="lock" className="fs-2tx text-primary me-4" />
            <div className="d-flex flex-stack flex-grow-1">
              <div className="fw-bold">
                <h4 className="text-gray-800 fw-bolder">
                  Kirim Pengaturan Ulang Kata Sandi
                </h4>
                <div className="fs-6 text-gray-600">
                  Kirim email kepada user untuk melakukan perubahan kata sandi
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Lupa Password
            </button>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        handleClose={() => setShowForgotPasswordModal(false)}
        show={showForgotPasswordModal}
        handleSubmit={() => handleForgotPassword(userData!.email)}
        isLoading={forgotPasswordModalLoading}
      />
      <EditIdentificationModal
        id={data?.affiliatorFindOne?.user?.identification?.id as number}
        defaultStatus={
          data?.affiliatorFindOne?.user.identification
            ?.identificationStatus as IdentificationStatusEnum
        }
        onClick={() => {}}
      />
    </>
  );
};

export default AffiliatorProfilePage;
