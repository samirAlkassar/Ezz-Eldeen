import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Pagination = ({ currentPage, totalPages, onPageChange, isProductsPage }:
    { currentPage: number; totalPages: number; onPageChange: (page: number) => void; isProductsPage?:boolean}) => {


    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-10 mb-4">
            {/* Previous Button */}
            {isProductsPage ?
            <NumberedPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}/>:
            <DotedPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}/>}
        </motion.div>
    );
};

export default Pagination


const NumberedPagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; isProductsPage?:boolean}) => {
    const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }
    return pages;};
    return (
        <>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center gap-2 w-10 h-10 rounded-md font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-300 via-ornage-300 to-orange-300 text-white shadow-lg hover:shadow-xl cursor-pointer"
            }`}>
            <ChevronLeft size={20} />
        </motion.button>

        <div className="flex items-center gap-2">
            {getPageNumbers().map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400 font-bold">
                            ...
                        </span>
                    );
                }

                return (
                    <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onPageChange(page as number)}
                        className={`w-10 h-10 rounded-md font-bold transition-all duration-300 ${
                            currentPage === page
                                ? "bg-gradient-to-br from-orange-400 via-ornage-500 to-orange-500 text-white shadow-lg scale-110"
                                : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-purple-100 hover:to-orange-100 border-2 border-gray-200 cursor-pointer"
                        }`}>
                        {page}
                    </motion.button>
                );
            })}
        </div>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center gap-2 w-10 h-10 rounded-md font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-300 via-ornage-300 to-orange-300 text-white shadow-lg hover:shadow-xl"
            }`}>
            <ChevronRight size={20} />
        </motion.button>
        </>
    )
}


const DotedPagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; isProductsPage?:boolean}) => {
    return (
        <>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage > 1 ? onPageChange(1) : onPageChange(2)}
            className={twMerge("flex items-center justify-center gap-2 w-10 h-10 rounded-md shadow-md" ,
            "font-semibold transition-all duration-300 bg-gradient-to-r from-orange-300 via-ornage-300 to-orange-300 text-white cursor-pointer mr-4")}>
            <ChevronLeft size={24} />
        </motion.button>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage > 1 && onPageChange(1)}
            className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === 1 ?
                    "bg-gradient-to-r from-orange-400 via-ornage-500 to-orange-500 text-white shadow-lg hover:shadow-xl cursor-pointer h-3 w-3" :
                    "bg-gray-200 text-gray-400 h-3 w-8"
                    
            }`}>
        </motion.button>
        

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage < totalPages && onPageChange(2)}
            className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === 2 ?
                    "bg-gradient-to-r from-orange-400 via-ornage-500 to-orange-500 text-white shadow-lg hover:shadow-xl h-3 w-3" :
                    "bg-gray-200 text-gray-400 h-3 w-8"
            }`}>
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage > 1 ? onPageChange(1) : onPageChange(2)}
            className={twMerge("flex items-center justify-center gap-2 w-10 h-10 rounded-md shadow-md" ,
            "font-semibold transition-all duration-300 bg-gradient-to-r from-orange-300 via-ornage-300 to-orange-300 text-white cursor-pointer ml-4")}>
            <ChevronRight size={24} />
        </motion.button>
        </>
    )
}

