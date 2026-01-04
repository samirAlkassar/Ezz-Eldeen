"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductBySlug, fetchRelatedProducts } from "@/features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import {motion} from "motion/react"
import { Product } from "@/components/Product";
import ProductSection from "./components/ProductSection";
import Description from "./components/Description";
import FeaturesTab from "./components/Features";
import ReviewsTab from "./components/ReviewsTab";
import AddReviewForm from "./components/AddReviewForm";

const productBySlug = () => {
    const params = useParams<{ slug: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews" | "add-review">("reviews");

    const { product, relatedProducts, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    useEffect(() => {
        if (!params.slug) return;
        dispatch(fetchProductBySlug(params.slug));
        dispatch(fetchRelatedProducts(params.slug));
    }, [params.slug, dispatch]);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    const features : any[] = [];

    return (
        <main className="bg-ornge-50/50 px-2 lg:px-3 xl:px-0">
            <Breadcrumbs previousPage={product?.category} currentPage={params.slug}/>
            <div className="max-w-[85rem] mx-auto px-4 py-6">
                <ProductSection product={product}/>
                
                <div className="mt-30">
                    <div>
                        <div className="flex gap-6 md:gap-12 border-b border-gray-200">
                            {[
                            { key: "reviews", label: `Reviews (${product?.reviews.length})` },
                            { key: "description", label: "Description" },
                            { key: "features", label: "Features" },
                            { key: "add-review", label: "Leave a Review" },
                            ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`relative text-base md:text-2xl cursor-pointer pt-4 pb-3 font-medium transition-colors w-full xl:w-auto ${
                                activeTab === tab.key
                                    ? "text-orange-500"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.key && (
                                <motion.span
                                    layoutId="tab-underline"
                                    className="absolute left-0 bottom-0 h-[2px] w-full bg-orange-400"
                                />
                                )}
                            </button>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-12">

                        <Description product={product} activeTab={activeTab}/>
                        <FeaturesTab activeTab={activeTab} features={features}/>
                        <ReviewsTab activeTab={activeTab} reviews={product?.reviews}/>
                        <AddReviewForm product={product} activeTab={activeTab}/>

                    </motion.div>
                </div>

                <div className="mt-30 md:mt-20 lg:mt-30">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-semibold">Similar Products</h1>
                            <p className="text-gray-600 text-lg md:text-2xl mt-1 md:mt-3 max-w-[220px] md:max-w-full">List of products similar to this product</p>
                        </div>
                        <button className="bg-black rounded-full py-2 md:py-3 px-6 md:px-8 text-white text-lg cursor-pointer">Show More</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 xl:gap-x-6 gap-y-6 xl:gap-y-10 mt-8 mb-25">
                    {relatedProducts.map((product, index) => (
                        <Product
                        key={product._id}
                        product={product}
                        index={index}
                        wishlist={wishlist} />
                    ))}
                    </div>

                </div>
            </div>
        </main>
    )
};

export default productBySlug;