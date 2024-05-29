import {
  IntFilter,
  useAdminFindTransactionOneQuery,
} from "@/app/service/graphql/gen/graphql";
import AdminTransactionLayout from "@/components/layouts/TabBar/Admin/Transaction/AdminTransactionHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import TransactionDetail from "@/templates/Admin/Transaction/Detail";
import { NextPage } from "next";
import { useRouter } from "next/router";

const TransactionDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, refetch } = useAdminFindTransactionOneQuery({
    variables: {
      adminFindOneTransaction: {
        where: {
          id: {
            equals: parseInt(id?.toString() as string),
          },
        },
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}

      {data?.adminFindOneTransaction && (
        <>
          <AdminTransactionLayout urlType="transaction" id={id} />
          <TransactionDetail data={data} id={id} />
        </>
      )}
    </>
  );
};

export default TransactionDetailPage;
