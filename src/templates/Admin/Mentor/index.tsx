import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import {
  MentorFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import useForgotPassword from "@/app/service/utils/auth/forgotPasswordHook";
import useDeleteUser from "@/app/service/utils/crud/user/userDelete";
import useUserEdit from "@/app/service/utils/crud/user/userEdit";
import DeleteUserModal from "@/components/partials/Modals/Mutations/DeleteUserModal";
import EditUserModal from "@/components/partials/Modals/Mutations/EditUserModal";
import ForgotPasswordModal from "@/components/partials/Modals/Mutations/ForgotPasswordModal";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { QueryResult } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import useMentorViewModel, { breadcrumbs } from "./Mentor-view-model";
import SelectMentorModal from "./component/SelectMentorModal";

const MentorPage = ({}) => {
  const {
    showMentorSelectModal,
    setShowMentorSelectModal,
    mentorFindMany,
    setMentorFindTake,
    setMentorFindSearch,
    calculateTotalPage,
    currentPage,
    handlePageChange,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    orderBy,
    setOrderBy,
    mentorFindTake,
  } = useMentorViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Mentor</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onClick={() => setShowMentorSelectModal(true)}
            onSearch={(val) => {
              setMentorFindSearch(val);
            }}
            orderBy={orderBy}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <Body
            mentorFindMany={mentorFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
          />
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            setMentorFindSkip={(val) => {}}
            setMentorFindTake={(val) => {
              setMentorFindTake(val);
            }}
            mentorFindTake={mentorFindTake}
          />
        </KTCardBody>
      </KTCard>
      <SelectMentorModal
        show={showMentorSelectModal}
        onClose={() => setShowMentorSelectModal(false)}
        onSumbit={(id) => {
          setShowMentorSelectModal(false);
        }}
      />
    </>
  );
};

const Head = ({
  onClick,
  onSearch,
  orderBy,
  setOrderBy,
}: {
  onClick?: () => void;
  onSearch: (val: string) => void;
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
      <div className="row col-lg-auto gy-3">
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
        <div className="col-lg-auto">
          <Buttons onClick={onClick}>Tambah Mentor Baru</Buttons>
        </div>
      </div>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setMentorFindTake,
  pageLength,
  mentorFindTake,
}: {
  setMentorFindTake: (val: number) => void;
  setMentorFindSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  mentorFindTake: number;
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
            {mentorFindTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setMentorFindTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setMentorFindTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              <input
                type="number"
                value={mentorFindTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setMentorFindTake(parseInt(e.target.value));
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
  mentorFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
}: {
  mentorFindMany: QueryResult<MentorFindManyQuery>;
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
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  return (
    <>
      {mentorFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{mentorFindMany.error.message}</h3>
        </div>
      ) : mentorFindMany.loading ? (
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
              <th className="w-200px">
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
              </th>
              <th className="min-w-300px">Nama Lengkap</th>
              {/* <th className="text-end min-w-275px">Username</th> */}
              <th className="text-end min-w-200px">Tanggal Pendaftaran</th>
              <th className="text-end min-w-200px">Jumlah Course</th>
              <th className="text-end min-w-200px">Jumlah Siswa</th>
              <th className="text-end min-w-150px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>
            {mentorFindMany.data?.mentorFindMany?.map((mentor, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle">
                    <CheckBoxInput
                      className="ps-0"
                      checked={checkedItems[index]?.value ?? false}
                      name={"check-" + mentor.id}
                      value={mentor.id}
                      defaultChildren={false}
                      onChange={() => handleSingleCheck(index)}
                    >
                      <Link
                        href={`/admin/mentors/detail/${mentor.id}/profile`}
                        className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                        style={{
                          maxWidth: "150px",
                          display: "inline-block",
                        }}
                      >
                        {mentor.user.username}
                      </Link>
                    </CheckBoxInput>
                  </td>
                  <td className="align-middle ">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5 symbol-circle">
                        <span className="symbol-label bg-gray-600">
                          <img
                            className="symbol-label bg-gray-600"
                            src={
                              mentor.user.avatarImageId ??
                              "/media/avatars/300-2.jpg"
                            }
                            width={50}
                            height={50}
                            alt=""
                          />
                        </span>
                      </div>
                      <Link
                        href={`/admin/mentors/detail/${mentor.id}/profile`}
                        className="d-flex flex-column"
                      >
                        <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                          {mentor.user.name}
                        </span>
                        <span className="fw-bold text-muted">
                          {mentor.user.email}
                        </span>
                      </Link>
                    </div>
                  </td>

                  {/* <td className="align-middle text-end text-muted fw-bold w-150px">
                    {mentor.user.username}
                  </td> */}
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {mentor.user.createdAt}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {mentor._count.courses}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {mentor._count.createdCourses}
                  </td>
                  <td className="align-middle text-end ">
                    <p className="mb-0">
                      {" "}
                      <Badge
                        label={
                          mentor.user.deletedAt != null ? "Nonaktif" : "Aktif"
                        }
                        badgeColor={
                          mentor.user.deletedAt != null ? "danger" : "success"
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
                              setSelectedUserEmail(mentor.user.email);
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
                              setSelectedUserId(mentor.user.id);
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
                              setSelectedUserId(mentor.user.id);
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
              );
            })}
          </KTTable>
        </>
      )}
      <ForgotPasswordModal
        handleClose={() => setShowForgotPasswordModal(false)}
        show={showForgotPasswordModal}
        handleSubmit={() => handleForgotPassword(selectedUserEmail)}
        isLoading={forgotPasswordModalLoading}
      />
      <EditUserModal
        handleClose={() => setShowEditUserModal(false)}
        show={showEditUserModal}
        userId={selectedUserId}
        handleSubmit={(value, file) =>
          handleUserUpdate(selectedUserId, value, file)
        }
        isLoading={editUserModalLoading}
      />
      <DeleteUserModal
        handleClose={() => setShowDeleteUserModal(false)}
        show={showDeleteUserModal}
        handleSubmit={(reason) => handleDeleteUser(selectedUserId, reason)}
        isLoading={deleteUserLoading}
      />
    </>
  );
};

export default MentorPage;
