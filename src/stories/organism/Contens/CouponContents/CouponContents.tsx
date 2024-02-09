import { CardInfo } from "@/stories/molecules/Cards/CardInfo/CardInfo";
import {
  CouponProps,
  ProductProps,
} from "@/types/contents/coupon/coupon-types";
import { ColorList } from "@/types/general/utilities";
import Image from "next/image";

interface CouponContentsProps {
  coupons: CouponProps[];
  products: ProductProps[];
}

export const CouponContents = ({ coupons, products }: CouponContentsProps) => {
  return (
    <div className="container">
      {coupons.map((coupon, index) => (
        <div key={index}>
          <h4 className={`text-muted mb-3 ${index !== 0 ? "mt-5" : ""}`}>
            {coupon.title}
          </h4>
          <div className="row gy-5">
            {coupon.cards.map((card, cardIndex) => (
              <div className="col" key={cardIndex}>
                <CardInfo
                  showBorder={true}
                  className="h-100 "
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  descriptionColor={card.descriptionColor}
                  badgeText={card.badgeText}
                  badgeColor={card.badgeColor}
                  iconColor={card.iconColor}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        {products !== undefined ? (
          <>
            <h4 className="text-muted mb-3 mt-5">
              Produk yang Bisa Menggunakan Kupon Ini
            </h4>
            {products.map((product, productIndex) => (
              <div
                className="d-flex align-items-center mb-7"
                key={productIndex}
              >
                <div className="symbol symbol-50px me-5">
                  <span className="symbol-label bg-gray-600">
                    <Image src={product.image} width={50} height={50} alt="" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-dark text-hover-primary cursor-pointer fs-6 fw-bold">
                    {product.name}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
