"use client";

import Products from "@/components/layout/Products";
import { useSearchParams } from "next/navigation";
import { CategoriesFilterType } from "@/components/layout/Products";
import { ProductsResponse } from "@/features/products/productsAPI";
import { ProductType } from "@/features/products/types";

type ProductsClientProps = {
  initialProducts: ProductType[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  initialPage: number;
};

const ProductsClient = ({initialProducts, initialPagination, initialPage} : ProductsClientProps) => {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");

  const category: CategoriesFilterType =
    categoryParam === "Toys & Games" ||
    categoryParam === "School Supplies" ||
    categoryParam === "Gifts" ||
    categoryParam === "All Products"
      ? categoryParam
      : "All Products";

  const search: string = searchParams.get("search") ?? "";

  const subCategory: string = searchParams.get("subCategory") ?? "";

  return (
    <section>
      {search && <h1 className="text-xl md:text-3xl font-medium text-gray-700">Search results for {search}</h1>}
      <Products 
        initialProducts={initialProducts} 
        initialPagination={initialPagination} 
        initialPage={initialPage}
        search={search} 
        category={category} 
        subCategory={subCategory}/>
    </section>
  );
};

export default ProductsClient;
