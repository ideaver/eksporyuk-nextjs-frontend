import React, { useState } from "react";
import clsx from "clsx";
import { AppLogo } from "@/stories/atoms/AppLogo/AppLogo";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import Link from "next/link";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import * as Yup from "yup";
import { useFormik } from "formik";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email salah")
    .min(3, "Minimal 3 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Email diperlukan"),
});

interface ForgotPasswordProps {
  /**
   * Disabled Button
   */
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onResetClick?: (email: string | undefined) => void;
  /**
   * Optional click handler
   */
  onBackClick?: () => void;
}

/**
 * ForgotPassword Molecule Component
 */
export const ForgotPassword = ({ disabled, onResetClick, onBackClick }: ForgotPasswordProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="form w-100" noValidate id="kt_login_signin_form">
      <AppLogo classNames="mx-auto d-block " size="medium" />
      <div className="text-center mt-15">
        <h1 className="text-dark fw-bolder fs-2x mb-3">Lupa Password</h1>
        <h1 className="text-gray-500 fw-bold fs-5 mb-3">
          Silakan masukkan nama pengguna atau alamat e-mail Anda. Anda akan
          menerima pesan e-mail dengan instruksi tentang cara mengatur ulang
          kata sandi Anda.
        </h1>
      </div>
      {/* begin::Form group */}
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

      <div className="d-flex flex-row justify-content-center">
        <div className=" mb-10">
          <Buttons
            type="button"
            disabled={disabled || !formik.isValid || !formik.dirty}
            onClick={() => onResetClick && onResetClick(formik.values.email)}
          >
            Dapatkan Sandi Baru
          </Buttons>
        </div>
        <div className="ms-5"/>
        <div className=" mb-10">
          <Buttons
            type="button"
            buttonColor="secondary"
            onClick={onBackClick}
          >
            Kembali ke Login
          </Buttons>
        </div>
      </div>
      {/* end::Form group */}
    </form>
  );
};
