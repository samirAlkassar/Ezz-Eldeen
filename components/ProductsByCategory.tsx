"use client";

import subcategories from "../constants/subcategories.json"
import { Product } from "./Product"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchProducts } from "@/features/products/productsSlice";
import { useEffect, useMemo, useState } from "react";
import {CategoriesFilterType, SortType, OrderType} from "../components/layout/Products";
import debounce from "lodash/debounce";
import { usePathname } from "next/navigation";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsByCategory = () => {
    const [category, setCategory] = useState<CategoriesFilterType>("All Products");
    const dispatch = useDispatch<AppDispatch>();
    const [isDragging, setIsDragging] = useState(false);
    const { products, pagination, error } = useSelector(
        (state: RootState) => state.products);
    
    const pathname = usePathname();
    const isProductsPage = pathname.startsWith("/products") || pathname.startsWith("/categories");
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    useEffect(() => {
        if (category) {
            setCategory(category);
        }
        }, [category]);

        const debouncedFetch = useMemo(
        () =>
            debounce((searchTerm: string, category: CategoriesFilterType, page: number, minPrice: number, maxPrice: number, sort: SortType, order: OrderType) => {
            dispatch(fetchProducts({
                search: searchTerm,
                category: category === "All Products" ? "" : category,
                minPrice: minPrice,
                maxPrice: maxPrice,
                sort: sort,
                order: order,
                page: page,
                limit: isProductsPage ? 12 : 8,
            }));
            }, 400),
        [dispatch, isProductsPage]
    );

    const settings = {
        infinite: false,
        slidesToShow: 4,
        swipeToSlide: true,
        dots: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                infinite: true,
                dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 2,
                initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                }
            }
            ],

        beforeChange: () => {
            setIsDragging(true);
        },
        afterChange: () => {
            setTimeout(() => setIsDragging(false), 0);
        },
    };

    return (
        <div className="w-full pt-4 pb-16 md:pb-14">
            <h1 className="text-4xl text-gray-800 font-semibold">Explore By Categories</h1>
            <div className="flex gap-2 mt-3 flex-wrap">
                {subcategories.map((subcategory)=>(
                    <div key={subcategory} className="border-1 border-gray-700 rounded-full py-1.5 px-4 text-base cursor-pointer">
                        {subcategory}
                    </div> 
                ))}
            </div>
            <div className="slider-container mt-10">
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
            </div>
        </div>
    )
}

export default ProductsByCategory