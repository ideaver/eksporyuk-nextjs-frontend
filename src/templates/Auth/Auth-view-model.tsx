import { adminMenus } from "@/app/const/navigation";
import {
  AuthLoginMutation,
  useAuthLoginMutation,
  UserRoleEnum,
} from "@/app/service/graphql/gen/graphql";
import { setMenus } from "@/features/reducers/navigation/navigationReducer";
import { RegisterData } from "@/types/auth/auth-types";
import { ApolloError, FetchResult } from "@apollo/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useAuthViewModel = () => {
  // Local state
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  // Session State
  const { data: session, status } = useSession();
  // Navigation Redux
  const dispatch = useDispatch();
  // Routing
  const router = useRouter();
  // GraphQL Mutation
  const [authLoginMutation] = useAuthLoginMutation();

  const handleAuthLoginMutation = async (email: string, password: string) => {
    const data = await authLoginMutation({
      variables: {
        loginArgs: {
          email: email,
          password: password,
        },
      },
    });
    return data;
  };

  const handleSignIn = async (
    data: FetchResult<AuthLoginMutation> | undefined,
    password: string
  ) => {
    const fetchResult = data?.data;
    var result;
    if (process.env.NEXT_PUBLIC_MAINTENANCE == "false") {
      result = await signIn("credentials", {
        id: fetchResult?.authLogin?.user?.id!,
        name: fetchResult?.authLogin?.user?.name!,
        email: fetchResult?.authLogin?.user?.email!,
        password: password,
        role: fetchResult?.authLogin?.user?.role,
        image: fetchResult?.authLogin?.user?.avatarImageId,
        token: fetchResult?.authLogin?.accessToken,
        redirect: false,
      });
    } else {
      result = await signIn("credentials", {
        id: "1",
        name: "admin",
        email: "admin@mail.com",
        password: "admin",
        role: "ADMIN",
        image: "/media/avatars/300-1.jpg",
        token: "null",
        redirect: false,
      });
    }

    return result;
  };

  const handleLoginSubmit = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    // DEV  ONLY
    if (process.env.NEXT_PUBLIC_MAINTENANCE == "false") {
      try {
        setIsLoading(true);
        const data = await handleAuthLoginMutation(email!, password!);
        const fetchResult = data.data;
        if (
          fetchResult?.authLogin?.user.admin !== null
          // fetchResult.authLogin.user.role === UserRoleEnum.Admin
        ) {
          const result = await handleSignIn(data, password!);
          setIsLoading(false);
          if (result?.ok) {
            router.push("/home");
            dispatch(setMenus(adminMenus));
          } else {
            setErrorMessage(
              "Terjadi Kesalahan saat Login, periksa Email dan password anda"
            );
          }
        } else {
          setIsLoading(false);
          setErrorMessage(`Anda tidak memiliki akses ke halaman ini`);
        }
      } catch (error: ApolloError | any) {
        setIsLoading(false);
        console.log("Try Catch Error:", error);
        setErrorMessage(`Terjadi Kesalahan saat Login, ${error.message}`);
      }
    } else {
      await handleSignIn(undefined, password!);
      router.push("/home");
      dispatch(setMenus(adminMenus));
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
    errorMessage,
    isLoading,
    setIsLoading,
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
