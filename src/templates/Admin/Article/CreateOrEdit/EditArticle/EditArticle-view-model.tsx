import {
  ArticleFindOneQuery,
  FileWhereInput,
  useArticleUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import useArticleViewModel from "../../Article-view-model";

export interface IEditArticle {
  id: string | string[] | undefined;
  data: ArticleFindOneQuery | undefined;
}

interface dataProps {
  content: string | undefined;
  status: string | undefined;
  title: string | undefined;
  category:
    | {
        value: any;
        label: any;
      }[]
    | undefined;
  fileUrl:
    | {
        __typename?: "File" | undefined;
        path: string;
      }[]
    | null
    | undefined;
  createdByAdminId: string | undefined;
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

const useArticleForm = ({
  data,
  content,
  status,
  category,
  title,
  id,
  createdByAdminId,
  fileUrl,
}: IEditArticle & dataProps) => {
  const articleData = data?.articleFindOne;
  const router = useRouter();
  //refetch
  const { articleFindMany } = useArticleViewModel();

  const editedFile = fileUrl?.map((e) => ({ path: e.path }));
  const editedCategory = category?.map((e) => ({ id: e.value as number }));
  //mutation
  const [articleUpdateOne, response] = useArticleUpdateOneMutation();

  const articleSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Title diperlukan"),
    content: Yup.string()
      .min(20, "Minimal 20 simbol")
      .required("Content diperlukan"),
  });

  const articleForm = useFormik({
    initialValues: {
      content: articleData?.content,
      title: articleData?.title,
    },
    validationSchema: articleSchema,
    onSubmit: async () => {
      try {
        await articleUpdateOne({
          variables: {
            where: {
              id: Number(id),
            },
            data: {
              category: {
                connect: editedCategory,
              },
              content: {
                set: content,
              },
              createdByAdmin: {
                connect: {
                  id: createdByAdminId,
                },
              },
              isActive: {
                set: status === "published" ? true : false,
              },
              title: {
                set: title,
              },
              fileUrl: {
                connect: editedFile as any[],
              },
            },
          },
          onCompleted: () => {
            articleFindMany.refetch();
          },
        });
        await articleFindMany.refetch();
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/admin/articles");
      }
    },
  });
  return { articleForm, response };
};

const useEditArticleViewModel = ({ data, id }: IEditArticle) => {
  const articleData = data?.articleFindOne;
  const [thumbnail, setThumbnail] = useState(articleData?.fileUrl?.[0]);
  const [content, setContent] = useState(articleData?.content);
  const [title, setTitle] = useState(articleData?.title);
  const [status, setStatus] = useState(
    articleData?.isActive === true ? "published" : "private"
  );

  const [category, setCategory] = useState(
    articleData?.category?.map((val: any) => ({
      value: val?.id,
      label: val?.name,
    }))
  );

  const { articleForm: formik, response } = useArticleForm({
    data,
    id,
    content,
    title,
    status,
    category,
    fileUrl: articleData?.fileUrl,
    createdByAdminId: articleData?.createdByAdminId,
  });

  return {
    content,
    setContent,
    title,
    setTitle,
    status,
    setStatus,
    category,
    setCategory,
    formik,
    response,
    thumbnail,
    setThumbnail,
  };
};

export default useEditArticleViewModel;
