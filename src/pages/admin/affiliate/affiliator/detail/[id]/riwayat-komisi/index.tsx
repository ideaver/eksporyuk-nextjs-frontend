import { useRouter } from "next/router";

import AffiliatorHeader from "@/components/layouts/Header/Affiliator/AffiliatorHeader";
import RiwayatKomisi from "@/templates/Admin/Affiliators/AffiliatorManagement/Detail/RiwayatKomisi";

import { useTransactionFindManyQuery, useAffiliatorFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { TransactionCategoryEnum } from "@/app/service/graphql/gen/graphql";

const RiwayatKomisiPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dataTransactionCommission = useTransactionFindManyQuery({
    variables: {
      where: {
        fromAccount: {
          is: {
            userId: {
              equals: String(id),
            }
          }
        },
        transactionCategory: {
          equals: TransactionCategoryEnum.Comission,
        }
      }
    }
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
