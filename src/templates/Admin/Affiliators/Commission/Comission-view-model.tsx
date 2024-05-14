/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import { useInvoiceFindManyQuery } from "@/app/service/graphql/gen/graphql";

interface ICommissionProps {}

export interface TableRow {
  idOrder?: any;
  namaKelas?: any;
  pembeli?: any;
  affiliasi?: any;
  totalKomisi: any;
  status: any;
  badgeColor: any;
}

export const useCommisionData = (skipPage: number, takePage: number, status: any) => {
  const { data, loading, error } = useInvoiceFindManyQuery({
    variables: {
      skip: skipPage,
      take: takePage,
      where: {
        status: {
          equals: status,
        }
      }
    }
  });

  const [commissionData, setComissionData] = useState<TableRow[]>([]);

  useEffect(() => {
    if (data && data.invoiceFindMany) {
      const commissionData = data.invoiceFindMany.map((invoice: any) => ({
        idOrder: invoice.orderId,
        namaKelas: invoice.order?.enrollment?.map(
          (title: any) => title.course.title
        ),
        pembeli: invoice.order?.enrollment?.map(
          (name: any) => name.course.enrollments[0].student.user.name
        ),
        affiliasi: invoice.order?.enrollment?.map(
          (name: any) =>
            name.course.enrollments[0].student.user.affiliator.user.name
        ),
        totalKomisi: invoice.amount,
        status: invoice.status,
        badgeColor: invoice.status === "FULLPAID" ? "success" : invoice.status === "CANCELLED" ? "danger" : "warning",
      }));
      setComissionData(commissionData);
    }
  }, [data]);

  return { commissionData, loading, error };
}

export const formatToIDR = (amount: string) => {
  return parseInt(amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export const breadcrumbs = [
  {
    title: "Manajemen Produk",
    path: "#",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Semua Komisi",
    path: "#",
    isSeparator: true,
    isActive: true,
  },
];

const useComissionViewModel = ({}: ICommissionProps) => {
  const [takePage, setTakePage] = useState<any>(20);
  const [skipPage, setSkipPage] = useState<any>(1);
  const [status, setStatus] = useState<any>(null);

  return { takePage, setTakePage, skipPage, setSkipPage, status, setStatus };
};

export default useComissionViewModel;
