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

  const subCategory: string = searchParams.get("subCategory") ?? "";

  return (
    <section>
      {search && <h1 className="text-xl md:text-3xl font-medium text-gray-700">Search results for {search}</h1>}
      <Products search={search} category={category} subCategory={subCategory}/>
    </section>
  );
};

export default ProductsClient;
