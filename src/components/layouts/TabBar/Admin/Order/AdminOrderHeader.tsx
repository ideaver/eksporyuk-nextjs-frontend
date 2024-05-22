import { PageTitle } from "@/_metronic/layout/core";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { OrderCard } from "@/stories/molecules/Cards/OrderCard/OrderCard";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import { useRouter } from "next/router";
import useAdminOrderHeaderViewModel, {
  IAdminOrderHeaderViewModel,
} from "./AdminOrderHeader-view-model";
import ChangeOrderModal from "./components/ChangeOrderModal";

const AdminOrderLayout = ({
  urlType,
  id,
  data,
}: IAdminOrderHeaderViewModel) => {
  const {
    urls,
    handleFollupChange,
    selectedFollupValue,
    follupValues,
    setShowOrderStatusModal,
    showOrderStatusModal,
    orderTableDatas,
    breadcrumbs,
    updateOrderStatusHandler,
  } = useAdminOrderHeaderViewModel({ urlType, id, data });
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
            buttonColor="secondary"
            classNames="fw-bold w-100 w-lg-auto mt-5 mt-lg-0"
            data-bs-toggle="modal"
            data-bs-target="#kt_follup_modal"
          >
            Kirim Follow-Up
          </Buttons>
          <Buttons
            buttonColor="primary"
            classNames="fw-bold w-100 w-lg-auto mt-5 mt-lg-0 ms-5"
            onClick={() => setShowOrderStatusModal(true)}
          >
            Ubah status order
          </Buttons>
        </div>
        <FollowUpModal
          follupValues={follupValues}
          selectedFollupValue={selectedFollupValue}
          handleFollupChange={handleFollupChange}
        />
        <ChangeOrderModal
          show={showOrderStatusModal}
          onClose={() => setShowOrderStatusModal(false)}
          onConfirm={async (value) => {
            await updateOrderStatusHandler(value.value);
            setShowOrderStatusModal(false);
          }}
        ></ChangeOrderModal>
      </div>
      <div className="row gy-5 mb-5">
        {orderTableDatas.map((data, index) => (
          <div className="col-lg-4" key={index}>
            <OrderCard className="h-100" data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderLayout;
