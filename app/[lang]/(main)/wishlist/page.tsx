"use client";

import { motion } from "motion/react";
import { Product } from "@/components/Product";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingProductSkeleton from "@/components/LoadingProductSkeleton";

const Wishlist = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state:RootState)=> state.wishlist.items);
    const loadingWishlist = useSelector((state:RootState)=> state.wishlist.loading);
    console.log("wishlist:", wishlist)

    useEffect(()=>{
        dispatch(fetchWishlist());
    },[dispatch]);


    return (
        <main className="bg-orange-50/50">
            <div className="mx-auto max-w-7xl gap-8 py-4 px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-2xl md:text-4xl font-extrabold text-[#FF791A] text-center md:py-2 md:pb-4">
                    My Wishlist
                </motion.h1>
                <Breadcrumbs currentPage="wishlist"/>
                <div className="flex gap-4 mt-4">
                    <div className="w-full">
                        {loadingWishlist && <p className="text-center text-gray-500">Loading products...</p>}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 xl:gap-x-4 xl:gap-y-6 mb-10 md:mt-4">
                                {loadingWishlist ?
                                    Array.from({ length: wishlist?.length || 8  }).map((_, index) => (
                                        <LoadingProductSkeleton key={index}/> )):

                                    wishlist?.length !==0 &&
                                    wishlist?.map((product, index) => (
                                        <Product 
                                            key={product?._id ?? product} 
                                            product={product} 
                                            index={index} 
                                            wishlist={wishlist}
                                            size="medium"/>
                                    ))}
                                    
                            {!loadingWishlist && wishlist?.length === 0 && <div className="text-center text-lg text-gray-600">Wishlist is empty</div>}

                            </div>
                    </div>
                </div>

            </div>

        </main>
    )
}

export default Wishlist;
