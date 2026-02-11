"use client";

import { Star } from "lucide-react";
import testimonials from "../../constants/testimonials.json"
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
    const { t } = useTranslation();
    return (
        <div className="overflow-hidden relative h-200 md:h-140 flex items-center justify-center flex-col bg-orange-50">
            {/* <img src="./images/testimonials-splash.jpg" alt="testimonials-splash-screen" className="w-full h-full object-cover absolute -z-10"/> */}
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 md:mt-4">
                {t("hero.testimonials")}
            </h1>
            <div className="max-w-5xl mx-auto py-12 grid md:grid-cols-3 grid-cols-1 gap-10 md:gap-8 mt-0 md:mt-10 px-8 md:px-6">
                {
                    testimonials.map((testimonial)=>(
                        <TestimonialsCard key={testimonial.id} id={testimonial.id} name={testimonial.name} testimonial={testimonial.text} rating={testimonial.rating} location={testimonial.location}/>
                    ))
                }
            </div>
        </div>
    )
};

const TestimonialsCard = ({name, testimonial, rating, location, id}: {name: string, testimonial: string, rating: number, location: string | null, id: number}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
            delay: 0.1 + id * 0.15,
            duration: 0.4,
            ease: "easeOut",
            }}
            className={twMerge("bg-white rounded-lg md:rounded-xl px-4 py-6 border-1 border-gray-200 shadow-md max-w-sm flex justify-center flex-col items-center text-center", id === 2 ? "z-20" : "z-10")}>
            <img src="./images/placeholder.jpg" alt="user-image" className="h-12 w-12 md:h-18 md:w-18 rounded-full object-cover -mt-10 md:-mt-14 border-1 border-gray-800"/>
            <h1 className="font-medium text-lg md:text-xl mt-2">{name}</h1>
            <p className="text-gray-700 text-xs md:text-sm leading-tight">{location}</p>
            <h3 className="md:mt-2 text-sm md:text-base text-gray-600">{testimonial}</h3>
            <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
                <Star
                size={24}
                key={i}
                className={`h-4 w-4 md:h-5 md:w-5 fill-current ${
                    i < Math.floor(rating ?? 0)
                    ? "text-yellow-500" 
                    : "text-gray-300"  
                }`}
                />
            ))}
            </div>
        </motion.div>
    )
}
 
export default Testimonials;
