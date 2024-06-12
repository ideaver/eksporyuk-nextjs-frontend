import { useMembershipCategoryFindOneQuery } from "@/app/service/graphql/gen/graphql";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import DetailMembership from "@/templates/Admin/Membership/Detail";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailMembershipPage: NextPage = () => {
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
        <DetailMembership id={id} data={data} />
      )}
    </>
  );
};

export default DetailMembershipPage;
