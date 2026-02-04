"use client";

import { Car, Gift, GraduationCap, Group } from "lucide-react";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";
import ProductsByCategory from "../ProductsByCategory";
import Image from "next/image";
import toysCategoryImage from "../../public/images/97d10db78e9174ad0f2d62c705c6f051.jpg"
import SchoolCategoryImage from "../../public/images/639b30f87da6fecd1044dc4ba17a3270.jpg"
import GiftsCategoryImage from "../../public/images/1abdcf7f18364e53f0ef60ad5ba4370c.jpg"
import bundlesCategoryImage from "../../public/images/deadfdfce64bf13e0a1aad8aabd6df4b.jpg"
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import ToysCategorySectionImage from "../../public/images/twister-car.png";
import SchoolCategorySectionImage from "../../public/images/school-supplies.png";
import GiftsCategorySectionImage from "../../public/images/gift.png";
import BundlesCategorySectionImage from "../../public/images/school-supplies.png";
import { ProductsResponse } from "@/features/products/productsAPI";
import HeroProducsts from "../HeroProducts";
import { HomeSectionType } from "@/app/(main)/page";

export const categoriesList = [
    {
        title: "School Supplies",
        subtitle: "Everything your little scholar needs",
        icon: <GraduationCap size={26} />,
        sectionIcon: <GraduationCap size={56} />,
        theme: "bg-gradient-to-l from-[#6eCe7e] to-[#3ba94d]",
        buttonText: "Explore School Supplies",
        subcategories: ["Notebooks", "Pencils & Pens", "Art Supplies", "Backpacks"],
        image: SchoolCategoryImage,
        sectionImage: SchoolCategorySectionImage
    },
    {
        title: "Toys & Games",
        subtitle: "Fun games and educational toys for your kids",
        icon: <Car size={26} />,
        sectionIcon: <Car size={56} />,
        theme: "bg-gradient-to-l from-[#9D4EDD] to-[#7b2cbf]",
        buttonText: "Explore Toys & Games",
        subcategories: ["Building Blocks", "Board Games", "Action Figures", "Puzzles"],
        image: toysCategoryImage,
        sectionImage: ToysCategorySectionImage
    },
    {
        title: "Gifts",
        subtitle: "Perfect presents for special moments",
        icon: <Gift size={26} />,
        sectionIcon: <Gift size={56} />,
        theme: "bg-gradient-to-l from-[#ff6f61] to-[#ff4858]",
        buttonText: "Explore Gifts",
        subcategories: ["Birthday Gifts", "Holiday Gifts", "Personalized Items", "Gift Sets"],
        image: GiftsCategoryImage,
        sectionImage: GiftsCategorySectionImage
    },
    {
        title: "Bundles",
        subtitle: "Amazing deals and combo packages",
        icon: <Group size={26} />,
        sectionIcon: <Group size={56} />,
        theme: "bg-gradient-to-l from-[#4D96FF] to-[#2563eb]",
        buttonText: "Explore Bundles",
        subcategories: ["School Starter Packs", "Play & Learn Sets", "Gift Bundles", "Seasonal Packages"],
        image: bundlesCategoryImage,
        sectionImage: BundlesCategorySectionImage
    }
]



const Categories = ({products, sections}:{products: ProductsResponse, sections: HomeSectionType[]}) => {
    const router = useRouter();
    const gamesSection = sections.find(section => section.id === "games");
    const schoolSection = sections.find(section => section.id === "school");
    const bestSellers = sections.find(section => section.id === "rating");

    return (
        <section className=" bg-gradient-to-b from-[#FFF4EC]/20 via-[#fcf8d979]/80 to-[#dff3ef4f] py-10">
            <div className="flex flex-col items-center mt-8 sm:mt-12 md:mt-20 w-full">
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-2xl md:text-3xl text-center lg:text-5xl font-bold text-[#FF791A] max-w-[90rem] mx-auto px-4 md:px-8">
                    <span className="text-[#2B303B]">Explore Our Amazing</span> Categories
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-[#2B303B]/80 mt-3 text-center hidden md:block max-w-[90rem] mx-auto px-4 md:px-8">
                    From learning essentials to playful treasures, we have everything to make your<br className="hidden lg:block" />
                    {`child's journey magical and educational.`}
                </motion.p>

                <div className="grid grid-cols-2 gap-y-6 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 w-full mt-4 md:mt-8 max-w-[60rem] mx-auto px-4 md:px-8">
                    {categoriesList.map((category, index) => (
                        <CategoryCard
                            key={index}
                            delayIndex={index}
                            title={category.title}
                            subtitle={category.subtitle}
                            icon={category.icon}
                            theme={category.theme}
                            image={category.image}
                        />
                    ))}
                </div>

                <div id={"startshopping"} className="pb-20 pt-14 md:pt-20 w-full flex flex-col items-center max-w-[90rem] mx-auto px-4 md:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#FF791A]">
                        <span className="text-[#2B303B]">Featured</span> Products
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-base lg:text-xl text-[#2B303B]/80 mt-0 md:mt-3 text-center mb-4">
                        Discover our most popular items <span className="hidden md:inline">that kids and parents love!</span>
                    </motion.p>
                    <HeroProducsts serverProducts={products}/>
                    
                    <div className="w-full flex justify-center mt-6 md:mx-8">
                        <button
                            onClick={() => router.push("/products")}
                            className="bg-black text-white font-medium text-base md:text-lg rounded-full shadow-md px-4 py-2 md:px-6 md:py-3 cursor-pointer active:scale-95">
                            Show ALl Products
                        </button>
                    </div>
                </div>


                <ProductsByCategory />

                <div className="bg-linear-30 from-cyan-500/90 via-blue-500/90 to-indigo-500/90 px-4 w-full mb-10 md:mb-20 mt-4 h-55 md:h-70">
                    <div className="mx-auto max-w-[90rem] md:px-8 flex justify-around items-start">
                        <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-2xl md:text-3xl text-left lg:text-5xl font-bold text-white mt-8 md:mt-12">
                            Explore Best Toys
                        </motion.h1>
                        <p className="md:mt-2 text-base md:text-lg font-medium text-white/80">Featured Toys for your kids and action figures.</p>
                        <button className="bg-white text-gray-700 font-medium px-6 py-2 text-lg md:text-xl mt-6 cursor-pointer rounded-full">Shope Now</button>
                        </div>
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="relative w-120 h-120 lg:block mt-0 hidden">
                            <Image src={"/images/twister-car.png"} alt="Hero Image - Back-school-cartoon" fill className="object-contain -mt-22"/>
                        </motion.div>
                    </div>
                </div>
                
                {gamesSection && (
                <ProductsByCategory
                    title={gamesSection.title}
                    section={gamesSection.id}
                    initialProducts={gamesSection.products}
                />
                )}

                <div className="bg-linear-30 from-orange-400/90 via-orange-500/90 to-orange-400/90 px-4 w-full mb-10 md:mb-20 mt-4 h-50 md:h-70">
                    <div className="mx-auto max-w-[90rem] md:px-8 flex justify-around items-start">
                        <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-2xl md:text-3xl text-left lg:text-5xl font-bold text-white mt-8 md:mt-12">
                            Back to School Supplies
                        </motion.h1>
                        <p className="md:mt-2 text-base md:text-lg font-medium text-white/80">Explore best school supplies for your kids.</p>
                        <button className="bg-white text-gray-700 font-medium px-6 py-2 text-lg md:text-xl mt-6 cursor-pointer rounded-full">Shope Now</button>
                        </div>
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="relative w-120 h-120 lg:block mt-0 hidden">
                            <Image src={"/images/school-supplies.png"} alt="Hero Image - Back-school-cartoon" fill className="object-contain -mt-22"/>
                        </motion.div>
                    </div>
                </div>

                {schoolSection && (
                <ProductsByCategory
                    title={schoolSection.title}
                    section={schoolSection.id}
                    initialProducts={schoolSection.products}
                />
                )}


                <div className="py-8 mb-10 px-4 bg-linear-to-l from-[#ff773c]/80 to-amber-500/80 md:w-full rounded-2xl sm:mt-6 lg:my-12 text-center flex flex-col items-center max-w-[90rem] mx-5 md:mx-auto md:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0, duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        {`Can't Decide? Try Our Bundles!`}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-base md:text-lg text-white mt-2 text-center">
                        Get amazing value with our carefully curated bundles that combine the best products for<br className="hidden sm:block"/>every age and interest.
                    </motion.p>
                    <button className="bg-white text-amber-500 cursor-pointer w-full md:w-fit px-4 py-2 md:px-6 md:py-4 rounded-full text-base sm:text-lg md:text-xl mt-12">View Bundles</button>
                </div>

               {bestSellers && (
                <ProductsByCategory
                    title={bestSellers.title}
                    section={bestSellers.id}
                    initialProducts={bestSellers.products}
                />
                )}
            </div>
        </section>
    )
}


const CategoryCard = ({ icon, theme, title, subtitle, delayIndex, image }:
    { icon?: React.ReactNode, theme?: string, title: string, subtitle: string, delayIndex: number, image: StaticImageData }) => {
    const router = useRouter();
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * (delayIndex + 1), duration: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => router.push(`/categories/${title.replace(/\s+/g, '_')}`)}
            className="flex flex-col items-center group cursor-pointer">
            <div className={`${theme} relative w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <Image src={image} alt={`${title}-category-image`} fill className="w-full h-full object-cover"/>
            </div>

            <h3 className="text-base sm:text-lg lg:text-xl font-bold mt-3 text-center text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                {title}
            </h3>
            
            {subtitle && (
                <p className="text-xs hidden md:block lg:text-sm text-gray-500 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-[120px] lg:max-w-[150px]">
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}

export default Categories;