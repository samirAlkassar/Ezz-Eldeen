"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react"
import HeroBackground from "@/components/HeroBackground";
import ProductsSearchBar from "../ProductsSearchBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoriesFilterType } from "../ProductsSearchBar";

export type SortType = "createdAt" | "price" | "name";
export type OrderType = "asc" | "desc";

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentCategory, setCurrentCategory] = useState<CategoriesFilterType>("All Products");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(200000);
    const [sort, setSort] = useState<SortType>("createdAt");
    const [order, setOrder] = useState<OrderType>("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    return (
        <main className="py-12 md:py-16 relative px-4 sm:px-8 ">
        <HeroBackground />
        <div className="flex items-center justify-center w-full max-w-[85rem] mx-auto">
          <div className="w-full max-w-4xl 2xl:mt-8 relative">

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="absolute w-100 h-100 lg:flex items-center justify-center -right-40 -top-20 scale-105 hidden">
              <img src="./images/cloud.png" alt="cloud" className="absolute bounceAnimation"/>
              <img src="./images/bear.png" alt="cloud" className="absolute bounceAnimation mb-4"/>
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="absolute w-100 h-100 lg:flex items-center justify-center -left-35 scale-x-[-1] sclae-95 -rotate-10 hidden">
              <img src="./images/cloud.png" alt="cloud" className="absolute bounceAnimation"/>
              <img src="./images/colors.png" alt="cloud" className="absolute bounceAnimation mb-5"/>
            </motion.div>

            <span className="text-white flex max-w-lg mx-auto items-center gap-1"><Star size={16} className="text-amber-400 fill-current scale-90 lg:scale-100"/> <p className="text-xs lg:text-sm xl:text-base">Kids store in Egypt</p></span>

            <motion.h1  
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-6xl xl:text-7xl font-bold text-[#ec681c] text-center relative">
                Magic <span className="text-white"> awaits at </span><br className="hidden md:block"/> <span className="text-yellow-300">Ezz-Eldeen</span>
                <Image src={"/images/brush-stroke.png"} alt="anything" width={260} height={220} className="absolute -top-5 left-5 md:left-40 -z-10"/>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-base sm:text-base lg:text-lg text-white mt-4 text-center">
              Discover amazing school supplies, delightful toys, and perfect gifts <br className="hidden md:block"/> that spark imagination and learning in every child.
            </motion.p> 
            <div className="mt-12 md:mt-18 max-w-3xl mx-auto">
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
                setOrder={setOrder}
              />
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <button 
                onClick={()=>{router.push("#startshopping")}} 
                className="bg-gradient-to-r from-[#FF791A] font-semibold to-orange-500 w-full sm:w-fit hover:from-[#ff6b02] hover:to-orange-500 shadow-sm text-white px-4 md:px-6 py-4 text-base sm:text-lg md:text-xl rounded-2xl md:rounded-full cursor-pointer active:scale-[97%] transition-all duration-75">
                Start Shopping
              </button>
              <button 
                className="bg-white text-gray-700 w-full font-semibold sm:w-fit px-4 md:px-6 py-4 text-base sm:text-lg md:text-xl rounded-2xl md:rounded-full cursor-pointer shadow-sm active:scale-[97%] transition-all duration-75">
                View Collections
              </button>
            </div>

            {/* <div className="grid grid-cols-3 mt-12 md:mt-18 max-w-xl mx-auto">
              <Numbers text="Happy Kids" number="1000+"/>
              <Numbers text="Products" number="500+"/>
              <Numbers text="Support" number="24/7"/>
            </div> */}
          </div>
        </div>
      </main>
    )
}

const Numbers = ({text, number}:{text: string, number: string}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold md:font-bold text-[#FF791A]">{number}</h1>
      <span className="text-white text-base">{text}</span>
    </div>
  )
}

const ImageSection = () => {
  return (
      <div className="relative xl:h-120 xl:w-160 lg:h-100 lg:w-120 md:h-80 md:w-100 lg:block mt-0 md:mt-15 hidden">
        <Image src={"/images/cartoon-back-school.jpg"} alt="Hero Image - Back-school-cartoon" fill className="object-cover rounded-xl shadow-sm"/>
        <Image src={"/images/backpack.png"}
          alt="school backpack" 
          width={150}
          height={45}
          className="absolute object-cover -top-16 -left-12 bounceAnimation 2xl:scale-100 xl:scale-95 scale-75"/>
        <Image src={"/images/train.png"}
          alt="school backpack" 
          width={220}
          height={45}
          className="absolute object-cover -bottom-22 -left-15 bounceAnimation xl:scale-95 scale-75"/>
        <Image src={"/images/gift.png"}
          alt="school backpack" 
          width={200}
          height={45}
          className="absolute object-cover -top-15 -right-15 bounceAnimation xl:scale-95 scale-75"/>
      </div>
  )
}

export default Hero;