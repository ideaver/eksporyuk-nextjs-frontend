import { PageTitle } from "@/_metronic/layout/core";
import useDetailOrderViewModel, {
  IDetailOrderProps,
} from "./DetailOrder-view-model";
import { BuktiPembayaran } from "@/stories/organism/Tables/BuktiPembayaran/BuktiPembayaran";
import { AlamatTujuan } from "@/stories/organism/Tables/AlamatTujuan/AlamatTujuan";
import { OrderDetails } from "@/stories/organism/Tables/OrderDetails/OrderDetails";
import { useEffect, useState } from "react";

const DetailOrder = ({ orderId }: IDetailOrderProps) => {
  const { orderDatas, orderDetailData } = useDetailOrderViewModel({
    orderId,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <>
          <OrderData
            addressDetail={orderDatas.addressDetail}
            paymentProof={orderDatas.paymentProof}
          />
          <OrderDetails data={orderDetailData} />
        </>
      )}
    </>
  );
};

export default DetailOrder;

const OrderData = ({
  paymentProof,
  addressDetail,
}: {
  paymentProof: any;
  addressDetail: any;
}) => {
  return (
    <div className="row mb-5 gy-5">
      <div className="col-lg-6">
        <BuktiPembayaran className="h-100" title="Order" data={paymentProof} />
      </div>
      <div className="col-lg-6">
        <AlamatTujuan
          className="h-100"
          title="Order"
          data={addressDetail}
        ></AlamatTujuan>
      </div>
    </div>
  );
};
