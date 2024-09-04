import { UserFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { useState } from "react";

export interface IMemberProfileHeaderViewModel {
  id: string | string[] | undefined;
  data: UserFindOneQuery['userFindOne']
}
const useProfileHeaderViewModel = ({ id }: IMemberProfileHeaderViewModel) => {
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
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
    {
      label: "Informasi Rekening",
      to: `/admin/members/detail/${id}/informasi-rekening`,
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
    urls, breadcrumbs, showMembershipModal, setShowMembershipModal, showCourseModal, setShowCourseModal
  }
}

export default useProfileHeaderViewModel