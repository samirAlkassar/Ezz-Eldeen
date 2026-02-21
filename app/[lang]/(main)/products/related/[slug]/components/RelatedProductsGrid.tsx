"use client";

import Pagination from "@/components/Pagination";
import { Product } from "@/components/Product";
import { ProductType } from "@/features/products/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  products: ProductType[];
  title: string;
  paginationData: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
};

const RelatedProductsGrid = ({ products, title, paginationData }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("ProductDetails.similarProducts.similarProductsPage")
  const onPageChange = () => {
    setCurrentPage(prev => prev + 1)
  };

  return (
    <section className="max-w-6xl mx-auto space-y-6 mt-6 px-4">
      <div className="flex items-center justify-self-center gap-2">
        <h2 className="text-base md:text-xl font-medium text-text">{t("title")}</h2>
        <h3 className="text-base md:text-xl text-text">{title}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Product key={product._id} index={index} product={product} showDescription={true} showRatings={true}/>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={paginationData?.totalPages || 1}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default RelatedProductsGrid;