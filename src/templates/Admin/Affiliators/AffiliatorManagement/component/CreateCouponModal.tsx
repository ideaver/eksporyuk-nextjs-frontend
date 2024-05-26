/* eslint-disable react-hooks/rules-of-hooks */
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  useAffiliatorCouponFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import useKuponAffiliasiViewModel from "../Detail/KuponAffiliasi/KuponAffiliasi-view-model";

import { KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";

import {
  changeCouponCode,
  changeEndDate,
  changeFreeDelivery,
  changeIsActive,
  changeLimitUsage,
  changeStartDate,
  changeValue,
  changeAllowAffiliator,
} from "@/features/reducers/affiliators/couponReducer";

const CreateCouponModal = ({ show, onClose, isEdit, couponId }: any) => {
  const dispatch = useDispatch();

  const {
    couponCode,
    setCouponCode,
    value,
    setValue,
    setEndDate,
    isActive,
    limitUsage,
    setLimitUsage,
    endDate,
    handleStatusChange,
    allowAffiliator,
    setAllowAffiliator,
    onSubmit,
    errorMessage,
    onEdit,
    dateFormatter
  } = useKuponAffiliasiViewModel();

  const affiliatorCoupon = useAffiliatorCouponFindManyQuery({
    variables: {
      where: {
        coupon: {
          is: {
            id: {
              equals: couponId,
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const resetFormData = () => {
      dispatch(changeCouponCode(""));
      dispatch(changeEndDate(""));
      dispatch(changeFreeDelivery(false));
      dispatch(changeIsActive(false));
      dispatch(changeLimitUsage(0));
      dispatch(changeStartDate(""));
      dispatch(changeValue(0));
      dispatch(changeAllowAffiliator(false));
    };


    if (isEdit) {
      affiliatorCoupon.data?.affiliatorCouponFindMany?.map((coupon) => {
        dispatch(changeCouponCode(coupon.code));
        dispatch(changeIsActive(coupon.coupon.isActive));
        dispatch(changeValue(coupon.coupon.value));
        dispatch(changeEndDate(dateFormatter(coupon.coupon.endDate)));
      });
    } else {
      resetFormData();
    }
  }, [affiliatorCoupon.data?.affiliatorCouponFindMany, dateFormatter, dispatch, isEdit]);

  console.log("user", affiliatorCoupon.data?.affiliatorCouponFindMany);

  return (
    <Modal
      show={show}
      size="lg"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered"
      scrollable={true}
      centered={true}
    >
      <Modal.Header>
        <h2>{isEdit ? "Ubah" : "Tambahkan"} Kupon Affiliasi</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <h2 className="pb-2">Informasi Kupon</h2>
        <div>
          <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
          <TextField
            styleType="outline"
            size="medium"
            placeholder="https://member.eksporyuk.com/aff/6267/6068/"
            props={{
              value: couponCode,
              onChange: setCouponCode,
            }}
          />
          <p className="fw-bold fs-6 text-muted">Nama/Kode Kupon</p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Status</h4>
          <Dropdown
            options={[
              { value: "true", label: "Aktif" },
              { value: "", label: "Tidak Aktif" },
            ]}
            value={isActive ? "true" : ""}
            onValueChange={(value: any) => handleStatusChange(value)}
          ></Dropdown>
          <p className="text-muted fw-bold mt-5">Atur Status</p>
        </div>
        <div>
          <h4 className="required fw-bold text-gray-700">Besar Potongan</h4>
          <div className="w-100">
            <TextField
              classNames=""
              styleType="outline"
              size="medium"
              placeholder="ID, isi dengan identifikasi apapun"
              type="text"
              props={{
                value: value,
                onChange: setValue,
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
          <TextField
            styleType="outline"
            size="medium"
            placeholder="Pilih tanggal"
            type="date"
            props={{
              value: endDate,
              onChange: setEndDate,
            }}
          />
          <p className="fw-bold fs-6 text-muted">
            Masukkan 0 jika kupon ini dapat digunakan sampai kapanpun
          </p>
        </div>
        <div>
          <div className="mt-2">
            <CheckBoxInput
              className="active"
              name="follup"
              value={"option1" && "option2"}
              checked={allowAffiliator}
              onChange={setAllowAffiliator}
            >
              {`Izinkan Affiliasi Menggunakan Kupon Ini`}
              <span className="fw-bold fs-6 text-muted pt-2">
                Apabila diaktifkan, maka affilasi dapat menggunakan kode ini dan
                membuat kode sendiri menggunakan kode ini
              </span>
            </CheckBoxInput>
          </div>
          <div className="pt-4">
            <h4 className="fw-bold text-gray-700">
              Batas Penggunaan Kupon oleh Affiliasi
            </h4>
            <TextField
              styleType="outline"
              size="medium"
              type="text"
              placeholder="Berapa kali kupon ini dapat digunakan sebagai base kupon affiliasi"
              props={{
                value: limitUsage,
                onChange: setLimitUsage,
              }}
            />
            <p className="fw-bold fs-6 text-muted">
              Masukkan 0 jika kupon ini dapat digunakan berkali-kali oleh
              affiliasi
            </p>
          </div>
        </div>
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={
            isEdit
              ? () => {
                  console.log("edit");
                  onEdit(couponId);
                }
              : onSubmit
          }
        >
          {isEdit ? "Ubah Kupon" : "Buat Kupon"}
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCouponModal;
