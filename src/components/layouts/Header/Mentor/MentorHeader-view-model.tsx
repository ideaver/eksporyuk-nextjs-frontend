import { MentorFindOneQuery } from "@/app/service/graphql/gen/graphql";

export interface IMentorheaderViewModel {
    id: string | string[] | undefined;
    data: MentorFindOneQuery | undefined;
  }
const useMentorHeaderViewModel = ({id, data}:IMentorheaderViewModel ) => {
    const urls = [
        {
          label: "Profile",
          to: `/admin/mentors/detail/${id}/profile`,
        },
        // {
        //   label: "Sertifikat",
        //   to: `/admin/mentors/detail/${id}/certificate`,
        // },
      ];

      const breadcrumbs = [
        {
          title: "Manajemen Mentor",
          path: "/admin/mentors",
          isSeparator: false,
          isActive: false,
        },
        {
          title: "",
          path: "",
          isSeparator: true,
          isActive: false,
        },
        {
          title: "Semua Mentor",
          path: "/admin/mentors",
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

      return {
        urls, breadcrumbs
      }
}

export default useMentorHeaderViewModel