"use client";

import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { categoriesList } from "@/components/layout/Categories";
import { twMerge } from "tailwind-merge";
import Breadcrumbs from "@/components/Breadcrumbs";
import Products, { CategoriesFilterType } from "@/components/layout/Products";
import Image from "next/image";
import { ProductType } from "@/features/products/types";

type ProductsClientProps = {
  initialProducts: ProductType[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  initialPage: number;
  lang: typeLang
};

const CategoriesClient = ({initialProducts, initialPagination, initialPage, lang} : ProductsClientProps) => {
    const params = useParams();

    const undoSlug = (slug: string | string[] | undefined) => {
        return typeof slug === 'string' ? 
        slug.replace(/_/g, ' ').replace(/%26/g, '&') : 
        Array.isArray(slug) ? 
        slug[0]?.replace(/_/g, ' ').replace(/%/g, '') : ''
    };

  const category = categoriesList.filter(categroy => categroy.title.toLowerCase().includes(undoSlug(params.category).toLowerCase()))
  
  return (
    <section className="bg-orange-50/20 pb-4 md:pb-6">
      <div className={`${category[0]?.theme} h-fit md:h-70`}>
        <div className="flex justify-between max-w-[90rem] mx-auto items-start">
          <div className="px-4 flex flex-col gap-4 md:gap-6 items-start justify-center py-8 md:py-0 h-fit md:h-[15rem] md:pt-4">
            <div className="flex gap-3 md:gap-6">
              {/* <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex"
              >
                <div className={`${category[0]?.theme} text-slate-50 p-2 h-fit md:p-6 rounded-xl shadow-lg bg-white/20`}>
                  {category[0]?.sectionIcon ? category[0]?.sectionIcon : <EarthIcon size={50}/>}
                </div>
              </motion.div> */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 text-white">{undoSlug(params.category)}</h1>
                {/* <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto hidden md:block">
                  Discover our amazing collection of {undoSlug(params.category)} perfect for kids of all ages.
                </p> */}
              </motion.div>
            </div>
            
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 md:gap-2 flex-wrap">
              {category[0]?.subcategories.map((subcategory, index)=>(
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{  stiffness: 100, delay: index * 0.1}}
                  key={index} 
                  className={twMerge("rounded-lg md:rounded-full py-1 px-3 md:py-1 md:px-4 shadow-xs cursor-pointer border-1 border-gray-100", index === 0 ? `bg-white text-gray-800` : "bg-white/60 text-gray-700")}>
                  <h1 className="text-sm md:text-base font-medium">{subcategory}</h1>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
          <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative w-90 h-90 lg:block hidden">
              <Image src={category[0]?.sectionImage} alt="Hero Image - Back-school-cartoon" fill className="object-contain -ml-40"/>
          </motion.div>
        </div>
      </div>
      <Breadcrumbs previousPage={undoSlug(params.category)}/>
      <div className="max-w-[85rem] mx-auto px-4">
        <Products 
            lang={lang}
            initialProducts={initialProducts}
            initialPagination={initialPagination}
            initialPage={initialPage}
            category={undoSlug(params.category) as CategoriesFilterType}/>
      </div>
    </section>
  )
}

export default CategoriesClient;