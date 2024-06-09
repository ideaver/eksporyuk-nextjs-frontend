import { MaterialPromotionPlatformFindOneQuery } from "@/app/service/graphql/gen/graphql";

export interface IDetailMaterialPromotion {
  id: string | string[] | undefined;
  data: MaterialPromotionPlatformFindOneQuery;
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

const useDetailMaterialViewModel = ({ id, data }: IDetailMaterialPromotion) => {
  const title = data.materialPromotionPlatformFindOne?.title;
  const type = data.materialPromotionPlatformFindOne?.type;
  const urlVIdeo = data.materialPromotionPlatformFindOne?.material?.path;
  const firstContent = data.materialPromotionPlatformFindOne?.firstContentData;
  const secondContent =
    data.materialPromotionPlatformFindOne?.secondContentData;
  const image = data.materialPromotionPlatformFindOne?.image?.[0];
  console.log(image);
  return { title, type, urlVIdeo, firstContent, secondContent, image };
};

export default useDetailMaterialViewModel;
