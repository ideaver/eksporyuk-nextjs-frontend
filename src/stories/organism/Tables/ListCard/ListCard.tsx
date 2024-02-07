/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from "@/_metronic/helpers";
import { Dropdown1 } from "@/_metronic/partials";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import React from "react";

interface ListCardProps {
  /**
   * Classname for Table
   */
  className?: string;
  /**
   * Row 1 Name
   */
  row1Name?: string;
  /**
   * Row 2 Name
   */
  row2Name?: string;
  /**
   * Row 3 Name
   */
  row3Name?: string;
  items: ListItem[];
}

const ListCard = ({
  className,
  row1Name = "Total Lead",
  row2Name = "Total Saled",
  row3Name = "Total Omzet",
  items,
}: ListCardProps) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Produk Affiliasi Terlaris
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Produk yang diorder melalui affiliasi anda
          </span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Menu */}
          <Dropdown
            styleType="solid"
            options={[
              { value: "1", label: "Bulan Ini" },
              { value: "2", label: "Tahun Ini" },
              { value: "3", label: "Hari Ini" },
            ]}
            onValueChange={() => {
              console.log("value");
            }}
          ></Dropdown>
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 align-middle gs-0 gy-3">
            {/* begin::Table body */}
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className=" w-50px">
                    <div className="symbol symbol-50px me-2">
                      <span className={`symbol-label bg-${item.icon.color}`}>
                        <KTIcon
                          iconName={item.icon.name}
                          className={`fs-2x ${item.icon.textColor}`}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="p-0 min-w-200px">
                    <div className="text-dark fw-bold text-hover-primary mb-1 fs-6">
                      {item.title}
                    </div>
                  </td>
                  <td className="text-start p-0 min-w-70px">
                    <span className="text-dark fw-bold d-block fs-6">
                      {item.row1Value}
                    </span>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {row1Name}
                    </span>
                  </td>
                  <td className="text-start p-0 min-w-70px">
                    <span className="text-dark fw-bold d-block fs-6">
                      {item.row2Value}
                    </span>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {row2Name}
                    </span>
                  </td>{" "}
                  <td className="text-end p-0 min-w-100px">
                    {" "}
                    <span className="text-dark fw-bold d-block fs-6">
                      {item.row3Value}
                    </span>
                    <span className="text-muted fw-semibold text-muted d-block fs-7">
                      {row3Name}
                    </span>
                  </td>{" "}
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export default ListCard;
