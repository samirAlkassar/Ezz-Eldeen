"use client";

import { motion } from "motion/react";
import { Product } from "@/components/Product";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingProductSkeleton from "@/components/LoadingProductSkeleton";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const WishlistClient = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state:RootState)=> state.wishlist.items);
    const loadingWishlist = useSelector((state:RootState)=> state.wishlist.loading);
    const t = useTranslations("Wishlist");
    const router = useRouter();
    const lang = useLocale();

    useEffect(()=>{
        dispatch(fetchWishlist(lang as typeLang));
    },[dispatch, lang]);

    return (
        <div className="mx-auto max-w-7xl gap-8 py-4 px-4">
            <motion.h1
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl md:text-4xl font-extrabold text-[#FF791A] text-center md:py-2 md:pb-4">
                {t("title")}
            </motion.h1>
            <Breadcrumbs currentPage={t("title")}/>
            <div className="flex gap-4 mt-4">
                <div className="w-full">
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
                                        ))
                                    }
                        </div>
                        {!loadingWishlist && wishlist?.length === 0 && 
                            <div className="w-full flex items-center flex-col h-[calc(100vh-570px)]">
                                <h4 className="text-center text-xl text-text">
                                    {t("empty.title")}
                                </h4>
                                <p className="text-center text-lg text-text-muted mt-1">
                                    {t("empty.description")}
                                </p>
                                <button 
                                    onClick={()=>router.push(`/products`)}
                                    className="bg-black text-white px-5 py-3 rounded-full mt-6 cursor-pointer text-base active:scale-95 duration-75 transition-all">
                                    {t("empty.cta")}
                                </button>
                            </div>
                        }
                </div>
            </div>

        </div>
    )
};

export default WishlistClient;