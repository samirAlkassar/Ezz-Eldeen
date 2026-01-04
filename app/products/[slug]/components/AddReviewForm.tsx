import { CheckCircle, Star, TriangleAlert } from "lucide-react";
import { addReview } from "@/features/products/productsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { ProductType } from "@/features/products/types";
import { useState } from "react";
import { useToast } from "@/components/Toast";

type AddReviewFormProps = {
    activeTab: "description" | "features" | "reviews" | "add-review";
    product:  ProductType | null;
}

const AddReviewForm = ({activeTab, product}: AddReviewFormProps) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {toast} = useToast();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        if (!rating) return toast({ title: "Error", description: "Need to add rawing", variant: "error", position: "bottom-right", icon: <TriangleAlert size={20} /> });
        try {
            await dispatch(
            addReview({
                productId: product._id,
                reviewData: {rating, comment},
            })).unwrap();

            toast({ title: "Review added", description: "Your review is added successfully", variant: "default", position: "bottom-right", icon: <CheckCircle size={20} /> })
            setComment("");
            setRating(null);
        } catch {
            toast({ title: "Error", description: "Error adding your review", variant: "error", position: "bottom-right", icon: <TriangleAlert size={20} /> })
        }
    };


    
    return (
        <>
        {activeTab === "add-review" && (
        <form onSubmit={onSubmit} className="max-w-3xl space-y-6 bg-white p-6 rounded-xl md:rounded-2xl shadow-xs md:shadow-sm border border-gray-200">
            <div>
            <label className="block mb-2 font-medium text-xl md:text-2xl text-gray-700">Your Rating</label>
            <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                key={star}
                onClick={() => setRating(star)}
                className={`h-7 w-7 cursor-pointer ${
                    star <= (rating ?? 0)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                />
            ))}
            </div>

            </div>

            <div>
            <label className="block mb-2 font-medium text-xl md:text-2xl text-gray-700">Your Review</label>
            <textarea
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                rows={4}
                className="w-full rounded-lg text-lg md:text-xl text-gray-700 border border-gray-300 p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Write your honest review..."
            />
            </div>

            <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 text-lg md:text-xl rounded-full font-medium transition cursor-pointer"
            >
            Submit Review
            </button>
        </form>
        )}
        </>
    );
}

export default AddReviewForm;