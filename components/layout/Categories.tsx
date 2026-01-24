"use client";

import Products from "./Products"
import { Car, Gift, GraduationCap, Group } from "lucide-react";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";
import ProductsByCategory from "../ProductsByCategory";
import Image from "next/image";

export const categoriesList = [
    {
        title: "School Supplies",
        subtitle: "Everything your little scholar needs",
        icon: <GraduationCap size={26} />,
        sectionIcon: <GraduationCap size={56} />,
        theme: "bg-gradient-to-l from-[#6eCe7e] to-[#3ba94d]",
        buttonText: "Explore School Supplies",
        subcategories: ["Notebooks", "Pencils & Pens", "Art Supplies", "Backpacks"]
    },
    {
        title: "Toys & Games",
        subtitle: "Fun games and educational toys for your kids",
        icon: <Car size={26} />,
        sectionIcon: <Car size={56} />,
        theme: "bg-gradient-to-l from-[#9D4EDD] to-[#7b2cbf]",
        buttonText: "Explore Toys & Games",
        subcategories: ["Building Blocks", "Board Games", "Action Figures", "Puzzles"]
    },
    {
        title: "Gifts",
        subtitle: "Perfect presents for special moments",
        icon: <Gift size={26} />,
        sectionIcon: <Gift size={56} />,
        theme: "bg-gradient-to-l from-[#ff6f61] to-[#ff4858]",
        buttonText: "Explore Gifts",
        subcategories: ["Birthday Gifts", "Holiday Gifts", "Personalized Items", "Gift Sets"]
    },
    {
        title: "Bundles",
        subtitle: "Amazing deals and combo packages",
        icon: <Group size={26} />,
        sectionIcon: <Group size={56} />,
        theme: "bg-gradient-to-l from-[#4D96FF] to-[#2563eb]",
        buttonText: "Explore Bundles",
        subcategories: ["School Starter Packs", "Play & Learn Sets", "Gift Bundles", "Seasonal Packages"]
    }
]



const Categories = () => {
    const router = useRouter()
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full mt-8 max-w-[90rem] mx-auto px-4 md:px-8">
                    {categoriesList.map((category, index) => (
                        <CategoryCard
                            key={index}
                            delayIndex={index}
                            title={category.title}
                            subtitle={category.subtitle}
                            icon={category.icon}
                            theme={category.theme}
                        />
                    ))}
                </div>

                <div id={"startshopping"} className="pb-20 pt-20 md:pt-40 w-full flex flex-col items-center max-w-[90rem] mx-auto px-4 md:px-8">
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
                        className="text-base lg:text-xl text-[#2B303B]/80 mt-0 md:mt-3 text-center">
                        Discover our most popular items <span className="hidden md:inline">that kids and parents love!</span>
                    </motion.p>
                    <Products />
                    
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
                
                <ProductsByCategory title="Games & Toys" section="games"/>

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

                <ProductsByCategory title="School Supplies" section="school"/>

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

                <ProductsByCategory title="Best Sellers" section="rating"/>
            </div>
        </section>
    )
}


const CategoryCard = ({ icon, theme, title, subtitle, delayIndex }:
    { icon?: React.ReactNode, theme?: string, title: string, subtitle: string, delayIndex: number }) => {
    const router = useRouter();
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * (delayIndex + 1), duration: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => router.push(`/categories/${title.replace(/\s+/g, '_')}`)}>
            <div className={`${theme} flex flex-col rounded-lg p-3 lg:px-4 lg:py-6 h-full border-2 relative hover:[&_span]:scale-120 md:hover:scale-105 hover:scale-[102%] hover:shadow-md cursor-pointer transition-all duration-100 ease-in`}>
            <div className="absolute inset-0 border-b-4 border-neutral-500 rounded-lg pointer-events-none " />
            {icon && <span className="text-4xl text-white bg-white/20 w-fit p-2 rounded-md">{icon}</span>}
            <h3 className="text-white text-2xl font-bold mt-4">{title}</h3>
            <p className="text-white text-sm lg:text-base">{subtitle}</p>
            </div>
        </motion.div>
    )
}

export default Categories;