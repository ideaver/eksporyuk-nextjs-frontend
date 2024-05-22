import { useOrderFindOneQuery } from "@/app/service/graphql/gen/graphql";
import AdminOrderLayout from "@/components/layouts/TabBar/Admin/Order/AdminOrderHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import DetailOrder from "@/templates/Admin/Order/Detail/DetailOrder";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailOrderPage: NextPage = () => {
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
          <DetailOrder orderId={id as string} data={data.orderFindOne} />
        </>
      )}
    </>
  );
};

export default DetailOrderPage;
