import Breadcrumbs from "@/components/Breadcrumbs";
import ProductsClient from "./components/ProductsClient";
import { Suspense } from "react";

const ProductsPage = () => {
  return (
    <div className="max-w-[85rem] mx-auto pb-12 md:pb-25 px-4">
      <Breadcrumbs currentPage="products" />
      <Suspense fallback={<>...</>}>
        <ProductsClient />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
