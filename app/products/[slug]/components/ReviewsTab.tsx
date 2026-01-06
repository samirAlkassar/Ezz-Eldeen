import { Star } from "lucide-react";
import { ProductReview, ProductType } from "@/features/products/types";
import formatTimeAgo from "@/hooks/formateDate";
import { useEffect, useState } from "react";
import Image from "next/image";
import { userAPI } from "@/features/user/userAPI";
import AddReviewForm from "./AddReviewForm";

type ReviewsProps = {
    activeTab: "description" | "features" | "reviews" | "add-review";
    product:  ProductType | null;
}

const ReviewsTab = ({ product, activeTab }: ReviewsProps) => {
    return (
        <>
            {activeTab === "reviews" && 
            <div>
                {
                product?.reviews &&
                    product?.reviews?.length > 0 ?
                    <div className="space-y-4 md:space-y-6 max-w-4xl">
                        {product?.reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white rounded-lg p-3 md:p-6 shadow-xs md:shadow-sm border border-gray-200">
                                <ReviewHeaderSection review={review} id={review.user} />
                                <p className="text-gray-700 text-base sm:text-lg md:text-xl">{review.comment}</p>
                            </div>
                        ))}
                    </div> :
                    <p className="text-center text-lg md:text-2xl text-gray-600">No Reviews Avaliable Yet</p>
                }
                <AddReviewForm product={product}/>
            </div>
            }
        </>
    );
}

type SimpleUser = {
  firstName: string;
  lastName: string;
  picturePath?: string;
};

const ReviewHeaderSection = ({ review, id }: { review: ProductReview, id: string }) => {
    const [user, setUser] = useState<SimpleUser | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let mounted = true;

        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await userAPI.getUserById(id);
                if (mounted) setUser(res?.user as SimpleUser);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            mounted = false;
        };
    }, [id]);
    if (loading) {return <p>loading...</p>}
    return (
        <div className="flex items-start justify-between mb-1">
            <div className="font-semibold text-gray-700 text-lg md:text-xl flex items-start justify-center gap-2">
                <Image
                    src={user?.picturePath || "/images/placeholder.jpg"}
                    alt={`${user?.firstName}`}
                    width={300}
                    height={300}
                    className="rouned-full h-8 w-8 md:h-10 md:w-10 rounded-full object-cover" />
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
            <span className="text-sm md:text-base text-gray-400">
                {formatTimeAgo(review.createdAt)}
            </span>
        </div>
    )
}

export default ReviewsTab;