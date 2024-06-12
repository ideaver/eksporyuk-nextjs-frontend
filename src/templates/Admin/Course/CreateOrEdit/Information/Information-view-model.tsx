import {
  AffiliateCommissionTypeEnum,
  CourseLevelEnum,
  QueryMode,
  useGetAllListSubscribersQuery,
  useMentorFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeAffiliateCommission,
  changeAffiliateCommissionType,
  changeClassDescription,
  changeCourseAuthor,
  changeCourseLevel,
  changeCourseMentor,
  changeCourseName,
  changeDiscountPrice,
  changeErrorMessage,
  changeIntroVideo,
  changePrice,
  changeSubscriberListId,
} from "@/features/reducers/course/courseReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupBase, OptionsOrGroups } from "react-select";
export type OptionType = {
  value: string;
  label: string;
};

/**
 * custom hook for mentors dropdown
 * @returns loadOptions
 */
export const useMentorsDropdown = () => {
  const getMentors = useMentorFindManyQuery({
    variables: {
      take: 10,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) {
    const result =
      getMentors.data?.mentorFindMany?.map((mentor) => ({
        value: mentor.id,
        label: mentor.user.name,
      })) ?? [];

    const newOptions = result.filter(
      (option) =>
        !prevOptions.some(
          (prevOption) => (prevOption as OptionType).value === option.value
        )
    );

    await getMentors.refetch({
      skip: prevOptions.length,
      where: {
        user: {
          is: {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        },
      },
    });

    return {
      options: newOptions,
      hasMore: true,
    };
  }

  return { loadOptions };
};

/**
 * custom hook for mentor handler
 * @returns selectedMentor, setSelectedMentor, currentMentorSelector, addMentor, removeMentor
 */
export const AddMentorHandler = () => {
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const dispatch = useDispatch();
  const currentMentorSelector = useSelector(
    (state: RootState) => state.course.courseMentor
  );
  const [selectedMentor, setSelectedMentor] = useState<
    OptionType[] | undefined
  >(currentMentorSelector);

  const addMentor = (mentor: OptionType) => {
    if (isDetail) {
      return;
    }
    const updatedMentors = selectedMentor
      ? [...selectedMentor, mentor]
      : [mentor];

    setSelectedMentor(updatedMentors);

    dispatch(changeCourseMentor(updatedMentors));
  };

  const removeMentor = (index: number) => {
    if (isDetail) {
      return;
    }
    const updatedMentors = selectedMentor?.filter(
      (_, mentorIndex) => mentorIndex !== index
    );

    dispatch(changeCourseMentor(updatedMentors));
  };

  useEffect(() => {
    setSelectedMentor(currentMentorSelector);
  }, [currentMentorSelector]);

  return {
    selectedMentor,
    setSelectedMentor,
    currentMentorSelector,
    addMentor,
    removeMentor,
  };
};

/**
 * custom hook for field
 * @param selector
 * @param action
 * @returns
 */
const useField = (
  selector: (state: RootState) => string | number,
  action: (value: string) => UnknownAction
) => {
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const dispatch = useDispatch();
  const value = useSelector(selector);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (isDetail) {
      return;
    }

    let newValue: string;

    if (typeof event === "string") {
      newValue = event;
    } else {
      newValue = event.target.value;
    }

    dispatch(action(newValue));
  };

  return [value, handleChange];
};

/**
 * custom hook for class description
 * @returns
 */
const ClassDescriptionHandler = () => {
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const dispatch = useDispatch();
  const inputClassDescription = useSelector(
    (state: RootState) => state.course.classDescription
  );

  const setInputClassDescription = (value: string) => {
    if (isDetail) {
      return;
    }
    dispatch(changeClassDescription(value));
  };

  return { inputClassDescription, setInputClassDescription };
};

export const useAllListSubscriberDropdown = () => {
  const router = useRouter();
  const isDetail = router.query.action === "detail";
  const dispatch = useDispatch();
  const [inputSubscriberListId, setInputSubscriberListId] = useState<any>("");
  const subscriberListId = useSelector(
    (state: RootState) => state.course.subscriberListId
  );

  const getAllListSubscriber = useGetAllListSubscribersQuery(
    {
      onCompleted(data) {
        const result =
    data?.getAllListSubscriber?.map((list) => ({
          value: list.list_id,
          label: `${list.list_id} - ${list.list_name}`,
        })) ?? [];
              // Check if subscriberListId is not null
    if (subscriberListId) {
      // Search for the subscriberListId in the result
      const selectedOption = result.find(
        (option) => option.value === subscriberListId
      );
      // If found, set inputSubscriberListId to the found object
      if (selectedOption) {
        setInputSubscriberListId(selectedOption);
      }
    }
      },
    }
  );


  const handleInputSubscriberListId = (value: any) => {
    if (isDetail) {
      return;
    }
    setInputSubscriberListId(value);

    dispatch(changeSubscriberListId(value.value));
  };

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

  return {
    loadOptions,
    getAllListSubscriber,
    inputSubscriberListId,
    handleInputSubscriberListId,
  };
};

/**
 * custom hook for information view model
 * @returns
 */
const useInformationViewModel = () => {
  const { inputClassDescription, setInputClassDescription } =
    ClassDescriptionHandler();
  const [inputErrorMessage, setErrorMessage] = useField(
    (state: RootState) => state.course.errorMessage ?? "",
    (value) => changeErrorMessage(value)
  );
  const [inputClassName, setInputClassName] = useField(
    (state: RootState) => state.course.courseName,
    (value) => changeCourseName(value)
  );
  const [inputIntroVideo, setInputIntroVideo] = useField(
    (state: RootState) => state.course.introVideo,
    (value) => changeIntroVideo(value)
  );
  const [inputClassAuthor, setInputClassAuthor] = useField(
    (state: RootState) => state.course.courseAuthor,
    (value) => changeCourseAuthor(value)
  );
  const [inputClassPrice, setInputClassPrice] = useField(
    (state: RootState) => state.course.price,
    (value) => changePrice(value)
  );
  const [inputClassDiscountPrice, setInputClassDiscountPrice] = useField(
    (state: RootState) => state.course.discountPrice ?? "",
    (value) => changeDiscountPrice(value)
  );
  const [inputCourseAffiliateCommission, setInputCourseAffiliateCommission] =
    useField(
      (state: RootState) => state.course.affiliateCommission,
      (value) => changeAffiliateCommission(parseInt(value))
    );
  const [inputAffilaiteCommissionType, setInputAffilaiteCommissionType] =
    useField(
      (state: RootState) => state.course.affiliateCommissionType,
      (value) =>
        changeAffiliateCommissionType(value as AffiliateCommissionTypeEnum)
    );
  const [inputClassLevel, setInputClassLevel] = useField(
    (state: RootState) => state.course.courseLevel,
    (value) => changeCourseLevel(value as CourseLevelEnum)
  );

  return {
    inputClassName,
    setInputClassName,
    inputClassDescription,
    setInputClassDescription,
    inputIntroVideo,
    setInputIntroVideo,
    inputClassAuthor,
    setInputClassAuthor,
    inputClassPrice,
    setInputClassPrice,
    inputClassLevel,
    setInputClassLevel,
    inputCourseAffiliateCommission,
    setInputCourseAffiliateCommission,
    setInputClassDiscountPrice,
    inputClassDiscountPrice,
    inputAffilaiteCommissionType,
    setInputAffilaiteCommissionType,
    inputErrorMessage,
    setErrorMessage,
  };
};

export default useInformationViewModel;
