import {
  AdminFindTransactionOneQuery,
  TransactionCategoryEnum,
  TransactionFindOneQuery,
  TransactionStatusEnum,
  useTransactionUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { format } from "date-fns";
import { useState } from "react";

export interface IDetailTransactionProps {
  id: string | string[] | undefined;
  data: AdminFindTransactionOneQuery | undefined;
}

function getStatusBadgeColor(status: TransactionStatusEnum | undefined) {
  switch (status) {
    case TransactionStatusEnum.Pending:
      return "warning";
    case TransactionStatusEnum.Processing:
      return "primary";
    case TransactionStatusEnum.Cancelled:
      return "danger";
    case TransactionStatusEnum.Failed:
      return "danger";
    case TransactionStatusEnum.Completed:
      return "success";
    default:
      return "info";
  }
}

const transactionDetail = (data: AdminFindTransactionOneQuery | undefined) => {
  const transactionFindOne = data?.adminFindOneTransaction;

  return [
    {
      title: `Detail Transaksi`,
      rows: [
        {
          icon: "calendar",
          title: "Tanggal Pembelian",
          value: formatDate(transactionFindOne?.transaction?.createdAt),
        },
        {
          icon: "delivery",
          title: "Status",
          value: (
            <Badge
              badgeColor={getStatusBadgeColor(
                transactionFindOne?.transaction?.status
              )}
              label={transactionFindOne?.transaction?.status ?? ""}
            />
          ),
        },
        {
          icon: "bill",
          title: "Nominal",
          value: formatCurrency(
            transactionFindOne?.transaction?.amount as number
          ),
        },
      ],
    },
  ];
};

const userDetail = (data: AdminFindTransactionOneQuery | undefined) => {
  const transactionFindOne = data?.adminFindOneTransaction;
  return [
    {
      title: "Detail Pengguna",
      rows: [
        {
          icon: "profile-circle",
          title: "Nama",
          value: (
            <div className="d-flex  align-items-center justify-content-end p-0 ">
              <img
                className="symbol symbol-30px symbol-circle"
                src={
                  transactionFindOne?.user?.avatarImageId ??
                  "/media/avatars/blank.png"
                }
                width={30}
                height={30}
                alt=""
              />{" "}
              <span className="text-muted ms-5">
                {transactionFindOne?.user?.name}
              </span>
            </div>
          ),
        },
        {
          icon: "sms",
          title: "Email",
          value: transactionFindOne?.user?.email as string,
        },
        {
          icon: "phone",
          title: "No. Telepon",
          value: transactionFindOne?.user?.phoneId?.toString(),
        },
      ],
    },
  ];
};

const useDetailTransactionViewModel = ({
  id,
  data,
}: IDetailTransactionProps) => {
  const transactionDetailData = transactionDetail(data);
  const userDetailData = userDetail(data);

  const transactionCardData: any = [transactionDetailData, userDetailData];

  const formatWIB = (createdAt: string): string => {
    const date = new Date(createdAt);

    const wibOffset = 7 * 60 * 60 * 1000;
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const wibDate = new Date(utcDate.getTime() + wibOffset);
    return format(wibDate, "kk:mm") + " WIB";
  };

  return { transactionCardData, formatWIB };
};
export default useDetailTransactionViewModel;
