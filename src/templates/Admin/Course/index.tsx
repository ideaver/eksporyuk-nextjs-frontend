import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import currencyFormatter from "@/_metronic/helpers/Formatter";
import { PageTitle } from "@/_metronic/layout/core";
import {
  CourseFindManyQuery,
  CourseStatusEnum,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Alert } from "@/stories/molecules/Alert/Alert";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { QueryResult } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import useCoursesViewModel, {
  breadcrumbs,
  getStatusBadgeColor,
} from "./Products-view-model";

const CoursePage = ({}) => {
  const {
    courseFindMany,
    setCourseFindTake,
    setCourseFindSearch,
    calculateTotalPage,
    currentPage,
    handlePageChange,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    orderBy,
    setOrderBy,
    courseFindTake,
    statusFindSearch,
    setStatusFindSearch,
    checked,
    handleCourseDeleteMany,
  } = useCoursesViewModel();
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Kelas</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={(val) => {
              setCourseFindSearch(val);
            }}
            orderBy={orderBy}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
            status={statusFindSearch}
            onStatusChange={(e) => {
              setStatusFindSearch(e);
            }}
            checked={checked}
            handleDeleteMany={handleCourseDeleteMany}
          />
          <Body
            courseFindMany={courseFindMany}
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
              setCourseFindTake(val);
            }}
            courseFindTake={courseFindTake}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({
  onSearch,
  setOrderBy,
  orderBy,
  status,
  onStatusChange,
  checked,
  handleDeleteMany,
}: {
  onSearch: (val: string) => void;
  setOrderBy: (e: SortOrder) => void;
  orderBy: SortOrder;
  status: CourseStatusEnum | "all";
  onStatusChange: (e: CourseStatusEnum | "all") => void;
  checked: number[];
  handleDeleteMany: () => Promise<void>;
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
      {/* <div className="row col-lg-auto gy-3 align-items-center">
        <div className="col-lg-auto">
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
        </div>
      </div> */}
      <div className="row col-lg-auto gy-3">
        {/* <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Kategori", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div> */}
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={status}
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Archived", value: CourseStatusEnum.Archived },
              { label: "Published", value: CourseStatusEnum.Published },
              { label: "Draft", value: CourseStatusEnum.Draft },
            ]}
            onValueChange={(val) => {
              onStatusChange(val as CourseStatusEnum | "all");
            }}
          />
        </div>
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={orderBy}
            options={[
              { label: "Terbaru", value: SortOrder.Desc },
              { label: "Terlama", value: SortOrder.Asc },
            ]}
            onValueChange={(e) => {
              setOrderBy(e as SortOrder);
            }}
          />
        </div>
        <div className="col-lg-auto">
          {checked.length > 0 ? (
            <Buttons buttonColor="danger" onClick={handleDeleteMany}>
              Delete Selected
            </Buttons>
          ) : (
            <Buttons>
              <Link href={"courses/create/information"} className="text-white">
                Tambah Kelas Baru
              </Link>
            </Buttons>
          )}
        </div>
      </div>
      <KTModal
        dataBsTarget="kt_create_coupon_modalllllsss"
        title="Tambah Kupon"
        fade
        modalCentered
        footerContentCentered
        onClose={() => {}}
        modalSize="lg"
        buttonClose={
          <Buttons
            buttonColor="secondary"
            classNames="fw-bold"
            data-bs-dismiss="modal"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={<Buttons classNames="fw-bold">Simpan</Buttons>}
      >
        <div>
          <h4 className="required fw-bold text-gray-700">Pilih Kupon Utama</h4>
          <Dropdown
            styleType="solid"
            props={{ id: "couponName" }}
            options={[
              { label: "EKSPORYUK", value: "mainCoupon1" },
              { label: "Kupon Utama 2", value: "mainCoupon2" },
            ]}
            onValueChange={() => {}}
          />
          <p className="fw-bold text-gray-600 mt-3">
            Pilih kupon utama yang dibuat oleh admin
          </p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField styleType="solid" placeholder="Masukkan Nama Kupon anda" />
          <p className="fw-bold text-gray-600 mt-3">
            Masukkan kode kupon yang ingin anda gunakan dan bagikan
          </p>
        </div>
        <Alert
          alertColor="warning"
          mode="light"
          label="Hanya bisa membuat 1 kupon dari setiap kupon utama. Kupon yang sudah anda buat tidak dapat diubah kembali."
          title="PERHATIAN"
          labelColor="dark"
          border="dashed"
          prefixIcon="shield-cross"
        ></Alert>
      </KTModal>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setMentorFindTake,
  pageLength,
  courseFindTake,
}: {
  setMentorFindTake: (val: number) => void;
  setMentorFindSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  courseFindTake: number;
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
            {courseFindTake}
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
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={courseFindTake}
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
  courseFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
}: {
  courseFindMany: QueryResult<CourseFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: number; value: boolean }[];
  selectAll: boolean;
}) => {
  const [selectedMentor, setSelectedMentor] = useState("");
  return (
    <>
      {courseFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">{courseFindMany.error.message}</h3>
        </div>
      ) : courseFindMany.loading ? (
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
              <th>
                <CheckBoxInput
                  checked={selectAll}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={handleSelectAllCheck}
                >
                  <></>
                </CheckBoxInput>
              </th>
              <th className="min-w-375px">Nama Course</th>
              {/* <th className="text-end min-w-100px">Kategori</th> */}
              <th className="text-end min-w-275px">Author</th>
              <th className="text-end min-w-125px">Harga</th>
              <th className="text-end min-w-200px">Tanggal Pembuatan</th>
              <th className="text-end min-w-200px">Jumlah Siswa</th>
              <th className="text-end min-w-150px">Status</th>
              <th className="text-end min-w-100px">Actions</th>
            </KTTableHead>
            {courseFindMany.data?.courseFindMany?.map((course, index) => {
              const totalLessons = course.sections?.reduce((total, section) => {
                return total + (section._count?.lessons || 0);
              }, 0);
              const totalQuizzes = course.sections?.reduce((total, section) => {
                return total + (section._count?.quizzes || 0);
              }, 0);
              const totalAssignment = course.sections?.reduce(
                (total, section) => {
                  return total + (section._count?.assignments || 0);
                },
                0
              );
              return (
                <tr key={index}>
                  <td className="align-middle">
                    <CheckBoxInput
                      className="ps-0"
                      checked={checkedItems[index]?.value ?? false}
                      name={"check-" + course.id}
                      value={course.id.toString()}
                      defaultChildren={false}
                      onChange={() => handleSingleCheck(index)}
                    >
                      <></>
                    </CheckBoxInput>
                  </td>
                  <td className="align-middle ">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <img
                          className="symbol-label bg-gray-600"
                          src={
                            course.images?.[0]?.path ??
                            "/media/avatars/blank.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                          {course.title}
                        </span>
                        <span className="fw-bold text-muted">
                          {course._count.sections} Sections, {totalLessons}{" "}
                          Lesson, {totalQuizzes} Quiz
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* <td className="fw-bold text-muted align-middle w-125px">
                    {course?.category?.name}
                  </td> */}
                  <td className="align-middle text-end w-250px">
                    <div className="d-flex align-items-center justify-content-end">
                      <div className="symbol symbol-50px symbol-circle me-5">
                        <img
                          className="symbol-label bg-gray-600"
                          src={
                            course.createdBy.user.avatarImageId ??
                            "/media/avatars/blank.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-muted text-hover-primary cursor-pointer fs-6 fw-bold">
                          {course.createdBy.user.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-125px">
                    {currencyFormatter(course.basePrice ?? 0)}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {formatDate(course.createdAt)}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {course._count.enrollments}
                  </td>
                  <td className="align-middle text-end">
                    <p>
                      {" "}
                      <Badge
                        label={course.status}
                        badgeColor={getStatusBadgeColor(course.status)}
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
                          <Link
                            href={
                              "/admin/courses/edit/information?id=" + course.id
                            }
                            className="dropdown-item"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button className="dropdown-item">Hapus</button>
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
    </>
  );
};

export default CoursePage;
