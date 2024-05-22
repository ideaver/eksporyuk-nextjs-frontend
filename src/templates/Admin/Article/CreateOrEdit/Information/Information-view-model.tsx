import {
  FileTypeEnum,
  QueryMode,
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
  changeThumbnail,
  changeTitle,
  changeFile,
} from "@/features/reducers/articles/articlesReducer";
import { UnknownAction } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { GroupBase, OptionsOrGroups } from "react-select";
import axios from "axios";
import useArticleViewModel from "../../Article-view-model";

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
    dispatch(changeThumbnail(null));
    router.push("/admin/articles");
  };

  return { resetArticleState };
};

export const useCategoryForm = () => {
  const { data: session, status } = useSession();
  //
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
                  // id: "2d79b348-4fde-4382-b9d6-7c4add6c458b",
                },
              },
            },
          },
        });
        console.log(values.categoryName)
        console.log(session?.user.id)
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
  const [state, setState] = useState<File | null>(null);
  //refetch
  const { articleFindMany, articleLength } = useArticleViewModel();

  //parse to { id:value }
  const categoryArticle = articleState.category.map((e) => ({ id: e.value }));

  const router = useRouter();
  const { data: session, status } = useSession();
  const { resetArticleState } = useResetArticleState();

  //mutation
  const [articleCreateOne, response] = useArticleCreateOneMutation({
    variables: {
      data: {
        title: articleState.title,
        content: articleState.content,
        createdByAdmin: {
          connect: {
            id: session?.user.id,
            // id: "2d79b348-4fde-4382-b9d6-7c4add6c458b",
          },
        },
        isActive: articleState.status === "published" ? true : false,
        fileUrl: {
          connect: [
            {
              path: "https://www.youtube.com/watch?v=qKs7pMWXgQY",
            },
          ],
        },
        category: {
          connect: [...categoryArticle],
        },
      },
    },
    onCompleted: () => {
      articleFindMany.refetch();
    },
  });

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

  const formData = new FormData();
  // formData.append("userId", session?.user?.id as string);
  formData.append("userId", "d37fc899-d880-4ee5-bc98-193162765579");
  formData.append("file", state as File);

  const articleForm = useFormik({
    initialValues: {
      content: articleState.content,
      title: articleState.title,
    },
    validationSchema: articleSchema,
    onSubmit: async (values) => {
      if (status === "authenticated") {
        try {
          // const response = await axios.post(
          //   `${process.env.NEXT_PUBLIC_UPLOAD_FILE_URL}`,
          //   formData,
          //   {
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //     },
          //   }
          // );
          await articleCreateOne();
          resetArticleState();
          await articleFindMany.refetch();
          await articleLength.refetch()
        } catch (error) {
          console.log(error);
        } finally {
          router.push("/admin/articles")
          articleFindMany.refetch();
        
        }
      }
    },
  });

  return { formik: articleForm, response, state, setState };
};

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
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.article.status);
  const thumbnail = useSelector((state: RootState) => state.article.thumbnail);
  const category = useSelector((state: RootState) => state.article.category);

  const { resetArticleState } = useResetArticleState();
  const { state, setState } = useArticleForm();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setState(file as File);
    if (!file) return;
    // const fileCopy = new File([file], file.name, {
    //   type: file.type,
    //   lastModified: file.lastModified,
    // });
    // console.log(fileCopy);

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeThumbnail(reader.result as string));
    };
    reader.readAsDataURL(file);
    // dispatch(changeFile(state));
  };

  const handleStatusChange = (status: string) => {
    dispatch(changeStatus(status));
  };
  const handleCategoryChange = (status: TypeCategory[]) => {
    dispatch(changeCategory(status));
  };
  return {
    resetArticleState,
    category,
    handleCategoryChange,
    status,
    handleFileChange,
    handleStatusChange,
    thumbnail,
  };
};

export default useInformationViewModel;
