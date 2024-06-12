import Link from "next/link";

import { ProductServiceFindFirstQuery } from "@/app/service/graphql/gen/graphql";
import { breadcrumbs } from "./DetaiProduct-view-model";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import currencyFormatter from "@/_metronic/helpers/Formatter";
import { PageTitle } from "@/_metronic/layout/core";

const ProductDetail = ({
  data,
}: {
  data: ProductServiceFindFirstQuery | undefined;
}) => {
  console.log(data);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Produk</PageTitle>

      <KTCard>
        <KTCardBody>
          <div className="mb-5">
            <h3 className="">Nama Produk</h3>
            <p className="lead text-body">
              {data?.productServiceFindFirst?.name}
            </p>
          </div>
          <div className="mb-5">
            <h3 className="">Tipe Produk</h3>
            <p className="lead text-body">
              {data?.productServiceFindFirst?.productServiceCategory}
            </p>
          </div>
          <div className="mb-5">
            <h3 className="">Deskripsi Produk</h3>
            <div
              className="lead"
              dangerouslySetInnerHTML={{
                __html: data?.productServiceFindFirst?.description as string,
              }}
            />
          </div>
          <div className="mb-5">
            <h3 className="">Harga Produk</h3>
            <p className="lead text-body">
              {currencyFormatter(
                Number(data?.productServiceFindFirst?.basePrice)
              )}
            </p>
          </div>
          <div className="mb-5">
            <h3 className="">Harga Diskon</h3>
            <p className="lead text-body">
              {currencyFormatter(
                Number(data?.productServiceFindFirst?.salePrice)
              )}
            </p>
          </div>
          {data?.productServiceFindFirst?.benefits && (
            <div className="mb-5">
              <h3 className="">
                {data.productServiceFindFirst.benefits.length !== 0
                  ? "Benefits"
                  : null}
              </h3>
              <ul className="lead text-body">
                {data.productServiceFindFirst.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {data?.productServiceFindFirst?.portofolio && (
            <div className="mb-5">
              <h3 className="">
                {data.productServiceFindFirst.portofolio.length !== 0
                  ? "Portfolio"
                  : null}
              </h3>
              <ul className="lead text-body">
                {data.productServiceFindFirst.portofolio.map((item, index) => (
                  <li key={index}>
                    <Link href={item}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data?.productServiceFindFirst?.subscriberListId && (
            <div className="mb-5">
              <h3 className="">Mailketing Id</h3>
              <p className="lead text-body">
                {data?.productServiceFindFirst?.subscriberListId}
              </p>
            </div>
          )}
          {data?.productServiceFindFirst?.images && (
            <div className="mb-5">
              <h3>Foto Produk</h3>
              <div className="d-flex gap-5 justify-content-center overflow-x-auto">
                {data.productServiceFindFirst.images.map((imgUrl, index) => (
                  <img
                    className="img-fluid w-500px"
                    key={index}
                    src={imgUrl.path}
                    alt=""
                  />
                ))}
              </div>
            </div>
          )}
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default ProductDetail;
