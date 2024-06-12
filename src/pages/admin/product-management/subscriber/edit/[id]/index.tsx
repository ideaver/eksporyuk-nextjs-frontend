import { useMembershipCategoryFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import EditMembership from "@/templates/Admin/Membership/CreateOrEdit/EditMembership";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditMembershipPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useMembershipCategoryFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.membershipCategoryFindOne && (
        <EditMembership id={id} data={data} />
      )}
    </>
  );
};

export default EditMembershipPage;
