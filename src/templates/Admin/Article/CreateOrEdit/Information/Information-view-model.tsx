import {
  AnnouncementTypeEnum,
  ArticleTypeEnum,
  FileTypeEnum,
  MaterialPromotionPlatformTypeEnum,
  NewsTypeEnum,
  QueryMode,
  UserRoleEnum,
  useAnnouncementCreateOneMutation,
  useArticleCategoryCreateOneMutation,
  useArticleCategoryFindManyQuery,
  useArticleCreateOneMutation,
  useFileCreateOneMutation,
  useMaterialPromotionPlatformCreateOneMutation,
  useNewsCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  TypeCategory,
  changeArticleType,
  changeCategory,
  changeContent,
  changeStatus,
  changeTarget,
  changeTitle,
  changeUrlVideo,
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
import {
  changeContentMaterialPromotionFirst,
  changeContentMaterialPromotionSecond,
  changeTitleMaterialPromotion,
  changeVideoUrl,
} from "@/features/reducers/materialPromotion/materialPromotion";
import {
  changeContentNews,
  changeNewsType,
  changeTitleNews,
} from "@/features/reducers/news/newsReducer";

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
    dispatch(changeUrlVideo(""));
    dispatch(changeArticleType(ArticleTypeEnum.Article));
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

export const useArticleForm = ({ fileImage }: { fileImage?: File | null }) => {
  const articleState = useSelector((state: RootState) => state.article);

  const { articleFindMany, articleLength } = useArticleViewModel();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  const [fileCreateOne] = useFileCreateOneMutation();

  const handleUploadVideo = async () => {
    try {
      const videoData = fileCreateOne({
        variables: {
          data: {
            path: articleState.urlVideo,
            fileType: FileTypeEnum.Mp4,
          },
        },
      });
      return (await videoData).data?.fileCreateOne?.path;
    } catch (error) {
      return articleState.urlVideo;
    }
  };

  const uploadFile = async () => {
    try {
      const form = {
        file: fileImage,
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

  const handleArticleCreateOne = async () => {
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
              set: [UserRoleEnum.Affiliator],
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
                  path: response?.data,
                },
              ],
            },
            category: {
              connect: [...categoryArticle],
            },
            articleType: articleState.articleType,
            material: {
              connect: {
                path: await handleUploadVideo(),
              },
            },
          },
        },
      });
      await articleFindMany.refetch();
      await articleLength.refetch();
      // await router.push("/admin/articles");
      // router.reload();
      resetArticleState();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const articleForm = useFormik({
    initialValues: {
      content: articleState.content,
      title: articleState.title,
    },
    validationSchema: articleSchema,
    onSubmit: () => {
      // handleArticleCreateOne();
    },
  });

  return {
    articleState,
    formik: articleForm,
    response,
    // file,
    categoryArticle,
    // setFile,
    uploadFile,
    articleCreateOne,
    isLoading,
    handleArticleCreateOne,
    setIsLoading,
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
  const handleAnnouncementTypeChange = (e: AnnouncementTypeEnum) => {
    dispatch(changeAnnouncementType(e));
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

  const handleAnnouncementCreateOne = async () => {
    // if (announcementForm.isValid.valueOf() === false) return;
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

  const announcementForm = useFormik({
    initialValues: {
      contentAnnouncement: announcementState.contentAnnouncement,
      titleAnnouncement: announcementState.titleAnnouncement,
    },
    validationSchema: announcementSchema,
    onSubmit: () => {
      handleAnnouncementCreateOne();
    },
  });

  return {
    handleAnnouncementTypeChange,
    handleAnnouncementCreateOne,
    isLoadingAnnouncement,
    announcementForm,
    response,
    announcementCreateOne,
    resetAnnouncementState,
  };
};

export const useMaterialPromotionForm = ({
  fileImage,
}: {
  fileImage: File | null;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const materialPromotionState = useSelector(
    (state: RootState) => state.materialPromotion
  );
  const [isLoadingMaterialPromotion, setIsLoadingMaterialPromotion] =
    useState(false);

  const resetMaterialPromotionState = () => {
    dispatch(changeTitleMaterialPromotion(""));
    dispatch(changeContentMaterialPromotionFirst(""));
    dispatch(changeContentMaterialPromotionSecond(""));
    dispatch(changeVideoUrl(""));
  };

  const [materialPromotionCreateOne, response] =
    useMaterialPromotionPlatformCreateOneMutation({
      onCompleted: () => {},
    });
  const [fileCreateOne] = useFileCreateOneMutation();

  const handleUploadVideo = async () => {
    try {
      const videoData = fileCreateOne({
        variables: {
          data: {
            path: materialPromotionState.videoUrl,
            fileType: FileTypeEnum.Mp4,
          },
        },
      });
      return (await videoData).data?.fileCreateOne?.path;
    } catch (error) {
      return materialPromotionState.videoUrl;
    }
  };

  const uploadFile = async () => {
    try {
      const form = {
        file: fileImage,
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
  const materialPromotionSchema = Yup.object().shape({
    titleMaterialPromotion: Yup.string()
      .min(3, "Minimal 3 simbol")
      .max(50, "Maksimal 50 simbol")
      .required("Title diperlukan"),
  });

  const handleMaterialPromotionCreateOne = async () => {
    // if (announcementForm.isValid.valueOf() === false) return;
    setIsLoadingMaterialPromotion(true);
    try {
      if (
        materialPromotionState.materialType ===
        MaterialPromotionPlatformTypeEnum.Banner
      ) {
        const response = await uploadFile();
        console.log(response);
        await materialPromotionCreateOne({
          variables: {
            data: {
              createdByAdmin: {
                connect: {
                  id: session?.user.id,
                },
              },
              type: materialPromotionState.materialType,
              firstContentData:
                materialPromotionState.contentMaterialPromotionFirst,
              secondContentData:
                materialPromotionState.contentMaterialPromotionSecond,
              title: materialPromotionState.titleMaterialPromotion,
              image: {
                connect: [
                  {
                    path: response?.data,
                  },
                ],
              },
            },
          },
        });
      } else {
        console.log(response);
        await materialPromotionCreateOne({
          variables: {
            data: {
              createdByAdmin: {
                connect: {
                  id: session?.user.id,
                },
              },
              type: materialPromotionState.materialType,
              firstContentData:
                materialPromotionState.contentMaterialPromotionFirst,
              secondContentData:
                materialPromotionState.contentMaterialPromotionSecond,
              title: materialPromotionState.titleMaterialPromotion,
              material: {
                connect: {
                  path: await handleUploadVideo(),
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetMaterialPromotionState();
      setIsLoadingMaterialPromotion(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  const materialPromotionForm = useFormik({
    initialValues: {
      titleMaterialPromotion: materialPromotionState.titleMaterialPromotion,
    },
    validationSchema: materialPromotionSchema,
    onSubmit: () => {
      handleMaterialPromotionCreateOne();
    },
  });

  return {
    isLoadingMaterialPromotion,
    materialPromotionForm,
    resetMaterialPromotionState,
  };
};
export const useNewsForm = ({ fileImage }: { fileImage: File | null }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const newsState = useSelector((state: RootState) => state.news);
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  const resetNewsState = () => {
    dispatch(changeTitleNews(""));
    dispatch(changeContentNews(""));
    dispatch(changeNewsType(NewsTypeEnum.Headline));
  };

  const [newsCreateOne, response] = useNewsCreateOneMutation({
    onCompleted: () => {},
  });

  const uploadFile = async () => {
    try {
      const form = {
        file: fileImage,
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
    setIsLoadingNews(true);
    try {
      const response = await uploadFile();
      console.log(response);
      await newsCreateOne({
        variables: {
          data: {
            createdByAdmin: {
              connect: {
                id: session?.user.id,
              },
            },
            type: newsState.newsType,
            content: newsState.contentNews,
            title: newsState.titleNews,
            fileUrl: {
              connect: [
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
      resetNewsState();
      setIsLoadingNews(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  const newsForm = useFormik({
    initialValues: {
      titleNews: newsState.titleNews,
    },
    validationSchema: newsSchema,
    onSubmit: () => {
      handleNewsCreateOne();
    },
  });

  return {
    isLoadingNews,
    newsForm,
    resetNewsState,
  };
};

const useInformationViewModel = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const dispatch = useDispatch();
  // article
  const [file, setFile] = useState<File | null>(null);

  const [thumbnail, setThumbnail] = useState<string | null>();

  const status = useSelector((state: RootState) => state.article.status);
  const category = useSelector((state: RootState) => state.article.category);
  const target = useSelector((state: RootState) => state.article.target);

  const { resetArticleState } = useResetArticleState();
  const { articleFindMany, articleLength } = useArticleViewModel();

  const {
    // file,
    // setFile,
    uploadFile,
    articleCreateOne,
    formik,
    articleState,
    categoryArticle,
    isLoading,
    setIsLoading,
    handleArticleCreateOne,
  } = useArticleForm({ fileImage: file });

  const {
    materialPromotionForm,
    isLoadingMaterialPromotion,
    resetMaterialPromotionState,
  } = useMaterialPromotionForm({ fileImage: file });

  const { resetNewsState, newsForm, isLoadingNews } = useNewsForm({
    fileImage: file,
  });

  // create article

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fil = event.target.files?.[0];
    const blob = fil?.slice(0, fil?.size);
    const newFile = new File([blob] as any, fil?.name as string);

    setFile(newFile);

    if (!fil) return;
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(fil);
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
  const handleArticleTypeChange = (e: ArticleTypeEnum) => {
    dispatch(changeArticleType(e));
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
    resetArticleState,
    category,
    handleCategoryChange,
    status,
    handleFileChange,
    handleStatusChange,
    handleTargetChange,
    thumbnail,
    file,
    uploadFile,
    isLoading,
    handleArticleCreateOne,
    handleArticleTypeChange,
    // announcement
    handleConnectCourse,
    // material promotion
    materialPromotionForm,
    isLoadingMaterialPromotion,
    resetMaterialPromotionState,
    // news
    newsForm,
    isLoadingNews,
    resetNewsState,
  };
};

export default useInformationViewModel;
