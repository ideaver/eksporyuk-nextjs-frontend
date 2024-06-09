import {
  ArticleFindOneQuery,
  FileWhereInput,
  UserRoleEnum,
  useArticleUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import useArticleViewModel from "../../Article-view-model";
import { postDataAPI } from "@/app/service/api/rest-service";
import { useSession } from "next-auth/react";

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

  const { articleFindMany } = useArticleViewModel();

  const editedFile = fileUrl?.[0]?.path;
  const editedCategory = category?.map((e) => ({ id: e.value as number }));

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
    onSubmit: () => {},
  });
  return {
    articleForm,
    response,
    articleUpdateOne,
    articleFindMany,
    editedFile,
    editedCategory,
    createdByAdminId,
  };
};

const useEditArticleViewModel = ({ data, id }: IEditArticle) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>();

  const articleData = data?.articleFindOne;
  const [thumbnail, setThumbnail] = useState<any>(articleData?.fileUrl?.[0]);
  const [editedThumbnail, setEditedThumbnail] = useState<
    string | undefined | null
  >();
  const [file, setFile] = useState<any>(articleData?.fileUrl?.[0]);
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
  const [target, setTarget] = useState(articleData?.target);

  const {
    articleForm: formik,
    response,
    articleUpdateOne,
    editedFile,
    editedCategory,
    articleFindMany,
  } = useArticleForm({
    data,
    id,
    content,
    title,
    status,
    category,
    fileUrl: articleData?.fileUrl,
    createdByAdminId: articleData?.createdByAdminId,
  });

  const handleUpdateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileImage = event.target.files?.[0];
    const blob = fileImage?.slice(0, fileImage?.size);
    const newFile = new File([blob] as any, fileImage?.name as string);

    setFile(newFile);

    if (!fileImage) return;
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedThumbnail(reader.result as string);
      };
      reader.readAsDataURL(fileImage);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    try {
      const form = {
        file: file,
        userId: session?.user?.id,
      };
      const response = await postDataAPI({
        endpoint: "upload/file",
        body: form,
        isMultipartRequest: true,
      });
      return response;
    } catch (error) {
      return null;
    }
  };

  const handleArticleUpdateOne = async () => {
    if (formik.isValid.valueOf() === false) return;
    setIsLoading(true);

    try {
      const response = await uploadFile();
      await articleUpdateOne({
        variables: {
          where: {
            id: Number(id),
          },
          data: {
            category: {
              connect: editedCategory ?? null,
            },
            content: {
              set: content,
            },
            target: {
              set: target,
            },
            createdByAdmin: {
              connect: {
                id: articleData?.createdByAdminId,
              },
            },
            isActive: {
              set: status === "published" ? true : false,
            },
            title: {
              set: title,
            },
            fileUrl: {
              set: [
                {
                  path: response?.data ? `${response.data}` : editedFile,
                },
              ],
            },
          },
        },
      });

      await articleFindMany.refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  const targetOptions = [
    { value: UserRoleEnum.Student, label: "Student" },
    { value: UserRoleEnum.Affiliator, label: "Affiliator" },
    { value: UserRoleEnum.Customer, label: "Customer" },
    { value: UserRoleEnum.Mentor, label: "Mentor" },
    { value: UserRoleEnum.Admin, label: "Admin" },
    { value: UserRoleEnum.Superuser, label: "Superuser" },
  ];

  return {
    targetOptions,
    target,
    setTarget,
    editedThumbnail,
    isLoading,
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
    handleUpdateFile,
    handleArticleUpdateOne,
  };
};

export default useEditArticleViewModel;
