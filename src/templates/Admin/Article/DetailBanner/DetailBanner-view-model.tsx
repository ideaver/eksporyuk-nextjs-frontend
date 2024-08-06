import { BannerFindOneQuery } from "@/app/service/graphql/gen/graphql";

export interface IDetailBanner {
  id: string | string[] | undefined;
  data: BannerFindOneQuery | undefined;
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

const useDetailBannerViewModel = ({ id, data }: IDetailBanner) => {
  const title = data?.bannerFindOne?.title;
  const image = data?.bannerFindOne?.bannerImage;
  const content = data?.bannerFindOne?.content;
  const target = data?.bannerFindOne?.target;
  const isPublished = data?.bannerFindOne?.isPublished;
  return { title, image, content, target, isPublished };
};

export default useDetailBannerViewModel;
