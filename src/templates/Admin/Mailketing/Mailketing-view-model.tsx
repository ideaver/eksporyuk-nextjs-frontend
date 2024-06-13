import {
  UserRoleEnum,
  useGetAllListSubscribersQuery,
  usePlatformSettingFindFirstQuery,
  usePlatformSettingUpdateOneMutation,
  useSendMailForMailketingMutation,
} from "@/app/service/graphql/gen/graphql";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GroupBase, OptionsOrGroups } from "react-select";

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

type OptionType = {
  value: string;
  label: string;
};

export const useAllListSubscriberDropdown = () => {
  const getAllListSubscriber = useGetAllListSubscribersQuery();

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) {
    const result =
      getAllListSubscriber.data?.getAllListSubscriber?.map((list) => ({
        value: list.list_id,
        label: `${list.list_id} - ${list.list_name}`,
      })) ?? [];
    await getAllListSubscriber.refetch();

    return {
      options: result,
      hasMore: false,
    };
  }

  return { loadOptions, getAllListSubscriber };
};

const useMailketingViewModel = () => {
  const router = useRouter();

  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const [emailName, setEmailName] = useState<string | undefined | null>("");
  const [emailAddress, setEmailAddress] = useState<string | undefined | null>(
    ""
  );
  const [listValue, setListValue] = useState<any>("");
  const [tokenAPI, setTokenAPI] = useState<string | undefined | null>("");
  const [starsenderTokenAPI, setStarsenderTokenAPI] = useState<
    string | undefined | null
  >("");

  const [sendEmail, setSendEmail] = useState<string[]>([""]);
  const [sendSubject, setSendSubject] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [userRole, setUserRole] = useState<UserRoleEnum>(UserRoleEnum.Student);
  const [sendOption, setSendOption] = useState("email");

  const [isLoading, setIsLoading] = useState(false);
  const [swalProps, setSwalProps] = useState({});

  const platformSetting = usePlatformSettingFindFirstQuery({
    onCompleted: (value) => {
      setEmailName(value.platformSettingFindFirst?.senderName);
      setEmailAddress(value.platformSettingFindFirst?.senderEmail);
      setListValue(value.platformSettingFindFirst?.listIdMailketingSubscriber);
      setTokenAPI(value.platformSettingFindFirst?.senderEmailApiToken);
      setStarsenderTokenAPI(value.platformSettingFindFirst?.starSenderApiKey);
    },
  });
  const [paltformSettingUpdateOne, response] =
    usePlatformSettingUpdateOneMutation();

  const [sendMailForMailketing] = useSendMailForMailketingMutation();

  const handlePlatformSettingUpdateOne = async () => {
    try {
      await paltformSettingUpdateOne({
        variables: {
          where: {
            id: 1,
          },
          data: {
            senderEmail: {
              set: emailAddress,
            },
            senderName: {
              set: emailName,
            },
            listIdMailketingSubscriber: {
              set: listValue?.value,
            },
          },
        },
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAPITokenUpdate = async () => {
    try {
      await paltformSettingUpdateOne({
        variables: {
          where: {
            id: 1,
          },
          data: {
            senderEmailApiToken: {
              set: tokenAPI,
            },
          },
        },
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAPITokenStarsenderUpdate = async () => {
    try {
      await paltformSettingUpdateOne({
        variables: {
          where: {
            id: 1,
          },
          data: {
            starSenderApiKey: {
              set: starsenderTokenAPI,
            },
          },
        },
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMailketingSend = async () => {
    setIsLoading(true);
    try {
      await sendMailForMailketing({
        variables: {
          sendMailForMailketing: {
            senderEmail: platformSetting.data?.platformSettingFindFirst
              ?.senderEmail as string,
            senderName: platformSetting.data?.platformSettingFindFirst
              ?.senderName as string,
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
      // setEmailName("Admin EksporYuk");
      // setEmailAddress("admin@eksporyuk.com");
      setSendEmail([""]);
      setSendSubject("");
      setSendMessage("");
      setUserRole(UserRoleEnum.Student);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      emailName !==
        platformSetting.data?.platformSettingFindFirst?.senderName ||
      emailAddress !==
        platformSetting.data?.platformSettingFindFirst?.senderEmail
    ) {
      setSyncMessage(`press "Simpan Pengaturan" to sync`);
    } else {
      setSyncMessage(null);
    }
  }, [
    emailName,
    emailAddress,
    platformSetting.data?.platformSettingFindFirst?.senderName,
    platformSetting.data?.platformSettingFindFirst?.senderEmail,
  ]);

  return {
    handleAPITokenStarsenderUpdate,
    starsenderTokenAPI,
    setStarsenderTokenAPI,
    handleAPITokenUpdate,
    tokenAPI,
    setTokenAPI,
    syncMessage,
    handlePlatformSettingUpdateOne,
    listValue,
    setListValue,
    paltformSettingUpdateOne,
    platformSetting,
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
