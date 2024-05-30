import {
  FeedbackFindOneQuery,
  FeedbackUpdateOneMutation,
  useChatRoomCreateOneMutation,
  useFeedbackReplyViaEmailMutation,
  useFeedbackUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { MutationFunctionOptions } from "@apollo/client";
import { useState } from "react";

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
  const [loadingLiveChat, setLoadingLiveChat] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [replyViaEmail] = useFeedbackReplyViaEmailMutation();
  const [replyViaLiveChat] = useChatRoomCreateOneMutation();

  const [feedbackUpdateMutation, response] = useFeedbackUpdateOneMutation();

  return {
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
  };
};

export default useFeedbackDetailViewModel;
