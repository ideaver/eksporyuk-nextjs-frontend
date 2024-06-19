import { useRouter } from "next/router";

import AffiliatorHeader from "@/components/layouts/Header/Affiliator/AffiliatorHeader";
import RiwayatKomisi from "@/templates/Admin/Affiliators/AffiliatorManagement/Detail/RiwayatKomisi";

import {
  TransactionCategoryEnum,
  useAffiliatorFindOneQuery,
  useTransactionFindManyQuery,
} from "@/app/service/graphql/gen/graphql";

const RiwayatKomisiPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dataTransactionCommission = useTransactionFindManyQuery({
    variables: {
      where: {
        toAccount: {
          is: {
            userId: {
              equals: String(id),
            },
          },
        },
        transactionCategory: {
          equals: TransactionCategoryEnum.Comission,
        },
      },
    },
  });

  const dataAffiliator = useAffiliatorFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });

  return (
    <>
      <AffiliatorHeader id={id} data={dataAffiliator.data} />
      <RiwayatKomisi data={dataTransactionCommission} />
    </>
  );
};

export default RiwayatKomisiPage;
