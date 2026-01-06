import { motion } from "framer-motion";
import {HeartCrack, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { ProductType } from "@/features/products/types";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useState } from "react";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

export const Product = ({ product, index, wishlist, size = "medium" }: { product: ProductType, index: number, wishlist: ProductType[], size?: "small" | "medium" }) => {
    const productIsInWishlist = wishlist.some(item => item._id === product._id);
    const [optimisticUpdate, setOptimisticUpdate] = useState<boolean | null>(null);
    const isInWishList = optimisticUpdate !== null ? optimisticUpdate : Boolean(productIsInWishlist);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();

    const handleAddToCart = (productId: string) => {
        dispatch(addToCart({ productId, quantity: 1 }));
        toast({ title: "Added to cart", description: "Item is added to your cart successfully",variant: "default", position: "bottom-right", icon: <ShoppingCart size={20}/> })
    };

    const toggleWishlist = () => {
        const nextLiked = !isInWishList;
        setOptimisticUpdate(nextLiked);
        if (isInWishList) {
            dispatch(removeFromWishlist(product?._id));
            dispatch(fetchWishlist());
            toast({ title: "Item removed from wishlist", description: "Item  is removed from your wishlist",variant: "default", position: "bottom-right", icon: <HeartCrack size={20}/> })
        } else {
            dispatch(addToWishlist(product?._id));
            dispatch(fetchWishlist());
        }
    };

    return (
        <motion.div
            key={product?._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: (index % 4) * 0.1, // reset every 8 items
                ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, amount: 0.2 }}
            className={twMerge("bg-white shadow-sm md:shadow-lg transition-shadow duration-300 flex flex-col relative justify-between",
                size === "small" ? "rounded-xl px-3 py-4" : "rounded-xl md:rounded-2xl px-3 py-3 md:px-4 md:py-5"
            )}
        >
            <div>
                {/* Product Image */}
                <div
                    onClick={()=>router.push(`/products/${product?.slug}`)} 
                    className={twMerge("bg-white flex items-center justify-center relative",
                    size === "small" ? "rounded-lg h-46 mb-1" : "rounded-lg md:rounded-xl h-38 md:h-52 lg:h-60 mb-2 md:mb-4"
                )}>
                    <Image
                        src={product?.images?.[0]?.url ?? "/images/placeholder.jpg"}
                        alt={product?.name ?? "Product Image"}
                        width={200}
                        height={200}
                        className="object-contain h-full hover:scale-[103%] transition-transform duration-300 cursor-pointer"
                    />

                    <button onClick={(e) => {e.stopPropagation(); setOptimisticUpdate((prev) => !prev); toggleWishlist(); }} className={twMerge("absolute heart z-10",
                        size === "small" ? "scale-[85%] -top-4 -right-4" : "scale-80 md:scale-90 -top-10 -right-10 md:-top-8 md:-right-8"
                    )}
                        style={{ transitionDuration: `${isInWishList ? "1s" : ""}`, backgroundPosition: `${isInWishList ? "-2800px 0" : ""}` }} />
                    <div className="absolute -top-1 -left-1 md:top-1 md:left-1 bg-orange-400 backdrop-blur-sm rounded-full py-1 px-2 md:py-1.5 md:px-3 flex items-center justify-center gap-1.5 shadow-md">
                        <Star size={14} className="text-white fill-current"/>
                        <p className="text-xs font-semibold text-white">{product?.averageRating}</p>
                    </div>
                </div>

                {/* Product Info */}
                <h3 className="text-base sm:text-lg md:text-xl font-medium line-clamp-2 md:line-clamp-1 text-gray-800">{product.name}</h3>
                {/* <p className={twMerge("text-gray-500 mb-2", size === "small" ? "text-xs line-clamp-1" : "text-sm line-clamp-2")}>{product.description}</p> */}

                
                {/* Categories */}
                <div className="hidden md:flex items-center justify-start gap-1.5 mb-3 flex-wrap mt-2">
                    {product?.category && 
                        <span 
                            onClick={()=>router.push(`/categories/${product?.category.replace(/\s+/g, '_')}`)}
                            className="text-[10px] md:text-xs font-medium py-0.5 md:py-1 px-2 md:px-2.5 rounded-lg md:rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 cursor-pointer">
                            {product?.category}
                        </span>}
                        
                    {product?.subcategory &&
                        <span 
                            className="text-[10px] hidden md:block md:text-xs font-medium py-0.5 md:py-1 px-2 md:px-2.5 rounded-lg md:rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-100 cursor-pointer">
                            {product?.subcategory}
                        </span>}
                </div>
            </div>


            <div className="flex justify-between items-center gap-1 md:gap-3 pt-3 md:border-t border-gray-100">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium -mb-1 md:mb-0.5">Price</span>
                    <p className="text-gray-900 text-lg md:leading-6 sm:text-xl md:text-2xl font-semibold md:font-bold truncate max-w-12">${product?.price}</p>
                </div>
                <button 
                    onClick={() => handleAddToCart(product?._id)} 
                    className="py-2.5 px-2.5 sm:py-3 sm:px-2 md:py-2 md:px-4 rounded-lg sm:rounded-xl md:rounded-full text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 active:scale-95 transition-all duration-75  ease-in text-white font-medium cursor-pointer flex items-center justify-center gap-1">
                    <ShoppingCart size={20} className="hidden sm:block"/>
                    <p>Add to cart</p>
                </button>
            </div>
        </motion.div>
    )
}
