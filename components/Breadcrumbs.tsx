"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Breadcrumbs = ({previousPage, currentPage}:{previousPage?: string, currentPage?: string}) => {
    const router = useRouter();
    const t = useTranslations("Wishlist");
    const tHome = useTranslations("Home")

    const currentPageURL = (currentPage : string) => {
        if (currentPage === t("title")) {
            router.push('/wishlist')
        } else if (currentPage === t("title")) {
            router.push('/cart')
        } else if (currentPage === ("profile")) {
            router.push('/')
        }
            else {
            router.push(`/products/${currentPage}`)
        }
    };
    
    return (
        <div className="pt-2 md:pt-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600 max-w-340 mx-auto px-3">
                <Link href="/" className="hover:text-orange-400 text-orange-500 transition flex gap-2 items-center">
                    <Home size={16}/>
                    <p className="text-base">{tHome("home")}</p>
                </Link>
                { previousPage &&
                previousPage === "related" ? 
                <>
                    <span>/</span>
                    <span
                        onClick={() => router.push(`/products`)} 
                        className="font-medium text-sm md:text-base text-gray-600 line-clamp-1 cursor-pointer hover:text-gray-800">{"products"}</span>

                    <span>/</span>
                    <span
                        onClick={() => router.push(`/products/related/${currentPage}`)} 
                        className="font-medium text-sm md:text-base text-gray-600 line-clamp-1 cursor-pointer hover:text-gray-800">{previousPage}</span>
                </>
                :
                <>
                    <span>/</span>
                    <span
                        onClick={() => router.push(`/categories/${previousPage?.replace(/\s+/g, '_')}`)} 
                        className="font-medium text-sm md:text-base text-gray-600 line-clamp-1 cursor-pointer hover:text-gray-800">{previousPage}</span>
                </>
                }
                { currentPage &&
                <>
                    <span>/</span>
                    <span
                        onClick={() => currentPageURL(currentPage)}  
                        className="font-medium text-sm md:text-base text-gray-600 cursor-pointer hover:text-gray-800 line-clamp-1">{currentPage}</span>
                </>
                }

            </nav>
        </div>
    )
}

export default Breadcrumbs;