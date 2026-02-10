import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSection from "./ProductSection";
import { ProductType } from "@/features/products/types";
import { ProductsResponse } from "@/features/products/productsAPI";
import RelatedProducts from "./RelatedProducts";
import { Suspense } from "react";
import ReviewsSkeleton from "./ReviewsSkeleton";
import ReviewsServer from "./ReviewsServer";

type PageProps = {
    product: ProductType,
    relatedProducts: ProductsResponse,
    slug: string
}

const ProductsBySlugPage = ({ product, relatedProducts, slug }: PageProps) => {
  return (
    <>
      <Breadcrumbs previousPage={product?.category} currentPage={slug} />
      <div className="max-w-[85rem] mx-auto px-4 py-6">
        <ProductSection product={product} />

        <Suspense fallback={<ReviewsSkeleton />}>
          <ReviewsServer product={product}/>
        </Suspense>
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </>
  );
};

export default ProductsBySlugPage;