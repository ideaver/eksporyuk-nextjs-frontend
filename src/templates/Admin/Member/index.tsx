import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import {
  SortOrder,
  StudentFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import useForgotPassword from "@/app/service/utils/auth/forgotPasswordHook";
import useDeleteUser from "@/app/service/utils/crud/user/userDelete";
import useUserEdit from "@/app/service/utils/crud/user/userEdit";
import { formatDate } from "@/app/service/utils/dateFormatter";
import DeleteUserModal from "@/components/partials/Modals/Mutations/DeleteUserModal";
import EditUserModal from "@/components/partials/Modals/Mutations/EditUserModal";
import ForgotPasswordModal from "@/components/partials/Modals/Mutations/ForgotPasswordModal";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { QueryResult } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import useMemberViewModel, { breadcrumbs } from "./Member-view-model";

const MemberPage = ({}) => {
  const {
    setStudentFindSearch,
    studentFindMany,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    calculateTotalPage,
    currentPage,
    handlePageChange,
    setStudentFindTake,
    orderBy,
    setOrderBy,
    studentFindTake,
  } = useMemberViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Kelas</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={(value) => setStudentFindSearch(value)}
            orderBy={orderBy}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <Body
            studentFindMany={studentFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
          />
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            setStudentFindSkip={(val) => {}}
            setStudentFindTake={(val) => {
              setStudentFindTake(val);
            }}
            studentFindTake={studentFindTake}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({
  onSearch,
  orderBy,
  setOrderBy,
}: {
  onSearch: (value: string) => void;
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
      {/* TODO This is for multiple instace, make when integrating */}
      <div className="row col-lg-auto gy-3 align-items-center">
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
        {/* <div className="col-lg-auto">
              <p className="mb-0 fw-bold">3 Items Selected</p>
            </div>
            <div className="col-lg-auto">
              <Buttons mode="light">Change Status</Buttons>
            </div>
            <div className="col-lg-auto">
              <Buttons
                data-bs-toggle="modal"
                data-bs-target="#kt_create_coupon_modalllllsss"
                buttonColor="danger"
              >
                Delete Selected
              </Buttons>
            </div> */}
      </div>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setStudentFindTake,
  pageLength,
  studentFindTake,
}: {
  setStudentFindTake: (val: number) => void;
  setStudentFindSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  studentFindTake: number;
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
            {studentFindTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setStudentFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setStudentFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={studentFindTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setStudentFindTake(parseInt(e.target.value));
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

const Body = ({
  studentFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
}: {
  studentFindMany: QueryResult<StudentFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: string; value: boolean }[];
  selectAll: boolean;
}) => {
  const {
    forgotPasswordModalLoading,
    handleForgotPassword,
    setShowForgotPasswordModal,
    showForgotPasswordModal,
  } = useForgotPassword();
  const {
    showEditUserModal,
    editUserModalLoading,
    handleUserUpdate,
    setShowEditUserModal,
  } = useUserEdit();
  const {
    deleteUserLoading,
    handleDeleteUser,
    setShowDeleteUserModal,
    showDeleteUserModal,
  } = useDeleteUser();
  const [selectedStudentEmail, setSelectedStudentEmailEmail] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  return (
    <>
      {studentFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{studentFindMany.error.message}</h3>
        </div>
      ) : studentFindMany.loading ? (
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
              {/* <th className="w-200px">
                <CheckBoxInput
                  className="w-200px"
                  checked={selectAll}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={handleSelectAllCheck}
                >
                  <>Username</>
                </CheckBoxInput>
              </th> */}
              <th className="min-w-300px">Nama Lengkap</th>
              {/* <th className="text-end min-w-100px">Kategori</th> */}
              <th className="text-end min-w-275px">Affiliasi</th>
              <th className="text-end min-w-200px">Tanggal Pendaftaran</th>
              <th className="text-end min-w-200px">Jumlah Course</th>
              <th className="text-end min-w-150px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>
            {studentFindMany.data?.studentFindMany?.map((student, index) => (
              <tr key={index}>
                {/* <td className="align-middle">
                  <CheckBoxInput
                    className="ps-0"
                    checked={checkedItems[index]?.value ?? false}
                    name={"check-" + student.id}
                    value={student.id}
                    defaultChildren={false}
                    onChange={() => handleSingleCheck(index)}
                  >
                    <Link
                      href={`/admin/members/detail/${student.id}/profile`}
                      className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                      style={{
                        maxWidth: "150px",
                        display: "inline-block",
                      }}
                    >
                      {student.user.username}
                    </Link>
                  </CheckBoxInput>
                </td> */}
                <td className="align-middle ">
                  <Link
                    href={`/admin/members/detail/${student.id}/profile`}
                    className="d-flex align-items-center"
                  >
                    <div className="symbol symbol-50px me-5 symbol-circle">
                      <span className="symbol-label bg-gray-600">
                        <img
                          className="symbol-label bg-gray-600"
                          src={
                            student.user.avatarImageId ??
                            "/media/avatars/blank.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                        {student.user.name}
                      </span>
                      <span className="fw-bold text-muted">
                        {student.user.email}
                      </span>
                    </div>
                  </Link>
                </td>
                {/* TODO Update this */}
                <td className="align-middle text-end w-250px">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="symbol symbol-50px symbol-circle me-5">
                      <img
                        className="symbol-label bg-gray-600"
                        src={
                          student.user.avatarImageId ??
                          "/media/avatars/blank.png"
                        }
                        width={50}
                        height={50}
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <span className="text-muted text-hover-primary cursor-pointer fs-6 fw-bold">
                        Brian Immanuel
                      </span>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-end text-muted fw-bold w-150px">
                  {formatDate(student.user.createdAt)}
                </td>
                <td className="align-middle text-end text-muted fw-bold w-150px">
                  {student._count.enrollments}
                </td>
                <td className="align-middle text-end">
                  <p className="mb-0">
                    {" "}
                    <Badge
                      label={
                        student.user.deletedAt != null ? "Nonaktif" : "Aktif"
                      }
                      badgeColor={
                        student.user.deletedAt != null ? "danger" : "success"
                      }
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
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedStudentEmailEmail(student.user.email);
                            setShowForgotPasswordModal(true);
                          }}
                        >
                          Kirim Pengaturan ulang kata sandi
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedStudentId(student.user.id);
                            setShowEditUserModal(true);
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedStudentId(student.user.id);
                            setShowDeleteUserModal(true);
                          }}
                        >
                          Hapus
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </KTTable>
        </>
      )}
      <ForgotPasswordModal
        handleClose={() => setShowForgotPasswordModal(false)}
        show={showForgotPasswordModal}
        handleSubmit={() => handleForgotPassword(selectedStudentEmail)}
        isLoading={forgotPasswordModalLoading}
      />
      <EditUserModal
        handleClose={() => setShowEditUserModal(false)}
        show={showEditUserModal}
        userId={selectedStudentId}
        handleSubmit={(value, file) =>
          handleUserUpdate(selectedStudentId, value, file)
        }
        isLoading={editUserModalLoading}
      />
      <DeleteUserModal
        handleClose={() => setShowDeleteUserModal(false)}
        show={showDeleteUserModal}
        handleSubmit={(reason) => handleDeleteUser(selectedStudentId, reason)}
        isLoading={deleteUserLoading}
      />
    </>
  );
};

export default MemberPage;
