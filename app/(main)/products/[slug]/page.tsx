import { getProductBySlug, getProductsReviews, getRelatedBySlug } from "@/features/products/server/getProductsBySlug";
import ProductsBySlugPage from "./components/ProductsBySlugPage";
import type { Metadata } from "next"

type PageProps = {
  params: {
    slug: string
  };
};

const ProductBySlug = async ({ params }: PageProps) => {
  const product = await getProductBySlug(params.slug);
  if (!product) return;

  const relatedProducts = await getRelatedBySlug(params.slug, 4);
  console.log("productsBySLug:", product)
  return (
    <main className="bg-ornge-50/50 px-2 lg:px-3 xl:px-0">
        <ProductsBySlugPage slug={params.slug} product={product} relatedProducts={relatedProducts}/>
    </main>
  )
};



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product?.images?.[0]?.url,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product?.images?.[0]?.url],
    },
  }
};


export default ProductBySlug;