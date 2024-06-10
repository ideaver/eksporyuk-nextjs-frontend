import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { postDataAPI } from "@/app/service/api/rest-service";
import { useSession } from "next-auth/react";
import {
  NewsFindOneQuery,
  NewsTypeEnum,
  useNewsUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";

export interface IEditNews {
  id: string | string[] | undefined;
  data: NewsFindOneQuery | undefined;
}

interface dataProps {
  content: string | undefined | null;
  type: NewsTypeEnum | undefined;
  title: string | undefined;
  image: any;
  file: File;
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

const useNewsForm = ({
  title,
  image,
  type,
  id,
  data,
  file,
  content,
}: IEditNews & dataProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  const [newsUpdateOne] = useNewsUpdateOneMutation();

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

  //validation schema for article form
  const newsSchema = Yup.object().shape({
    titleNews: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Title diperlukan"),
  });

  const handleNewsCreateOne = async () => {
    // if (announcementForm.isValid.valueOf() === false) return;
    setIsLoadingNews(true);
    try {
      const response = await uploadFile();
      await newsUpdateOne({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            type: {
              set: type,
            },
            content: {
              set: content,
            },
            title: {
              set: title,
            },
            fileUrl: {
              set: [
                {
                  path: response?.data,
                },
              ],
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNews(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  const newsForm = useFormik({
    initialValues: {
      titleNews: title,
    },
    validationSchema: newsSchema,
    onSubmit: () => {
      handleNewsCreateOne();
    },
  });

  return {
    isLoadingNews,
    newsForm,
  };
};

const useEditNewsViewModel = ({ id, data }: IEditNews) => {
  const [title, setTitle] = useState(data?.newsFindOne?.title);
  const [type, setType] = useState(data?.newsFindOne?.type);
  const [content, setContent] = useState(data?.newsFindOne?.content);
  const [image, setImage] = useState(data?.newsFindOne?.fileUrl?.[0]?.path);
  const [file, setFile] = useState<any>(data?.newsFindOne?.fileUrl?.[0]?.path);

  const handleUpdateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileImage = event.target.files?.[0];
    const blob = fileImage?.slice(0, fileImage?.size);
    const newFile = new File([blob] as any, fileImage?.name as string);

    setFile(newFile);
    console.log(newFile);

    if (!fileImage) return;
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(fileImage);
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoadingNews, newsForm } = useNewsForm({
    title,
    content,
    type,
    image,
    id,
    data,
    file,
  });
  return {
    handleUpdateFile,
    isLoadingNews,
    newsForm,
    title,
    setTitle,
    type,
    setType,
    content,
    image,
    setImage,
    setContent,
  };
};

export default useEditNewsViewModel;
