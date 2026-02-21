"use client";

import { Product } from "./Product";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
const MotionButton = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.button), {ssr: false,}
);
import { twMerge } from "tailwind-merge";
import { ProductType } from "@/features/products/types";
import { useLocale } from "next-intl";

const HeroProducsts = ({serverProducts}:{serverProducts: ProductType[]}) => {
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const [productsSlice, setProductsSlice] = useState<{start: number, end: number}>({start: 0, end: 4});
    const lang = useLocale();
    return (
        <div className="mt-0 md:mt-12 w-full overflow-hidden max-w-360 mx-auto">
            <div className="grid md:mx-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 md:gap-x-6 xl:gap-x-8 gap-y-8 xl:gap-y-14">
            {
                serverProducts?.slice(productsSlice.start, productsSlice.end).map((product, index) => (
                <Product
                    key={product._id}
                    product={product}
                    index={index}
                    wishlist={wishlist}
                    showRatings={true}/>
                ))
            }
            </div>
                <div className="flex items-center justify-center gap-2 mt-10 mb-4">
            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>setProductsSlice(productsSlice.start === 0? {start: 4, end: 8} : {start:0, end: 4})}
                className={twMerge("flex items-center justify-center gap-2 w-10 h-10 rounded-md shadow-md" ,
                "font-semibold transition-all duration-300 bg-linear-to-r from-orange-300 via-ornage-300 to-orange-300 text-white cursor-pointer mr-4")}>
                <ChevronLeft size={24} className={lang === "ar" ? "rotate-180" : "rotate-0"}/>
            </MotionButton>

            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>setProductsSlice({start: 0, end: 4})}
                className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 ${
                    productsSlice.start === 0 ?
                        "bg-linear-to-r from-orange-400 via-ornage-500 to-orange-500 text-white shadow-lg hover:shadow-xl cursor-pointer h-3 w-3" :
                        "bg-gray-200 text-gray-400 h-3 w-8"
                        
                }`}>
            </MotionButton>
            
            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>setProductsSlice({start:4, end: 8})}
                className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                    productsSlice.start === 4 ?
                        "bg-linear-to-r from-orange-400 via-ornage-500 to-orange-500 text-white shadow-lg hover:shadow-xl h-3 w-3" :
                        "bg-gray-200 text-gray-400 h-3 w-8"
                }`}>
            </MotionButton>

            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>setProductsSlice(productsSlice.start === 4? {start: 0, end: 4} : {start:4, end: 8})}
                className={twMerge("flex items-center justify-center gap-2 w-10 h-10 rounded-md shadow-md" ,
                "font-semibold transition-all duration-300 bg-linear-to-r from-orange-300 via-ornage-300 to-orange-300 text-white cursor-pointer ml-4")}>
                <ChevronRight size={24} className={lang === "ar" ? "rotate-180" : "rotate-0"}/>
            </MotionButton>
        </div>
    </div>
    )
};

export default HeroProducsts;