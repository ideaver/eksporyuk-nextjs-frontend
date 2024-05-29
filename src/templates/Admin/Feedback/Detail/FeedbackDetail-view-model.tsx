import {
  FeedbackFindOneQuery,
  FeedbackUpdateOneMutation,
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
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [replyViaEmail] = useFeedbackReplyViaEmailMutation();

  const [feedbackUpdateMutation, response] = useFeedbackUpdateOneMutation();
  return {
    replyViaEmail,
    subject,
    setSubject,
    message,
    setMessage,
    feedbackUpdateMutation,
    response,
  };
};

export default useFeedbackDetailViewModel;
