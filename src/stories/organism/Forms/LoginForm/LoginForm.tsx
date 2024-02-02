import React, { useState } from "react";
import clsx from "clsx";
import { AppLogo } from "@/stories/atoms/AppLogo/AppLogo";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import Link from "next/link";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import * as Yup from "yup";
import { useFormik } from "formik";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email salah")
    .min(3, "Minimal 3 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Email diperlukan"),
  password: Yup.string()
    .min(3, "Minimal 3 simbol")
    .max(50, "Maksimal 50 simbol")
    .required("Password diperlukan"),
});

interface LoginFormProps {
  /**
   * Disabled Button
   */
  disabled?: boolean;
  /**
   * Forgot Password Url
   */
  forgotPasswordOnClick?: () => void;
  /**
   * Register url
   */
  registerOnClick?: () => void;
  /**
   * Optional click handler
   */
  onClick?: (email: string | undefined, password: string | undefined) => void;
}

/**
 * LoginForm Molecule Component
 */
export const LoginForm = ({
  disabled,
  onClick,
  forgotPasswordOnClick,
  registerOnClick,
}: LoginFormProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="form w-100" noValidate id="kt_login_signin_form">
      <AppLogo classNames="mx-auto d-block " size="medium" />
      <div className="text-center mt-15">
        <h1 className="text-dark fw-bolder fs-2x mb-3">Login</h1>
      </div>
      {/* begin::Form group */}
      <div className="fv-row mb-8 mt-11">
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
          {...formik.getFieldProps("password")}
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
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        {/* begin::Link */}
        <Buttons mode="link" onClick={forgotPasswordOnClick} classNames="link-primary">
          Lupa Password?
        </Buttons>
        {/* end::Link */}
      </div>
      <div className="d-grid mb-10">
        <Buttons
          type="button"
          disabled={disabled || !formik.isValid || !formik.dirty}
          onClick={() =>
            onClick && onClick(formik.values.email, formik.values.password)
          }
        >
          Login
        </Buttons>
      </div>
      <div className="text-gray-500 text-center fw-semibold fs-6">
        Belum punya akun?{" "}
        <Buttons mode="link" onClick={registerOnClick} classNames="link-primary">
          Daftar Sekarang
        </Buttons>
      </div>
      {/* end::Form group */}
    </form>
  );
};
