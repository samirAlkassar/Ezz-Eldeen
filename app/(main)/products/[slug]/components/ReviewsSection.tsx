// ReviewsSection.tsx (NO "use client")
"use client";

import ReviewsTab from "./ReviewsTab";
import { getProductsReviews } from "@/features/products/server/getProductsBySlug";;

export default async function ReviewsSection({
  productId,
  activeTab,
}: {
  productId: string;
  activeTab: "description" | "features" | "reviews" | "add-review";
}) {
  const reviews = await getProductsReviews(productId);

  return (
    <ReviewsTab
      activeTab={activeTab}
      reviews={reviews}
      productId={productId}
    />
  );
}
