/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from "@/_metronic/helpers";
import { Dropdown1 } from "@/_metronic/partials";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import React from "react";

interface DataAkuisisiProps {
  /**
   * Classname for Table
   */
  className?: string;
  /**
   * Row 1 Name
   */
  sumberTraffic?: string;
  view?: number;
  lead?: number;
  sale?: number;
  nilai?: number;
  
  items: DataAkuisisiItem[];
  title?: string;
  subTitle?: string;
}

const DataAkuisisi = ({
  className,
  sumberTraffic,
  view,
  lead,
  sale,
  nilai,
  title = "Data Akuisisi",
  subTitle = "Per Januari 2024",
  items,
}: DataAkuisisiProps) => {
    const formatToRupiah = (value: number) => {
        return value.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR'
        });
      };
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {title}
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {subTitle}
          </span>
        </h3>
        
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 align-middle gs-0 gy-3">
            {/* begin::Table body */}
            <thead>
              <tr className='fw-bold uppercase text-muted'>
                <th className='min-w-250px rounded-start'>SUMBER TRAFFIC</th>
                <th className='w-100px text-center'>VIEW</th>
                <th className='w-150px text-center'>LEAD</th>
                <th className='w-150px text-center'>SALE</th>
                <th className='w-150px text-end'>NILAI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className=" w-50px">
                    <div className="text-start text-dark fw-bold p-0">
                      {item.sumberTraffic}
                    </div>
                  </td>
                  <td className="p-0 min-w-200px">
                    <div className="text-gray-500 fw-bold text-hover-primary text-center mb-1 fs-6">
                      {item.view}
                    </div>
                  </td>
                  <td className="text-start p-0 min-w-70px">
                    <span className="text-gray-500 fw-bold d-block text-center fs-6">
                      {item.lead}
                    </span>
                  </td>
                  <td className="text-start p-0 min-w-70px">
                    <span className="text-gray-500 fw-bold d-block text-center fs-6">
                      {item.sale}
                    </span>
                  </td>{" "}
                  <td className="text-end p-0 min-w-100px">
                    {" "}
                    <span className="text-dark fw-bold d-block fs-6">
                      {formatToRupiah(item.nilai)}
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

export default DataAkuisisi;
