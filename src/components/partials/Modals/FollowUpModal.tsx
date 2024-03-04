import { KTIcon } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { useState } from "react";

export const FollowUpModal = ({
  follupValues,
  selectedFollupValue,
  handleFollupChange,
}: {
  follupValues: string[];
  selectedFollupValue: string;
  handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
          <Buttons buttonColor="secondary" data-bs-dismiss="modal" classNames="fw-bold">
            Batal
          </Buttons>
        }
        buttonSubmit={<Buttons data-bs-dismiss="modal" classNames="fw-bold">Kirim Follow-Up</Buttons>}
        footerContentCentered
        onClose={handleModalClose}
      >
        <h4 className="text-gray-700 fw-bold">Pilih Follow-Up</h4>
        <div
          className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
          data-kt-buttons="true"
        >
          {follupValues.map((value, index) => (
            <RadioInput
              key={value}
              className={selectedFollupValue === value ? "active" : ""}
              name="follup"
              value={value}
              checked={selectedFollupValue === value}
              onChange={handleFollupChange}
            >
              {`Follow-Up ${index + 1}`}
            </RadioInput>
          ))}
        </div>
        <h5 className="fw-bold text-muted mt-2">Pesan Follow-Up</h5>
        <Textarea
          rows={9}
          placeholder={
            "Halo {{buyer-name}} \n\nBerikut pesananmu ya \n\n{{order-detail}}\n{{order-meta}}\n\nHarap segera lakukan pembayaran sebelum pukul {{close-time}} agar bisa kami proses ya"
          }
        >
        </Textarea>
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
