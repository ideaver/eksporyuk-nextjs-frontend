import EditMembership from "@/templates/Admin/Membership/CreateOrEdit/EditMembership";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditMembershipPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { data, loading, error } = useMemberShip({
  //   variables: {
  //     where: {
  //       id: parseInt(id as string),
  //     },
  //   },
  // });
  return (
    <>
      <EditMembership />
    </>
  );
};

export default EditMembershipPage;
