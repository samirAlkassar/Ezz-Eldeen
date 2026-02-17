import { getProductBySlug, getRelatedBySlug } from "@/features/products/server/getProductsBySlug";
import ProductsBySlugPage from "./components/ProductsBySlugPage";
import type { Metadata } from "next"
import { getBlurDataURL } from "@/lib/getImage";

type PageProps = {
  params: {
    slug: string,
    lang?: typeLang
  };
};

const ProductBySlug = async (props: PageProps) => {
  const { params } = props;
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) return;

  const blurDataURL = await getBlurDataURL(product.images[0].url);
  const relatedProducts = await getRelatedBySlug(slug, 4);

  return (
    <main className="bg-background px-2 lg:px-3 xl:px-0">
      <ProductsBySlugPage
        slug={slug}
        product={product}
        blurDataURL={blurDataURL}
        relatedProducts={relatedProducts}
      />
    </main>
  )
};



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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