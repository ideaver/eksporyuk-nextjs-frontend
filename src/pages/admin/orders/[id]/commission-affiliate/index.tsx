import { useOrderFindOneQuery } from "@/app/service/graphql/gen/graphql";
import AdminOrderLayout from "@/components/layouts/TabBar/Admin/Order/AdminOrderHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import CommissionAffiliate from "@/templates/Admin/Order/Detail/CommissionAffiliate";
import { NextPage } from "next";
import { useRouter } from "next/router";

const CommissionAffiliatePage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id;
  const { data, loading, error } = useOrderFindOneQuery({
    variables: {
      where: {
        id: parseInt(id as string),
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}

      {data?.orderFindOne && (
        <>
          <AdminOrderLayout urlType="orders" id={id} data={data.orderFindOne} />
          <CommissionAffiliate data={data.orderFindOne} />
        </>
      )}
    </>
  );
};

export default CommissionAffiliatePage;
