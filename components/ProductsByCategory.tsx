"use client";

import subcategories from "../constants/subcategories.json"
import { Product } from "./Product"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchProducts } from "@/features/products/productsSlice";
import { useEffect, useMemo, useState } from "react";
import {CategoriesFilterType} from "../components/layout/Products";
import debounce from "lodash/debounce";
import { usePathname } from "next/navigation";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { twMerge } from "tailwind-merge";

const ProductsByCategory = () => {
    const [category, setCategory] = useState<CategoriesFilterType>("All Products");
    const [subcategory, setSubCategory] = useState("puzzles");
    const dispatch = useDispatch<AppDispatch>();
    const [isDragging, setIsDragging] = useState(false);
    const [carouselSlidesNumber, setCarouselSlidesNumber] = useState(4);
    const [isClient, setIsClient] = useState(false);
    const { products, pagination, error } = useSelector(
        (state: RootState) => state.products);
    
    const pathname = usePathname();
    const isProductsPage = pathname.startsWith("/products") || pathname.startsWith("/categories");
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    const debouncedFetch = useMemo(
        () =>
            debounce((category: CategoriesFilterType, subcategory) => {
            dispatch(fetchProducts({
                category: category === "All Products" ? "" : category,
                subcategory: subcategory,
                limit: isProductsPage ? 12 : 8,
            }));
        }, 400),
    [dispatch, isProductsPage]);

    useEffect(() => {
        debouncedFetch(category, subcategory);
        return () => {
            debouncedFetch.cancel();
        };
    }, [category, subcategory, debouncedFetch]);

    useEffect(() => {
        const mobileQuery = window.matchMedia("(max-width: 479px)");
        const tabletQuery = window.matchMedia("(min-width: 480px) and (max-width: 1023px)");
        const desktopQuery = window.matchMedia("(min-width: 1024px)");

        const handleBreakpointChange = () => {
            if (mobileQuery.matches) {
                setCarouselSlidesNumber(2)
            } else if (tabletQuery.matches) {
                setCarouselSlidesNumber(3)
            } else if (desktopQuery.matches) {
                setCarouselSlidesNumber(4)
            }
        };

        handleBreakpointChange();

        mobileQuery.addEventListener("change", handleBreakpointChange);
        tabletQuery.addEventListener("change", handleBreakpointChange);
        desktopQuery.addEventListener("change", handleBreakpointChange);

        return () => {
            mobileQuery.removeEventListener("change", handleBreakpointChange);
            tabletQuery.removeEventListener("change", handleBreakpointChange);
            desktopQuery.removeEventListener("change", handleBreakpointChange);
        };
    }, []);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const settings = {
        infinite: false,
        slidesToShow: carouselSlidesNumber,
        swipeToSlide: true,
        initialSlide: 0,
        dots: true,
        speed: 500,
        mobileFirst:true,
        beforeChange: () => {
            setIsDragging(true);
        },
        afterChange: () => {
            setTimeout(() => setIsDragging(false), 0);
        },
    };

    return (
        <div className="w-full pt-4 pb-16 md:pb-14">
            <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold">Explore By Categories</h1>
            <div className="overflow-x-scroll no-scrollbar relative bg-linear-90 from-transparent to-white h-full">
                {/* <span className="absolute blcok bg-linear-90 from-transparent to-red-400 h-full w-full top-0 right-0 z-10"/> */}
                <div className="flex gap-1 gap-y-2 md:gap-2 mt-4 md:w-fit w-200 ">
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
            </div>
            <div className="slider-container mt-6 md:mt-10">
                {isClient && (
                    <Slider {...settings} className="">
                        {products.map((product, index) => (
                        <div key={product._id} className="px-2 md:px-3 pt-2 pb-6 h-full">
                            <Product
                            product={product}
                            index={index}
                            wishlist={wishlist}
                            isDragging={isDragging}
                            />
                        </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    )
}

export default ProductsByCategory