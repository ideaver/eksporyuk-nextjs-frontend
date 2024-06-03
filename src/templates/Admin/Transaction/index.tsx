import { PageTitle } from "@/_metronic/layout/core";
import useTransactionViewModel, { breadcrumbs } from "./Transaction-view-model";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import Link from "next/link";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { Badge } from "@/stories/atoms/Badge/Badge";
import {
  AdminFindManyTransactionQuery,
  AdminFindTransactionManyQuery,
  SortOrder,
  TransactionCategoryEnum,
  TransactionStatusEnum,
} from "@/app/service/graphql/gen/graphql";
import { Dispatch, SetStateAction } from "react";
import Flatpickr from "react-flatpickr";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const Transaction = () => {
  const { data: session, status } = useSession();
  const {
    transactionFindMany,
    transactionTake,
    transactionSkip,
    transactionFindSearch,
    transactionFindStatus,
    transactionFindCategory,
    setTransactionSkip,
    setTransactionTake,
    setTransactionFindCategory,
    setTransactionFindSearch,
    setTransactionFindStatus,
    statusDropdownOption,
    categoryDropdownOption,
    calculateTotalPage,
    transactionLength,
    handlePageChange,
    currentPage,
    downloadReportDate,
    setDownloadReportDate,
    exportDataTransaction,
    handleLoadingExportChange,
    orderBy,
    setOrderBy,
  } = useTransactionViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Riwayat Transaksi</PageTitle>
      <LoadingOverlayWrapper
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(255, 255, 255, 0.8)",
          }),
          spinner: (base) => ({
            ...base,
            width: "100px",
            "& svg circle": {
              stroke: "rgba(3, 0, 0, 1)",
            },
          }),
        }}
        active={useSelector((state: RootState) => state.transaction.loading)}
        spinner
      >
        <KTCard>
          <KTCardBody>
            <Head
              statusDropdownOption={statusDropdownOption}
              categoryDropdownOption={categoryDropdownOption}
              transactionFindCategory={transactionFindCategory}
              transactionFindSearch={transactionFindSearch}
              transactionFindStatus={transactionFindStatus}
              setTransactionFindCategory={setTransactionFindCategory}
              setTransactionFindSearch={setTransactionFindSearch}
              setTransactionFindStatus={setTransactionFindStatus}
              orderBy={orderBy}
              setOrderBy={(e) => {
                setOrderBy(e);
              }}
            />
            <Body
              data={transactionFindMany.data}
              error={transactionFindMany.error}
              loading={transactionFindMany.loading}
            />
            <Footer
              currentPage={currentPage}
              pageLength={calculateTotalPage()}
              setTransactionSkip={setTransactionSkip}
              setTransactionTake={setTransactionTake}
              setCurrentPage={(val: number) => {
                handlePageChange(val);
              }}
            />
          </KTCardBody>
        </KTCard>
      </LoadingOverlayWrapper>
      <DownloadReportModal
        date={downloadReportDate}
        onChange={([startDate, endDate]) => {
          setDownloadReportDate([startDate, endDate]);
        }}
        onClick={async () => {
          handleLoadingExportChange(true);
          try {
            const response = await exportDataTransaction({
              variables: {
                exportTransaction: {
                  adminId: session?.user.id as string,
                  startDate: downloadReportDate[0],
                  endDate: downloadReportDate[1],
                },
              },
            });
            const link = document.createElement("a");
            link.href = response.data?.exportTransaction?.fileURL as string;
            link.click();
          } catch (error) {
            console.log(error);
          } finally {
            handleLoadingExportChange(false);
          }
        }}
        onClose={() => {}}
      />
    </>
  );
};

const Head = ({
  statusDropdownOption,
  categoryDropdownOption,
  transactionFindCategory,
  transactionFindSearch,
  transactionFindStatus,
  setTransactionFindCategory,
  setTransactionFindSearch,
  setTransactionFindStatus,
  orderBy,
  setOrderBy,
}: {
  statusDropdownOption: {
    value: string | TransactionStatusEnum;
    label: string;
  }[];
  categoryDropdownOption: {
    value: string | TransactionCategoryEnum;
    label: string;
  }[];
  transactionFindCategory: TransactionCategoryEnum | "all";
  transactionFindSearch: string;
  transactionFindStatus: TransactionStatusEnum | "all";
  setTransactionFindCategory: Dispatch<
    SetStateAction<"all" | TransactionCategoryEnum>
  >;
  setTransactionFindSearch: Dispatch<SetStateAction<string>>;
  setTransactionFindStatus: Dispatch<
    SetStateAction<"all" | TransactionStatusEnum>
  >;
  orderBy: SortOrder;
  setOrderBy: (e: SortOrder) => void;
}) => {
  return (
    <>
      <div className="row justify-content-between gy-5 ">
        <div className="col-lg-auto">
          <TextField
            styleType="solid"
            preffixIcon="magnifier"
            placeholder="Search"
            props={{
              value: transactionFindSearch,
              onChange: (e: any) => setTransactionFindSearch(e.target.value),
            }}
          ></TextField>
        </div>
        <div className="row col-lg-auto gy-3">
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              options={statusDropdownOption}
              value={transactionFindStatus}
              onValueChange={(e) => {
                setTransactionFindStatus(e as TransactionStatusEnum | "all");
              }}
            />
          </div>
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              options={categoryDropdownOption}
              value={transactionFindCategory}
              onValueChange={(e) => {
                setTransactionFindCategory(
                  e as TransactionCategoryEnum | "all"
                );
              }}
            />
          </div>
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              value={orderBy}
              options={[
                { label: "Terbaru", value: SortOrder.Desc },
                { label: "Terlama", value: SortOrder.Asc },
              ]}
              onValueChange={(val) => {
                setOrderBy(val as SortOrder);
              }}
            />
          </div>
          <div className="col-lg-auto">
            <Buttons
              data-bs-toggle="modal"
              data-bs-target="#kt_download_report_modal"
            >
              Export Data
            </Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setTransactionTake,
  setTransactionSkip,
  pageLength,
}: {
  setTransactionTake: Dispatch<SetStateAction<number>>;
  setTransactionSkip: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
}) => {
  return (
    <div className="row d-flex justify-content-between p-10">
      <div className="col-auto">
        <Dropdown
          styleType="solid"
          options={[
            { label: "100", value: 100 },
            { label: "200", value: 200 },
          ]}
          onValueChange={(val) => {
            setTransactionTake(val as number);
          }}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={pageLength}
          current={currentPage}
          maxLength={5}
          onPageChange={(val) => {
            setCurrentPage(val);
          }}
        ></Pagination>
      </div>
    </div>
  );
};

const Body = ({
  data,
  error,
  loading,
}: {
  data: AdminFindTransactionManyQuery | undefined;
  error: any;
  loading: any;
}) => {
  const { formatWIB } = useTransactionViewModel();
  return (
    <>
      {error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{error?.message}</h3>
        </div>
      ) : loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable
          utilityGY={5}
          utilityGX={8}
          responsive="table-responsive my-10"
          className="fs-6"
        >
          <KTTableHead
            textColor="muted"
            fontWeight="bold"
            className="text-uppercase align-middle"
          >
            <th className="min-w-200px">
              <p className="mb-0">Jenis Transaksi</p>
            </th>
            <th className="text-start min-w-250px">NAMA TRANSAKSI</th>
            <th className="text-start min-w-250px">NAMA PENGGUNA</th>
            <th className="text-start min-w-225px">REKENING/E-WALLET</th>
            <th className="text-end min-w-150px">NOMINAL</th>
            <th className="text-end min-w-200px">TANGGAL</th>
            <th className="text-end min-w-125px">STATUS</th>
            <th className="text-end min-w-150px">ACTION</th>
          </KTTableHead>
          <tbody className="align-middle">
            {data?.adminFindManyTransaction?.map((value) => {
              return (
                <tr key={value.transaction?.id}>
                  <td className="text-start min-w-200px">
                    <Buttons
                      mode="light"
                      buttonColor="secondary"
                      classNames="active pe-none"
                    >
                      {value.type}
                    </Buttons>
                  </td>
                  <td className="text-start min-w-250px fs-5 fw-bold">
                    {value.type === TransactionCategoryEnum.Comission
                      ? value.transaction?.toAccount?.name
                      : value.transaction?.payment?.invoice?.paymentForGateway
                          ?.bill_title}
                  </td>
                  <td className="text-start min-w-250px">
                    <div className="d-flex justify-content-start align-content-start">
                      <div className="symbol symbol-50px symbol-circle me-5">
                        <img
                          className="symbol-label bg-gray-600"
                          src={
                            value.user?.avatarImageId ??
                            "/media/avatars/blank.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column my-2">
                        <h6>{value.user?.name}</h6>
                        <h6 className="text-muted">{value.user?.email}</h6>
                      </div>
                    </div>
                  </td>
                  <td className="text-start min-w-225px">
                    <div className="d-flex flex-column justify-content-start align-content-start">
                      <h6>
                        {
                          value.transaction?.payment?.invoice?.paymentForGateway
                            ?.sender_bank
                        }
                      </h6>
                      <h6 className="text-muted">
                        {
                          value.transaction?.payment?.invoice?.paymentForGateway
                            ?.virtual_account_number
                        }
                      </h6>
                    </div>
                  </td>
                  <td className="text-end min-w-150px fs-5 fw-bold text-dark">
                    {formatCurrency(value.transaction?.amount as number)}
                  </td>
                  <td className="text-end min-w-200px">
                    <div className="d-flex flex-column justify-content-start align-content-start">
                      <h6>{formatDate(value.transaction?.createdAt)}</h6>
                      <h6 className="text-muted">
                        {formatWIB(value.transaction?.createdAt)}
                      </h6>
                    </div>
                  </td>
                  <td className="text-end min-w-125px">
                    <Badge
                      label={value?.transaction?.status as string}
                      badgeColor="success"
                    />{" "}
                  </td>
                  <td className="text-end min-w-150px">
                    <Link
                      href={`/admin/transaction/${value.transaction?.id}/detail-transaction`}
                      className="btn btn-secondary"
                    >
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </KTTable>
      )}
    </>
  );
};

const DownloadReportModal = ({
  date,
  onChange,
  onClose,
  onClick,
}: {
  date: Date;
  onChange: (value: any) => void;
  onClose: () => void;
  onClick: () => Promise<void>;
}) => {
  return (
    <div>
      <KTModal
        dataBsTarget="kt_download_report_modal"
        title="Export Data"
        fade
        modalCentered
        onClose={onClose}
        buttonClose={
          <Buttons
            buttonColor="secondary"
            data-bs-dismiss="modal"
            classNames="fw-bold"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={
          <Buttons
            data-bs-dismiss="modal"
            classNames="fw-bold"
            onClick={onClick}
          >
            Export Data
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <p className="fw-bold required text-gray-700">Pilih Rentang Waktu</p>
        <Flatpickr
          value={date}
          onChange={onChange}
          options={{
            mode: "range",
            dateFormat: "d m Y",
          }}
          className="form-control form-control-solid"
          placeholder="Pilih Rentang Waktu"
        />
        <p className="fw-bold text-muted mt-2">
          Pilih rentang waktu data yang ingin diexport
        </p>
      </KTModal>
    </div>
  );
};

export default Transaction;
