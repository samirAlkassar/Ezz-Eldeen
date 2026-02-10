"use client";

import { CheckCircle, Star, TriangleAlert } from "lucide-react";
import { addReview } from "@/features/products/productsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useState } from "react";
import { useToast } from "@/components/Toast";
import { getProductsReviews } from "@/features/products/server/getProductsBySlug";

type AddReviewFormProps = {
    productId:  string;
    setReviews: (value: [])=>void;
}

const AddReviewForm = ({productId, setReviews}: AddReviewFormProps) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {toast} = useToast();
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productId) return;
        if (!rating) return toast({ title: "Error", description: "Need to add rawing", variant: "error", position: "bottom-right", icon: <TriangleAlert size={20} /> });
        try {
            await dispatch(
            addReview({
                productId: productId,
                reviewData: {rating, comment},
            })).unwrap();
        const updated = await getProductsReviews(productId);
        setReviews(updated.reviews);
            toast({ title: "Review added", description: "Your review is added successfully", variant: "default", position: "bottom-right", icon: <CheckCircle size={20} /> })
            setComment("");
            setRating(null);
        } catch (error) {
            toast({ title: "Error", description: `${error}`, variant: "error", position: "bottom-right", icon: <TriangleAlert size={20} /> })
        } finally {
            console.log(productId, rating, comment)
        }
    };


    
    return (
        <form onSubmit={onSubmit} className="max-w-3xl space-y-6 mt-10 bg-white rounded-lg p-3 md:p-6 shadow-xs md:shadow-sm border border-gray-200">
            <div>
                <label className="block mb-2 font-medium text-lg sm:text-xl md:text-2xl text-gray-700">Your Rating</label>
                <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`h-6 w-6 md:h-7 md:w-7 cursor-pointer fill-current ${
                        star <= (rating ?? 0)
                        ? "text-yellow-400/80"
                        : "text-gray-300"
                    }`}
                    />
                ))}
                </div>

                </div>

                <div>
                <label className="block mb-2 font-medium text-lg sm:text-xl md:text-2xl text-gray-700">Your Review</label>
                <textarea
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                    placeholder="Write your honest review..."
                />
            </div>

            <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 text-base sm:text-lg md:text-xl rounded-lg md:rounded-full font-medium transition cursor-pointer">
                Submit Review
            </button>
        </form>
    );
}

export default AddReviewForm;