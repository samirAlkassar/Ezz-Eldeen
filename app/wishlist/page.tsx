"use client";

import { motion } from "motion/react";
import { Product } from "@/components/Product";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";

const Wishlist = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state:RootState)=> state.wishlist.items);
    const loadingWishlist = useSelector((state:RootState)=> state.wishlist.loading);

    useEffect(()=>{
        dispatch(fetchWishlist());
    },[dispatch]);


    return (
        <main className="bg-orange-50/50">
            <div className="mx-auto max-w-7xl gap-8 py-4">
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-4xl font-extrabold text-[#FF791A]">
                    My Wishlist
                </motion.h1>
                <div className="flex gap-4 mt-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                        className="w-96 bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Wishlist Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Total Items:</span>
                                <span className="font-semibold">{wishlist?.length || 0}</span>
                            </div>
                            <hr className="my-3" />
                            <p className="text-sm text-gray-500">Your saved items appear here</p>
                        </div>
                    </motion.div>

                    <div className="w-full">
                        {loadingWishlist && <p className="text-center text-gray-500">Loading products...</p>}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 xl:gap-x-3 xl:gap-y-6 mb-10">
                                {loadingWishlist ?
                                    Array.from({ length: wishlist?.length || 3  }).map((_, index) => (
                                        <span key={index} className="animate-spin rounded-full border-t-2 border-orange-800 h-10 w-10"/> )):

                                    wishlist?.length !==0 &&
                                    wishlist?.map((product, index) => (
                                        <Product 
                                            key={product?._id ?? product} 
                                            product={product} 
                                            index={index} 
                                            wishlist={wishlist}
                                            size="small"/>
                                    ))}
                                    
                            {wishlist?.length === 0 && <div className="text-center text-lg text-gray-600">Wishlist is empty</div>}

                            </div>
                    </div>
                </div>

            </div>

        </main>
    )
}

export default Wishlist;
