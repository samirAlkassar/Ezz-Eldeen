"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { CategoriesFilterType, SortType, OrderType } from "./layout/Products";

interface ProductsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setCurrentPage: (value: number) => void;
  currentCategory: CategoriesFilterType;
  setCurrentCategory: (value: CategoriesFilterType) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  sort: SortType;
  setSort: (value: SortType) => void;
  order: OrderType;
  setOrder: (value: OrderType) => void;
}

const ProductsSearchBar = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  currentCategory,
  setCurrentCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  order,
  setOrder,
}: ProductsSearchBarProps) => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState<boolean>(false);
  const [showFiltersMenu, setShowFiltersMenu] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, currentCategory, minPrice, maxPrice, sort, order, setCurrentPage]);

  const handleSearch = () => {
    if (searchTerm.length !== 0 && currentCategory === "All Products") {
      router.push(`/products?search=${searchTerm}`);
    } else if (searchTerm.length === 0 && currentCategory !== "All Products") {
      router.push(`/products?category=${currentCategory}`);
    } else if (searchTerm.length !== 0 && currentCategory !== "All Products") {
      router.push(
        `/products?search=${searchTerm}&category=${currentCategory}`
      );
    } else {
      router.push(`/products`);
    }
  };

  return (
    <div className="w-[90%] md:w-full mx-auto space-y-4">
      <div className="relative mt-4 mb-6 px-2.5 py-0.5 sm:px-2 md:px-2 flex gap-2 bg-white rounded-full items-center justify-center border border-gray-100">
        <div className="md:pl-2">
          <Search className="text-orange-400 md:w-7 md:h-7" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
           onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
          placeholder="Search products"
          className="bg-white w-full py-1.5 sm:py-3 md:py-4 px-1 sm:px-2 md:px-6 rounded-full text-base sm:text-lg lg:text-xl outline-none"/>

        <button
          onClick={() => {
            setShowCategoriesMenu((prev) => !prev);
          }}
          className="text-lg p-1 md:px-4 rounded-lg hover:bg-gray-50 cursor-pointer flex gap-1 items-center justify-between md:min-w-46">
          <p className="truncate hidden md:block">{currentCategory}</p>
          <ChevronDown size={22}/>
        </button>

        <button
          onClick={() => {
            setShowFiltersMenu((prev) => !prev);
          }}
          className="text-lg p-1 md:px-4 md:py-2 rounded-lg hover:bg-gray-50 cursor-pointer flex gap-1 items-center justify-between">
          <SlidersHorizontal size={22}/>
        </button>

        <AnimatePresence>
          {showCategoriesMenu && (
            <motion.div
              key="categories-modal"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 23 }}
              transition={{ delay: 0, duration: 0.1, ease: "easeOut" }}
              className="absolute p-1 sm:p-2 bg-white top-13 md:right-40 z-20 rounded-lg shadow-xl border-gray-50 border grid grid-cols-2 gap-2">
              <SearchBarCategoriesButton
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setShowCategoriesMenu={setShowCategoriesMenu}>
                All Products
              </SearchBarCategoriesButton>
              <SearchBarCategoriesButton
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setShowCategoriesMenu={setShowCategoriesMenu}>
                School Supplies
              </SearchBarCategoriesButton>
              <SearchBarCategoriesButton
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setShowCategoriesMenu={setShowCategoriesMenu}>
                Toys & Games
              </SearchBarCategoriesButton>
              <SearchBarCategoriesButton
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setShowCategoriesMenu={setShowCategoriesMenu}>
                Gifts
              </SearchBarCategoriesButton>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFiltersMenu && (
            <motion.div
              key="filters-modal"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0, duration: 0.15, ease: "easeOut" }}
              className="absolute p-4 md:p-6 bg-white top-13 md:top-20 right-4 z-20 rounded-lg shadow-xl border-gray-50 border lg:w-96">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setShowFiltersMenu(false)}
                  className="hover:bg-gray-100 rounded-full p-1 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Min</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-200 rounded-lg outline-none focus:border-orange-400"
                      placeholder="0"/>
                  </div>
                  <span className="text-gray-400 mt-5">-</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-200 rounded-lg outline-none focus:border-orange-400"
                      placeholder="200000"/>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <FilterButton
                    active={sort === "createdAt"}
                    onClick={() => setSort("createdAt")}>
                    Newest
                  </FilterButton>
                  <FilterButton
                    active={sort === "price"}
                    onClick={() => setSort("price")}>
                    Price
                  </FilterButton>
                </div>
              </div>

              {/* Order */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <FilterButton
                    active={order === "asc"}
                    onClick={() => setOrder("asc")}>
                    Ascending
                  </FilterButton>
                  <FilterButton
                    active={order === "desc"}
                    onClick={() => setOrder("desc")}>
                    Descending
                  </FilterButton>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(200000);
                    setSort("createdAt");
                    setOrder("desc");
                  }}
                  className="flex-1 px-4 py-1.5 md:py-2 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 cursor-pointer">
                  Reset
                </button>
                <button
                  onClick={() => setShowFiltersMenu(false)}
                  className="flex-1 px-4 py-1.5 md:py-2 font-semibold bg-orange-400 rounded-lg hover:bg-orange-500 text-gray-800 cursor-pointer">
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={()=>{
            if (searchTerm.length !== 0 && currentCategory === "All Products") {
              router.push(`/products?search=${searchTerm}`)
            } else if (searchTerm.length === 0 && currentCategory !== "All Products") {
              router.push(`/products?category=${currentCategory}`)
            } else if (searchTerm.length !== 0 && currentCategory !== "All Products") {
              router.push(`/products?search=${searchTerm}&category=${currentCategory}`)
            }
            else {router.push(`/products`)}
          }} 
          className="bg-orange-400 rounded-full px-6 py-1.5 text-xl text-gray-800 cursor-pointer hidden md:block">
          search
        </button>
      </div>
    </div>
  );
};

export default ProductsSearchBar;

const SearchBarCategoriesButton = ({
  children,
  currentCategory,
  setCurrentCategory,
  setShowCategoriesMenu,
}: {
  children?: React.ReactNode;
  currentCategory: CategoriesFilterType;
  setCurrentCategory: (value: CategoriesFilterType) => void;
  setShowCategoriesMenu: (value: boolean) => void;
}) => {
  return (
    <button
      onClick={() => {
        setCurrentCategory(children as CategoriesFilterType);
        setShowCategoriesMenu(false);
      }}
      className={twMerge(
        "rounded-lg hover:bg-gray-50 px-6 py-3 md:px-8 md:py-4 cursor-pointer text-sm md:text-base", currentCategory === (children as CategoriesFilterType) ? "bg-gray-100" : "bg-transparent")}>
      {children}
    </button>
  );
};

const FilterButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge("px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm transition-colors", active ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
      {children}
    </button>
  );
};