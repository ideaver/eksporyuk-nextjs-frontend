import { PageTitle } from "@/_metronic/layout/core";
import { TableProps, TableRow, tableData } from "./Order-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import Link from "next/link";
import useOrderViewModel from "./Order-view-model";
import Image from "next/image";
import Flatpickr from "react-flatpickr";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";

interface OrderPageProps { }

const OrderPage = ({ }: OrderPageProps) => {
  const {
    breadcrumbs,
    exportModalState,
    setExportModalState,
    follupValues,
    selectedFollupValue,
    handleFollupChange,
  } = useOrderViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Order Affiliasi</PageTitle>
      <KTCard>
        <KTCardBody>
          <div className="mb-10">
            <Head />
          </div>
          {/* <Table data={tableData} /> */}
          <QueryTableOrder />
          <Footer />
        </KTCardBody>
      </KTCard>
      <ExportModal
        date={exportModalState}
        onChange={([startDate, endDate]) => {
          setExportModalState([startDate, endDate]);
        }}
      />
      <FollowUpModal
        follupValues={follupValues}
        selectedFollupValue={selectedFollupValue}
        handleFollupChange={handleFollupChange}
      />
    </>
  );
};

export default OrderPage;

const Head = () => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Produk", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => { }}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons data-bs-toggle="modal" data-bs-target="#kt_export_modal">
            Export Data
          </Buttons>
        </div>
      </div>
    </div>
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
          onValueChange={() => { }}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => { }}
        ></Pagination>
      </div>
    </div>
  );
};

// const Table = ({ data }: TableProps) => {
//   return (
//     <div className="table-responsive mb-10">
//       <table className="table">
//         <thead>
//           <tr>
//             <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
//             <th className="fw-bold text-muted min-w-300px">NAMA PRODUK</th>
//             <th className="fw-bold text-muted text-end min-w-200px">PEMBELI</th>
//             <th className="fw-bold text-muted text-end min-w-200px">
//               TANGGAL PEMBELIAN
//             </th>
//             <th className="fw-bold text-muted text-end min-w-200px">
//               TOTAL HARGA
//             </th>
//             <th className="fw-bold text-muted text-end min-w-200px">STATUS</th>
//             <th className="fw-bold text-muted text-end min-w-150px">ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td className="fw-bold">{row.idOrder}</td>
//               <td className="fw-bold">
//                 <Link
//                   className="text-dark text-hover-primary"
//                   href={
//                     "order/" + row.idOrder.replace(" ", "") + "/detail-order/"
//                   }
//                 >
//                   {row.namaProduk}
//                 </Link>
//               </td>
//               <td className="fw-bold text-muted text-end d-flex align-items-center p-0 pb-10">
//                 <Image
//                   className="symbol symbol-50px symbol-circle me-5"
//                   src="/media/avatars/300-1.jpg"
//                   width={50}
//                   height={50}
//                   alt={row.pembeli + "Image"}
//                 ></Image>
//                 {row.pembeli}
//               </td>
//               <td className="fw-bold text-muted text-end">
//                 {row.tanggalPembelian}
//               </td>
//               <td className="fw-bold text-muted text-end">{row.totalHarga}</td>
//               <td className="text-end">
//                 <Badge label={row.status} badgeColor={row.badgeColor} />
//               </td>
//               <td className="fw-bold text-muted justify-content-end text-end">
//                 <ActionButton />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

const QueryTableOrder = () => {
  const [orderData, setOrderData] = useState<TableRow[]>([]);

  const GET_ORDER = gql`
  query OrderFindMany($where: OrderWhereInput) {
  orderFindMany(where: $where) {
    id
    platformFee
    createdAt
    updatedAt
    cartId
    createdByUserId
    couponId
    referralLinkId
    createdByUser {
      id
      name
    }
  }
}`;

  const { loading, error, data } = useQuery(GET_ORDER);

  // Untuk Data Order Kurang Status, Badge Button, Nama Produk, Icon/Avatar Pembeli

  useEffect(() => {
    if (data && data.orderFindMany) {
      const orderData = data.orderFindMany.map((order: any) => ({
        idOrder: order.id, // order.createdByUser.id
        namaProduk: order.createdByUser.name,
        pembeli: order.createdByUser.name,
        tanggalPembelian: order.createdAt,
        totalHarga: order.platformFee,
        status: "Pending",
        badgeColor: "warning",
      }));
      setOrderData(orderData);
    }
  }, [data]);

  console.log("ORDER DATA", data, loading, error, orderData);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  const formatToIDR = (amount: string) => {
    return parseInt(amount).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
  };

  return (
    <div className="table-responsive mb-10">
      <KTTable>
        <KTTableHead>
          <th className="fw-bold text-muted min-w-100px">ID ORDER</th>
          <th className="fw-bold text-muted min-w-300px">NAMA PRODUK</th>
          <th className="fw-bold text-muted text-start min-w-200px">PEMBELI</th>
          <th className="fw-bold text-muted text-end min-w-200px">
            TANGGAL PEMBELIAN
          </th>
          <th className="fw-bold text-muted text-end min-w-200px">
            TOTAL HARGA
          </th>
          <th className="fw-bold text-muted text-end min-w-200px">STATUS</th>
          <th className="fw-bold text-muted text-end min-w-150px">ACTION</th>
        </KTTableHead>
        <tbody>
          {orderData.map((user, index) => (
            <tr key={index}>
              <td className="fw-bold">INV {user.idOrder}</td>
              <td className="fw-bold">
                <Link
                  className="text-dark text-hover-primary"
                  href={
                    "order/" + user.idOrder.toString().replace(" ", "") + "/detail-order/"
                  }
                >
                  {user.namaProduk}
                </Link>
              </td>
              <td className="fw-bold text-muted text-end d-flex align-items-center p-0 pb-10">
                <Image
                  className="symbol symbol-50px symbol-circle me-5"
                  src="/media/avatars/300-1.jpg"
                  width={50}
                  height={50}
                  alt={user.pembeli + "Image"}
                ></Image>
                {user.pembeli}
              </td>
              <td className="fw-bold text-muted text-end">
                {formatDate(user.tanggalPembelian)}
              </td>
              <td className="fw-bold text-muted text-end">{formatToIDR(user.totalHarga)}</td>
              <td className="text-end">
                <Badge label={user.status} badgeColor={user.badgeColor} />
              </td>
              <td className="fw-bold text-muted justify-content-end text-end">
                <ActionButton />
              </td>
            </tr>
          ))}
        </tbody>
      </KTTable>
    </div>
  );
};

const ActionButton = () => {
  return (
    <>
      <button
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        Action
        <KTIcon iconName="down" className="ms-5 fs-5 m-0" />
      </button>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-150px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <span
            className="menu-link px-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_follup_modal"
          >
            Kirim Follow Up
          </span>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

const ExportModal = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (value: any) => void;
}) => {
  return (
    <div>
      <KTModal
        dataBsTarget="kt_export_modal"
        title="Export Data"
        fade
        modalCentered
        onClose={() => {

        }}
        buttonClose={
          <Buttons buttonColor="secondary" data-bs-dismiss="modal" classNames="fw-bold">Batal</Buttons>
        }
        buttonSubmit={
          <Buttons data-bs-dismiss="modal" classNames="fw-bold">Export</Buttons>
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
