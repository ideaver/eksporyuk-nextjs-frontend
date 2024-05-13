import { KTIcon } from "@/_metronic/helpers/components/KTIcon";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { useState } from "react";
import { Modal } from "react-bootstrap";
type TStatus = {
  title: string;
  value: string;
};
const ChangeOrderModal = ({
  onClose,
  show,
  onConfirm,
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: (value: TStatus) => void;
}) => {
  const statuses: TStatus[] = [
    // {
    //   title: "Belum dibayarkan",
    //   value: "belum_dibayarkan",
    // },
    // {
    //   title: "Sudah Dibayarkan",
    //   value: "sudah_dibayarkan",
    // },
    {
      title: "Pesanan Diproses",
      value: "pesanan_diproses",
    },
    // {
    //   title: "Pengiriman",
    //   value: "pengiriman",
    // },
    // {
    //   title: "Batal",
    //   value: "batal",
    // },
    {
      title: "Selesai",
      value: "selesai",
    },
    {
      title: "Refund",
      value: "refund",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<TStatus>(statuses[0]);

  return (
    <Modal show={show} centered={true} size="lg">
      <div className="modal-header">
        <h2>Ubah Status Order</h2>
        {/* begin::Close */}
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
        {/* end::Close */}
      </div>

      <div className="modal-body py-lg-10 px-lg-10">
        <h5>Pilih status order</h5>
        <div className="row">
          {statuses.map((item, index) => (
            <div className={ index > 3 ? "col-4" : "col-12rewfrefer"} key={index}>
              <RadioInput
                className={item.value == selectedStatus.value ? "active" : ""}
                key={item.value}
                name="status"
                value={item.value}
                checked={item.value == selectedStatus.value}
                onChange={() => setSelectedStatus(item)}
              >
                {item.title}
              </RadioInput>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-lg btn-secondary"
          data-kt-stepper-action="submit"
          onClick={onClose}
        >
          Batal{" "}
        </button>

        <button
          type="button"
          className="btn btn-lg btn-primary"
          data-kt-stepper-action="next"
          onClick={() => onConfirm(selectedStatus)}
        >
          Ubah Status{" "}
        </button>
      </div>
    </Modal>
  );
};

export default ChangeOrderModal;
