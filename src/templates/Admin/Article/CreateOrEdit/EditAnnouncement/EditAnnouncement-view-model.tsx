import {
  AnnouncementFindOneQuery,
  useAnnouncementUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export const useAnnouncementForm = ({
  content,
  title,
}: {
  content: string | undefined;
  title: string | undefined;
}) => {
  //validation schema for article form
  const announcementSchema = Yup.object().shape({
    titleAnnouncement: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Title announcement diperlukan"),
    contentAnnouncement: Yup.string()
      .min(20, "Minimal 20 simbol")
      .required("Content diperlukan"),
  });

  const announcementForm = useFormik({
    initialValues: {
      contentAnnouncement: content,
      titleAnnouncement: title,
    },
    validationSchema: announcementSchema,
    onSubmit: () => {},
  });

  return {
    announcementForm,
  };
};

export interface IEditAnnouncement {
  id: string | string[] | undefined;
  data: AnnouncementFindOneQuery;
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

const useEditAnnouncementViewModel = ({ id, data }: IEditAnnouncement) => {
  const router = useRouter();
  const [content, setContent] = useState(data.announcementFindOne?.content);
  const [title, setTitle] = useState(data.announcementFindOne?.title);
  const [announcementType, setAnnouncementType] = useState(
    data.announcementFindOne?.type
  );
  const [course, setCourse] = useState({
    value: data?.announcementFindOne?.course?.id,
    label: data?.announcementFindOne?.course?.title,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [announcementUpdateOne] = useAnnouncementUpdateOneMutation();

  const handleAnnouncementUpdateOne = async () => {
    setIsLoading(true);
    try {
      await announcementUpdateOne({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            content: {
              set: content,
            },
            title: {
              set: title,
            },
            type: {
              set: announcementType,
            },
            course: {
              connect: {
                id: course.value,
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await router.push("/admin/articles");
      router.reload();
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleAnnouncementUpdateOne,
    content,
    setContent,
    title,
    setTitle,
    announcementType,
    setAnnouncementType,
    course,
    setCourse,
  };
};

export default useEditAnnouncementViewModel;
