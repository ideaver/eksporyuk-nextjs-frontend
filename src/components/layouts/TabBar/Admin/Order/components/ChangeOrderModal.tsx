import { KTIcon } from "@/_metronic/helpers/components/KTIcon";
import { OrderStatusEnum } from "@/app/service/graphql/gen/graphql";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { useState } from "react";
import { Modal } from "react-bootstrap";
type TStatus = {
  title: string;
  value: OrderStatusEnum;
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
    {
      title: "Pesanan Diproses",
      value: OrderStatusEnum.Processing,
    },
    {
      title: "Selesai",
      value: OrderStatusEnum.Done,
    },
    {
      title: "Kadaluarsa",
      value: OrderStatusEnum.Expired,
    },
    {
      title: "Dibatalkan",
      value: OrderStatusEnum.Cancelled,
    },
    {
      title: "Pending",
      value: OrderStatusEnum.Pending,
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
            <div
              className={"col-12"}
              key={index}
            >
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
