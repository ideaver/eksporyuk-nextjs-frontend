/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import currencyFormatter from "@/_metronic/helpers/Formatter";
import {
  OrderStatusEnum,
  StudentFindOneQuery,
  useFollowUpDeleteOneMutation,
  useFollowUpFindManyQuery,
  UserRoleEnum,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { RootState } from "@/app/store/store";
import { CreateFollowUpModal } from "@/components/partials/Modals/CreateFollowUpModal";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { UpdateFollowUpModal } from "@/components/partials/Modals/UpdateFollowUpModal";
import {
  changeContent,
  changeFollowUpCoupon,
  changeFollowUpDate,
  changeFollowUpEmail,
  changeFollowUpIdInvoiceProductName,
  changeFollowUpName,
  changeFollowUpPhone,
  changeFollowUpProductName,
  changeFollowUpProductTypeName,
  changeFollowUpTamplate,
  changeFollowUpTotalOrderName,
  changeId,
  changeName,
  changeSelectedFollwUpValue,
} from "@/features/reducers/followup/followupReducer";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const OrderPage = ({
  data,
}: {
  data: StudentFindOneQuery["studentFindOne"];
}) => {
  const dispatch = useDispatch();
  const followUpState = useSelector((state: RootState) => state.followUp);

  const followUpFindMany = useFollowUpFindManyQuery({
    variables: {
      where: {
        forRole: {
          equals: UserRoleEnum.Admin,
        },
      },
    },
  });

  const handleFollupChange = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    dispatch(changeSelectedFollwUpValue(event.target.value));

    const filterContent = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name == event.target.value
    )[0];
    dispatch(changeFollowUpTamplate(filterContent?.content));
  };

  const [followUpDeleteOne] = useFollowUpDeleteOneMutation();
  const handleSendFollowUp = () => {
    const contentReplaced = followUpState.followUpTamplate
      ?.replace(/\[\[nama\]\]/g, `${followUpState.name}`)
      .replace(/\[\[tanggal\]\]/g, formatDate(followUpState.date))
      .replace(/\[\[email\]\]/g, `${followUpState.email}`)
      .replace(/\[\[nomor-telepon\]\]/g, `${followUpState.phone}`)
      .replace(/\[\[kupon\]\]/g, `${followUpState.coupon}`)
      .replace(/\[\[nama-produk\]\]/g, `${followUpState.productName}`)
      .replace(/\[\[total-order\]\]/g, `${followUpState.totalOrder}`)
      .replace(/\[\[jenis-produk\]\]/g, `${followUpState.productType}`)
      .replace(
        /\[\[id-invoice-produk\]\]/g,
        `${followUpState.idInvoiceProduct}`
      );
    const encodedMessage = encodeURIComponent(`${contentReplaced}`);

    return `https://web.whatsapp.com/send?phone=${followUpState.phone}&text=${encodedMessage}`;
  };
  const handleChangeFollowUpState = (data: {
    name: string | undefined | null;
    date: string | undefined | null;
    email: string | undefined | null;
    phone: string | undefined | null;
    coupon: string | undefined | null;
    productName: string | undefined | null;
    totalOrder: string | undefined | null;
    productType: string | undefined | null;
    idInvoiceProduct: string | undefined | null;
  }) => {
    dispatch(changeFollowUpName(data.name as string));
    dispatch(changeFollowUpEmail(data.email as string));
    dispatch(changeFollowUpDate(data.date as string));
    dispatch(changeFollowUpCoupon(data.coupon as string));
    dispatch(changeFollowUpPhone(data.phone as string));
    dispatch(changeFollowUpProductName(data.productName as string));
    dispatch(changeFollowUpTotalOrderName(data.totalOrder as string));
    dispatch(changeFollowUpProductTypeName(data.productType as string));
    dispatch(
      changeFollowUpIdInvoiceProductName(data.idInvoiceProduct as string)
    );
  };

  const handleDeleteFollowUp = async (name: string) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];

    try {
      await followUpDeleteOne({
        variables: {
          where: {
            id: editFolup?.id,
          },
        },
      });
      await followUpFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditState = (name: any) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];
    console.log(editFolup);
    dispatch(changeName(`${editFolup?.name}`));
    dispatch(changeContent(`${editFolup?.content}`));
    dispatch(changeId(editFolup?.id as number));
  };

  function getProductName(cartItems: any[]) {
    const types: any = [];
    cartItems.forEach((item, index) => {
      if (item.productId !== null) types.push(item.product?.name);
      if (item.bundleId !== null) types.push(item.bundle?.name);
      if (item.courseId !== null) types.push(item.course?.title);
      if (item.membershipCategoryId !== null) types.push(item.membership?.name);
      if (item.productServiceId !== null) types.push(item.productService?.name);
    });
    return types.filter(Boolean).join(", ");
  }

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
  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer  justify-content-between">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Riwayat Order</h3>
          </div>
        </div>

        <div className="card-body p-9">
          <KTTable utilityGY={5} responsive="table-responsive">
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="min-w-100px">ID ORDER</th>
              <th className="min-w-375px">Nama Course</th>
              <th className="text-end min-w-200px">Tanggal Pembelian</th>
              <th className="text-end min-w-125px">Total Harga</th>
              <th className="text-end min-w-150px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>
            {data?.user.orders?.map((order, index) => {
              const latestInvoices = order?.invoices?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )[0];
              return (
                <tr key={index}>
                  <td className="align-middle fw-bold text-black">
                    {order.id}
                  </td>
                  <td className="align-middle ">
                    <Link
                      href={"/admin/orders/" + order.id + "/detail-order"}
                      className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold"
                    >
                      {getProductName(order.cart.cartItems ?? [])}
                    </Link>
                  </td>
                  <td className="fw-bold text-muted text-end align-middle w-200px">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="align-middle text-end text-muted fw-bold w-125px">
                    {currencyFormatter(latestInvoices?.amount ?? 0)}
                  </td>
                  <td className="align-middle text-end">
                    <p>
                      {" "}
                      <Badge
                        label={
                          order?.statuses?.[order?.statuses?.length - 1]
                            ?.status ?? "Tidak Diketahui"
                        }
                        badgeColor={getStatusBadgeColor(
                          order?.statuses?.[order?.statuses?.length - 1]?.status
                        )}
                      />{" "}
                    </p>
                  </td>
                  <td className="align-middle text-end ">
                    <button
                      className="btn btn-secondary px-4"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_follup_modal"
                      onClick={() => {
                        // console.log(order.cart.cartItems?.[0].type);
                        handleChangeFollowUpState({
                          name: order?.createdByUser.name,
                          date: order.createdAt,
                          phone:
                            order.createdByUser.phoneId?.toString() as string,
                          email: order.createdByUser.email,
                          coupon: order.coupon?.affiliatorCoupon
                            ?.code as string,
                          productName: getProductName(
                            order?.cart?.cartItems ?? []
                          ),
                          totalOrder: `${order.cart.totalPrice}`,
                          productType: order.cart.cartItems?.[0]?.type,
                          idInvoiceProduct: order.invoices?.[0].uniqueCode,
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
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <div className="row justify-content-between">
      <div className="col-auto">
        <Dropdown
          styleType="solid"
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
          ]}
          onValueChange={() => {}}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => {}}
        ></Pagination>
      </div>
    </div>
  );
};

export default OrderPage;
