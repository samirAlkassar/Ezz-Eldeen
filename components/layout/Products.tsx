"use client";

import React, { useMemo, useState, useRef } from "react";
import { Product } from "../Product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchCart } from "@/features/cart/cartSlice";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import Pagination from "../Pagination";
import debounce from "lodash/debounce";
import ProductsSearchBar from "../ProductsSearchBar"
import { usePathname } from "next/navigation";
import LoadingProductSkeleton from "../LoadingProductSkeleton";
import { ProductType } from "@/features/products/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type CategoriesFilterType = "All Products" | "Toys & Games" | "School Supplies" | "Gifts" | "";
export type SortType = "createdAt" | "price" | "rating";
export type OrderType = "asc" | "desc";

type ProductsProps = {
  search?: string;
  category?: CategoriesFilterType;
  subCategory?: string;
  initialProducts?: ProductType[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  initialPage?: number;
};

const Products = ({category, search, subCategory = "", initialProducts, initialPagination, initialPage }: ProductsProps) => {
  const [productsData, setProductsData] = useState<ProductType[]>(initialProducts || []);
  const [paginationData, setPaginationData] = useState(initialPagination);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  const [searchTerm, setSearchTerm] = useState<string>(search || "");
  const [currentCategory, setCurrentCategory] = useState<CategoriesFilterType>(category || "All Products");
  const [currentSubCategory, setCurrentSubCategory] = useState<string>(subCategory || "");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sort, setSort] = useState<SortType>("createdAt");
  const [order, setOrder] = useState<OrderType>("desc");
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const pathname = usePathname();
  const isProductsPage = pathname.startsWith("/products") || pathname.startsWith("/categories");

  // Fetch cart and wishlist once
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  // Client-side fetch for filter/page changes
  const fetchProductsClient = async (page: number, searchTerm: string, category: CategoriesFilterType, subCategory: string, minPrice: number, maxPrice: number, sort: SortType, order: OrderType) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", isProductsPage ? "12" : "4");
    if (searchTerm) params.set("search", searchTerm);
    if (category && category !== "All Products") params.set("category", category);
    if (subCategory) params.set("subCategory", subCategory);
    if (sort) params.set("sort", sort);
    params.set("order", order);
    params.set("minPrice", minPrice.toString());
    params.set("maxPrice", maxPrice.toString());

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`);
    if (!res.ok) return;
    const data = await res.json();
    setProductsData(data.products);
    setPaginationData(data.pagination);
  };

  const debouncedFetch = useMemo(
    () => debounce(fetchProductsClient, 400),
    [isProductsPage]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    debouncedFetch(1, value, currentCategory, currentSubCategory, minPrice, maxPrice, sort, order);
  };

  const handleCategoryChange = (value: CategoriesFilterType) => {
    setCurrentCategory(value);
    setCurrentPage(1);
    fetchProductsClient(1, searchTerm, value, currentSubCategory, minPrice, maxPrice, sort, order);
  };

  const handleFilterChange = (newMinPrice: number, newMaxPrice: number, newSort: SortType, newOrder: OrderType) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setSort(newSort);
    setOrder(newOrder);
    setCurrentPage(1);
    fetchProductsClient(1, searchTerm, currentCategory, currentSubCategory, newMinPrice, newMaxPrice, newSort, newOrder);
  };

const buildUrl = (page: number, category: string, subCategory: string, search: string) => {
  const params = new URLSearchParams();

  if (page > 1) params.set("page", page.toString());
  if (category && category !== "All Products") params.set("category", category);
  if (subCategory) params.set("subCategory", subCategory);
  if (search) params.set("search", search);

  const queryString = params.toString();
  
  if (pathname.startsWith("/categories")) {
    if (!category || category === "All Products") {
      return `/products${queryString ? `?${queryString}` : ""}`;
    }
    const categoryPath = category.replace(/ & /g, "_&_").replace(/ /g, "_");
    return `/categories/${categoryPath}${queryString ? `?${queryString}` : ""}`;
  }
  
  return `/products${queryString ? `?${queryString}` : ""}`;
};


  // update page via URL
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchProductsClient(page, searchTerm, currentCategory, currentSubCategory, minPrice, maxPrice, sort, order);
    router.replace(buildUrl(page, currentCategory, currentSubCategory, searchTerm));
  };



  return (
    <div className="mt-0 md:mt-4 w-full overflow-hidden">
      {isProductsPage &&
        <ProductsSearchBar
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        setCurrentPage={setCurrentPage}
        currentCategory={currentCategory}
        setCurrentCategory={handleCategoryChange}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        onFilterApply={handleFilterChange} />}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 xl:gap-x-8 gap-y-8 xl:gap-y-14">
        {
          productsData.map((product, index) => (
            <Product
              key={product._id}
              product={product}
              index={index}
              wishlist={wishlist} />
          ))
        }
        {!(productsData?.length > 0) && <p className="text-center w-full font-medium text-xl text-gray-800">No products found</p>}
      </div>
        <Pagination
          currentPage={currentPage}
          totalPages={paginationData?.totalPages || 1}
          onPageChange={onPageChange}
          isProductsPage={isProductsPage}
        />
    </div>
  );
};

export default Products;