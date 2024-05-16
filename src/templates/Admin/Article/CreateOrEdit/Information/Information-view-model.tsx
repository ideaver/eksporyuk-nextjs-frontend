import { ArticleTypeEnum } from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeCategory,
  changeContent,
  changeStatus,
  changeThumbnail,
  changeTitle,
  changeUrlVideo,
} from "@/features/reducers/articles/articlesReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const breadcrumbs = [
  {
    title: "Menejemen Artikel",
    path: "/admin/articles",
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

const useInformationViewModel = () => {
  const typeOption = Object.entries(ArticleTypeEnum).map(([value, label]) => ({
    label: value,
    value: label,
  }));

  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.article.status);
  const thumbnail = useSelector((state: RootState) => state.article.thumbnail);
  const category = useSelector((state: RootState) => state.article.category);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeThumbnail(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (status: string) => {
    dispatch(changeStatus(status));
  };
  const handleCategoryChange = (status: string) => {
    dispatch(changeCategory(status));
  };

  const [inputTitle, setInputTitle] = useField(
    (state: RootState) => state.article.title,
    (value) => changeTitle(value)
  );
  const [inputUrlVideo, setInputUrlVideo] = useField(
    (state: RootState) => state.article.urlVideo,
    (value) => changeUrlVideo(value)
  );
  const [inputContent, setInputContent] = useField(
    (state: RootState) => state.article.content,
    (value) => changeContent(value)
  );

  return {
    category,
    handleCategoryChange,
    status,
    handleFileChange,
    handleStatusChange,
    thumbnail,
    inputContent,
    setInputContent,
    inputTitle,
    setInputTitle,
    inputUrlVideo,
    setInputUrlVideo,
    typeOption,
  };
};

export default useInformationViewModel;
