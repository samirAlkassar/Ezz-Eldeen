export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/Breadcrumbs";
import ProductsClient from "./components/ProductsClient";
import { Suspense } from "react";
import { getProducts } from "@/features/products/server/getProducts"
import ToysCategorySectionImage from "@/public/images/twister-car.png";
import SchoolCategorySectionImage from "@/public/images/school-supplies.png";
import GiftsCategorySectionImage from "@/public/images/gift.png";
import BundlesCategorySectionImage from "@/public/images/school-supplies.png";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";

type ProductsPageProps = {
  searchParams: {
    page?: string, 
    category?: string,
    subcategory?: string,
    search?: string
  };
  params: {lang: typeLang}
}

const ProductsPage = async ({searchParams, params}: ProductsPageProps) => {
  const { lang } = await params as { lang: typeLang };
  const { category, subcategory, search, page } = await searchParams;
  const pageNumber = Number(page ?? 1);

  const data = await getProducts({
    page: pageNumber,
    limit: 12,
    category: category === "All Products" ? "" : category,
    subCategory: subcategory,
    search: search
  }, lang);

  return (
    <div className="bg-background">
      <div className="max-w-340 mx-auto pb-12 md:pb-25 px-4">
        <Breadcrumbs currentPage="products" />
        <Suspense fallback={<>...</>}>
          <ProductsClient initialProducts={data.products} initialPagination={data.pagination} initialPage={pageNumber} lang={lang}/>
        </Suspense>
      </div>
    </div>
  );
};


export async function generateMetadata({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams as { category?: string };
  const Category = decodeURIComponent(category ?? "All Products").replace(/\+/g, " ");

  const categoryMeta: Record<string, { title: string; image: StaticImageData }> = {
    "All Products": {
      title: "All Products - My Store",
      image: BundlesCategorySectionImage,
    },
    "Toys & Games": {
      title: "Toys & Games - My Store",
      image: ToysCategorySectionImage,
    },
    "School Supplies": {
      title: "School Supplies - My Store",
      image: SchoolCategorySectionImage,
    },
    "Gifts": {
      title: "Gifts - My Store",
      image: GiftsCategorySectionImage,
    },
  };

  const metadata = categoryMeta[Category] ?? {
    title: "Products - My Store",
    image: "/images/placeholder.jpg",
  };

  return {
    title: metadata.title,
    openGraph: {
      title: metadata.title,
      images: [metadata.image],
    },
    twitter: {
      title: metadata.title,
      images: [metadata.image],
    },
  };
}


export default ProductsPage;
