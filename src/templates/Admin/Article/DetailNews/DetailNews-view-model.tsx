import { NewsFindOneQuery } from "@/app/service/graphql/gen/graphql";

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

export interface IDetailNews {
  id: string | string[] | undefined;
  data: NewsFindOneQuery;
}

const useDetailNewsViewModel = ({ id, data }: IDetailNews) => {
  const content = data.newsFindOne?.content;
  const title = data.newsFindOne?.title;
  const type = data.newsFindOne?.type;
  const image = data.newsFindOne?.fileUrl?.[0]?.path;
  console.log(image);
  return { content, title, type, image };
};

export default useDetailNewsViewModel;
