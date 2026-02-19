"use client";

import { CheckCircle, Star, TriangleAlert } from "lucide-react";
import { addReview } from "@/features/products/productsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useState } from "react";
import { useToast } from "@/components/Toast";
import { getProductsReviews } from "@/features/products/server/getProductsBySlug";
import { useLocale, useTranslations } from "next-intl";

type AddReviewFormProps = {
    productId:  string;
    setReviews: (value: [])=>void;
}

const AddReviewForm = ({productId, setReviews}: AddReviewFormProps) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {toast} = useToast();
    const lang = useLocale();
    const t = useTranslations("ProductDetails");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productId) return;

        if (comment && !rating) {
            return toast({ 
                title: "Missing Ratting!", 
                description: "you need to add rating before you submit your review", 
                variant: "error", 
                position: "bottom-right", 
                icon: <TriangleAlert size={20} /> 
            });

        } else if (!comment && rating) {
            return toast({ 
                title: "Missing Comment!", 
                description: "you need to add comment before you submit your review", 
                variant: "error", 
                position: "bottom-right", 
                icon: <TriangleAlert size={20} /> 
            });  

        } else if (!comment && !rating) {
            if (!rating) return toast({ 
                title: "Error!", 
                description: "rating and comment are missing", 
                variant: "error", 
                position: "bottom-right", 
                icon: <TriangleAlert size={20} /> 
            });
        }

        try {
            await dispatch(
            addReview({
                productId: productId,
                reviewData: {rating, comment},
                lang: lang as typeLang
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
        <form onSubmit={onSubmit} className="max-w-3xl space-y-6 mt-10 bg-white rounded-2xl p-3 md:p-6 shadow-xs md:shadow-xs border border-gray-200">
            <div>
                <label className="block mb-2 font-medium text-base sm:text-lg md:text-xl text-gray-700">{t("rating.yourRating")}</label>
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
                <label className="block mb-2 font-medium text-base sm:text-lg md:text-xl text-gray-700">{t("rating.yourReview")}</label>
                <textarea
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                    placeholder={t("rating.reviewPlaceholder")}
                />
            </div>

            <button
            type="submit"
            className="bg-primary hover:bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 text-base sm:text-lg md:text-lg rounded-base md:rounded-full font-medium transition cursor-pointer">
                {t("rating.submit")}
            </button>
        </form>
    );
}

export default AddReviewForm;