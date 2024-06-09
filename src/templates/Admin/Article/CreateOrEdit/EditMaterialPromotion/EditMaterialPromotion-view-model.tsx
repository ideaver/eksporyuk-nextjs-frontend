import {
  ArticleFindOneQuery,
  FileTypeEnum,
  FileWhereInput,
  MaterialPromotionPlatformFindOneQuery,
  MaterialPromotionPlatformTypeEnum,
  UserRoleEnum,
  useArticleUpdateOneMutation,
  useFileCreateOneMutation,
  useMaterialPromotionPlatformUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import useArticleViewModel from "../../Article-view-model";
import { postDataAPI } from "@/app/service/api/rest-service";
import { useSession } from "next-auth/react";

export interface IEditMaterialPromotion {
  id: string | string[] | undefined;
  data: MaterialPromotionPlatformFindOneQuery | undefined;
}

interface dataProps {
  firstContent: string | undefined | null;
  secondContent: string | undefined | null;
  type: MaterialPromotionPlatformTypeEnum | undefined;
  title: string | undefined;
  video: any;
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

const useMaterialPromotionForm = ({
  firstContent,
  secondContent,
  title,
  video,
  image,
  type,
  id,
  data,
  file,
}: IEditMaterialPromotion & dataProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoadingMaterialPromotion, setIsLoadingMaterialPromotion] =
    useState(false);

  const [fileCreateOne] = useFileCreateOneMutation();

  const [materialPromotionUpdateOne] =
    useMaterialPromotionPlatformUpdateOneMutation();

  const handleUploadVideo = async () => {
    try {
      const videoData = fileCreateOne({
        variables: {
          data: {
            path: video,
            fileType: FileTypeEnum.Mp4,
          },
        },
      });
      return (await videoData).data?.fileCreateOne?.path;
    } catch (error) {
      return video;
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
      if (type === MaterialPromotionPlatformTypeEnum.Banner) {
        const response = await uploadFile();
        await materialPromotionUpdateOne({
          variables: {
            where: {
              id: parseInt(id as string),
            },
            data: {
              type: {
                set: type,
              },
              firstContentData: {
                set: firstContent,
              },
              secondContentData: {
                set: secondContent,
              },
              title: {
                set: title,
              },
              image: {
                set: [
                  {
                    path: response?.data,
                  },
                ],
              },
            },
          },
        });
      } else {
        await materialPromotionUpdateOne({
          variables: {
            where: {
              id: parseInt(id as string),
            },
            data: {
              type: {
                set: type,
              },
              firstContentData: {
                set: firstContent,
              },
              secondContentData: {
                set: secondContent,
              },
              title: {
                set: title,
              },
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
      setIsLoadingMaterialPromotion(false);
      await router.push("/admin/articles");
      router.reload();
    }
  };

  const materialPromotionForm = useFormik({
    initialValues: {
      titleMaterialPromotion: title,
    },
    validationSchema: materialPromotionSchema,
    onSubmit: () => {
      handleMaterialPromotionCreateOne();
    },
  });

  return {
    isLoadingMaterialPromotion,
    materialPromotionForm,
  };
};

const useEditMaterialPromotionViewModel = ({
  id,
  data,
}: IEditMaterialPromotion) => {
  const [title, setTitle] = useState(
    data?.materialPromotionPlatformFindOne?.title
  );
  const [type, setType] = useState(
    data?.materialPromotionPlatformFindOne?.type
  );
  const [firstContent, setFirstComtent] = useState(
    data?.materialPromotionPlatformFindOne?.firstContentData
  );
  const [secondContent, setSecondContent] = useState(
    data?.materialPromotionPlatformFindOne?.secondContentData
  );
  const [video, setVideo] = useState(
    data?.materialPromotionPlatformFindOne?.material?.path
  );
  const [image, setImage] = useState(
    data?.materialPromotionPlatformFindOne?.image?.[0]?.path
  );
  const [file, setFile] = useState<any>(
    data?.materialPromotionPlatformFindOne?.image?.[0]?.path
  );

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

  const { isLoadingMaterialPromotion, materialPromotionForm } =
    useMaterialPromotionForm({
      title,
      firstContent,
      secondContent,
      type,
      video,
      image,
      id,
      data,
      file,
    });
  return {
    handleUpdateFile,
    isLoadingMaterialPromotion,
    materialPromotionForm,
    title,
    setTitle,
    type,
    setType,
    firstContent,
    setFirstComtent,
    secondContent,
    setSecondContent,
    video,
    setVideo,
    image,
    setImage,
  };
};

export default useEditMaterialPromotionViewModel;
