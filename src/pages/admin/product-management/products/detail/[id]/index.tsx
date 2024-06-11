import { useRouter } from "next/router";

import { useProductServiceFindFirstQuery } from "@/app/service/graphql/gen/graphql";

import LoadingUI from "@/components/partials/Handler/LoadingUI";
import ProductDetail from "@/templates/Admin/Products/Detail";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Retrieve data
  const { data, error, loading } = useProductServiceFindFirstQuery({
    variables: {
      where: {
        id: {
          equals: Number(id),
        }
      }
    }
  })

  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data?.productServiceFindFirst && <ProductDetail data={data} />}
    </>
  )
}

export default ProductDetailPage;
