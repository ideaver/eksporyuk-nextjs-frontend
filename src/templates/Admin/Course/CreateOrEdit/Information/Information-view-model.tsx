import {
  CourseLevelEnum,
  QueryMode,
  useMentorFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeClassDescription,
  changeCourseAuthor,
  changeCourseLevel,
  changeCourseMentor,
  changeCourseName,
  changeIntroVideo,
  changePrice,
} from "@/features/reducers/course/courseReducer";
import { UnknownAction } from "@reduxjs/toolkit";
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
  const dispatch = useDispatch();
  const currentMentorSelector = useSelector(
    (state: RootState) => state.course.courseMentor
  );
  const [selectedMentor, setSelectedMentor] = useState<
    OptionType[] | undefined
  >(currentMentorSelector);

  const addMentor = (mentor: OptionType) => {
    const updatedMentors = selectedMentor
      ? [...selectedMentor, mentor]
      : [mentor];

    setSelectedMentor(updatedMentors);

    dispatch(changeCourseMentor(updatedMentors));
  };

  const removeMentor = (index: number) => {
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
  selector: (state: RootState) => string,
  action: (value: string) => UnknownAction
) => {
  const dispatch = useDispatch();
  const value = useSelector(selector);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
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
  const dispatch = useDispatch();
  const inputClassDescription = useSelector(
    (state: RootState) => state.course.classDescription
  );

  const setInputClassDescription = (value: string) => {
    dispatch(changeClassDescription(value));
  };

  return { inputClassDescription, setInputClassDescription };
};

/**
 * custom hook for information view model
 * @returns
 */
const useInformationViewModel = () => {
  const { inputClassDescription, setInputClassDescription } =
    ClassDescriptionHandler();
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
  };
};

export default useInformationViewModel;
