/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import currencyFormatter from "@/_metronic/helpers/Formatter";
import {
  OrderStatusEnum,
  StudentFindOneQuery,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";

const OrderPage = ({
  data,
}: {
  data: StudentFindOneQuery["studentFindOne"];
}) => {
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
              const latestStatus = order?.statuses?.sort(
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
                        label={latestStatus?.status ?? "Tidak Diketahui"}
                        badgeColor={getStatusBadgeColor(latestStatus?.status)}
                      />{" "}
                    </p>
                  </td>
                  <td className="align-middle text-end ">
                    <div className="dropdown  ps-15 pe-0">
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </KTTable>
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
