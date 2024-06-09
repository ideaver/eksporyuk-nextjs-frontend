import { AnnouncementFindOneQuery } from "@/app/service/graphql/gen/graphql";

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

export interface IDetailAnnouncement {
  id: string | string[] | undefined;
  data: AnnouncementFindOneQuery;
}

const useDetailAnnouncement = ({ id, data }: IDetailAnnouncement) => {
  const content = data.announcementFindOne?.content;
  const title = data.announcementFindOne?.title;
  const type = data.announcementFindOne?.type;
  const course = data.announcementFindOne?.course;
  return { content, title, type, course };
};

export default useDetailAnnouncement;
