import { getProducts } from "@/features/products/server/getProducts";
import CategoriesClient from "./components/CategoriesClient";
import { Metadata } from "next";

type Props = {
  params: { category: string };
  searchParams?: { search?: string; page?: string };
};

const Categories = async ({params, searchParams}: Props) => {
  const { category } = params;
  const page = Number(searchParams?.page ?? 1);
  
    const data = await getProducts({
      page, 
      limit: 12,
      category: category
    });
  
  return (
    <div>
      <CategoriesClient initialProducts={data.products} initialPagination={data.pagination} initialPage={page}/>
    </div>
  )
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  const formattedCategory = category.replace(/_&_/g, " & ").replace(/_/g, " ");
  
  return {
    title: `${formattedCategory} - Shop Now | Your Store Name`,
    description: `Browse our collection of ${formattedCategory}. Find the best products at great prices.`,
    openGraph: {
      title: `${formattedCategory} - Shop Now`,
      description: `Browse our collection of ${formattedCategory}. Find the best products at great prices.`,
    },
  };
}

export default Categories;