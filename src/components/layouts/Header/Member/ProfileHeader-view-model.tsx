import { StudentFindOneQuery } from "@/app/service/graphql/gen/graphql";

export interface IMemberProfileHeaderViewModel {
    id: string | string[] | undefined;
    data: StudentFindOneQuery['studentFindOne']
  }
const useProfileHeaderViewModel = ({id}:IMemberProfileHeaderViewModel ) => {
    const urls = [
        {
          label: "Profile",
          to: `/admin/members/detail/${id}/profile`,
        },
        {
          label: "Kelas",
          to: `/admin/members/detail/${id}/courses`,
        },
        {
          label: "Social Profile",
          to: `/admin/members/detail/${id}/socials`,
        },
        {
          label: "Riwayat Order",
          to: `/admin/members/detail/${id}/orders`,
        },
      ];

      const breadcrumbs = [
        {
          title: "Manajemen Member",
          path: "/admin/members",
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
          title: "Semua Kelas",
          path: "/admin/members",
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

export default useProfileHeaderViewModel