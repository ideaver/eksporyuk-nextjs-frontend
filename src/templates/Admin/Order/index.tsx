import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import {
  CartItemTypeEnum,
  FollowUpFindManyQuery,
  OrderFindManyQuery,
  OrderStatusEnum,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { RootState } from "@/app/store/store";
import { CreateFollowUpModal } from "@/components/partials/Modals/CreateFollowUpModal";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { UpdateFollowUpModal } from "@/components/partials/Modals/UpdateFollowUpModal";
import { changeFollowUpTamplate } from "@/features/reducers/followup/followupReducer";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { QueryResult } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbs } from "../Products/Products-view-model";
import useAdminOrderViewModel from "./Order-view-model";

const OrderPage = ({}) => {
  const { data: session } = useSession();
  const {
    exportModalState,
    setExportModalState,
    orderFindMany,
    setOrderFindTake,
    setOrderFindSearch,
    calculateTotalPage,
    currentPage,
    handlePageChange,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    setStatusFilter,
    orderBy,
    setOrderBy,
    orderFindTake,
    orderTypeOptions,
    setCategoryOrderType,
    categoryOrderType,
    exportOrder,
    isLoading,
    setIsloading,
    followUpFindMany,
    handleFollupChange,
    handleEditState,
    handleDeleteFollowUp,
    handleSendFollowUp,
    handleChangeFollowUpState,
    orderVariables,
  } = useAdminOrderViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Order</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onStatusChanged={(val) => {
              if (val === "all") return setStatusFilter(undefined);
              setStatusFilter(val as OrderStatusEnum);
            }}
            onSearch={(val) => {
              setOrderFindSearch(val);
            }}
            orderBy={orderBy}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <Body
            orderFindMany={orderFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
            followUpFindMany={followUpFindMany}
            handleFollupChange={handleFollupChange}
            handleEditState={handleEditState}
            handleDeleteFollowUp={handleDeleteFollowUp}
            handleSendFollowUp={handleSendFollowUp}
            handleFollowUpState={handleChangeFollowUpState}
          />
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            setMentorFindSkip={(val) => {}}
            setMentorFindTake={(val) => {
              setOrderFindTake(val);
            }}
            orderFindTake={orderFindTake}
          />
        </KTCardBody>
      </KTCard>
      <ExportModal
        loading={isLoading}
        onClose={() => {}}
        orderTypeOptions={orderTypeOptions}
        onDropdownChange={(e) => {
          setCategoryOrderType(e);
        }}
        orderType={categoryOrderType}
        date={exportModalState}
        onChange={([startDate, endDate]) => {
          setExportModalState([startDate, endDate]);
        }}
        onClick={async () => {
          setIsloading(true);
          try {
            const exportVariables = {
              exportOrder: {
                adminId: session?.user.id as string,
                startDate: exportModalState[0]?.toISOString(),
                endDate: exportModalState[1]?.toISOString(),
                orderType:
                  categoryOrderType === "all" ? null : categoryOrderType,
                where: orderVariables.where,
              },
            };
            console.log(exportVariables);
            const response = await exportOrder({
              variables: exportVariables,
            });
            const link = document.createElement("a");
            link.href = response.data?.exportOrder?.fileURL as string;
            link.click();
          } catch (error) {
            console.log(error);
          } finally {
            setIsloading(false);
          }
        }}
      />
    </>
  );
};

const Head = ({
  onStatusChanged,
  onSearch,
  orderBy,
  setOrderBy,
}: {
  onStatusChanged: (val: string) => void;
  onSearch: (val: string) => void;
  orderBy: SortOrder;
  setOrderBy: (e: SortOrder) => void;
}) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={{
            onChange: (e: any) => onSearch(e.target.value),
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "PENDING", value: OrderStatusEnum.Pending },
              { label: "PROCESSING", value: OrderStatusEnum.Processing },
              { label: "DONE", value: OrderStatusEnum.Done },
              { label: "CANCELLED", value: OrderStatusEnum.Cancelled },
              { label: "EXPIRED", value: OrderStatusEnum.Expired },
            ]}
            onValueChange={(val) => {
              onStatusChanged(val as string);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={orderBy}
            options={[
              { label: "Terbaru", value: SortOrder.Asc },
              { label: "Terlama", value: SortOrder.Desc },
            ]}
            onValueChange={(val) => {
              setOrderBy(val as SortOrder);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons
            data-bs-toggle="modal"
            data-bs-target="#kt_export_order_modal"
          >
            Export Data
          </Buttons>
        </div>
      </div>

      <KTModal
        dataBsTarget="kt_create_coupon_modalllllsss"
        title="Tambah Kupon"
        fade
        modalCentered
        footerContentCentered
        onClose={() => {}}
        modalSize="lg"
        buttonClose={
          <Buttons
            buttonColor="secondary"
            classNames="fw-bold"
            data-bs-dismiss="modal"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={<Buttons classNames="fw-bold">Simpan</Buttons>}
      >
        <div>
          <h4 className="required fw-bold text-gray-700">Pilih Kupon Utama</h4>
          <Dropdown
            styleType="solid"
            props={{ id: "couponName" }}
            options={[
              { label: "EKSPORYUK", value: "mainCoupon1" },
              { label: "Kupon Utama 2", value: "mainCoupon2" },
            ]}
            onValueChange={() => {}}
          />
          <p className="fw-bold text-gray-600 mt-3">
            Pilih kupon utama yang dibuat oleh admin
          </p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField styleType="solid" placeholder="Masukkan Nama Kupon anda" />
          <p className="fw-bold text-gray-600 mt-3">
            Masukkan kode kupon yang ingin anda gunakan dan bagikan
          </p>
        </div>
        <Alert
          alertColor="warning"
          mode="light"
          label="Hanya bisa membuat 1 kupon dari setiap kupon utama. Kupon yang sudah anda buat tidak dapat diubah kembali."
          title="PERHATIAN"
          labelColor="dark"
          border="dashed"
          prefixIcon="shield-cross"
        ></Alert>
      </KTModal>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setMentorFindTake,
  pageLength,
  orderFindTake,
}: {
  setMentorFindTake: (val: number) => void;
  setMentorFindSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  orderFindTake: number;
}) => {
  return (
    <div className="row justify-content-between">
      <div className="col-auto">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {orderFindTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setMentorFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setMentorFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={orderFindTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setMentorFindTake(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-auto">
        <Pagination
          total={pageLength}
          current={currentPage}
          maxLength={5}
          onPageChange={(val) => setCurrentPage(val)}
        ></Pagination>
      </div>
    </div>
  );
};

const ExportModal = ({
  loading,
  date,
  onChange,
  onClose,
  onDropdownChange,
  orderTypeOptions,
  orderType,
  onClick,
}: {
  loading: boolean;
  date: Date;
  onChange: (value: any) => void;
  onClose: () => void;
  onDropdownChange: (val: any) => void;
  orderTypeOptions: any;
  orderType: CartItemTypeEnum | "all";
  onClick: () => void;
}) => {
  return (
    <div>
      <KTModal
        dataBsTarget="kt_export_order_modal"
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
          <Buttons classNames="fw-bold" disabled={loading} onClick={onClick}>
            Export
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
        <p className="fw-bold text-gray-700">Pilih Category</p>

        <Dropdown
          options={orderTypeOptions}
          onValueChange={onDropdownChange}
          value={orderType}
        />
      </KTModal>
    </div>
  );
};

const Body = ({
  orderFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
  followUpFindMany,
  // followUpTamplate,
  // selectedFollupValue,
  handleFollupChange,
  handleEditState,
  handleDeleteFollowUp,
  handleSendFollowUp,
  handleFollowUpState,
}: {
  orderFindMany: QueryResult<OrderFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: number; value: boolean }[];
  selectAll: boolean;
  followUpFindMany: QueryResult<FollowUpFindManyQuery>;
  handleFollupChange: (e: any) => void;
  handleEditState: (e: any) => void;
  handleDeleteFollowUp: (name: string) => Promise<void>;
  handleSendFollowUp: () => string;
  handleFollowUpState: any;
}) => {
  const [selectedMentor, setSelectedOrder] = useState("");
  function getStatusBadgeColor(status: OrderStatusEnum | undefined) {
    switch (status) {
      case OrderStatusEnum.Pending:
        return "warning";
      case OrderStatusEnum.Processing:
        return "primary";
      case OrderStatusEnum.Done:
        return "success";
      case OrderStatusEnum.Shipped:
        return "info";
      case OrderStatusEnum.Delivered:
        return "success";
      case OrderStatusEnum.Cancelled:
        return "danger";
      case OrderStatusEnum.Returned:
        return "secondary";
      default:
        return "info";
    }
  }
  const followUpState = useSelector((state: RootState) => state.followUp);
  const dispatch = useDispatch();
  return (
    <>
      {orderFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{orderFindMany.error.message}</h3>
        </div>
      ) : orderFindMany.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <>
          <KTTable utilityGY={5} responsive="table-responsive my-10">
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="min-w-150px">
                {/* <CheckBoxInput
                  className="w-150px"
                  checked={selectAll}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={handleSelectAllCheck}
                >
                  <p className="mb-0">ID ORDER</p>
                </CheckBoxInput> */}
                <p className="mb-0">ID ORDER</p>
              </th>
              <th className="min-w-200px">ID Invoice</th>
              <th className="min-w-275px">Nama Produk</th>
              <th className="text-start min-w-200px">Pembeli</th>
              <th className="text-end min-w-200px">Tanggal Pembelian</th>
              <th className="text-end min-w-200px">Total Harga</th>
              <th className="text-end min-w-275px">Afiliasi</th>
              <th className="text-end min-w-200px">Kupon</th>
              <th className="text-end min-w-150px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>

            {orderFindMany.data?.orderFindMany?.map((order, index) => {
              const latestStatus = order?.statuses
                ?.slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )[0];
              const latestInvoices = order?.invoices?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )[0];
              function getProductName(cartItems: any[]) {
                const types: any = [];
                cartItems.forEach((item, index) => {
                  if (item.productId !== null) types.push(item.product?.name);
                  if (item.bundleId !== null) types.push(item.bundle?.name);
                  if (item.courseId !== null) types.push(item.course?.title);
                  if (item.membershipCategoryId !== null)
                    types.push(item.membership?.name);
                  if (item.productServiceId !== null)
                    types.push(item.productService?.name);
                });
                return types.filter(Boolean).join(", ");
              }
              return (
                <tr key={index}>
                  <td className="align-middle">
                    {/* <CheckBoxInput
                      className="ps-0"
                      checked={checkedItems[index]?.value ?? false}
                      name={"check-" + order.id}
                      value={order.id.toString()}
                      defaultChildren={false}
                      onChange={() => handleSingleCheck(index)}
                    >
                      <p className="fw-bold text-black mb-0">{order.id}</p>
                    </CheckBoxInput> */}
                    <p className="fw-bold text-black mb-0">{order.id}</p>
                  </td>
                  <td className="align-middle text-start text-muted min-w-200px fw-bold ">
                    {latestInvoices?.uniqueCode}
                  </td>
                  <td className="align-middle ">
                    <div className="d-flex align-items-center">
                      <Link
                        href={"orders/" + order.id + "/detail-order"}
                        className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold mb-0"
                      >
                        <p key={index} className="mb-0">
                          {getProductName(order?.cart?.cartItems ?? [])}
                        </p>
                      </Link>
                    </div>
                  </td>

                  <td className="align-middle text-start w-250px">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="symbol symbol-50px symbol-circle me-5">
                        <img
                          className="symbol-label bg-gray-600"
                          src={
                            order.createdByUser.avatarImageId ??
                            "/media/avatars/300-1.jpg"
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-muted text-hover-primary cursor-pointer fs-6 fw-bold">
                          {order.createdByUser.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(latestInvoices?.amount || 0)}
                  </td>
                  <td className="align-middle text-end w-250px">
                    {order.referralLink == null ? (
                      <span className="text-muted cursor-pointer fs-6 fw-bold">
                        Tidak tersedia
                      </span>
                    ) : (
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="symbol symbol-50px symbol-circle me-5">
                          <img
                            className="symbol-label bg-gray-600"
                            src={
                              order.referralLink?.createdBy.user
                                .avatarImageId ?? "/media/avatars/300-1.jpg"
                            }
                            width={50}
                            height={50}
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <span className="text-muted text-hover-primary cursor-pointer fs-6 fw-bold">
                            {order.referralLink?.createdBy.user.name ??
                              "Tidak Ada"}
                          </span>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {order.coupon?.affiliatorCoupon?.code ?? "Tidak Tersedia"}
                  </td>
                  <td className="align-middle text-end">
                    <p className="align-middle">
                      {" "}
                      <Badge
                        label={latestStatus?.status ?? "Tidak Diketahui"}
                        badgeColor={getStatusBadgeColor(latestStatus?.status)}
                      />{" "}
                    </p>
                  </td>
                  <td className="align-middle text-end min-w-125px">
                    {/* <div className="dropdown  ps-15 pe-0">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item">
                            Kirim Pengaturan ulang kata sandi
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">Edit</button>
                        </li>
                        <li>
                          <button className="dropdown-item">Hapus</button>
                        </li>
                      </ul>
                    </div> */}
                    <button
                      className="btn btn-secondary px-4"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_follup_modal"
                      onClick={() => {
                        handleFollowUpState({
                          name: order.createdByUser.name,
                          date: order.createdAt,
                          phone: order.createdByUser.phoneId,
                          email: order.createdByUser.email,
                          coupon: order.coupon?.affiliatorCoupon?.code,
                        });
                      }}
                    >
                      Follow Up
                    </button>
                  </td>
                </tr>
              );
            })}
          </KTTable>
          <FollowUpModal
            follupValues={
              followUpFindMany.data?.followUpFindMany?.map(
                (e) => e.name
              ) as string[]
            }
            value={followUpState.followUpTamplate ?? ""}
            // follupValues={follupValues}
            selectedFollupValue={followUpState.selectedFollowUpValue}
            handleFollupChange={handleFollupChange}
            onChange={(e: any) => {
              dispatch(changeFollowUpTamplate(e.target.value));
            }}
            handleEditState={handleEditState}
            handleDeleteFollowUp={handleDeleteFollowUp}
            linkAPIWhatsapp={handleSendFollowUp()}
          />

          <CreateFollowUpModal />
          <UpdateFollowUpModal />
        </>
      )}
    </>
  );
};

export default OrderPage;
