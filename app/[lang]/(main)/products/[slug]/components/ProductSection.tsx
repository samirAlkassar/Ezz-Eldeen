"use client";

import Image from "next/image";
import {motion} from "motion/react"
import { useState } from "react";
import { Check, CloudLightning, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { ProductType } from "@/features/products/types";
import { useRouter } from "next/navigation";

const ProductSection = ({product, blurDataURL} : {product:  ProductType | null, blurDataURL: string}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<number>();
    const [imageIndex, setImageIndex] = useState<number>(0);
    const router = useRouter();

    const features : string[] = [];
    return (
        <div className="flex gap-8 md:gap-10 lg:gap-15 flex-col xl:flex-row">
            <div className="flex-1 flex flex-col space-y-6">
                <div className="relative bg-gray-100 h-[340px] sm:h-[400px] md:h-[620px] aspect-square rounded-2xl overflow-hidden">
                    <Image
                        src={product?.images[imageIndex]?.url || "/images/placeholder.jpg"}
                        alt={""}
                        fill
                        placeholder={blurDataURL ? "blur" : undefined}
                        blurDataURL={blurDataURL ?? undefined}
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                        className="absolute w-full h-full object-contain z-10"/>
                    <span className="absolute top-4 left-4 bg-orange-400 rounded-full text-white font-medium text-base md:text-lg px-2 py-1 md:px-3 md:py-1 z-20">
                        -30% OFF    
                    </span>
                </div>
                <div className="flex gap-3 justify-center">
                    {product?.images.map((img, index) => (
                        <motion.button
                        key={index}
                        onClick={() => {setSelectedImage(index); setImageIndex(index)}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-18 h-18 md:w-26 md:h-26 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            selectedImage === index 
                            ? "border-orange-400 shadow-lg" 
                            : "border-gray-200/50 hover:border-gray-200/50"
                        }`}
                        >
                        <Image src={img?.url} alt={`${img?.alt}`} fill className="w-full h-full object-cover" />
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="flex-1 space-y-4">
                <div>
                    <div className="flex items-center justify-start gap-1.5 mb-3 flex-wrap">
                        {product?.category && 
                            <span 
                                onClick={()=>router.push(`/categories/${product?.category.replace(/\s+/g, '_')}`)}
                                className="text-xs font-medium py-1 px-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 cursor-pointer">
                                {product?.category}
                            </span>}
                            
                        {product?.subcategory &&
                            <span 
                                className="text-xs font-medium py-1 px-2.5 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-100 cursor-pointer">
                                {product?.subcategory}
                            </span>}
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-tight text-gray-800">{product?.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            size={24}
                            key={i}
                            className={`h-5 w-5 fill-current ${
                                i < Math.floor(product?.averageRating ?? 0)
                                ? "text-yellow-500" 
                                : "text-gray-300"  
                            }`}
                            />
                        ))}
                        <span className="ml-2 font-semibold text-gray-700">
                            {(product?.averageRating ?? 0).toFixed(1)}
                        </span>
                    </div>
                </div>

                


                <div className="flex items-baseline gap-4 mt-4 md:mt-6">
                    {product?.discountPrice ? 
                    <>
                    <span className="text-3xl md:text-5xl font-semibold text-orange-400">{product?.discountPrice} <span className="text-xl md:text-2xl font-medium">EGP</span></span>
                    <span className="text-lg md:text-xl text-muted-foreground line-through">${product?.price} <span className="text-sm md:text-base">EGP</span></span>
                    <span className="text-white font-medium text-sm md:text-base md:font-semibold bg-green-500 rounded-full px-3 py-0.5">Save ${((product?.price ?? 0)- (product?.discountPrice ?? 0)).toFixed(2)} EGP</span>
                    </>:
                    <span className="text-3xl md:text-5xl font-semibold text-orange-400">{product?.price} <span className="text-2xl font-medium">EGP</span></span>
                    }

                </div>

                <div>
                    <span className="text-lg md:text-xl font-medium text-gray-800">Description</span>
                    <p className="text-gray-700 text-sm md:text-lg leading-relaxed max-w-3xl">{product?.description}</p>
                </div>
                

                <div className="space-y-2 mt-6 md:mt-8">
                    {features.length < 0 && 
                    <>
                    <h3 className="font-medium text-gray-800 text-xl">Key Features:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.slice(0, 4).map((feature, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }} 
                            className="flex items-center gap-2 text-gray-700 text-lg"
                        >
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                        </motion.li>
                        ))}
                    </ul>
                    </>}

                </div>

                <span className="w-full h-2 border-t-1 block border-gray-300 my-6"/>

                <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center rounded-lg bg-orange-50 p-1">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="hover:bg-primary/10 cursor-pointer hover:bg-orange-100 rounded-full p-3"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                        <button
                            onClick={() => setQuantity(Math.min(product?.stock as number, quantity + 1))}
                            className="hover:bg-primary/10 cursor-pointer hover:bg-orange-100 rounded-full p-3">
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 md:gap-4">
                    <button className="flex gap-2 items-center justify-center w-full px-4 py-4 text-white font-medium text-sm md:text-lg rounded-xl md:rounded-full bg-orange-400 cursor-pointer hover:bg-orange-500 active:scale-95 transition-all duration-100 ease-in">
                        <ShoppingCart />
                        <p>Add To Cart</p>
                    </button>
                    <button className="flex gap-2 items-center justify-center w-full px-4 py-4 text-white font-medium text-base md:text-lg rounded-xl md:rounded-full bg-green-400 cursor-pointer hover:bg-green-500 active:scale-95 transition-all duration-100 ease-in">
                        <CloudLightning />
                        <p>By Now</p>
                    </button>
                    <div>
                        <button className="p-4 border-gray-200 hover:border-8 hover:p-2 shadow-sm rounded-full cursor-pointer hidden md:block">
                            <Heart size={26} className="text-gray-700"/>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductSection;