import { QueryResult } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

import ForgotPasswordModal from "./component/ForgotPasswordModal";
import useAffiliatorViewModel, {
  breadcrumbs,
  dateFormatter,
} from "./Affiliator-view-model";

import {
  AffiliatorFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import useForgotPassword from "@/app/service/utils/auth/forgotPasswordHook";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";

const AffiliatorPage = () => {
  const {
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    skipPage,
    setSkipPage,
    takePage,
    setTakePage,
    calculateTotalPage,
    setSearchAffiliator,
    affiliatorFindMany,
    setOrderBy,
  } = useAffiliatorViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Affiliator</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={setSearchAffiliator}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <Body
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
            affiliatorFindMany={affiliatorFindMany}
          />
          <Footer
            skipPage={skipPage}
            setSkipPage={setSkipPage}
            takePage={takePage}
            setTakePage={setTakePage}
            totalPage={calculateTotalPage}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default AffiliatorPage;

const Head = ({
  onSearch,
  setOrderBy,
}: {
  onSearch: (val: string) => void;
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
            options={[
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(e) => {
              setOrderBy(e as SortOrder);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Body = ({
  affiliatorFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
}: {
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: string; value: boolean }[];
  selectAll: boolean;
  affiliatorFindMany: QueryResult<AffiliatorFindManyQuery>;
}) => {
  const [userEmail, setUserEmail] = useState("");
  const {
    forgotPasswordModalLoading,
    handleForgotPassword,
    setShowForgotPasswordModal,
    showForgotPasswordModal,
    forgotPasswordSuccess,
    forgotPasswordError,
  } = useForgotPassword();

  return (
    <>
      {affiliatorFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{affiliatorFindMany.error.message}</h3>
        </div>
      ) : affiliatorFindMany.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable utilityGY={5} responsive="table-responsive my-10">
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
                <>ID Member</>
              </CheckBoxInput>
            </th>
            <th className="min-w-200px">Nama Lengkap & Username</th>
            <th className="text-end min-w-200px">Email</th>
            <th className="text-end min-w-200px">Affiliator</th>
            <th className="text-end min-w-200px">Tanggal Terdaftar</th>
            <th className="text-end min-w-100px">Actions</th>
          </KTTableHead>
          {affiliatorFindMany.data?.affiliatorFindMany?.map(
            (affiliator, index) => {
              return (
                <KTTableBody key={index}>
                  <td className="align-middle">
                    <CheckBoxInput
                      className="ps-0"
                      checked={checkedItems[index]?.value ?? false}
                      name={"check-" + affiliator.id}
                      value={affiliator.id}
                      defaultChildren={false}
                      onChange={() => handleSingleCheck(index)}
                    >
                      <Link
                        href={`/admin/affiliate/affiliator/detail/${affiliator.id}/profile`}
                        className="fw-bold mb-0 text-dark text-hover-primary text-truncate"
                        style={{
                          maxWidth: "90px",
                          display: "inline-block",
                        }}
                      >
                        {affiliator.user.id}
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
                              affiliator.user.avatarImageId ??
                              "/media/avatars/300-2.jpg"
                            }
                            width={50}
                            height={50}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <Link
                          href={`/admin/affiliate/affiliator/detail/${affiliator.id}/profile`}
                        >
                          <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                            {affiliator.user.name}
                          </span>
                        </Link>
                        <span className="fw-bold text-muted">
                          {affiliator.user.username}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {affiliator.user.email}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {affiliator.user.affiliator?.user.name}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {dateFormatter(affiliator.user.createdAt)}
                  </td>
                  {/* <td className="align-middle text-end w-150px">
                    <Dropdown
                      styleType="solid"
                      options={[
                        { label: "Action", value: "all" },
                        {
                          label: "Kirim Pengaturan Ulang Kata Sandi",
                          value: "request-reset-password",
                        },
                        { label: "Edit", value: "edit" },
                        { label: "Hapus", value: "delete" },
                      ]}
                      onValueChange={() => {}}
                    />
                  </td> */}
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
                              setShowForgotPasswordModal(true);
                              setUserEmail(affiliator.user.email);
                            }}
                          >
                            Kirim Pengaturan ulang kata sandi
                          </button>
                        </li>
                        {/* <li>
                          <button className="dropdown-item">Edit</button>
                        </li>
                        <li>
                          <button className="dropdown-item">Hapus</button>
                        </li> */}
                      </ul>
                    </div>
                  </td>
                </KTTableBody>
              );
            }
          )}
        </KTTable>
      )}

      <ForgotPasswordModal
        handleClose={() => setShowForgotPasswordModal(false)}
        show={showForgotPasswordModal}
        handleSubmit={() => handleForgotPassword(userEmail)}
        isLoading={forgotPasswordModalLoading}
      />
    </>
  );
};

const Footer = ({
  skipPage,
  setSkipPage,
  takePage,
  setTakePage,
  totalPage,
}: any) => {
  if (skipPage === 0) skipPage = 1;

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
            {takePage}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setTakePage(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setTakePage(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={takePage}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setTakePage(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-auto">
        <Pagination
          total={totalPage()}
          current={skipPage}
          maxLength={5}
          onPageChange={(e) => {
            if (e === 1) e = 0;
            setSkipPage(e);
          }}
        ></Pagination>
      </div>
    </div>
  );
};
