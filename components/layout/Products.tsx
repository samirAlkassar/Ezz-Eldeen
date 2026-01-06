"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../Product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchProducts } from "@/features/products/productsSlice";
import { fetchCart } from "@/features/cart/cartSlice";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import Pagination from "../Pagination";
import debounce from "lodash/debounce";
import ProductsSearchBar from "../ProductsSearchBar"
import { usePathname } from "next/navigation";

export type CategoriesFilterType = "All Products" | "Toys & Games" | "School Supplies" | "Gifts";
export type SortType = "createdAt" | "price" | "name";
export type OrderType = "asc" | "desc";

const Products = ({ category, search }: { category?: CategoriesFilterType, search? : string }) => {
  const [searchTerm, setSearchTerm] = useState<string>(search || "");
  const [currentCategory, setCurrentCategory] = useState<CategoriesFilterType>("All Products");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sort, setSort] = useState<SortType>("createdAt");
  const [order, setOrder] = useState<OrderType>("desc");
  const dispatch = useDispatch<AppDispatch>();
  const { products, pagination, error } = useSelector(
    (state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const pathname = usePathname();
  const isProductsPage = pathname.startsWith("/products") || pathname.startsWith("/categories");;

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
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

  useEffect(() => {
    debouncedFetch(searchTerm, currentCategory, currentPage, minPrice, maxPrice, sort, order);

    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm, currentCategory, currentPage, minPrice, maxPrice, sort, order, debouncedFetch]);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);



  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-12 w-full">
      {/* {loading && <p className="text-center text-gray-500">Loading products...</p>} */}
      {isProductsPage &&
        <ProductsSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder} />}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3.5 xl:gap-x-8 gap-y-8 xl:gap-y-14">
        {products.map((product, index) => (
          <Product
            key={product._id}
            product={product}
            index={index}
            wishlist={wishlist} />
        ))}
      </div>
      
        <Pagination
        currentPage={currentPage}
        totalPages={pagination?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
        isProductsPage={isProductsPage}
      />
    </div>
  );
};

export default Products;