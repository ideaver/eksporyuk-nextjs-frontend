import {
  FeedbackFindOneQuery,
  FeedbackUpdateOneMutation,
  useChatRoomCreateOneMutation,
  useFeedbackReplyViaEmailMutation,
  useFeedbackUpdateOneMutation,
  useFollowUpDeleteOneMutation,
  useFollowUpFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { RootState } from "@/app/store/store";
import {
  changeContent,
  changeFollowUpCoupon,
  changeFollowUpDate,
  changeFollowUpEmail,
  changeFollowUpName,
  changeFollowUpPhone,
  changeFollowUpTamplate,
  changeId,
  changeName,
  changeSelectedFollwUpValue,
} from "@/features/reducers/followup/followupReducer";
import { MutationFunctionOptions } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const breadcrumbs = [
  {
    title: "Manajemen Feedback",
    path: "/admin/feedback",
    isSeparator: false,
    isActive: false,
  },

  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
  {
    title: "Feedback & Reports",
    path: "/admin/feedback",
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
export interface IFeedbackDetail {
  id: string | string[] | undefined;
  data: FeedbackFindOneQuery;
  refetch?: any;
  feedbackUpdateMutation?: MutationFunctionOptions<FeedbackUpdateOneMutation>;
}

const useFeedbackDetailViewModel = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const followUpState = useSelector((state: RootState) => state.followUp);
  const dispatch = useDispatch();

  const [loadingLiveChat, setLoadingLiveChat] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [replyViaEmail] = useFeedbackReplyViaEmailMutation();
  const [replyViaLiveChat] = useChatRoomCreateOneMutation();

  const [feedbackUpdateMutation, response] = useFeedbackUpdateOneMutation();
  const handleUpdateFeedbackEmail = async (id: number) => {
    try {
      await feedbackUpdateMutation({
        variables: {
          where: {
            id: id,
          },
          data: {
            resolvedBy: {
              connect: {
                id: session?.user.id,
              },
            },
            feedbackReplied: {
              set: message,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.reload();
    }
  };
  const followUpFindMany = useFollowUpFindManyQuery();

  const handleFollupChange = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    dispatch(changeSelectedFollwUpValue(event.target.value));

    const filterContent = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name == event.target.value
    )[0];
    dispatch(changeFollowUpTamplate(filterContent?.content));
  };

  const [followUpDeleteOne] = useFollowUpDeleteOneMutation();

  const handleSendFollowUp = () => {
    const contentReplaced = followUpState.followUpTamplate
      ?.replace(/\[\[nama\]\]/g, `${followUpState.name}`)
      .replace(/\[\[tanggal\]\]/g, formatDate(followUpState.date))
      .replace(/\[\[email\]\]/g, `${followUpState.email}`)
      .replace(/\[\[nomor-telepon\]\]/g, `${followUpState.phone}`)
      .replace(/\[\[kupon\]\]/g, `--`)
      .replace(/\[\[nama-produk\]\]/g, `--`)
      .replace(/\[\[total-order\]\]/g, `--`)
      .replace(/\[\[jenis-produk\]\]/g, `--`)
      .replace(/\[\[id-invoice-produk\]\]/g, `--`);
    const encodedMessage = encodeURIComponent(`${contentReplaced}`);

    return `https://web.whatsapp.com/send?phone=${followUpState.phone}&text=${encodedMessage}`;
  };

  const handleChangeFollowUpState = (data: {
    name: string;
    date: string;
    email: string;
    phone: string;
    coupon: string;
  }) => {
    dispatch(changeFollowUpName(data.name));
    dispatch(changeFollowUpEmail(data.email));
    dispatch(changeFollowUpDate(data.date));
    dispatch(changeFollowUpCoupon(data.coupon));
    dispatch(changeFollowUpPhone(data.phone));
  };

  const handleDeleteFollowUp = async (name: string) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];

    try {
      await followUpDeleteOne({
        variables: {
          where: {
            id: editFolup?.id,
          },
        },
      });
      await followUpFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditState = (name: any) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];
    console.log(editFolup);
    dispatch(changeName(`${editFolup?.name}`));
    dispatch(changeContent(`${editFolup?.content}`));
    dispatch(changeId(editFolup?.id as number));
  };

  return {
    followUpFindMany,
    handleUpdateFeedbackEmail,
    loadingLiveChat,
    setLoadingLiveChat,
    message,
    subject,
    setMessage,
    setSubject,
    replyViaLiveChat,
    replyViaEmail,
    feedbackUpdateMutation,
    response,
    handleChangeFollowUpState,
    handleDeleteFollowUp,
    handleEditState,
    handleSendFollowUp,
    handleFollupChange,
  };
};

export default useFeedbackDetailViewModel;
