import { PageTitle } from "@/_metronic/layout/core";
import useMailketingViewModel, { breadcrumbs } from "./Mailketing-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const Mailketing = () => {
  const {
    emailName,
    emailAddress,
    autoCapture,
    sendEmail,
    sendSubject,
    sendMessage,
    setEmailName,
    setEmailAddress,
    setAutoCapture,
    setSendEmail,
    setSendSubject,
    setSendMessage,
    isLoading,
    setIsLoading,
    handleMailketingSettingChange,
  } = useMailketingViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Maiketing SMTP</PageTitle>
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
        <KTCard className="mb-10">
          <KTCardBody>
            <h3 className="fw-bold mb-10">Pengaturan</h3>
            <h4>Nama E-mail Pengirim</h4>
            <TextField
              classNames="mb-1"
              placeholder="Masukan nama e-mail"
              props={{
                value: emailName,
                onChange: (e: any) => {
                  setEmailName(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mb-10">
              Nama yang akan ditampilkan sebagai pengirim e-mail
            </h5>
            <h4>Alamat E-Mail Pengirim</h4>
            <TextField classNames="mb-1" placeholder="Masukan alamat e-mail" />
            <h5 className="text-muted mb-10">Alamat e-mail pengirim</h5>
            <h4 className="">
              Auto Capture Register WP{" "}
              <KTIcon
                iconName="arrow-right"
                className="text-dark"
                iconType="solid"
              />{" "}
              List Mailketing
            </h4>
            <TextField classNames="mb-1" placeholder="Masukan nama e-mail" />
            <h5 className="text-muted mb-10">
              Setiap pengguna baru yang terdaftar akan tersimpan di list ini
            </h5>
            <div className="d-flex justify-content-end">
              <Buttons onClick={handleMailketingSettingChange}>
                Simpan Pengaturan
              </Buttons>
            </div>
          </KTCardBody>
        </KTCard>

        <KTCard>
          <KTCardBody>
            <h3 className="fw-bold">Test Mailketing</h3>
            <h5 className="mb-10 text-muted">
              Test integrasi mailketing dengan mengirimkan e-mail
            </h5>
            <h4>Kirim Ke</h4>
            <TextField
              classNames="mb-10"
              placeholder="Masukan e-mail"
              props={{
                value: sendEmail,
                onChange: (e: any) => {
                  setSendEmail(e.target.value);
                },
              }}
            />
            <h4>Subject</h4>
            <TextField
              classNames="mb-10"
              placeholder="Masukan subject"
              props={{
                value: sendSubject,
                onChange: (e: any) => {
                  setSendSubject(e.target.value);
                },
              }}
            />
            <h4 className="">Isi Pesan</h4>
            <Textarea
              classNames="mb-10 min-h-100px"
              placeholder="Masukan pesan"
              props={{
                value: sendMessage,
                onChange: (e: any) => {
                  setSendMessage(e.target.value);
                },
              }}
            />
          </KTCardBody>
          <div className="d-flex justify-content-end">
            <Buttons>Kirim Test E-mail</Buttons>
          </div>
        </KTCard>
      </LoadingOverlayWrapper>
    </>
  );
};

export default Mailketing;
