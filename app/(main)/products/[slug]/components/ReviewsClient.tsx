"use client"

import Description from "./Description";
import FeaturesTab from "./Features";
import ReviewsTab from "./ReviewsTab";
import {motion} from "motion/react"
import { Suspense, useState } from "react";
import { ProductReview, ProductType } from "@/features/products/types";

const ReviewsCleint = ({product, reviews}: {product: ProductType, reviews: {
        reviews: ProductReview[],
        averageRating: number,
        totalReviews: number
    }}) => {
    const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews" | "add-review">("reviews");

    const features : string[] = [];

    return (
        <div className="mt-22 md:mt-30">
            <div>
                <div className="flex gap-6 md:gap-12 border-b border-gray-200">
                    {[
                    { key: "reviews", label: `Reviews (${product?.reviews.length})` },
                    { key: "description", label: "Description" },
                    { key: "features", label: "Features" },
                    ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as "description" | "features" | "reviews" | "add-review")}
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
                className="mt-8 md:mt-12">

                <Description product={product} activeTab={activeTab}/>
                <FeaturesTab activeTab={activeTab} features={features}/>
                <Suspense fallback={"..loading reviews"}>
                    <ReviewsTab activeTab={activeTab} reviews={reviews} productId={product._id}/>
                </Suspense>
                

            </motion.div>
        </div>
    )
};

export default ReviewsCleint;