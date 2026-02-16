"use client";

import { ExternalLink, Quote, Star } from "lucide-react";
import testimonials from "../../constants/testimonials.json"
import dynamic from "next/dynamic";
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div), {ssr: false,}
);

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Testimonials = () => {
    const t = useTranslations("Home.testimonials");

    const splideOptions = {
        type: "slide",
        perPage: 1,
        start: 1,
        perMove: 1,
        focus: "center",  
        pagination: true,
        arrows: true,
        drag: true,
        gap: "0rem",        
        padding: "0rem",    
        speed: 700,
        snap: true,
        flickPower: 900,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    };


    return (
        <div className="overflow-hidden relative py-12 px-4 flex items-center justify-center flex-col bg-[#F8F7F5]">
            <p className="text-primary uppercase text-sm md:text-base tracking-[1.4px] leading-5 font-bold">
                {t("communityStories")}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 md:mt-2 tracking-[-0.9px] md:tracking-normal">
                {t("title")}
            </h1>
            <p className="text-text-muted-foreground text-center mt-1 md:mt-2 max-w-xl text-base md:text-lg leading-relaxed">
                {t("subTitle")}
            </p>
            <div className="testimonials-wrapper max-w-6xl mx-auto pt-6 md:py-12 grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:gap-y-0 px-8 md:px-6 hidden! md:grid!">
                {
                    testimonials.map((testimonial)=>(
                        <TestimonialsCard key={testimonial.id} id={testimonial.id} name={testimonial.name} testimonial={testimonial.text} rating={testimonial.rating} location={testimonial.location}/>
                    ))
                }
            </div>

            {/* cards slide */}
            <div className="slider-container mt-4 md:mt-6 block md:hidden relative">
                <span className="absolute h-full w-15 z-10 bg-linear-90 from-[#F8F7F5] to-transparent"/>
                <Splide
                options={splideOptions}>
                {
                    testimonials.map((testimonial)=>(
                        <SplideSlide key={testimonial.id}>
                            <div className="pt-2 pb-6 scale-95 max-w-xs mx-auto">
                                <TestimonialsCard key={testimonial.id} id={testimonial.id} name={testimonial.name} testimonial={testimonial.text} rating={testimonial.rating} location={testimonial.location}/>
                            </div>
                        </SplideSlide>
                    ))
                }
                </Splide>
                <span className="absolute h-full w-15 z-10 bg-linear-90 from-transparent to-[#F8F7F5] right-0 top-0"/>
            </div>

            <button className="orange-button text-white px-5 py-3 mt-6 md:mt-0 text-xl cursor-pointer">
                {t("cta")}
            </button>
            <span className="flex gap-1 items-center justify-center mt-3 text-text-brown/80">
                <p className="text-xs md:text-sm">
                    {t("ctaDescription")}
                </p>
                <ExternalLink size={14}/>
            </span>

        </div>
    )
};

const TestimonialsCard = ({name, testimonial, rating, location, id}: {name: string, testimonial: string, rating: number, location: string | null, id: number}) => {
    const t = useTranslations("Home.testimonials");
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
            delay: 0.1 + id * 0.15,
            duration: 0.4,
            ease: "easeOut",
            }}
            className="testimonial-box bg-white rounded-3xl md:rounded-2xl px-4 py-6 grid shadow-md shadow-text-muted-foreground/20 text-center max-w-sm">
            <div className="flex items-center justify-center flex-col">
                <div className="relative h-16 w-16 md:h-18 md:w-18  border-2 border-primary rounded-full overflow-hidden">
                    <Image src="/images/placeholder.jpg" 
                        alt="user-image" 
                        fill
                        className="w-full h-full object-cover absolute"/>
                </div>

                <span className="text-xs text-primary font-medium bg-primary/8 px-2 py-0.5 rounded-full uppercase mt-3">
                    {t("verifiedPurchase")}
                </span>
                <Quote size={24} className="text-primary mt-3 fill-current opacity-30" />
            </div>
            <h3 className="md:mt-2 text-base md:text-[18px] text-text font-medium leading-[27.5px] tracking-normal">{`"${testimonial}"`}</h3>
                <h1 className="font-medium text-sm md:text-base mt-4">{name}</h1>
                <p className="text-text-muted text-xs md:text-sm leading-tight">{location}</p>
                <div className="flex gap-0.5 mt-2 justify-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                        key={i}
                        size={30}
                        className={`h-4 w-4 fill-current ${
                            i < Math.floor(rating ?? 0)
                            ? "text-primary/50" 
                            : "text-text-muted-foreground/50"  
                        }`}
                        />
                    ))}
                </div>
        </MotionDiv>
    )
}
 
export default Testimonials;
