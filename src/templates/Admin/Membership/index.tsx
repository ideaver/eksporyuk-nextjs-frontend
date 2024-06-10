import { PageTitle } from "@/_metronic/layout/core";
import useMembershipViewModel, { breadcrumbs } from "./Membership-view-model";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import { SortOrder } from "@/app/service/graphql/gen/graphql";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";

const Membership = () => {
  const {
    currentPage,
    setCurrentPage,
    handlePageChange,
    calculateTotalPage,
    membershipTake,
    membershipSkip,
    membershipFindMany,
    membershipFindSearch,
    setMembershipFindSearch,
    setMembershipSkip,
    setMembershipTake,
    setOrderBy,
    membershipLength,
    membershipDeleteOne,
  } = useMembershipViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Membership</PageTitle>
      <KTCard>
        <KTCardBody>
          <Head
            onSearch={(val) => {
              setMembershipFindSearch(val);
            }}
            setStatus={() => {}}
            setCategory={() => {}}
            setOrder={(e) => {
              setOrderBy(e);
            }}
          />
          {membershipFindMany.error ? (
            <div className="d-flex justify-content-center align-items-center h-500px flex-column">
              <h3 className="text-center">
                {membershipFindMany.error.message}
              </h3>
            </div>
          ) : membershipFindMany.loading ? (
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
                <th className="min-w-150px">
                  <p className="mb-0">NAMA</p>
                </th>
                <th className="text-end min-w-150px">DURASI</th>
                <th className="text-end min-w-250px">TANGGAL</th>
                {/* <th className="text-end min-w-200px">TIPE MEMBERSHIP</th> */}
                <th className="text-end min-w-150px">HARGA</th>
                <th className="text-end min-w-125px">ACTION</th>
              </KTTableHead>
              <tbody className="align-middle">
                {membershipFindMany?.data?.membershipCategoryFindMany?.map(
                  (membership) => {
                    return (
                      <tr key={membership.id} className="">
                        <td className="">
                          <Link
                            href={`/admin/subscriber/detail/${membership.id}`}
                            className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                            style={{
                              maxWidth: "150px",
                              display: "inline-block",
                            }}
                          >
                            {membership.name}
                          </Link>
                        </td>

                        <td className="min-w-150px text-end fw-bold text-muted">
                          {`${membership.durationDay} Hari`}
                        </td>
                        <td className="min-w-200px text-end fw-bold text-muted">
                          <div className="d-flex flex-column">
                            <span>{formatDate(membership.updatedAt)}</span>
                          </div>
                        </td>
                        {/* <td className="min-w-175px text-end fw-bold text-muted">
                          {membership.membershipType}
                        </td> */}
                        <td className="min-w-150px text-end fw-bold text-muted">
                          {formatCurrency(membership.price)}
                        </td>

                        <td className="text-end ">
                          <div className="dropdown ps-15 pe-0">
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
                                <Link
                                  href={`/admin/subscriber/edit/${membership.id}`}
                                  className="dropdown-item"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li></li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={async () => {
                                    try {
                                      await membershipDeleteOne({
                                        variables: {
                                          where: {
                                            id: membership.id,
                                          },
                                        },
                                      });
                                      await membershipFindMany.refetch();
                                    } catch (error) {
                                      console.log(error);
                                    } finally {
                                      await membershipFindMany.refetch();
                                      await membershipLength.refetch();
                                    }
                                  }}
                                >
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </KTTable>
          )}
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => {
              setCurrentPage(val);
            }}
            setMembershipFindSkip={(val) => {
              setMembershipSkip(val);
            }}
            setMembershipFindTake={(val) => {
              setMembershipTake(val);
            }}
            membershipTake={membershipTake}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({
  onSearch,
  setStatus,
  setCategory,
  setOrder,
}: {
  onSearch: (val: string) => void;
  setStatus: (val: string) => void;
  setCategory: (val: any) => void;
  setOrder: (val: any) => void;
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
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(e) => {
              setOrder(e);
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons>
            <Link
              href={"/admin/subscriber/information-subscriber"}
              className="text-white"
            >
              Add New Membership
            </Link>
          </Buttons>
        </div>
      </div>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setMembershipFindTake,
  setMembershipFindSkip,
  membershipTake,
  pageLength,
}: {
  setMembershipFindTake: (val: number) => void;
  setMembershipFindSkip: (val: number) => void;
  membershipTake: number;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
}) => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="row col-lg-auto gy-3 align-middle">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {membershipTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setMembershipFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setMembershipFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={membershipTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setMembershipFindTake(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="row col-lg-auto gy-3">
        <div className="col-auto">
          <Pagination
            total={pageLength}
            current={currentPage}
            maxLength={5}
            onPageChange={(val) => setCurrentPage(val)}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Membership;
