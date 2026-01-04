import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

const Breadcrumbs = ({previousPage, currentPage}:{previousPage?: string, currentPage?: string}) => {
    const router = useRouter();
    return (
        <div className="py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600 max-w-[85rem] mx-auto px-3">
            <a href="/" className="hover:text-orange-500 transition flex gap-2 items-center">
                <Home size={16}/>
                <p className="text-base">Home</p>
            </a>
            { previousPage &&
            <>
                <span>/</span>
                <span
                    onClick={() => router.push(`/categories/${previousPage?.replace(/\s+/g, '_')}`)} 
                    className="font-medium text-base text-gray-600 cursor-pointer hover:text-gray-800">{previousPage}</span>
            </>
            }
            { currentPage &&
            <>
                <span>/</span>
                <span
                    onClick={() => router.push(`/products/${currentPage}`)}  
                    className="font-medium text-base text-gray-600 cursor-pointer hover:text-gray-800">{currentPage}</span>
            </>
            }

            </nav>
        </div>
    )
}

export default Breadcrumbs;