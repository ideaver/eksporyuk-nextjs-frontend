import { KTIcon } from "@/_metronic/helpers";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import {
  useFollowUpDeleteOneMutation,
  useFollowUpFindManyQuery,
  UserRoleEnum,
} from "@/app/service/graphql/gen/graphql";
import {
  changeContent,
  changeId,
  changeName,
} from "@/features/reducers/followup/followupReducer";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

export const FollowUpModal = ({
  value,
  onChange,
}: //   handleEditState,
{
  value?: string;
  onChange?: any;
  //   handleEditState?: (id: number) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [followUpMessage, setFollowUpMessage] = useState("");
  const [followUpValue, setFollowUpValue] = useState("");

  const dispatch = useDispatch();

  const [followUpDeleteOne] = useFollowUpDeleteOneMutation();

  const handleDeleteFollowUp = async (id: number) => {
    try {
      await followUpDeleteOne({
        variables: {
          where: {
            id: id,
          },
        },
      });
      followUpFindMany.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const followUpFindMany = useFollowUpFindManyQuery({
    variables: {
      where: {
        forRole: {
          equals: UserRoleEnum.Affiliator,
        },
      },
    },
  });

  const handleEditState = (name: any) => {
    const editFolup = followUpFindMany.data?.followUpFindMany?.filter(
      (e) => e.name === name
    )[0];
    console.log(editFolup);
    dispatch(changeName(`${editFolup?.name}`));
    dispatch(changeContent(`${editFolup?.content}`));
    dispatch(changeId(editFolup?.id as number));
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <KTModal
      dataBsTarget="kt_follup_modal"
      fade
      modalSize="lg"
      modalCentered
      title="Pesan Follow Up Affiliator"
      buttonClose={
        <Buttons
          buttonColor="secondary"
          data-bs-dismiss="modal"
          classNames="fw-bold"
        >
          Keluar
        </Buttons>
      }
      buttonSubmit={<></>}
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
          {followUpValue ? followUpValue : "Pilih Tamplate FollowUp"}
        </button>
        <ul className="dropdown-menu" style={{ width: "100%" }}>
          {followUpFindMany.data?.followUpFindMany?.map((e, index) => {
            return (
              <li key={index} className="dropdown-item w-100 d-flex">
                <button
                  className="dropdown-item w-100"
                  value={e.name}
                  onClick={() => {
                    setFollowUpMessage(e.content);
                    setFollowUpValue(e.name);
                  }}
                >
                  {e.name}
                </button>
                <div className="btns">
                  <button
                    className="btn btn-icon btn-active-danger"
                    onClick={() => {
                      handleDeleteFollowUp(e.id);
                    }}
                  >
                    <KTIcon iconName="trash" className="fs-1"></KTIcon>
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#kt_edit_follup_modal"
                    className="btn btn-icon btn-active-success"
                    onClick={() => {
                      handleEditState(e.name);
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
      <h5 className="fw-bold text-muted mt-2">Isi Pesan Follow-Up</h5>
      <Textarea
        rows={9}
        disabled
        props={{
          value: followUpMessage,
          onChange,
        }}
        placeholder={
          "-"
          //   "Halo [[nama]] \n\nBerikut pesananmu ya \n\n[[order-detail]]\n[[order-meta]]\n\nHarap segera lakukan pembayaran sebelum pukul [[close-time]] agar bisa kami proses ya"
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
