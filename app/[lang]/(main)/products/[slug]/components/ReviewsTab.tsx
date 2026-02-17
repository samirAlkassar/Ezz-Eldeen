import { Star } from "lucide-react";
import { ProductReview } from "@/features/products/types";
import formatTimeAgo from "@/hooks/formateDate";
import Image from "next/image";
import AddReviewForm from "./AddReviewForm";
import { useState } from "react";

type ReviewsProps = {
    activeTab: "description" | "features" | "reviews" | "add-review";
    reviews: {
        reviews: ProductReview[],
        averageRating: number,
        totalReviews: number
    },
    productId: string
}

const ReviewsTab = ({ reviews, activeTab, productId}: ReviewsProps) => {
    const [reviewsList, setReviewsList] = useState<ProductReview[]>(reviews.reviews || []);
    return (
        <>
            {activeTab === "reviews" && 
            <div>
                {
                reviews &&
                    reviews.totalReviews > 0 ?
                    <div className="space-y-4 md:space-y-6 max-w-4xl">
                        {reviewsList.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white rounded-2xl p-3 md:p-6 shadow-xs md:shadow-sm border border-gray-100">
                                <ReviewHeaderSection review={review} user={review.user}/>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">{review.comment}</p>
                            </div>
                        ))}
                    </div> :
                    <p className="text-center text-lg md:text-2xl text-gray-600">No Reviews Avaliable Yet</p>
                }
                <AddReviewForm setReviews={setReviewsList} productId={productId}/>
            </div>
            }
        </>
    );
}

type ReviewSectionProps = {
    review: ProductReview,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        picturePath: string
    }
}

const ReviewHeaderSection = ({ review, user }: ReviewSectionProps) => {
    
    return (
        <div className="flex items-start justify-between mb-1">
            <div className="font-semibold text-gray-700 text-lg md:text-xl flex items-start justify-center gap-2">
                <Image
                    src={user?.picturePath || "/images/placeholder.jpg"}
                    alt={`${user?.firstName}`}
                    width={300}
                    height={300}
                    className="rouned-full h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"/>
                <div className="flex flex-col items-start justify-center">
                    <p className="font-medium text-base md:text-lg leading-tight mb-0.5">{user?.firstName} {user?.lastName}</p>
                    <div className="flex items-center gap-0.5 md:gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`fill-current h-4 w-4 md:h-5 md:w-5 ${i < review.rating
                                        ? "text-yellow-400/80"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <span className="text-sm text-gray-400">
                {formatTimeAgo(review.createdAt)}
            </span>
        </div>
    )
}

export default ReviewsTab;