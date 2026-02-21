"use client";

import subcategories from "../constants/subcategories.json"
import { Product } from "./Product"
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useMemo, useState } from "react";
import {CategoriesFilterType} from "../components/layout/Products";
import debounce from "lodash/debounce";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ProductType } from "@/features/products/types";
import { getProductsApi } from "@/features/products/productsAPI";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingProductSkeleton from "./LoadingProductSkeleton";
import { useTranslations } from "next-intl";


const ProductsByCategory = ({title, section = "categories", initialProducts, lang}:
    {title?: string, section?: "categories" | "rating" | "new" | "games" | "school", initialProducts?: ProductType[], lang: typeLang}) => {
    const t = useTranslations("Categories");
    const tHome = useTranslations("Home");
    const [category, setCategory] = useState<CategoriesFilterType>("Toys & Games");
    const [subcategory, setSubCategory] = useState("puzzles");
    const [isDragging, setIsDragging] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [products, setProducts] = useState<ProductType[]>(initialProducts || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const router = useRouter();
    const isCategoriesSection = section === "categories";
    const subcategoriesList = isCategoriesSection ? subcategories : [];
    if (!title) {title = tHome("productByCategory.shopByCategories")}
    const fetchProducts = async (category: CategoriesFilterType, subcategory: string) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getProductsApi({
                category: section === "games" ? "Toys & Games" : section === "school" ? "School Supplies" : "",
                subcategory: isCategoriesSection ? subcategory : "",
                sort: section === "rating" ? "rating" : "newest",
                limit: 12
            }, lang);

            setProducts(data.products);
            } catch (err: unknown) {
                if (err instanceof Error) {
                setError(err.message); }
        } finally {
            setLoading(false);
        }
    }

    const debouncedFetch = useMemo(
        () =>
            debounce((category, subcategory) => {
            fetchProducts(category, subcategory);
            }, 400),
        []
        );

    useEffect(() => {
        if (isCategoriesSection) {
            debouncedFetch(category, subcategory);
        }
        return () => debouncedFetch.cancel();
    }, [category, subcategory, debouncedFetch, isCategoriesSection]);


    useEffect(() => {
        setIsClient(true);
    }, []);

    const splideOptions = {
        type: "slide",
        perPage: 4,
        perMove: 1,
        pagination: true,
        arrows: false,
        drag: true,
        speed: 700,
        snap: true,
        direction: lang === "en" ? 'ltr' : 'rtl',
        flickPower: 900 ,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        breakpoints: {
            700: { perPage: 2 },
            1023: { perPage: 3 },
        },
    };

    if (error) return <p>{error}</p>
    return (
        <section className="w-full pt-4 pb-16 md:pb-8 overflow-x-hidden mb-4 md:mb-12 max-w-360 mx-auto px-4 md:px-8 mt-8">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-xl sm:text-2xl md:text-4xl text-gray-800 font-semibold">{title}</h1>
                <button
                    onClick={()=> {
                        if (isCategoriesSection) {
                            router.push(`/products?subCategory=${subcategory}`)
                        } else if (section === "new") {
                            router.push(`/products`)
                        } else if (section === "rating") {
                            router.push(`/products?sort=rating`)
                        }
                    }}
                    className={twMerge("rounded-full bg-gray-800 text-white text-sm md:text-xl px-3 md:px-5 py-1 md:py-1.5",
                                        "flex items-center justify-center md:gap-1 cursor-pointer hover:[&_svg]:translate-x-1",
                                        lang === "ar" ? "hover:[&_svg]:-translate-x-1" : "hover:[&_svg]:translate-x-1")}>
                    <p>
                        {t("shopNow")}
                    </p> 
                    <ChevronRight 
                        size={24} 
                        className={twMerge("transition-all duration-75 ease-in scale-80 md:scale-100",
                            lang === "ar" && "rotate-y-180"
                        )}/>
                </button>
            </div>
            {isCategoriesSection && (
                <div className="relative mt-4 md:mb-4">
                    <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 no-scrollbar">
                        {subcategoriesList?.map((subcategoryItem, index)=>(
                            <div 
                                key={index} 
                                onClick={()=>setSubCategory(subcategoryItem)}
                                className={twMerge(
                                    "shrink-0 border border-gray-300 rounded-full py-1.5 md:py-2 px-3 md:px-5 text-sm font-medium cursor-pointer transition-all duration-200 whitespace-nowrap",
                                    subcategory === subcategoryItem 
                                        ? "bg-gray-900 text-white border-gray-900 shadow-sm" 
                                        : "bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm"
                                )}>
                                {subcategoryItem}
                            </div> 
                        ))}
                    </div>
                </div>
            )}
            <div className="slider-container mt-4 md:mt-6">
            {isClient && (
                <Splide
                options={splideOptions}
                onDrag={() => setIsDragging(true)}
                onDragged={() => setIsDragging(false)}
                >
                {isCategoriesSection && loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <SplideSlide key={`skeleton-${i}`}>
                        <div className="px-1 md:px-3 pt-2 pb-6 h-full">
                            <LoadingProductSkeleton />
                        </div>
                        </SplideSlide>
                    ))
                    : products.map((product, index) => (
                        <SplideSlide key={product._id}>
                        <div className="px-1 md:px-3 pt-2 pb-6 h-full">
                            <Product
                                product={product}
                                index={index}
                                wishlist={wishlist}
                                isDragging={isDragging}
                                showRatings={section === "rating"}
                                showDescription={section === "school" || section === "games"}
                            />
                        </div>
                        </SplideSlide>
                    ))}
                </Splide>
            )}
            </div>

        </section>
    )
}

export default ProductsByCategory