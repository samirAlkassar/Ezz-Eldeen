import { ProductType } from "@/features/products/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: ProductType;
    blurDataURL: string;
};

const ProductSummary = ({ product, blurDataURL }: Props) => {
    const t = useTranslations("ProductDetails.similarProducts");
    
    return (
        <section className="overflow-x-clip">
            <div className="max-w-7xl bg-white border-primary/5 shadow-xs border rounded-xl md:rounded-3xl mx-auto flex gap-3 md:gap-8 p-2 md:p-4 items-start">
                <div className="relative w-60 min-w-36 md:min-w-60 aspect-square">
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover rounded-2xl"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                    />
                </div>

                <div className="md:space-y-2">
                    <span className="text-primary uppercase font-medium text-xs md:text-sm">{t("label")}</span>
                    <h1 className="text-base md:text-3xl font-medium">{product.name}</h1>
                    <p className="text-text-muted line-clamp-1 md:line-clamp-2 description text-sm md:text-base max-w-2xl">
                        {product.description}
                    </p>      
                </div>
            </div>
            <div className="relative mt-4 md:mb-4 max-w-7xl mx-auto">
                <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 no-scrollbar">
                    {product.tags.map((tag: string, index: number) => (
                        <Link
                            href={`/products?search=${tag}`}
                            className="shrink-0 border border-text/50 bg-primary/5 rounded-full py-1 md:py-1.5 px-3 md:px-5 text-sm font-medium cursor-pointer transition-all duration-200 whitespace-nowrap" 
                            key={index}>
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSummary;