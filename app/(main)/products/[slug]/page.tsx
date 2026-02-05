import { getProductBySlug, getRelatedBySlug } from "@/features/products/server/getProductsBySlug";
import ProductsBySlugPage from "./components/ProductsBySlugPage";

type PageProps = {
  params: {
    slug: string
  }
}

const ProductBySlug = async ({ params }: PageProps) => {
    const product = await getProductBySlug(params.slug);
    const relatedProducts = await getRelatedBySlug(params.slug, 4);
    console.log("productsBySLug:", relatedProducts)
    return (
        <main className="bg-ornge-50/50 px-2 lg:px-3 xl:px-0">
            <ProductsBySlugPage slug={params.slug} product={product} relatedProducts={relatedProducts}/>
        </main>
    )
};

export default ProductBySlug;