"use client";

import { Product } from "@/components/Product";
import { ProductsResponse } from "@/features/products/productsAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const RelatedProducts = ({relatedProducts, slug}: {relatedProducts: ProductsResponse, slug: string}) => {
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const t = useTranslations("ProductDetails");
    const router = useRouter();
    return (
        <div className="mt-30 md:mt-20 lg:mt-30">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 font-medium md:font-semibold">{t("similarProducts.title")}</h1>
                    <p className="text-gray-600 text-base sm:text-lg md:text-2xl sm:mt-1 md:mt-3 max-w-50 md:max-w-full">{t("similarProducts.subtitle")}</p>
                </div>
                <button
                    onClick={()=>router.push(`/products/related/${slug}`)} 
                    className="bg-black rounded-full py-2 md:py-3 px-4 md:px-8 text-white text-sm sm:text-base md:text-lg cursor-pointer">
                    {t("similarProducts.showMore")}
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 xl:gap-x-6 gap-y-6 xl:gap-y-10 mt-8 mb-25">
            {relatedProducts.products.map((product, index) => (
                <Product
                    key={product._id}
                    product={product}
                    index={index}
                    wishlist={wishlist} />
            ))}
            </div>

        </div>
    )
}

export default RelatedProducts;