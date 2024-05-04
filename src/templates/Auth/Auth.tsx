import AuthLayout from "@/components/layouts/Auth/AuthLayout";
import { ForgotPassword } from "@/stories/organism/Forms/ForgotPassword/ForgotPassword";
import { LoginForm } from "@/stories/organism/Forms/LoginForm/LoginForm";
import { RegisterForm } from "@/stories/organism/Forms/RegisterForm/RegisterForm";
import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import useAuthViewModel from "./Auth-view-model";

const AuthPage: React.FC = () => {
  const {
    isLogin,
    errorMessage,
    isLoading,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleResetPasswordSubmit,
  } = useAuthViewModel();

  return (
    <LoadingOverlay active={isLoading} spinner text="Mohon Tunggu...">
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
            errorMessage={errorMessage}
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
    </LoadingOverlay>
  );
};

export default AuthPage;
