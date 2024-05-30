import { PageTitle } from "@/_metronic/layout/core";
import useAdminTransactionHeaderViewModel, {
  IAdminTransaction,
  IStatus,
  breadcrumbs,
} from "./AdminTransactionHeader-view-model";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { useRouter } from "next/router";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { Dispatch, SetStateAction } from "react";

const AdminTransactionLayout = ({ urlType, id }: IAdminTransaction) => {
  const {
    urls,
    statuses,
    setSelectedStatus,
    selectedStatus,
    handleStatusUpdate,
  } = useAdminTransactionHeaderViewModel({ urlType, id });
  const router = useRouter();
  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>Order Detail</PageTitle>
      <div className="d-lg-flex justify-content-between mb-5">
        <TabLink className="mb-10" links={urls} />
        <div className="mb-5 mb-lg-0 d-sm-flex d-lg-block">
          <Buttons
            icon="left"
            buttonColor="secondary"
            classNames="me-5 p-3 pe-2"
            showIcon={true}
            onClick={() => router.back()}
          />
          <Buttons
            buttonColor="primary"
            classNames="fw-bold w-100 w-lg-auto mt-5 mt-lg-0"
            data-bs-toggle="modal"
            data-bs-target="#kt_change_status_modal"
          >
            Ubah Status Transaksi
          </Buttons>
        </div>
      </div>
      {/* <div className="row gy-5 mb-5">
    {orderTableDatas.map((data, index) => (
      <div className="col-lg-4" key={index}>
        <OrderCard className="h-100" data={data} />
      </div>
    ))}
  </div> */}
      <ChangeStatusModal
        selectedStatus={selectedStatus}
        statuses={statuses}
        setSelectedStatus={setSelectedStatus}
        handleStatusUpdate={handleStatusUpdate}
        onClose={() => {}}
      />
    </div>
  );
};

const ChangeStatusModal = ({
  statuses,
  setSelectedStatus,
  selectedStatus,
  onClose,
  handleStatusUpdate,
}: {
  selectedStatus: IStatus;
  statuses: IStatus[];
  setSelectedStatus: Dispatch<SetStateAction<IStatus>>;
  onClose: () => void;
  handleStatusUpdate: () => Promise<void>;
}) => {
  return (
    <div>
      <KTModal
        dataBsTarget="kt_change_status_modal"
        title="Ubah Status Transaksi"
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
            classNames="fw-bold"
            onClick={handleStatusUpdate}
          >
            Ubah Status
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <div className="modal-body py-lg-10 px-lg-10">
          <h5>Pilih status transaksi</h5>
          <div className="row">
            {statuses.map((item, index) => (
              <div className={"col-12rewfrefer"} key={index}>
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
    </div>
  );
};

export default AdminTransactionLayout;
