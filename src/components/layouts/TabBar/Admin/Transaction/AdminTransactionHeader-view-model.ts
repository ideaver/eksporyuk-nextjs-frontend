import {
  TransactionFindOneQuery,
  TransactionStatusEnum,
  useTransactionUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

export interface IStatus {
  title: string;
  value: TransactionStatusEnum;
}

export interface IAdminTransaction {
  urlType: string;
  id: string | string[] | undefined;
}

export const breadcrumbs = [
  {
    title: "Manajemen Transaksi",
    path: "/admin/transaction",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
  {
    title: "Semua Transaksi",
    path: "/admin/transaction",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const useAdminTransactionHeaderViewModel = ({
  id,
  urlType,
}: IAdminTransaction) => {
  const router = useRouter();

  const urls = [
    {
      label: "Detail Transaksi",
      to: `/admin/transaction/${id}/detail-transaction`,
    },
  ];

  const statuses: IStatus[] = [
    {
      title: "Completed",
      value: TransactionStatusEnum.Completed,
    },
    {
      title: "Processing",
      value: TransactionStatusEnum.Processing,
    },
    {
      title: "Pending",
      value: TransactionStatusEnum.Pending,
    },
    {
      title: "Cancelled",
      value: TransactionStatusEnum.Cancelled,
    },
    {
      title: "Failed",
      value: TransactionStatusEnum.Failed,
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<IStatus>(statuses[0]);

  const [transactionUpdateOne, response] = useTransactionUpdateOneMutation();

  const handleStatusUpdate = async () => {
    try {
      await transactionUpdateOne({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            status: {
              set: selectedStatus.value,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.reload();
    }
  };

  return {
    handleStatusUpdate,
    selectedStatus,
    setSelectedStatus,
    urls,
    statuses,
    transactionUpdateOne,
  };
};

export default useAdminTransactionHeaderViewModel;
