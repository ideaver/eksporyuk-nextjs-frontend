import { PageTitle } from "@/_metronic/layout/core";
import useAdminCouponViewModel, {
  breadcrumbs,
  useCouponForm,
  useCoursesDropdown,
} from "./AdminCoupon-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import {
  AffiliatorCouponFindManyQuery,
  CouponDeleteManyMutation,
  DiscountTypeEnum,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import { MutationFunctionOptions, QueryResult } from "@apollo/client";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";
import { valueFromAST } from "graphql";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { Dispatch, SetStateAction } from "react";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import CurrencyInput from "react-currency-input-field";
import clsx from "clsx";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Flatpickr from "react-flatpickr";
import { AsyncPaginate } from "react-select-async-paginate";
import SweetAlert2 from "react-sweetalert2";

const AdminCoupon = () => {
  const {
    currentPage,
    calculateTotalPage,
    couponLength,
    handlePageChange,
    couponSearch,
    setCouponSearch,
    couponStatus,
    setCouponStatus,
    couponFindMany,
    selectAll,
    checkedItems,
    handleSingleCheck,
    handleSelectAllCheck,
    checked,
    setCouponSkip,
    setCouponTake,
    handleDeleteMany,
    couponUpdateOne,
    couponDeleteOne,
    setOrderBy,
    couponTake,
  } = useAdminCouponViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Kupon</PageTitle>
      <LoadingOverlayWrapper
        active={useSelector((state: RootState) => state.coupon.couponLoading)}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(255, 255, 255, 0.8)",
          }),
          spinner: (base) => ({
            ...base,
            width: "100px",
            "& svg circle": {
              stroke: "rgba(3, 0, 0, 1)",
            },
          }),
        }}
        spinner
      ></LoadingOverlayWrapper>
      <KTCard>
        <KTCardBody>
          <Head
            couponSearch={couponSearch}
            setCouponSearch={(value) => {
              setCouponSearch(value);
            }}
            couponStatus={couponStatus}
            setCouponStatus={(value) => {
              setCouponStatus(value);
            }}
            checked={checked}
            handleDeleteMany={handleDeleteMany}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <>
            {couponFindMany.error ? (
              <div className="d-flex justify-content-center align-items-center h-500px flex-column">
                <h3 className="text-center">{couponFindMany.error.message}</h3>
              </div>
            ) : couponFindMany.loading ? (
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
                  <th className="min-w-250px">
                    <CheckBoxInput
                      checked={selectAll}
                      name="check-all"
                      value="all"
                      defaultChildren={false}
                      onChange={() => {
                        handleSelectAllCheck();
                      }}
                    >
                      <p className="mb-0">KODE KUPON</p>
                    </CheckBoxInput>
                  </th>
                  {/* <th className="text-end min-w-200px">KUPON UTAMA</th> */}
                  <th className="text-end min-w-200px">PEMILIK</th>

                  <th className="text-end min-w-200px">DISKON</th>
                  {/* <th className="text-end min-w-250px">PENGGUNAAN</th> */}
                  <th className="text-end min-w-200px">STATUS</th>
                  <th className="text-end min-w-125px">ACTION</th>
                </KTTableHead>

                <tbody className="align-middle">
                  {couponFindMany.data?.platformCouponFindMany?.map(
                    (coupon, index) => {
                      return (
                        <tr key={coupon.id} className="">
                          <td className="min-w-200px">
                            <CheckBoxInput
                              className="ps-0"
                              checked={checkedItems[index]?.value ?? false}
                              name="check-all"
                              value="all"
                              defaultChildren={false}
                              onChange={() => {
                                handleSingleCheck(index);
                              }}
                            >
                              <p className="fw-bold text-black mb-0">
                                {coupon.code}
                              </p>
                            </CheckBoxInput>
                          </td>
                          {/* <td className="min-w-200px text-end fw-bold text-muted">
                            {coupon.extendedFrom?.code}
                          </td> */}
                          <td className="min-w-200px text-end fw-bold text-muted">
                            <img
                              className="symbol-label bg-gray-600 rounded-circle mx-3"
                              src={
                                coupon.createdBy.user.avatarImageId ??
                                "/media/avatars/300-2.jpg"
                              }
                              width={40}
                              height={40}
                              alt="flag"
                            />
                            <span className="text-muted fw-bold">
                              {coupon.createdBy.user.name}
                            </span>
                          </td>
                          <td className="min-w-200px text-end fw-bold text-muted">
                            {coupon.coupon.type === DiscountTypeEnum.Amount
                              ? formatCurrency(coupon.coupon.value)
                              : `${coupon.coupon.value}%`}
                          </td>
                          {/* <td className="min-w-200px text-end fw-bold text-muted">
                            {coupon.coupon.claimerQuota ?? "0"}
                          </td> */}
                          <td className="min-w-200px text-end fw-bold text-muted">
                            {coupon.coupon.isActive ? (
                              <Badge
                                size="large"
                                label="Active"
                                badgeColor="success"
                              />
                            ) : (
                              <Badge
                                size="large"
                                label="Non Active"
                                badgeColor="danger"
                              />
                            )}
                          </td>

                          <td className="text-end ">
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
                                    className="btn"
                                    href={
                                      "/admin/affiliate/admin-coupon/edit/" +
                                      coupon.id
                                    }
                                  >
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="btn"
                                    onClick={async () => {
                                      try {
                                        await couponUpdateOne({
                                          variables: {
                                            where: {
                                              id: coupon.id,
                                            },
                                            data: {
                                              isActive: {
                                                set: !coupon.coupon.isActive,
                                              },
                                            },
                                          },
                                        });
                                        await couponFindMany.refetch();
                                      } catch (error) {
                                        console.log(error);
                                      } finally {
                                        await couponFindMany.refetch();
                                      }
                                    }}
                                  >
                                    Ubah Status
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn"
                                    onClick={async () => {
                                      try {
                                        await couponDeleteOne({
                                          variables: {
                                            where: {
                                              id: coupon.id,
                                            },
                                          },
                                        });
                                        await couponFindMany.refetch();
                                      } catch (error) {
                                        console.log(error);
                                      } finally {
                                        await couponFindMany.refetch();
                                      }
                                    }}
                                  >
                                    Hapus kupon
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
          </>
          <Footer
            currentPage={currentPage}
            pageLength={calculateTotalPage()}
            setCouponSkip={setCouponSkip}
            setCouponTake={setCouponTake}
            setCurrentPage={(val: number) => {
              handlePageChange(val);
            }}
            couponTake={couponTake}
          />
        </KTCardBody>
      </KTCard>
      <AddCouponModal onChange={() => {}} onClose={() => {}} />
    </>
  );
};

const Head = ({
  couponSearch,
  couponStatus,
  setCouponSearch,
  setCouponStatus,
  checked,
  handleDeleteMany,
  setOrderBy,
}: {
  checked: number[];
  couponSearch: string;
  couponStatus: string;
  setCouponStatus: (value: string) => void;
  setCouponSearch: (value: string) => void;
  handleDeleteMany: () => Promise<void>;
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
            onChange: (e: any) => setCouponSearch(e.target.value),
            value: couponSearch,
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            value={couponStatus}
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Active", value: "true" },
              { label: "Non Active", value: "false" },
            ]}
            onValueChange={(e) => {
              setCouponStatus(e as string);
            }}
          />
        </div>
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
        <div className="col-lg-auto">
          {checked.length > 0 ? (
            <Buttons buttonColor="danger" onClick={handleDeleteMany}>
              Deleted Selected
            </Buttons>
          ) : (
            <Buttons
              data-bs-toggle="modal"
              data-bs-target="#kt_add_coupon_modal"
            >
              Add New Coupon
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = ({
  currentPage,
  setCurrentPage,
  setCouponTake,
  setCouponSkip,
  pageLength,
  couponTake,
}: {
  setCouponTake: Dispatch<SetStateAction<number>>;
  setCouponSkip: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  couponTake: number;
}) => {
  return (
    <div className="row d-flex justify-content-between p-10">
      <div className="col-auto">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {couponTake}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setCouponTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setCouponTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={couponTake}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setCouponTake(parseInt(e.target.value));
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
          onPageChange={(val) => {
            setCurrentPage(val);
          }}
        ></Pagination>
      </div>
    </div>
  );
};

const AddCouponModal = ({
  // date,
  onChange,
  onClose,
}: {
  // date: Date;
  onChange: (value: any) => void;
  onClose: () => void;
}) => {
  const {
    couponForm,
    status,
    setStatus,
    setCode,
    code,
    discountType,
    setDiscountType,
    discount,
    setDiscount,
    addDate,
    setAddDate,
    date,
    setDate,
    hanldeCouponCreateOne,
    setConnectCourse,
    maxClaim,
    setMaxClaim,
    selectedMentor,
    setSelectedMentor,
    addMentor,
    removeMentor,
    selectedCourse, setSelectedCourses, addCourse, removeCourse,
    swalProps,
    setSwalProps,
    resetForm,
  } = useCouponForm();

  const { loadOptions } = useCoursesDropdown();

  return (
    <div>
      <KTModal
        dataBsTarget="kt_add_coupon_modal"
        title="Tambah Kupon Baru"
        fade
        modalCentered
        onClose={onClose}
        buttonClose={
          <Buttons
            buttonColor="secondary"
            data-bs-dismiss="modal"
            classNames="fw-bold"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={
          <Buttons
            data-bs-dismiss="modal"
            disabled={!couponForm.isValid.valueOf()}
            classNames="fw-bold"
            onClick={hanldeCouponCreateOne}
          >
            Buat Kupon
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <h2 className="pb-2">Informasi Kupon</h2>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField
            classNames={clsx(
              {
                "is-invalid": couponForm.touched.code && couponForm.errors.code,
              },
              {
                "is-valid": couponForm.touched.code && !couponForm.errors.code,
              }
            )}
            styleType="outline"
            size="medium"
            placeholder="Masukan kode kupon"
            props={{
              ...couponForm.getFieldProps("code"),
              value: couponForm.values.code,
              onChange: (e: any) => {
                setCode(e.target.value);
                couponForm.setFieldValue("code", e.target.value);
              },
            }}
          />
          <p className="fw-bold fs-6 text-muted">Nama/Kode Kupon</p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Status</h4>
          <Dropdown
            options={[
              { value: "true", label: "Aktif" },
              { value: "false", label: "Tidak Aktif" },
            ]}
            value={status}
            onValueChange={(value) => {
              setStatus(value as string);
            }}
          ></Dropdown>
          <p className="text-muted fw-bold">Atur Status</p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Besar Potongan</h4>
          <div className="w-100">
            {/* <TextField
              classNames=""
              styleType="outline"
              size="medium"
              placeholder="ID, isi dengan identifikasi apapun"
              type="text"
              props={{
                value: value,
                onChange: setValue,
              }}
            /> */}
            <div className="my-1">
              <Dropdown
                options={[
                  { value: DiscountTypeEnum.Amount, label: "Harga (Rp)" },
                  { value: DiscountTypeEnum.Percentage, label: "Persen (%)" },
                ]}
                value={discountType}
                onValueChange={(value) => {
                  setDiscountType(value as DiscountTypeEnum);
                }}
              />
            </div>

            <CurrencyInput
              className="form-control"
              id="price-field"
              name="price"
              placeholder="Masukan Jumlah Point"
              intlConfig={{ locale: "id-ID" }}
              defaultValue={0}
              value={discount}
              decimalsLimit={2}
              onValueChange={(value, name, values): any => {
                setDiscount(value as string);
              }}
            />
          </div>
          <p className="fw-bold fs-6 text-muted">
            Besar dan jenis potongan yang didapatkan
          </p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">
            Batas Waktu Penggunaan
          </h4>
          <CheckBoxInput
            className="active my-2"
            name="follup"
            value={"true"}
            checked={addDate}
            onChange={(e) => {
              setAddDate((prev) => !prev);
            }}
          >
            {`Berikan batas waktu untuk kupon ini`}
          </CheckBoxInput>
          {addDate ? (
            <Flatpickr
              value={date}
              onChange={([date]) => {
                setDate(date);
              }}
              options={{
                enableTime: false,
                dateFormat: "Y-m-d",
              }}
              className="form-control form-control-solid"
              placeholder="Pick date"
            />
          ) : // <TextField
          //   styleType="outline"
          //   size="medium"
          //   placeholder="Pilih tanggal"
          //   type="date"
          //   props={{
          //     // value: date,
          //     onChange: (e: any) => {
          //       console.log(e.target.value);
          //     },
          //   }}
          // />
          null}
        </div>
        <div className="mb-5 mt-6">
          <h4 className="required fw-bold text-gray-700">Max Penggunaan User</h4>
          <TextField
            styleType="outline"
            size="medium"
            type="number"
            props={{
              value: String(maxClaim),
              onChange: (e: any) => setMaxClaim(e.target.value),
            }}
          />
        </div>
        <div className="mb-8 mt-6">
          <h4 className="fw-bold text-gray-700">Kupon hanya bisa digunakan di kelas</h4>
          {/* <h6 className="mt-4 text-muted">
            Pilih Kelas yang Dapat Menggunakan Kupon Ini
          </h6> */}
          {selectedMentor &&
            selectedMentor?.map((mentor: any, index: any) => {
              return (
                <div className="d-flex mt-5" key={index}>
                  <div className="w-100">
                    <TextField
                      props={{
                        enabled: "false",
                        value: mentor.label,
                        onChange: () => {},
                      }}
                    ></TextField>
                  </div>
                  <div className="ms-5">
                    <Buttons
                      icon="cross"
                      buttonColor="danger"
                      showIcon={true}
                      onClick={() => removeMentor(index)}
                    ></Buttons>
                  </div>
                </div>
              );
            })}
          <AsyncPaginate
            className="mt-5"
            loadOptions={loadOptions}
            onChange={(value) => {
              addMentor(value);
            }}
          ></AsyncPaginate>
        </div>
        <div className="mb-5 mt-6">
          <h4 className="fw-bold text-gray-700">Kupon tidak bisa digunakan di kelas</h4>
          {/* <h6 className="mt-4 text-muted">
            Pilih Kelas yang Dapat Menggunakan Kupon Ini
          </h6> */}
          {selectedCourse &&
            selectedCourse?.map((mentor: any, index: any) => {
              return (
                <div className="d-flex mt-5" key={index}>
                  <div className="w-100">
                    <TextField
                      props={{
                        enabled: "false",
                        value: mentor.label,
                        onChange: () => {},
                      }}
                    ></TextField>
                  </div>
                  <div className="ms-5">
                    <Buttons
                      icon="cross"
                      buttonColor="danger"
                      showIcon={true}
                      onClick={() => removeCourse(index)}
                    ></Buttons>
                  </div>
                </div>
              );
            })}
          <AsyncPaginate
            className="mt-5"
            loadOptions={loadOptions}
            onChange={(value) => {
              addCourse(value);
            }}
          ></AsyncPaginate>
        </div>
        <SweetAlert2
        {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={async () => {
          console.log("closed");
          setSwalProps({});
          resetForm();
        }}
      />
      </KTModal>
    </div>
  );
};

export default AdminCoupon;
