import { ProductType } from "@/features/products/types";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: ProductType;
    blurDataURL: string;
};

const ProductSummary = ({ product, blurDataURL }: Props) => {
    const t = useTranslations("ProductDetails.similarProducts.similarProductsPage")
    return (
        <section className="bg-primary/2">
            <div className="max-w-6xl mx-auto flex gap-4 p-4 md:items-center">
                <div className="relative w-50 aspect-square">
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                    />
                </div>

                <div className="md:space-y-2">
                    <h1 className="text-xl md:text-3xl font-medium">{product.name}</h1>
                    <p className="text-text-muted line-clamp-4">
                        {product.description}
                    </p>
                    <div className="flex gap-2 mt-2 items-center justify-start flex-wrap">
                        <h4 className="text-base md:text-lg text-text">{t("tags")}</h4>
                        {product.tags.map((tag: string, index: number) => (
                            <span
                                className="bg-primary/20 text-text rounded-full px-2 md:px-3 md:py-0.5 text-sm md:text-base" 
                                key={index}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <Link
                        href={`/products/${product.slug}`}
                        className="flex w-fit items-center justify-center gap-1 mt-6 bg-black text-white px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                        <ChevronLeft size={20}/>
                        <p>{t("button")}</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductSummary;