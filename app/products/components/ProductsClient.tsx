"use client";

import Products from "@/components/layout/Products";
import { useSearchParams } from "next/navigation";
import { CategoriesFilterType } from "@/components/layout/Products";

const ProductsClient = () => {
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

  return <Products search={search} category={category} />;
};

export default ProductsClient;
