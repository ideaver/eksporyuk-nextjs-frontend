import { postDataAPI } from "@/app/service/api/rest-service";
import {
  BannerFindOneQuery,
  useBannerUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export interface IEditBanner {
  id: string | string[] | undefined;
  data: BannerFindOneQuery;
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

const useEditBannerViewModel = ({ id, data }: IEditBanner) => {
  const router = useRouter();

  const [title, setTitle] = useState(data.bannerFindOne?.title);
  const [content, setContent] = useState(data.bannerFindOne?.content);
  const [target, setTarget] = useState(data.bannerFindOne?.target);
  const [image, setImage] = useState<File | string | undefined>(
    data.bannerFindOne?.bannerImage
  );
  const [file, setFile] = useState<File | string | undefined>(
    data.bannerFindOne?.bannerImage
  );
  const [status, setStatus] = useState(
    data.bannerFindOne?.isPublished ? "published" : "private"
  );
  const [isLoading, setIsLoading] = useState(false);

  const [bannerUpdateOne] = useBannerUpdateOneMutation();

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

  const uploadFile = async () => {
    try {
      const session = await getSession();
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

  const handleBannerUpdateOne = async () => {
    setIsLoading(true);
    try {
      const response = await uploadFile();
      await bannerUpdateOne({
        variables: {
          where: {
            id: data.bannerFindOne?.id,
          },
          data: {
            title: {
              set: title,
            },
            content: {
              set: content,
            },
            isPublished: {
              set: status === "published" ? true : false,
            },
            target: {
              set: target,
            },
            banner: {
              connect: {
                path: typeof file === "string" ? file : response?.data,
              },
            },
          },
        },
      });
      await router.push("/admin/articles");
      router.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return {
    title,
    setTitle,
    content,
    setContent,
    image,
    target,
    setTarget,
    status,
    setStatus,
    isLoading,
    handleUpdateFile,
    handleBannerUpdateOne,
  };
};

export default useEditBannerViewModel;
