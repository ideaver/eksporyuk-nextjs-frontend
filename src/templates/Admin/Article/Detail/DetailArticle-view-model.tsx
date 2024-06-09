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
  const [thumbnail, setThumbnail] = useState(
    data?.articleFindOne?.fileUrl?.[0]
  );
  const [content, setContent] = useState(data?.articleFindOne?.content);
  const [title, setTitle] = useState(data?.articleFindOne?.title);
  const [status, setStatus] = useState(data?.articleFindOne?.isActive);
  const [category, setCategory] = useState(
    data?.articleFindOne?.category?.map((val: any) => ({
      value: val?.id,
      label: val?.name,
    }))
  );
  const [target, setTarget] = useState(data?.articleFindOne?.target);
  const [urlVideo, setUrlVideo] = useState(
    data?.articleFindOne?.material?.path
  );

  return {
    urlVideo,
    thumbnail,
    content,
    title,
    status,
    category,
    target,
  };
};

export default useDetailArticleViewModel;
