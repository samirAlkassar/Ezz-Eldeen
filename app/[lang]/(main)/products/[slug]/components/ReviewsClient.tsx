"use client"

import Description from "./Description";
import FeaturesTab from "./Features";
import ReviewsTab from "./ReviewsTab";
import dynamic from "next/dynamic";
const MotionSpan = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.span), {ssr: false,}
);
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div), {ssr: false,}
);
import { Suspense, useState } from "react";
import { ProductReview, ProductType } from "@/features/products/types";
import { useTranslations } from "next-intl";

const ReviewsCleint = ({product, reviews}: {product: ProductType, reviews: {
        reviews: ProductReview[],
        averageRating: number,
        totalReviews: number
    }}) => {
    const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews" | "add-review">("reviews");
    const features : string[] = [];
    const t = useTranslations("ProductDetails");

    return (
        <div className="mt-22 md:mt-30">
            <div>
                <div className="flex gap-6 md:gap-12 border-b border-gray-200">
                    {[  
                    { key: "reviews", label: `Reviews (${reviews.totalReviews})` },
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
                        {tab.label === "Features" ? t("tabs.features") : 
                        tab.label === "Description" ? t("tabs.description") : t("tabs.reviews", {count: reviews.totalReviews})
                        }
                        {activeTab === tab.key && (
                        <MotionSpan
                            layoutId="tab-underline"
                            className="absolute left-0 bottom-0 h-0.5 w-full bg-orange-400"
                        />
                        )}
                    </button>
                    ))}
                </div>
            </div>
            <MotionDiv
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
                

            </MotionDiv>
        </div>
    )
};

export default ReviewsCleint;