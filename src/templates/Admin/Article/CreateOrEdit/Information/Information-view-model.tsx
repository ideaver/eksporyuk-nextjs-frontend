import {
  AnnouncementTypeEnum,
  QueryMode,
  UserRoleEnum,
  useAnnouncementCreateOneMutation,
  useArticleCategoryCreateOneMutation,
  useArticleCategoryFindManyQuery,
  useArticleCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  TypeCategory,
  changeCategory,
  changeContent,
  changeStatus,
  changeTarget,
  changeTitle,
} from "@/features/reducers/articles/articlesReducer";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { GroupBase, OptionsOrGroups } from "react-select";
import useArticleViewModel from "../../Article-view-model";
import { postDataAPI } from "@/app/service/api/rest-service";
import {
  changeAnnouncementType,
  changeContentAnnouncement,
  changeCourse,
  changeTitleAnnouncement,
} from "@/features/reducers/announcement/announcementReducer";

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

export const useCategoriesDropdown = () => {
  const getCategory = useArticleCategoryFindManyQuery({
    variables: {
      take: null,
    },
  });

  async function loadOptions(
    search: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>
  ) {
    const result =
      getCategory.data?.articleCategoryFindMany?.map((category) => ({
        value: category.id,
        label: category.name.toLocaleLowerCase(),
      })) ?? [];
    await getCategory.refetch({
      skip: prevOptions.length,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });
    return {
      options: result,
      hasMore: false,
    };
  }
  return { loadOptions, getCategory };
};

const useResetArticleState = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const resetArticleState = () => {
    dispatch(changeCategory([]));
    dispatch(changeContent(""));
    dispatch(changeTitle(""));
    dispatch(changeStatus("published"));
    dispatch(changeTarget([]));
    router.push("/admin/articles");
  };

  return { resetArticleState };
};

export const useCategoryForm = () => {
  const { data: session, status } = useSession();
  const { getCategory } = useCategoriesDropdown();

  const [articleCategoryCreateOne, response] =
    useArticleCategoryCreateOneMutation();

  const categorySchema = Yup.object().shape({
    categoryName: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(30, "Maksimal 30 simbol")
      .required("Nama kategoru diperlukan"),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        await articleCategoryCreateOne({
          variables: {
            data: {
              name: values.categoryName,
              createdByAdmin: {
                connect: {
                  id: session?.user?.id,
                },
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        await getCategory.refetch();
      }
    },
  });
  return { formik, response };
};

export const useArticleForm = () => {
  const articleState = useSelector((state: RootState) => state.article);
  const [file, setFile] = useState<File | null>(null);
  const { articleFindMany, articleLength } = useArticleViewModel();

  //parse to { id:value }
  const categoryArticle = articleState.category.map((e) => ({ id: e.value }));

  const router = useRouter();
  const { data: session, status } = useSession();
  const { resetArticleState } = useResetArticleState();

  const [articleCreateOne, response] = useArticleCreateOneMutation({
    onCompleted: () => {
      articleFindMany.refetch();
    },
  });

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
      content: articleState.content,
      title: articleState.title,
    },
    validationSchema: articleSchema,
    onSubmit: () => {},
  });

  return {
    articleState,
    formik: articleForm,
    response,
    file,
    categoryArticle,
    setFile,
    uploadFile,
    articleCreateOne,
  };
};

export const useAnnouncementForm = () => {
  //parse to { id:value }
  // const categoryArticle = articleState.category.map((e) => ({ id: e.value }));

  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const announcementState = useSelector(
    (state: RootState) => state.announcement
  );
  const [isLoadingAnnouncement, setIsLoadingAnnouncement] = useState(false);

  const resetAnnouncementState = () => {
    dispatch(changeTitleAnnouncement(""));
    dispatch(changeContentAnnouncement(""));
    dispatch(changeCourse(null));
    dispatch(changeAnnouncementType(AnnouncementTypeEnum.Affiliate));
  };

  const [announcementCreateOne, response] = useAnnouncementCreateOneMutation({
    onCompleted: () => {},
  });

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
      contentAnnouncement: announcementState.contentAnnouncement,
      titleAnnouncement: announcementState.titleAnnouncement,
    },
    validationSchema: announcementSchema,
    onSubmit: () => {},
  });

  const handleAnnouncementCreateOne = async () => {
    if (announcementForm.isValid.valueOf() === false) return;
    setIsLoadingAnnouncement(true);
    try {
      await announcementCreateOne({
        variables: {
          data: {
            createdByAdmin: {
              connect: {
                id: session?.user.id,
              },
            },
            content: announcementState.contentAnnouncement,
            title: announcementState.titleAnnouncement,
            type: announcementState.announcementType,
            course: {
              connect: {
                id: announcementState?.course?.value,
              },
            },
          },
        },
      });
      resetAnnouncementState();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAnnouncement(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  return {
    handleAnnouncementCreateOne,
    isLoadingAnnouncement,
    announcementForm,
    response,
    announcementCreateOne,
    resetAnnouncementState,
  };
};

const useInformationViewModel = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const dispatch = useDispatch();
  // article
  const [thumbnail, setThumbnail] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const status = useSelector((state: RootState) => state.article.status);
  const category = useSelector((state: RootState) => state.article.category);
  const target = useSelector((state: RootState) => state.article.target);

  const { resetArticleState } = useResetArticleState();
  const { articleFindMany, articleLength } = useArticleViewModel();

  const {
    file: fileImage,
    setFile,
    uploadFile,
    articleCreateOne,
    formik,
    articleState,
    categoryArticle,
  } = useArticleForm();

  // create article
  const handleArticleCreateOne = async () => {
    if (formik.isValid.valueOf() === false) return;
    setIsLoading(true);
    try {
      const response = await uploadFile();
      console.log(response);
      await articleCreateOne({
        variables: {
          data: {
            title: articleState.title,
            content: articleState.content,
            target: {
              set: target,
            },
            createdByAdmin: {
              connect: {
                id: session?.user.id,
              },
            },
            isActive: articleState.status === "published" ? true : false,
            fileUrl: {
              connect: [
                {
                  path: response?.data ? `${response.data}` : null,
                },
              ],
            },
            category: {
              connect: [...categoryArticle],
            },
          },
        },
      });
      await articleFindMany.refetch();
      await articleLength.refetch();
      resetArticleState();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const blob = file?.slice(0, file?.size);
    const newFile = new File([blob] as any, file?.name as string);

    setFile(newFile);

    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (status: string) => {
    dispatch(changeStatus(status));
  };
  const handleCategoryChange = (category: TypeCategory[]) => {
    dispatch(changeCategory(category));
  };
  const handleTargetChange = (target: UserRoleEnum[]) => {
    dispatch(changeTarget(target));
  };

  const targetOptions = [
    { value: UserRoleEnum.Student, label: "Student" },
    { value: UserRoleEnum.Affiliator, label: "Affiliator" },
  ];

  //announcement
  const handleConnectCourse = (course: { value: number; label: string }) => {
    dispatch(changeCourse(course));
  };

  return {
    // article
    target,
    targetOptions,
    isLoading,
    resetArticleState,
    category,
    handleCategoryChange,
    status,
    handleFileChange,
    handleStatusChange,
    handleTargetChange,
    handleArticleCreateOne,
    thumbnail,
    fileImage,
    uploadFile,
    // announcement
    handleConnectCourse,
  };
};

export default useInformationViewModel;
