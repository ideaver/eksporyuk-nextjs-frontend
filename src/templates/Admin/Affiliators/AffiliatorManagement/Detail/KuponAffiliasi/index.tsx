import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { Badge } from "@/stories/atoms/Badge/Badge";

const CouponAffiliatePage = ({ data }: any) => {
  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view z-0">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Kupon Affiliasi</h3>
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
                  checked={false}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={() => {}}
                >
                  <>Kode Kupon</>
                </CheckBoxInput>
              </th>
              <th className="min-w-200px">Kupon Utama</th>
              <th className="text-end min-w-200px">Pemilik</th>
              <th className="text-end min-w-200px">Diskon</th>
              <th className="text-end min-w-200px">Penggunaan</th>
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
                        checked={false}
                        name={"check-"}
                        value={""}
                        defaultChildren={false}
                        onChange={() => {}}
                      >
                        <>{coupon.code}</>
                      </CheckBoxInput>
                    </td>
                    <td className="align-middle ">{coupon.code}</td>
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      {coupon.createdBy.user.name}
                    </td>
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      %50
                    </td>
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      41
                    </td>
                    <td className="align-middle text-end text-muted fw-bold w-150px">
                      <Badge
                        badgeColor="success"
                        label="Active"
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
                              onClick={() => {}}
                            >
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
