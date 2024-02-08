import { PageTitle } from "@/_metronic/layout/core";
import { OrderCard } from "@/stories/molecules/Cards/OrderCard/OrderCard";
import useDetailOrderViewModel, {
  IDetailOrderProps,
} from "./DetailOrder-view-model";

const DetailOrder = ({ orderId }: IDetailOrderProps) => {
  const { orderTableDatas, breadcrumbs } = useDetailOrderViewModel({
    orderId,
  });
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Order Affiliasi</PageTitle>

      <div className="row gy-5">
        {orderTableDatas.map((data, index) => (
          <div className="col-lg-4" key={index}>
            <OrderCard className="h-100" data={data}></OrderCard>
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailOrder;
