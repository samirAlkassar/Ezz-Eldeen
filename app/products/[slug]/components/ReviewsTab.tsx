import { Star } from "lucide-react";
import { ProductReview } from "@/features/products/types";
import formatTimeAgo from "@/hooks/formateDate";
import { useEffect, useState } from "react";
import Image from "next/image";
import { userAPI } from "@/features/user/userAPI";

type ReviewsProps = {
    activeTab: "description" | "features" | "reviews" | "add-review";
    reviews: ProductReview[] | undefined;
}

const ReviewsTab = ({ reviews, activeTab }: ReviewsProps) => {
    return (
        <>
            {activeTab === "reviews" && (
                reviews &&
                    reviews?.length > 0 ?
                    <div className="space-y-3 md:space-y-6 max-w-4xl">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
                                <ReviewHeaderSection review={review} id={review.user} />
                                <p className="text-gray-700 text-lg md:text-xl">{review.comment}</p>
                            </div>
                        ))}
                    </div> :
                    <p className="text-center text-2xl text-gray-600">No Reviews Avaliable Yet</p>
            )}
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
        <div className="flex items-center justify-between mb-1">
            <div className="font-semibold text-gray-700 text-lg md:text-xl flex items-start justify-center gap-2">
                <Image
                    src={user?.picturePath || "/images/placeholder.jpg"}
                    alt={`${user?.firstName}`}
                    width={300}
                    height={300}
                    className="rouned-full h-10 w-10 rounded-full object-cover" />
                <div className="flex flex-col items-start justify-center">
                    <p>{user?.firstName} {user?.lastName}</p>
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className={`fill-current ${i < review.rating
                                        ? "text-yellow-500"
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