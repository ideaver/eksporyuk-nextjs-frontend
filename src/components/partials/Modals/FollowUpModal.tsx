import { KTIcon } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";

export const FollowUpModal = ({
  follupValues,
  selectedFollupValue,
  handleFollupChange,
  value,
  onChange,
  handleEditState,
  handleDeleteFollowUp,
  linkAPIWhatsapp,
}: {
  follupValues: string[] | null | undefined;
  selectedFollupValue: string;
  handleFollupChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | any;
  value?: string;
  onChange?: any;
  handleEditState?: any;
  handleDeleteFollowUp?: any;
  linkAPIWhatsapp?: string;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <KTModal
      dataBsTarget="kt_follup_modal"
      fade
      modalSize="lg"
      modalCentered
      title="Kirim Pesan Follow Up"
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
        <Link
          // data-bs-dismiss="modal"
          target="_blank"
          href={`${linkAPIWhatsapp ?? ""}`}
          className="fw-bold btn btn-primary"
        >
          Kirim Follow-Up
        </Link>
      }
      footerContentCentered
      onClose={handleModalClose}
    >
      <h4 className="text-gray-700 fw-bold">Pilih Follow-Up</h4>
      {
        //    <div
        //    className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
        //    data-kt-buttons="true"
        //  >
        //    {follupValues?.map((value, index) => (
        //      <RadioInput
        //        key={value}
        //        className={selectedFollupValue === value ? "active" : ""}
        //        name="follup"
        //        value={value}
        //        checked={selectedFollupValue === value}
        //        onChange={handleFollupChange}
        //      >
        //        {/* {`Follow-Up ${index + 1}`} */}
        //        {`${value}`}
        //      </RadioInput>
        //    ))}
        //  </div>
      }
      <div className="dropdown w-100">
        <button
          className="btn btn-secondary dropdown-toggle p-3 w-100"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedFollupValue
            ? selectedFollupValue
            : "Pilih Tamplate FollowUp"}
        </button>
        <ul className="dropdown-menu" style={{ width: "100%" }}>
          {follupValues?.map((e, index) => {
            return (
              <li key={index} className="dropdown-item w-100 d-flex">
                <button
                  className="dropdown-item w-100"
                  value={e}
                  onClick={handleFollupChange}
                >
                  {e}
                </button>
                <div className="btns">
                  <button
                    className="btn btn-icon btn-active-danger"
                    onClick={() => {
                      handleDeleteFollowUp(e);
                    }}
                  >
                    <KTIcon iconName="trash" className="fs-1"></KTIcon>
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#kt_edit_follup_modal"
                    className="btn btn-icon btn-active-success"
                    onClick={() => {
                      handleEditState(e);
                    }}
                  >
                    <KTIcon iconName="notepad-edit" className="fs-1"></KTIcon>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Buttons
        showIcon={true}
        mode="light"
        classNames="mt-2 mb-5"
        data-bs-toggle="modal"
        data-bs-target="#kt_create_follup_modal"
      >
        Tambahkan Tamplate
      </Buttons>
      <h5 className="fw-bold text-muted mt-2">Pesan Follow-Up</h5>
      <Textarea
        rows={9}
        props={{
          value,
          onChange,
        }}
        placeholder={
          "Halo [[nama]] \n\nBerikut pesananmu ya \n\n[[order-detail]]\n[[order-meta]]\n\nHarap segera lakukan pembayaran sebelum pukul [[close-time]] agar bisa kami proses ya"
        }
      ></Textarea>
      {/* <textarea
              className="form-control form-control-solid"
              rows={10}
              placeholder={
                "Halo {{buyer-name}} \n\nBerikut pesananmu ya \n\n{{order-detail}}\n{{order-meta}}\n\nHarap segera lakukan pembayaran sebelum pukul {{close-time}} agar bisa kami proses ya"
              }
            ></textarea> */}
    </KTModal>
  );
};
