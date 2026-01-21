"use client";

import { Star } from "lucide-react";
import testimonials from "../../constants/testimonials.json"
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const Testimonials = () => {
    return (
        <div className="overflow-hidden relative h-150 flex items-center justify-center flex-col">
            <img src="./images/testimonials-splash.jpg" alt="testimonials-splash-screen" className="w-full h-full object-cover absolute -z-10"/>
            <h1 className="text-3xl font-semibold text-gray-800">
                Testimonials <span className="text-gray-700">from our clients</span>
            </h1>
            <div className="max-w-5xl mx-auto py-12 grid grid-cols-3 gap-8 mt-12">
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
            delay: 0.3 + id * 0.15,
            duration: 0.4,
            ease: "easeOut",
            }}
            className={twMerge("bg-white rounded-xl px-4 py-6 border-1 border-gray-200 shadow-md", id === 2 ? "z-20" : "z-10")}>
            <img src="./images/login-splash.jpg" alt="" className="h-14 w-14 rounded-full object-cover -mt-14 border-1 border-gray-800"/>
            <h1 className="font-medium text-xl mt-2">{name}</h1>
            <p className="text-gray-700 text-sm leading-tight">{location}</p>
            <h3 className="mt-2 text-base">{testimonial}</h3>
            <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
                <Star
                size={24}
                key={i}
                className={`h-5 w-5 fill-current ${
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
