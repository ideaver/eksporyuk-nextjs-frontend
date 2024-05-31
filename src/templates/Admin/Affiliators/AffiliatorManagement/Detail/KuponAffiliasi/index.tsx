import { useState } from "react";

import CreateCouponModal from "../../component/CreateCouponModal";
import DeleteCouponModal from "../../component/DeleteCouponModal";

import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { Badge } from "@/stories/atoms/Badge/Badge";
import useKuponAffiliasiViewModel from "./KuponAffiliasi-view-model";
import {
  AffiliatorFindOneQuery,
  DiscountTypeEnum,
} from "@/app/service/graphql/gen/graphql";
import { QueryResult } from "@apollo/client";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";

let couponIds: number[] = [];
const CouponAffiliatePage = ({ data }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponId, setCoupon] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const { useCheckbox } = useKuponAffiliasiViewModel();

  const { selectAll, checkedItems, handleSingleCheck, handleSelectAllCheck } =
    useCheckbox(data);

  // An array of checked coupon ids
  couponIds = checkedItems.filter((item) => item.value).map((item) => item.id);

  return (
    <>
      <CreateCouponModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
        }}
        isEdit={isEdit}
        couponId={couponId}
      />
      <DeleteCouponModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        couponId={couponId}
        couponIds={couponIds}
      />

      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view z-0">
        <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Kupon Affiliasi</h3>
          </div>
          <div>
            <button
              className="ms-auto d-inline btn btn-primary me-2"
              onClick={() => setShowModal(true)}
            >
              Tambah Kupon
            </button>
            <button
              className={`ms-auto d-inline btn btn-danger ${
                couponIds.length !== 0 ? "d-inline-block" : "d-none"
              }`}
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Kupon
            </button>
          </div>
        </div>
        {data?.error ? (
          <div className="d-flex justify-content-center align-items-center h-500px flex-column">
            <h3 className="text-center">{data?.error.message}</h3>
          </div>
        ) : data?.loading ? (
          <div className="d-flex justify-content-center align-items-center h-500px">
            <h3 className="text-center">Loading....</h3>
          </div>
        ) : (
          <KTTable utilityGY={5} responsive="table-responsive my-10 card-body">
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="w-150px">
                <CheckBoxInput
                  className="w-150px"
                  checked={selectAll}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={handleSelectAllCheck}
                >
                  <>Kode Kupon</>
                </CheckBoxInput>
              </th>
              <th className="min-w-200px">Kupon Utama</th>
              <th className="text-end min-w-200px">Pemilik</th>
              <th className="text-end min-w-200px">Diskon</th>
              {/* <th className="text-end min-w-200px">Penggunaan</th> */}
              <th className="text-end min-w-100px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>
            {data?.data?.affiliatorFindOne?.createdCoupons?.map(
              (coupon: any, index: any) => {
                return (
                  <KTTableBody key={index}>
                    <td className="align-middle">
                      <CheckBoxInput
                        className="ps-0"
                        checked={checkedItems[index]?.value ?? false}
                        name={"check-" + coupon.id}
                        value={coupon.id}
                        defaultChildren={false}
                        onChange={() => handleSingleCheck(index)}
                      >
                        <>{coupon.code}</>
                      </CheckBoxInput>
                    </td>
                    <td className="align-middle ">
                      {coupon?.extendedFrom?.code}
                    </td>
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      {coupon.createdBy.user.name}
                    </td>
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      {coupon?.coupon?.type === DiscountTypeEnum.Amount
                        ? formatCurrency(coupon?.coupon?.value)
                        : coupon?.coupon?.value + "%"}
                    </td>
                    {/* <td className="align-middle text-end text-muted fw-bold w-150px">
                      {coupon?.extendedFrom?._count?.extendedByCourses}
                    </td> */}
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      <Badge
                        badgeColor={
                          coupon.coupon.isActive ? "success" : "danger"
                        }
                        label={coupon.coupon.isActive ? "Aktif" : "Tidak Aktif"}
                        onClick={function noRefCheck() {}}
                      />
                    </td>
                    <td className="align-middle text-end ">
                      <div className="dropdown ps-15 pe-0 z-3">
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
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                setShowModal(true);
                                setIsEdit(true);
                                setCoupon(coupon.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                setShowDeleteModal(true);
                                setCoupon(coupon.id);
                              }}
                            >
                              Hapus
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </KTTableBody>
                );
              }
            )}
          </KTTable>
        )}
      </div>
    </>
  );
};

export default CouponAffiliatePage;
