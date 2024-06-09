import { useRouter } from "next/router";

import AffiliatorHeader from "@/components/layouts/Header/Affiliator/AffiliatorHeader";
import CouponAffiliatePage from "@/templates/Admin/Affiliators/AffiliatorManagement/Detail/KuponAffiliasi";

import { useAffiliatorFindOneQuery } from "@/app/service/graphql/gen/graphql";

const DetailCouponAffiliator = () => {
  const router = useRouter();
  const { id } = router.query;

  const data = useAffiliatorFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });

  return (
    <>
      <AffiliatorHeader id={id} data={data.data} />

      {/* Goes to templates/Admin/Affiliators/AffiliatorManagement/Detail/KuponAffiliasi */}
      <CouponAffiliatePage data={data} />
    </>
  );
};

export default DetailCouponAffiliator;
