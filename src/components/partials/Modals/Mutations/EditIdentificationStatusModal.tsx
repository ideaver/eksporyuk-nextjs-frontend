import { KTModal } from "@/_metronic/helpers/components/KTModal";
import {
  IdentificationStatusEnum,
  useIdentificationUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import SweetAlert2 from "react-sweetalert2";

type TStatus = {
  title: string;
  value: IdentificationStatusEnum;
};

const EditIdentificationModal = ({
  onClick,
  id,
  defaultStatus = IdentificationStatusEnum.Pending,
}: {
  onClick: () => void;
  defaultStatus: IdentificationStatusEnum;
  id: number;
}) => {
  const router = useRouter();
  const statuses: TStatus[] = [
    {
      title: "Verified",
      value: IdentificationStatusEnum.Verified,
    },
    {
      title: "Pending",
      value: IdentificationStatusEnum.Pending,
    },
    {
      title: "Rejected",
      value: IdentificationStatusEnum.Rejected,
    },
  ];

  const [swalProps, setSwalProps] = useState({});

  const [status, setStatus] = useState<IdentificationStatusEnum>(defaultStatus);
  const [selectedStatus, setSelectedStatus] = useState<TStatus>({
    value: defaultStatus,
    title: "sadwd",
  });

  const [identificationUpdateOne] = useIdentificationUpdateOneMutation();
  const handleIdentificationUpdaetOne = async () => {
    try {
      await identificationUpdateOne({
        variables: {
          where: {
            id,
          },
          data: {
            identificationStatus: {
              set: selectedStatus.value,
            },
          },
        },
      });
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "Ideentificatn Berhasil Diupdate",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <KTModal
        dataBsTarget="kt_edit_status_modal"
        title="Ubah Status Identification"
        fade
        modalCentered
        onClose={() => {}}
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
            classNames="fw-bold"
            onClick={() => handleIdentificationUpdaetOne()}
          >
            Ubah Status
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <div className="modal-body py-lg-10 px-lg-10">
          <h5>Pilih status order</h5>
          <div className="row">
            {statuses.map((item, index) => (
              <div className={"col-12"} key={index}>
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
      </KTModal>
      <SweetAlert2
        {...swalProps}
        didOpen={() => {
          // run when swal is opened...
        }}
        didClose={async () => {
          console.log("closed");
          setSwalProps({});
        }}
      />
    </div>
  );
};

export default EditIdentificationModal;
