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
  const [emailName, setEmailName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [autoCapture, setAutoCapture] = useState("");

  const [sendEmail, setSendEmail] = useState("");
  const [sendSubject, setSendSubject] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleMailketingSettingChange = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {}
  };

  return {
    emailName,
    emailAddress,
    autoCapture,
    sendEmail,
    sendSubject,
    sendMessage,
    setEmailName,
    setEmailAddress,
    setAutoCapture,
    setSendEmail,
    setSendSubject,
    setSendMessage,
    isLoading,
    setIsLoading,
    handleMailketingSettingChange,
  };
};

export default useMailketingViewModel;
