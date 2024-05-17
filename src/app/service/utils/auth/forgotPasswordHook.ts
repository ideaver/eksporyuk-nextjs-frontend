import { useForgotPasswordMutation } from "@/app/service/graphql/gen/graphql";
import { useState } from "react";

const useForgotPassword = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordModalLoading, setForgotPasswordModalLoading] =
    useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleForgotPassword = async (email: string) => {
    setForgotPasswordModalLoading(true);
    try {
      const response = await forgotPasswordMutation[0]({
        variables: {
          email: email,
        },
      });
      setForgotPasswordModalLoading(false);
      if (response.data?.forgotPassword) {
        setShowForgotPasswordModal(false);
        setForgotPasswordSuccess(true);

        setTimeout(() => {
          setForgotPasswordSuccess(false);
        }, 5000);
      }
    } catch (error: any) {
      setForgotPasswordModalLoading(false);
      setShowForgotPasswordModal(false);
      setForgotPasswordError(error.toString());
      setTimeout(() => {
        setForgotPasswordSuccess(false);
      }, 5000);
    }
  };

  return {
    showForgotPasswordModal,
    setShowForgotPasswordModal,
    forgotPasswordModalLoading,
    forgotPasswordSuccess,
    handleForgotPassword,
    forgotPasswordError,
  };
};

export default useForgotPassword;
