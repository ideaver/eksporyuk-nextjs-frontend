/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from "@/_metronic/helpers";
import useForgotPassword from "@/app/service/utils/auth/forgotPasswordHook";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Alert } from "@/stories/molecules/Alert/Alert";
import ForgotPasswordModal from "../../component/ForgotPasswordModal";
import { formatAddress } from "@/app/service/utils/addressFormatter";

import { AffiliatorFindOneQuery } from "@/app/service/graphql/gen/graphql";

const AffiliatorProfilePage = ({ data }: { data: AffiliatorFindOneQuery | undefined}) => {
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
              <span className="fw-bolder fs-6 text-dark">{userData?.name ?? "Unknown User"}</span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Nama Belakang</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">{userData?.name ?? "Unknown User"}</span>
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
            <label className="col-lg-4 fw-bold text-muted">
              Info Rekening
            </label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bolder fs-6 text-dark">
                {data?.affiliatorFindOne?.creditCards?.[0]?.cardNumber ?? "Tidak Ada Rekening"}
              </span>
            </div>
          </div>

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
    </>
  );
};

export default AffiliatorProfilePage;
