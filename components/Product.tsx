import dynamic from "next/dynamic";
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div), {ssr: false,}
);
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
import { useSelector } from "react-redux";
import {selectUser } from "../features/auth/authSlice";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export const Product = ({ product, index, wishlist, size = "medium", isDragging, showRatings = false, showDescription = false }: 
    { product: ProductType, index: number, wishlist: ProductType[], size?: "small" | "medium", isDragging?: boolean, showRatings?: boolean, showDescription?: boolean }) => {
    const productIsInWishlist = wishlist.some(item => item._id === product._id);
    const [optimisticUpdate, setOptimisticUpdate] = useState<boolean | null>(null);
    const isInWishList = optimisticUpdate !== null ? optimisticUpdate : Boolean(productIsInWishlist);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();
    const user = useSelector(selectUser);
    const params = useParams<{lang: typeLang }>()
    const tCommon = useTranslations("Common");
    const lang = useLocale();
    const handleAddToCart = (productId: string) => {
        if (!user) {
            router.push(`/${params.lang}/register`);
            return
        };
        dispatch(addToCart({ productId, quantity: 1 }));
        toast({ 
            title: "Added to cart", 
            description: `${product.name}`,
            variant: "default",
            position: "bottom-right", 
            icon: <ShoppingCart size={20}/>,
            image: `${product.images[0].url}`,
            actionButton: {
                text: "view cart",
                onClick: ()=>{router.push("/cart")}
            }
        })
    };

    const toggleWishlist = () => {
        if (!user) {
            router.push("/register");
            return
        };

        const nextLiked = !isInWishList;
        setOptimisticUpdate(nextLiked);
        if (isInWishList) {
            dispatch(removeFromWishlist(product?._id));
            dispatch(fetchWishlist(lang as typeLang));
            toast({ title: "Item removed from wishlist", description: "Item  is removed from your wishlist",variant: "default", position: "bottom-right", icon: <HeartCrack size={20}/> })
        } else {
            dispatch(addToWishlist(product?._id));
            dispatch(fetchWishlist(lang as typeLang));
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
            }
        router.push(`/${params.lang}/products/${product?.slug}`)
    };

    return (
        <MotionDiv
            key={product?._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.2,
                delay: (index % 4) * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true, amount: 0.2 }}
            className={twMerge("bg-white shadow-sm md:shadow-lg transition-shadow duration-300 flex flex-col relative justify-between flex-1 h-full",
                "rounded-xl md:rounded-2xl px-3 py-3 md:px-4 md:py-5"
            )}>
            <div>
                <div
                    onClick={handleClick} 
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
                    {showRatings && <div className="absolute -top-1 -left-1 md:top-1 md:left-1 bg-orange-400 backdrop-blur-sm rounded-full py-1 px-2 md:py-1.5 md:px-3 flex items-center justify-center gap-1.5 shadow-md">
                        <Star size={14} className="text-white fill-current"/>
                        <p className="text-xs font-semibold text-white">{product?.averageRating}</p>
                    </div>}
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-medium line-clamp-1 text-gray-800">{product.name}</h3>
                {showDescription && <p className="text-gray-500 mb-2 text-sm line-clamp-1 md:line-clamp-2">{product.description}</p>}

                
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


            <div className={twMerge("flex flex-col justify-between items-start lg:items-end xl:items-center gap-1 lg:gap-1 pt-1 md:pt-3 lg:border-t border-gray-100",
                params.lang === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
            )}>
                <div className="flex flex-col text-left">
                    <span className="text-xs text-gray-500 font-medium -mb-1 md:mb-0.5 hidden md:block">
                        {tCommon("price")}
                    </span>
                    <div className={twMerge("flex gap-2 items-center md:items-end", 
                        params.lang === "ar" ? "flex-row-reverse" : "flex-row"
                    )}>
                        <p className="text-gray-900 md:leading-6 text-xl md:text-2xl font-semibold md:font-bold truncate max-w-12 md:max-w-fit">${product?.discountPrice ? product?.discountPrice : product?.price}</p>
                        {product?.discountPrice && <p className="text-gray-600 md:leading-6 text-sm md:text-base truncate max-w-12 md:max-w-fit line-through">${product?.price}</p>}
                    </div>

                </div>
                <button 
                    onClick={() => handleAddToCart(product?._id)} 
                    className={twMerge("orange-button w-full lg:w-fit py-2 px-2.5 sm:py-3 sm:px-2 md:py-2 md:px-4 rounded-lg sm:rounded-xl md:rounded-full",
                        "text-xs sm:text-sm md:text-base lg:text-sm xl:text-base active:scale-95 transition-all duration-75  ease-in text-white font-medium",
                        "cursor-pointer flex items-center justify-center gap-1 lg:gap-2",
                        params.lang === "ar" ? "flex-row-reverse" : "flex-row"
                    )}>
                    <ShoppingCart size={16} className="scale-100 lg:scale-120 block lg:hidden xl:block"/>
                    <p>
                       {tCommon("addToCart")}
                    </p>
                </button>
            </div>
        </MotionDiv>
    )
}
