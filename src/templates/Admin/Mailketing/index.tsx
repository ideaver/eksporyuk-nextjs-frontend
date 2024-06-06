import { PageTitle } from "@/_metronic/layout/core";
import useMailketingViewModel, { breadcrumbs } from "./Mailketing-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { UserRoleEnum } from "@/app/service/graphql/gen/graphql";
import SweetAlert2 from "react-sweetalert2";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

{
  /* <SweetAlert2
{...swalProps}
didOpen={() => {
  // run when swal is opened...
}}
didClose={async () => {
  console.log("closed");
  setSwalProps({});
}}
/> */
}

const Mailketing = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const {
    emailName,
    emailAddress,
    sendEmail,
    sendSubject,
    sendMessage,
    setEmailName,
    setEmailAddress,
    setSendEmail,
    setSendSubject,
    setSendMessage,
    isLoading,
    setIsLoading,
    handleMailketingSend,
    userRole,
    setUserRole,
    sendOption,
    setSendOption,
    swalProps,
    setSwalProps,
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
            <TextField
              classNames="mb-1"
              placeholder="Masukan alamat e-mail"
              props={{
                value: emailAddress,
                onChange: (e: any) => {
                  setEmailAddress(e.target.value);
                },
              }}
            />
            <h5 className="text-muted mb-10">Alamat e-mail pengirim</h5>
          </KTCardBody>
        </KTCard>

        <KTCard>
          <KTCardBody>
            <h3 className="fw-bold">Mailketing</h3>
            <h5 className="mb-10 text-muted">
              Mailketing dengan mengirimkan e-mail
            </h5>
            <h4>
              Kirim Ke{" "}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  defaultChecked
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="email"
                  onChange={(e) => {
                    setSendOption(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  E-mail
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="role"
                  onChange={(e) => {
                    setSendOption(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Role
                </label>
              </div>
            </h4>
            {sendOption === "email" ? (
              <>
                {" "}
                {sendEmail.map((value, index) => {
                  return (
                    <div className="d-flex mt-5" key={index}>
                      <div className="w-100">
                        <TextField
                          placeholder="Jhondoe@gmail.com"
                          props={{
                            value: value,
                            onChange: (e: any) => {
                              setSendEmail((prev) =>
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
                            setSendEmail((prev) =>
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
                    setSendEmail((prev) => [...prev, ""]);
                  }}
                >
                  Tambahkan E-mail
                </Buttons>
              </>
            ) : (
              <div className="mb-5 mt-3">
                <Dropdown
                  value={userRole}
                  options={[
                    { value: UserRoleEnum.Student, label: "Student" },
                    { value: UserRoleEnum.Admin, label: "Admin" },
                    { value: UserRoleEnum.Mentor, label: "Mentor" },
                    { value: UserRoleEnum.Affiliator, label: "Affiliator" },
                  ]}
                  onValueChange={(value) => {
                    setUserRole(value as UserRoleEnum);
                  }}
                />
              </div>
            )}

            <h4>Subject</h4>
            <TextField
              classNames="mb-5"
              placeholder="Masukan subject"
              props={{
                value: sendSubject,
                onChange: (e: any) => {
                  setSendSubject(e.target.value);
                },
              }}
            />
            <h4 className="">Isi Pesan</h4>
            <div
              style={{
                height: "220px",
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
                value={sendMessage}
                style={{ height: "70%" }}
                onChange={(e) => {
                  setSendMessage(e);
                }}
              />
            </div>
            {/* <Textarea
              classNames="mb-10 min-h-100px"
              placeholder="Masukan pesan"
              props={{
                value: sendMessage,
                onChange: (e: any) => {
                  setSendMessage(e.target.value);
                },
              }}
            /> */}
          </KTCardBody>
          <div className="d-flex justify-content-end">
            <Buttons onClick={handleMailketingSend}>Kirim E-mail</Buttons>
          </div>
        </KTCard>
        <SweetAlert2
          {...swalProps}
          didOpen={() => {
            // run when swal is opened...
          }}
          didClose={async () => {
            console.log("closed");
            setSwalProps({});
          }}
        />
      </LoadingOverlayWrapper>
    </>
  );
};

export default Mailketing;