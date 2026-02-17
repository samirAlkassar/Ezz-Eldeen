import { ProductType } from "@/features/products/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
const MotionButton = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.button), {ssr: false,}
);
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useLocale } from "next-intl";

const Thumbnails = ({product, setImageIndex}: {product: ProductType, setImageIndex: (value: number)=>void}) => {
    const [selectedImage, setSelectedImage] = useState<number>();
    const lang = useLocale();
    const splideOptions = {
        type: "slide",
        perPage: 5,
        perMove: 1,
        pagination: false,
        arrows: true,
        drag: true,
        gap: "0rem",
        speed: 700,
        snap: true,
        direction: lang === "en" ? 'ltr' : 'rtl',
        flickPower: 900 ,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        breakpoints: {
            1276: { perPage: 9},
            430: { perPage: 4 },
        },
    };
    return (
        <div className="">
            <Splide options={splideOptions}>
                {product?.images.map((img, index) => (
                    <SplideSlide key={index}>
                        <MotionButton
                            onClick={() => {setSelectedImage(index); setImageIndex(index)}}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative min-w-18 min-h-18 max-w-18 max-h-18 md:min-w-26 md:min-h-26 md:max-w-26 md:max-h-26 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                selectedImage === index 
                                ? "border-orange-400 shadow-lg" 
                                : "border-gray-200/50 hover:border-gray-200/50"
                            }`}>
                            
                                <Image src={img?.url} alt={`${img?.alt}`} fill className="w-full h-full object-cover" />
                        </MotionButton>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    )
};

export default Thumbnails;