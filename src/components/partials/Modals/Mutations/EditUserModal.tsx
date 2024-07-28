import { KTIcon } from "@/_metronic/helpers";
import {
  GenderEnum,
  useUserFindOneQuery,
} from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { ErrorMessage, Form, Formik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import * as Yup from "yup";

export interface IValidationSchema {
  fullName: string | undefined;
  username: string | undefined;
  gender:
    | {
        value: GenderEnum;
        label: string;
      }
    | undefined;
  email: string | undefined;
  deletedReason:
    | {
        value: string;
        label: string;
      }
    | undefined;
  password: string | undefined;
  phoneNumber: string | undefined;
  birthDate: Date | undefined;
  ktpNumber: string | undefined;
  npwpNumber: string | undefined;
  description: string | undefined | null;
}

interface IEditUserModal {
  show: boolean;
  isLoading: boolean;
  userId: string;
  error?: any;
  handleClose: () => void;
  handleSubmit: (value: IValidationSchema, file: File | undefined) => void;
}

const validationSchema = Yup.object<IValidationSchema>().shape({
  fullName: Yup.string().required("Data ini diperlukan"),
  username: Yup.string().required("Data ini diperlukan"),
  gender: Yup.object().shape({
    value: Yup.string().required("Data ini diperlukan"),
    label: Yup.string().required("Data ini diperlukan"),
  }),
  email: Yup.string()
    .email("Email tidak valud")
    .required("Data ini diperlukan"),
  password: Yup.string().min(8, "Minimal 8 Karakter").optional(),
  phoneNumber: Yup.string().required("Data ini diperlukan"),
  birthDate: Yup.date().required("Data ini diperlukan"),
  ktpNumber: Yup.string().optional(),
  npwpNumber: Yup.string().optional(),
  description: Yup.string().optional().nullable(),
});

const EditUserModal = ({
  handleClose,
  handleSubmit,
  isLoading,
  userId,
  error,
  show,
}: IEditUserModal) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event?.target?.files?.[0] || undefined);
  };

  const {
    data,
    loading,
    error: ApolloError,
    refetch,
  } = useUserFindOneQuery({
    variables: {
      where: {
        id: userId,
      },
    },
  });

  const userData = data?.userFindOne;

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (show == false) {
      setSelectedFile(undefined);
    }
  }, [show]);

  return (
    <Modal enforceFocus={false} show={show} centered={true} size="lg">
      <div className="modal-header">
        <h2>Edit User</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        {loading || isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5>Loading...</h5>
          </div>
        ) : ApolloError || error ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5>{ApolloError || error.message}</h5>
          </div>
        ) : (
          <Formik
            initialValues={
              {
                fullName: userData?.name,
                username: userData?.username,
                gender: {
                  value: userData?.gender ?? GenderEnum.Male,
                  label:
                    userData?.gender === GenderEnum.Male
                      ? "Laki - Laki"
                      : "Perempuan",
                },
                email: userData?.email,
                password: "",
                deletedReason: {
                  value:
                    (userData?.deletedReason || userData?.deletedAt) === null
                      ? "active"
                      : "nonactive" ?? "active",
                  label:
                    (userData?.deletedReason || userData?.deletedAt) === null
                      ? "Aktif"
                      : "Non Aktif" ?? "Aktif",
                },
                phoneNumber: userData?.phone?.phoneNumber.toString(),
                birthDate: new Date(Date.parse(userData?.birthDate ?? "")),
                ktpNumber: userData?.personalId ?? "",
                npwpNumber: userData?.npwpId ?? "",
                description: userData?.mentor?.description,
              } as IValidationSchema
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              handleSubmit(values, selectedFile);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <>
                  <div className="row">
                    <div className="col-12 col-lg">
                      <div style={{ position: "relative" }}>
                        <img
                          className="img-fluid w-90px w-lg-100 rounded mb-5 mb-lg-0"
                          src={
                            selectedFile
                              ? URL.createObjectURL(selectedFile)
                              : userData?.avatarImageId ??
                                "/media/avatars/blank.png"
                          }
                          alt={""}
                        />
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <button
                          className="btn btn-icon btn-active-color-primary bg-white"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            border: "none",
                          }}
                          type="button"
                          onClick={() =>
                            document?.getElementById("fileInput")?.click()
                          }
                        >
                          <KTIcon iconName={"pencil"} className="fs-1"></KTIcon>
                        </button>
                      </div>
                      <ErrorMessage
                        className="text-danger"
                        name="fullName"
                        component="div"
                      />
                    </div>
                    <div className="col-12 col-lg-9">
                      <div className="identity">
                        <div className="d-block d-lg-flex gap-5">
                          <div className="w-100">
                            <h5 className="text-muted">Nama Lengkap</h5>
                            <TextField
                              props={{
                                value: values.fullName,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setFieldValue("fullName", e.target.value),
                              }}
                            ></TextField>
                            <ErrorMessage
                              className="text-danger"
                              name="fullName"
                              component="div"
                            />
                          </div>
                          <div className="w-100 mt-5 mt-lg-0">
                            <h5 className="text-muted">Username</h5>
                            <TextField
                              props={{
                                value: values.username,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setFieldValue("username", e.target.value),
                              }}
                            ></TextField>
                            <ErrorMessage
                              className="text-danger"
                              name="username"
                              component="div"
                            />
                          </div>
                          <div className="w-100 mt-5 mt-lg-0">
                            <h5 className="text-muted">Gender</h5>
                            <Select
                              placeholder="Select an option"
                              value={values.gender}
                              options={[
                                {
                                  value: GenderEnum.Male,
                                  label: "Laki - Laki",
                                },
                                {
                                  value: GenderEnum.Female,
                                  label: "Perempuan",
                                },
                              ]}
                              onChange={(selectedOption) =>
                                setFieldValue("gender", selectedOption)
                              }
                            />
                            <ErrorMessage
                              className="text-danger"
                              name="gender"
                              component="div"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="account mt-5">
                        <div className="d-block d-lg-flex gap-5">
                          <div className="w-100">
                            <h5 className="text-muted">Email</h5>
                            <TextField
                              props={{
                                value: values.email,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setFieldValue("email", e.target.value),
                              }}
                            ></TextField>
                            <ErrorMessage
                              className="text-danger"
                              name="email"
                              component="div"
                            />
                          </div>
                          <div className="w-100 mt-5 mt-lg-0">
                            <h5 className="text-muted">Password</h5>
                            <TextField
                              props={{
                                value: values.password,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setFieldValue("password", e.target.value),
                              }}
                              type="password"
                            ></TextField>
                            <ErrorMessage
                              className="text-danger"
                              name="password"
                              component="div"
                            />
                          </div>
                          <div className="w-100 mt-5 mt-lg-0">
                            <h5 className="text-muted">Nomor Telepon</h5>
                            <TextField
                              props={{
                                value: values.phoneNumber,
                                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                  setFieldValue("phoneNumber", e.target.value),
                              }}
                            ></TextField>
                            <ErrorMessage
                              className="text-danger"
                              name="phoneNumber"
                              component="div"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="birth mt-5">
                    <h5 className="text-muted">Bio</h5>
                    <Textarea
                      props={{
                        value: values.description,
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("description", e.target.value),
                      }}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="description"
                      component="div"
                    />
                    <h5 className="text-muted mt-5">Tanggal Lahir</h5>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <KTIcon iconName={"calendar"} className="fs-1"></KTIcon>
                      </span>
                      <Flatpickr
                        value={values.birthDate}
                        options={{
                          dateFormat: "d M Y",
                        }}
                        className="form-control"
                        placeholder="Pilih Tanggal Lahir"
                        aria-describedby="basic-addon1"
                        onChange={(date) => {
                          setFieldValue("birthDate", date);
                        }}
                      />
                    </div>
                    <ErrorMessage
                      className="text-danger"
                      name="birthDate"
                      component="div"
                    />
                  </div>
                  <div className="private-idendity mt-5">
                    <div className="d-block d-lg-flex gap-5">
                      <div className="w-100">
                        <h5 className="text-muted">NIK KTP</h5>
                        <TextField
                          props={{
                            value: values.ktpNumber,
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                              setFieldValue("ktpNumber", e.target.value),
                          }}
                        ></TextField>
                        <ErrorMessage
                          className="text-danger"
                          name="ktpNumber"
                          component="div"
                        />
                      </div>
                      <div className="w-100 mt-5 mt-lg-0">
                        <h5 className="text-muted">NPWP</h5>
                        <TextField
                          props={{
                            value: values.npwpNumber,
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                              setFieldValue("npwpNumber", e.target.value),
                          }}
                        ></TextField>
                        <ErrorMessage
                          className="text-danger"
                          name="npwpNumber"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>
                  <h5 className="text-muted mt-5">Status</h5>
                  <Select
                    placeholder="Select an option"
                    value={values.deletedReason}
                    options={[
                      {
                        value: "active",
                        label: "Aktif",
                      },
                      {
                        value: "nonactive",
                        label: "Non Aktif",
                      },
                    ]}
                    onChange={(selectedOption) =>
                      setFieldValue("deletedReason", selectedOption)
                    }
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="phoneNumber"
                    component="div"
                  />
                  <div className="modal-footer justify-content-center mt-5 pb-0">
                    <Buttons
                      buttonColor="secondary"
                      classNames="btn-lg"
                      onClick={handleClose}
                    >
                      Batal
                    </Buttons>
                    <Buttons
                      buttonColor="primary"
                      classNames="btn-lg"
                      // onClick={() => {
                      //   handleSubmit();
                      // }}
                      type="submit"
                    >
                      Kirim
                    </Buttons>
                  </div>
                </>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Modal>
  );
};

export default EditUserModal;
