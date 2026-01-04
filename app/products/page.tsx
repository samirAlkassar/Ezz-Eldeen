"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Products from "@/components/layout/Products";
import { useSearchParams } from "next/navigation";
import { CategoriesFilterType } from "@/components/ProductsSearchBar";
import { Suspense } from "react";

const ProductsPage: React.FC = () => {
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

  return (
    <div className="max-w-[85rem] mx-auto pb-25">
      <Breadcrumbs currentPage="products" />
      <Suspense fallback={<div>Loading products...</div>}>
        <Products search={search} category={category} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
