import AuthLayout from "@/components/layouts/Auth/AuthLayout";
import { ForgotPassword } from "@/stories/organism/Forms/ForgotPassword/ForgotPassword";
import { LoginForm } from "@/stories/organism/Forms/LoginForm/LoginForm";
import { RegisterForm } from "@/stories/organism/Forms/RegisterForm/RegisterForm";
import React from "react";
import useAuthViewModel from "./Auth-view-model";

const AuthPage: React.FC = () => {
  const {
    isLogin,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleResetPasswordSubmit,
  } = useAuthViewModel();

  return (
    <AuthLayout>
      {isForgotPassword ? (
        <ForgotPassword
          onBackClick={() => {
            setIsForgotPassword(false);
          }}
          onResetClick={handleResetPasswordSubmit}
        />
      ) : isLogin ? (
        <LoginForm
          forgotPasswordOnClick={() => {
            setIsForgotPassword(true);
          }}
          registerOnClick={() => {
            setIsLogin(false);
          }}
          onClick={handleLoginSubmit}
        />
      ) : (
        <RegisterForm
          loginOnClick={() => {
            setIsLogin(true);
          }}
          onClick={handleRegisterSubmit}
        />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
