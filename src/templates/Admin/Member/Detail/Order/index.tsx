/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import React from "react";

const OrderPage: React.FC = () => {
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
            <tr>
              <td className="align-middle fw-bold text-black">INV 123456</td>
              <td className="align-middle ">
                <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                  Ekspor Yuk Automation (EYA)
                </span>
              </td>
              <td className="fw-bold text-muted text-end align-middle w-200px">
                7 Januari 2024
              </td>

              <td className="align-middle text-end text-muted fw-bold w-125px">
                Rp 399.000
              </td>
              <td className="align-middle text-end">
                <p>
                  {" "}
                  <Badge label="Published" badgeColor="success" />{" "}
                </p>
              </td>
              <td className="align-middle text-end ">
                <Dropdown
                  styleType="solid"
                  options={[
                    { label: "Action", value: "all" },
                    { label: "Aktif", value: "active" },
                    { label: "Tidak Aktif", value: "inactive" },
                  ]}
                  onValueChange={() => {}}
                />
              </td>
            </tr>
          </KTTable>
          <Footer />
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
