import { getProductBySlug, getRelatedBySlug } from "@/features/products/server/getProductsBySlug";
import type { Metadata } from "next";
import { getBlurDataURL } from "@/lib/getImage";
import ProductSummary from "./components/ProductSummary";
import RelatedProductsGrid from "./components/RelatedProductsGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

type PageProps = {
  params: {
    slug: string;
    lang?: typeLang;
  };
};

const RelatedProductsPage = async ({ params }: PageProps) => {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) return null;

  const blurDataURL = await getBlurDataURL(product.images[0].url);

  // Get ALL related products (no limit now)
  const relatedProducts = await getRelatedBySlug(slug, 20);

  return (
    <main className="bg-background px-2 lg:px-3 xl:px-0 pb-16 pt-2 space-y-5">
        <Breadcrumbs currentPage={slug} previousPage="related"/>
        <ProductSummary
            product={product}
            blurDataURL={blurDataURL}
        />
        
        <RelatedProductsGrid
            products={relatedProducts.products}
            title={product.name}
            paginationData={relatedProducts.pagination}
        />
    </main>
  );
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Related Products",
    };
  }

  return {
    title: `Related to ${product.name}`,
    description: `Discover products related to ${product.name}.`,
    openGraph: {
      title: `Related to ${product.name}`,
      description: `Explore similar products to ${product.name}.`,
      images: [
        {
          url: product.images?.[0]?.url ?? "",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default RelatedProductsPage;