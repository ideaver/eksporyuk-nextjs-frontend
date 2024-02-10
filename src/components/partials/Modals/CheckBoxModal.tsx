import { KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";

export const CheckBoxModal = ({
  follupValues,
  selectedFollupValue,
  handleFollupChange,
}: {
  follupValues: string[];
  selectedFollupValue: string;
  handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="modal fade" tabIndex={-1} id="kt_follup_modal">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Kirim Pesan Follow Up</h5>
            <div
              className="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <KTIcon iconName="cross" className="fs-2x" />
            </div>
          </div>

          <div className="modal-body">
            <h6>Pilih Follow-Up</h6>
            <div
              className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
              data-kt-buttons="true"
            >
              {follupValues.map((value, index) => (
                <CheckBoxInput
                  key={value}
                  className={selectedFollupValue === value ? "active" : ""}
                  name="follup"
                  value={value}
                  checked={selectedFollupValue === value}
                  onChange={handleFollupChange}
                >
                  {`Follow-Up ${index + 1}`}
                </CheckBoxInput>
              ))}
            </div>
            <p className="fw-bold text-muted mt-2">Pesan Follow-Up</p>
            <textarea
              className="form-control form-control-solid"
              rows={10}
              placeholder={
                "Halo {{buyer-name}} \n\nBerikut pesananmu ya \n\n{{order-detail}}\n{{order-meta}}\n\nHarap segera lakukan pembayaran sebelum pukul {{close-time}} agar bisa kami proses ya"
              }
            ></textarea>
          </div>

          <div className="modal-footer justify-content-center">
            <Buttons buttonColor="secondary" data-bs-dismiss="modal">
              Batal
            </Buttons>
            <Buttons data-bs-dismiss="modal">Kirim Follow-Up</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};
