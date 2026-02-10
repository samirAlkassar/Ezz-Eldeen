import { getProducts } from "@/features/products/server/getProducts";
import CategoriesClient from "./components/CategoriesClient";

type Props = {
  params: { category: string, lang: typeLang };
  searchParams?: { search?: string; page?: string };
};

const Categories = async ({params, searchParams}: Props) => {
  const { category, lang } = params;
  const page = Number(searchParams?.page ?? 1);

  const undoSlug = (slug: string | string[] | undefined) => {
    return typeof slug === 'string' ? 
    slug.replace(/_/g, ' ').replace(/%26/g, '&') : 
    Array.isArray(slug) ? 
    slug[0]?.replace(/_/g, ' ').replace(/%/g, '') : ''
  };
  
  const data = await getProducts({
    page, 
    limit: 12,
    category: undoSlug(category)}, 
    lang);
  console.log("fix bug:", data)
  return (
    <div>
      <CategoriesClient initialProducts={data.products} initialPagination={data.pagination} initialPage={page} lang={lang}/>
    </div>
  )
}

export default Categories;