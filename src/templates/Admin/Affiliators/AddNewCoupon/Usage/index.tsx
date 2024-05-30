import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";

const CouponUsage = () => {
  return (
    <KTCard>
      <KTCardBody>
        <h2 className="pb-3">Penerapan Kupon</h2>

        <div className="pt-4">
          <h4 className="fw-bold text-gray-700">
            Batas Penggunaan Kupon oleh Affiliasi
          </h4>
          <div className="d-flex">
            <Dropdown
              styleType="outline"
              props={{ id: "couponName" }}
              options={[
                { label: "Facebook", value: "akuisisi1" },
                { label: "Instagram", value: "akuisisi2" },
              ]}
              onValueChange={() => {}}
            />
            <Buttons
              mode="light"
              classNames="ms-6"
              buttonColor="danger"
              size="small"
            >
              <KTIcon iconName="cross" className="fs-2" />
            </Buttons>
          </div>
          <div className="d-flex pt-3">
            <Dropdown
              styleType="outline"
              props={{ id: "couponName" }}
              options={[
                { label: "Facebook", value: "akuisisi1" },
                { label: "Instagram", value: "akuisisi2" },
              ]}
              onValueChange={() => {}}
            />
            <Buttons
              mode="light"
              classNames="ms-6"
              buttonColor="danger"
              size="small"
            >
              <KTIcon iconName="cross" className="fs-2" />
            </Buttons>
          </div>
          <div className="pt-3">
            <Buttons buttonColor="primary" mode="light">
              <KTIcon iconName="plus" className="fs-2" />
              Tambahkan Produk
            </Buttons>
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  );
};

export default CouponUsage;
