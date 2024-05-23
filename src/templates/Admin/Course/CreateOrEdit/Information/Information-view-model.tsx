import {
  QueryMode,
  useMentorFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeClassAuthor,
  changeClassDescription,
  changeClassName,
  changeIntroVideo,
} from "@/features/reducers/products/productReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupBase, OptionsOrGroups } from "react-select";
type OptionType = {
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
      take: 3,
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
      options: result,
      hasMore: true,
    };
  }

  return { loadOptions };
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
  const initialValue = useSelector(selector);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(action(event.target.value));
  };

  return [value, handleChange];
};

/**
 * custom hook for class description
 * @returns
 */
const ClassDescriptionHandler = () => {
  const dispatch = useDispatch();
  const currentClassDescription = useSelector(
    (state: RootState) => state.product.classDescription
  );

  const [inputClassDescription, setInputClassDescription] = useState(
    currentClassDescription
  );

  useEffect(() => {
    dispatch(changeClassDescription(inputClassDescription));
  }, [inputClassDescription, dispatch]);

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
    (state: RootState) => state.product.className,
    (value) => changeClassName(value)
  );

  const [inputIntroVideo, setInputIntroVideo] = useField(
    (state: RootState) => state.product.introVideo,
    (value) => changeIntroVideo(value)
  );
  const [inputClassAuthor, setInputClassAuthor] = useField(
    (state: RootState) => state.product.classAuthor,
    (value) => changeClassAuthor(value)
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
  };
};

export default useInformationViewModel;
