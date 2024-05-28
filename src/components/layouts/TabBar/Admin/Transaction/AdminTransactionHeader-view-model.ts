import {
  TransactionFindOneQuery,
  TransactionStatusEnum,
} from "@/app/service/graphql/gen/graphql";
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
  return {
    selectedStatus,
    setSelectedStatus,
    urls,
    statuses,
  };
};

export default useAdminTransactionHeaderViewModel;
