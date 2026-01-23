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


const ProductsByCategory = () => {
    const [category, setCategory] = useState<CategoriesFilterType>("All Products");
    const [subcategory, setSubCategory] = useState("puzzles");
    const [isDragging, setIsDragging] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    const fetchProducts = async (categories: CategoriesFilterType, subcategories: string) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getProductsApi({
                categories: category === "All Products" ? "" : category,
                subcategory,
                sort: "rating",
                limit: 12
            });

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
            }, 200),
        [fetchProducts]
        );

    useEffect(() => {
        debouncedFetch(category, subcategory);
        return () => debouncedFetch.cancel();
    }, [category, subcategory, debouncedFetch]);


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
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        breakpoints: {
            700: { perPage: 2 },
            1023: { perPage: 3 },
        },
    };


    return (
        <div className="w-full pt-4 pb-16 md:pb-14 overflow-x-hidden">
            <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold">Shope By Categories</h1>
            <div className="flex gap-1 gap-y-2 md:gap-2 mt-4 flex-wrap">
                {subcategories.map((subcategoryItem)=>(
                    <div 
                        key={subcategoryItem} 
                        onClick={()=>setSubCategory(subcategoryItem)}
                        className={twMerge("border-1 border-gray-700 rounded-full py-1 md:py-1.5 px-2.5 md:px-4 text-sm md:text-base cursor-pointer", 
                        subcategory === subcategoryItem ? "bg-gray-800 text-white" : "text-gray-800"
                    )}>
                        {subcategoryItem}
                    </div> 
                ))}
            </div>
            <div className="slider-container mt-6 md:mt-10">
                {isClient && (
                <Splide
                    options={splideOptions}
                    onDrag={() => setIsDragging(true)}
                    onDragged={() => setIsDragging(false)}>
                    {products.map((product, index) => (
                        <SplideSlide key={product._id}>
                        <div className="px-2 md:px-3 pt-2 pb-6 h-full">
                            <Product
                                product={product}
                                index={index}
                                wishlist={wishlist}
                                isDragging={isDragging}
                                />
                        </div>
                        </SplideSlide>
                    ))}
                </Splide>

                )}
            </div>
        </div>
    )
}

export default ProductsByCategory