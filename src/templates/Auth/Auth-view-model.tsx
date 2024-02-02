import { RegisterData } from "@/types/auth/auth-types";
import { useState } from "react";

const useAuthViewModel = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLoginSubmit = (
    email: string | undefined,
    password: string | undefined
  ) => {
    console.log("AUTH CLICK", email, password);
  };

  const handleRegisterSubmit = (data: RegisterData) => {
    console.log("REGISTER CLICK", data);
  };

  const handleResetPasswordSubmit = (email: string | undefined) => {
    console.log("RESET PASSWORD CLICK", email);
  };

  return {
    isLogin,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleResetPasswordSubmit,
  };
};

export default useAuthViewModel;
