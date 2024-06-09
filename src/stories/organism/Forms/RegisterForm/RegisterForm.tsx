import React, { useState } from "react";
import clsx from "clsx";
import { AppLogo } from "@/stories/atoms/AppLogo/AppLogo";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import Link from "next/link";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RegisterData } from "@/types/auth/auth-types";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email salah")
    .min(3, "Minimal 3 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Email diperlukan"),
  password: Yup.string()
    .min(3, "Minimal 3 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Password diperlukan"),
  confirmPassword: Yup.string()
    .min(3, "Minimal 3 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Password diperlukan")
    .oneOf(
      [Yup.ref("password")],
      "Password dan Konfirmasi Password tidak cocok"
    ),
  firstName: Yup.string()
    .min(2, "Minimal 2 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Nama depan diperlukan"),
  lastName: Yup.string()
    .min(2, "Minimal 2 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Nama belakang diperlukan"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Hanya angka yang diperbolehkan")
    .min(10, "Minimal 10 angka")
    .max(13, "Maksimal 13 angka")
    .required("Nomor telepon diperlukan"),
  acceptTerms: Yup.bool().required("Anda harus menerima Syarat & Ketentuan"),
});


interface RegisterFormProps {
  /**
   * Disabled Button
   */
  disabled?: boolean;
  /**
   * TnC Url
   */
  tncOnClick?: () => void;
  /**
   * Login url
   */
  loginOnClick?: () => void;
  /**
   * Optional click handler
   */
  onClick?: (data: RegisterData) => void;
}

/**
 * RegisterForm Molecule Component
 */
export const RegisterForm = ({
  disabled,
  onClick,
  tncOnClick,
  loginOnClick,
}: RegisterFormProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      acceptTerms: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="form w-100" noValidate id="kt_login_signin_form">
      <AppLogo classNames="mx-auto d-block " size="medium" />
      <div className="text-center mt-15">
        <h1 className="text-dark fw-bolder fs-2x mb-3">Buat Akun</h1>
      </div>
      {/* begin::Form group */}
      <div className="d-flex flex-row justify-content-between mt-11 mb-8">
        <div>
          <TextField
            type="text"
            placeholder="Nama Depan"
            classNames={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.firstName && formik.errors.firstName,
              },
              {
                "is-valid":
                  formik.touched.firstName && !formik.errors.firstName,
              }
            )}
            props={{
              autoComplete: "off",
              ...formik.getFieldProps("firstName"),
            }}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.firstName}</span>
            </div>
          )}
        </div>
        <div className="ms-5" />
        <div>
          <TextField
            type="text"
            placeholder="Nama Belakang"
            classNames={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.lastName && formik.errors.lastName,
              },
              {
                "is-valid": formik.touched.lastName && !formik.errors.lastName,
              }
            )}
            props={{
              autoComplete: "off",
              ...formik.getFieldProps("lastName"),
            }}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.lastName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="fv-row mb-8 mt-5">
        <TextField
          placeholder="Email atau Username"
          classNames={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          props={{
            autoComplete: "off",
            ...formik.getFieldProps("email"),
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      <div className="fv-row mb-8 mt-5">
        <TextField
          placeholder="Password"
          classNames={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.password && formik.errors.password },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
          type={visiblePassword ? "text" : "password"}
          suffixIcon="eye"
          onClickSuffixIcon={() => {
            setVisiblePassword(!visiblePassword);
          }}
          props={{
            ...formik.getFieldProps("password"),
          }}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.password}</span>
          </div>
        )}
      </div>
      <div className="fv-row mb-8 mt-5">
        <TextField
          placeholder="Ulangi Password"
          classNames={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.confirmPassword && formik.errors.confirmPassword,
            },
            {
              "is-valid":
                formik.touched.confirmPassword &&
                !formik.errors.confirmPassword,
            }
          )}
          type={visiblePassword ? "text" : "password"}
          suffixIcon="eye"
          onClickSuffixIcon={() => {
            setVisiblePassword(!visiblePassword);
          }}
          props={{
            ...formik.getFieldProps("confirmPassword"),
          }}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.confirmPassword}</span>
          </div>
        )}
      </div>
      <div className="fv-row mb-8 mt-11">
        <TextField
          placeholder="No. WhatsApp"
          classNames={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.phoneNumber && formik.errors.phoneNumber,
            },
            {
              "is-valid":
                formik.touched.phoneNumber && !formik.errors.phoneNumber,
            }
          )}
          type="email"
          props={{
            autoComplete: "off",
            ...formik.getFieldProps("phoneNumber"),
          }}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.phoneNumber}</span>
          </div>
        )}
      </div>
      <div className="fv-row mb-8">
        <label
          className="form-check form-check-inline"
          htmlFor="kt_login_toc_agree"
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="kt_login_toc_agree"
            {...formik.getFieldProps("acceptTerms")}
          />
          <span className="fw-bold text-gray-700">
            Saya Menyetujui
            <Buttons
              mode="link"
              onClick={tncOnClick}
              classNames="ms-1 link-primary p-0"
            >
              Syarat & Ketentuan
            </Buttons>{" "}
            yang berlaku
          </span>
        </label>
      </div>
      <div className="d-grid mb-10">
        <Buttons
          type="button"
          disabled={
            disabled ||
            !formik.isValid ||
            !formik.dirty ||
            !formik.values.acceptTerms
          }
          onClick={() =>
            onClick &&
            onClick({
              firstName: formik.values.firstName,
              lastName: formik.values.lastName,
              email: formik.values.email,
              password: formik.values.password,
              phoneNumber: formik.values.phoneNumber,
            })
          }
        >
          Register
        </Buttons>
      </div>
      <div className="text-gray-500 text-center fw-semibold fs-6">
        Sudah punya akun?{" "}
        <Buttons mode="link" onClick={loginOnClick} classNames="link-primary">
          Login
        </Buttons>
      </div>
      {/* end::Form group */}
    </form>
  );
};
