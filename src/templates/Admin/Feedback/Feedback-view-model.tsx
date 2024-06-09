import {
  FeedbackCategoryTypeEnum,
  QueryMode,
  SortOrder,
  useFeedbackFindLengthQuery,
  useFeedbackFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type TFilter = "ALL" | "UNSOLVED" | "SOLVED" | "UNREADED" | "READED";

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
];

const useCategoryLength = () => {
  const categoryLength = useFeedbackFindLengthQuery();
  const categoryAll = categoryLength.data?.feedbackFindMany?.length;
  const categoryOrder = categoryLength.data?.feedbackFindMany?.filter(
    (e) => e.feedbackCategory == FeedbackCategoryTypeEnum.UnableToPlaceOrder
  ).length;
  const categoryCourse = categoryLength.data?.feedbackFindMany?.filter(
    (e) => e.feedbackCategory == FeedbackCategoryTypeEnum.CourseRelatedIssues
  ).length;
  const categoryPayment = categoryLength.data?.feedbackFindMany?.filter(
    (e) => e.feedbackCategory == FeedbackCategoryTypeEnum.PaymentRelatedIssues
  ).length;
  const categoryOther = categoryLength.data?.feedbackFindMany?.filter(
    (e) => e.feedbackCategory == FeedbackCategoryTypeEnum.OtherProblems
  ).length;
  const categorySuggestion = categoryLength.data?.feedbackFindMany?.filter(
    (e) => e.feedbackCategory == FeedbackCategoryTypeEnum.Suggestions
  ).length;
  return {
    categoryAll,
    categoryCourse,
    categoryOrder,
    categoryOther,
    categoryPayment,
    categorySuggestion,
  };
};

interface PaginationProps {
  feedbackTake: number;
  feedbackSkip: number;
  feedbackFindSearch: string | undefined;
  setFeedbackTake: Dispatch<SetStateAction<number>>;
  setFeedbackSkip: Dispatch<SetStateAction<number>>;
  filter: TFilter;
  feedbackCategory: "ALL" | FeedbackCategoryTypeEnum;
}

const usePagination = ({
  feedbackTake,
  feedbackSkip,
  feedbackFindSearch,
  setFeedbackSkip,
  setFeedbackTake,
  filter,
  feedbackCategory,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const feedbackLength = useFeedbackFindLengthQuery({
    variables: {
      where: {
        OR: [
          {
            content: {
              contains: feedbackFindSearch,
              mode: QueryMode.Insensitive,
            },
            feedbackCategory: {
              equals:
                feedbackCategory == "ALL"
                  ? null
                  : (feedbackCategory as FeedbackCategoryTypeEnum),
            },
            isCleared: {
              equals:
                filter == "SOLVED" ? true : filter == "UNSOLVED" ? false : null,
            },
            isRead: {
              equals:
                filter == "READED" ? true : filter == "UNREADED" ? false : null,
            },
          },
          {
            user: {
              is: {
                name: {
                  contains: feedbackFindSearch,
                  mode: QueryMode.Insensitive,
                },
              },
            },
            feedbackCategory: {
              equals:
                feedbackCategory == "ALL"
                  ? null
                  : (feedbackCategory as FeedbackCategoryTypeEnum),
            },
            isCleared: {
              equals:
                filter == "SOLVED" ? true : filter == "UNSOLVED" ? false : null,
            },
            isRead: {
              equals:
                filter == "READED" ? true : filter == "UNREADED" ? false : null,
            },
          },
        ],
      },
    },
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFeedbackSkip((page - 1) * feedbackTake);
    // if (currentPage >= 2) {
    //   setArticleFindSkip(0);
    // }
  };

  // const length: any = feedbackLength.data?.feedbackFindMany?.length;

  const calculateTotalPage = () => {
    return Math.ceil(
      (feedbackLength.data?.feedbackFindMany?.length ?? 0) / feedbackTake
    );
  };
  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
  };
};

const useFeedbackViewModel = () => {
  const [feedbackTake, setFeedbackTake] = useState<number>(10);
  const [feedbackSkip, setFeedbackSkip] = useState<number>(0);
  const [filter, setFilter] = useState<TFilter>("ALL");
  const feedbackCategoryState = useSelector(
    (state: RootState) => state.feedback.feedbackCategoryType
  );
  const [feedbackFindSearch, setFeedbackFindSearch] = useState<string>();
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);

  const feedbackFindMany = useFeedbackFindManyQuery({
    variables: {
      take: parseInt(feedbackTake.toString()),
      skip: feedbackSkip,
      orderBy: [
        {
          createdAt: orderBy,
        },
      ],
      where: {
        OR: [
          {
            content: {
              contains: feedbackFindSearch,
              mode: QueryMode.Insensitive,
            },
            feedbackCategory: {
              equals:
                feedbackCategoryState == "ALL"
                  ? null
                  : (feedbackCategoryState as FeedbackCategoryTypeEnum),
            },
            isCleared: {
              equals:
                filter == "SOLVED" ? true : filter == "UNSOLVED" ? false : null,
            },
            isRead: {
              equals:
                filter == "READED" ? true : filter == "UNREADED" ? false : null,
            },
          },
          {
            user: {
              is: {
                name: {
                  contains: feedbackFindSearch,
                  mode: QueryMode.Insensitive,
                },
              },
            },
            feedbackCategory: {
              equals:
                feedbackCategoryState == "ALL"
                  ? null
                  : (feedbackCategoryState as FeedbackCategoryTypeEnum),
            },
            isCleared: {
              equals:
                filter == "SOLVED" ? true : filter == "UNSOLVED" ? false : null,
            },
            isRead: {
              equals:
                filter == "READED" ? true : filter == "UNREADED" ? false : null,
            },
          },
        ],
      },
    },
  });

  const { currentPage, setCurrentPage, handlePageChange, calculateTotalPage } =
    usePagination({
      feedbackSkip,
      feedbackTake,
      feedbackFindSearch,
      setFeedbackSkip,
      setFeedbackTake,
      filter,
      feedbackCategory: feedbackCategoryState,
    });

  // useEffect(() => {
  //   if (feedbackFindSearch?.length !== 0 || filter != "ALL") {
  //     setCurrentPage(1);
  //     setFeedbackSkip(0);
  //     feedbackFindMany.refetch();
  //   }
  // }, [feedbackFindSearch, setCurrentPage, feedbackFindMany, filter]);

  const {
    categoryAll,
    categoryCourse,
    categoryOrder,
    categoryOther,
    categoryPayment,
    categorySuggestion,
  } = useCategoryLength();

  return {
    feedbackTake,
    orderBy,
    setOrderBy,
    feedbackFindMany,
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    setFeedbackFindSearch,
    setFeedbackSkip,
    setFeedbackTake,
    setFilter,
    filter,
    categoryAll,
    categoryCourse,
    categoryOrder,
    categoryOther,
    categoryPayment,
    categorySuggestion,
  };
};

export default useFeedbackViewModel;
