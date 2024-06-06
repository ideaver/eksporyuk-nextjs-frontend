import {
  UserRoleEnum,
  useSendMailForMailketingMutation,
} from "@/app/service/graphql/gen/graphql";
import { ApolloError } from "@apollo/client";
import { useState } from "react";

export const breadcrumbs = [
  {
    title: "Pengaturan Mailketing",
    path: "/admin/mailketing",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const useMailketingViewModel = () => {
  const [emailName, setEmailName] = useState("Admin EksporYuk");
  const [emailAddress, setEmailAddress] = useState("admin@eksporyuk.com");

  const [sendEmail, setSendEmail] = useState<string[]>([""]);
  const [sendSubject, setSendSubject] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [userRole, setUserRole] = useState<UserRoleEnum>(UserRoleEnum.Student);
  const [sendOption, setSendOption] = useState("email");

  const [isLoading, setIsLoading] = useState(false);

  const [swalProps, setSwalProps] = useState({});

  const [sendMailForMailketing] = useSendMailForMailketingMutation();

  const handleMailketingSend = async () => {
    setIsLoading(true);
    try {
      await sendMailForMailketing({
        variables: {
          sendMailForMailketing: {
            senderEmail: emailAddress,
            senderName: emailName,
            receiverEmail: sendOption === "email" ? sendEmail : [],
            subject: sendSubject,
            userRole: sendOption === "role" ? userRole : null,
            content: sendMessage,
          },
        },
      });
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "Berhasil terkirim",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setEmailName("Admin EksporYuk");
      setEmailAddress("admin@eksporyuk.com");
      setSendEmail([""]);
      setSendSubject("");
      setSendMessage("");
      setUserRole(UserRoleEnum.Student);
      setIsLoading(false);
    }
  };

  return {
    setSwalProps,
    swalProps,
    sendOption,
    setSendOption,
    userRole,
    setUserRole,
    emailName,
    emailAddress,
    sendEmail,
    sendSubject,
    sendMessage,
    setEmailName,
    setEmailAddress,
    setSendEmail,
    setSendSubject,
    setSendMessage,
    isLoading,
    setIsLoading,
    handleMailketingSend,
  };
};

export default useMailketingViewModel;
