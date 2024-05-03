import { adminMenus } from "@/app/const/navigation";
import { setMenus } from "@/features/reducers/navigation/navigationReducer";
import { RegisterData } from "@/types/auth/auth-types";
import { MenuSection } from "@/types/navigation/menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";



const useAuthViewModel = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useDispatch(); // use the useDispatch hook
  const router = useRouter();

  const handleLoginSubmit = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      }); // 'credentials' should match the name of your credentials provider
      if (result?.ok) {
        router.push("/home");
        dispatch(setMenus(adminMenus)); // dispatch the setRole action with the user's role
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleRegisterSubmit = (data: RegisterData) => {
    // Registration logic here
  };

  const handleResetPasswordSubmit = (email: string | undefined) => {
    // Reset password logic here
  };

  const handleLogout = () => {
    signOut();
  };

  return {
    isLogin,
    isError,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleResetPasswordSubmit,
    handleLogout,
    session,
    status,
  };
};

export default useAuthViewModel;
