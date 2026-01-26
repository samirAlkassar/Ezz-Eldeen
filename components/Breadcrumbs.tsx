"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Breadcrumbs = ({previousPage, currentPage}:{previousPage?: string, currentPage?: string}) => {
    const router = useRouter();
    const currentPageURL = (currentPage : string) => {
        if (currentPage === "wishlist") {
            router.push(`/${currentPage}`)
        } else if (currentPage === "cart") {
            router.push(`/${currentPage}`)
        } else {
            router.push(`/products/${currentPage}`)
        }
    }
    return (
        <div className="py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600 max-w-[85rem] mx-auto px-3">
                <Link href="/" className="hover:text-orange-400 text-orange-500 transition flex gap-2 items-center">
                    <Home size={16}/>
                    <p className="text-base">Home</p>
                </Link>
                { previousPage &&
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