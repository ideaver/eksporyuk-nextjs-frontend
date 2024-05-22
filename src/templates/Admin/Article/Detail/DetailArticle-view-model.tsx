import { ArticleFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { useState } from "react";

export interface IDetailArticle {
  id: string | string[] | undefined;
  data: ArticleFindOneQuery | undefined;
}

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

const useDetailArticleViewModel = ({ id, data }: IDetailArticle) => {
  const articleData = data?.articleFindOne;
  const [thumbnail, setThumbnail] = useState(articleData?.fileUrl?.[0]);
  const [content, setContent] = useState(articleData?.content);
  const [title, setTitle] = useState(articleData?.title);
  const [status, setStatus] = useState(articleData?.isActive);

  const [category, setCategory] = useState(
    articleData?.category?.map((val: any) => ({
      value: val?.id,
      label: val?.name,
    }))
  );

  return {
    thumbnail,
    content,
    title,
    status,
    category,
  };
};

export default useDetailArticleViewModel;
