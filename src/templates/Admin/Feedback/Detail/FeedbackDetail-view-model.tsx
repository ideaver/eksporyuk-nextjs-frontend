import {
  FeedbackFindOneQuery,
  FeedbackUpdateOneMutation,
  useFeedbackUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { MutationFunctionOptions } from "@apollo/client";

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
  const [feedbackUpdateMutation, response] = useFeedbackUpdateOneMutation();
  return {
    feedbackUpdateMutation,
    response,
  };
};

export default useFeedbackDetailViewModel;
