"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Products from "@/components/layout/Products";
import { useSearchParams } from "next/navigation";
import { CategoriesFilterType } from "@/components/ProductsSearchBar";

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const searchParams = useSearchParams();

  const category: CategoriesFilterType | any = searchParams.get("category");     
  const search: string | null = searchParams.get("search");          

  return (
    <div className="max-w-[85rem] mx-auto pb-25">
      <Breadcrumbs currentPage="products" />
      <Products 
        search={search ?? ""}
        category={category ?? ""}
      />
    </div>
  );
};

export default ProductsPage;
