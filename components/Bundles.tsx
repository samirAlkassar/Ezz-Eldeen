import { ShoppingCartIcon } from "lucide-react";
import dynamic from "next/dynamic";
const MotionH1 = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.h1), {ssr: false,}
);
const MotionP = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.p), {ssr: false,}
);
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div), {ssr: false,}
);
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl";

const bundles = [
    {
        title: "Gaming Fun Pack",
        desc: "Controllers, board games, puzzles & endless fun for kids and teens.",
        icon: "🎮",
        tag: "Best Value",
        image: "/images/supplies-bundle.png"
    },
    {
        title: "School Essentials",
        desc: "Everything students need: notebooks, pens, backpacks & more.",
        icon: "📚",
        tag: "Back to School",
        image: "/images/school-bundle.png"
    },
    {
        title: "Ultimate Kids Bundle",
        desc: "A perfect mix of learning and play. Best value for families.",
        icon: "✨",
        tag: "Save 25%",
        image: "/images/school-bundle.png"
    },
]


const Bundles = () => {
    const router = useRouter();
    const t = useTranslations("Home");

    return (
        <div id="bundles" className="bg-[#F8F7F5] px-4 w-full mb-10 md:mb-20 mt-4 flex flex-col items-center justify-center py-12">
            <MotionH1
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-semibold text-gray-800 md:mt-2 tracking-[-0.9px] md:tracking-normal">
                {t("cantDecide")}
            </MotionH1>

            <MotionP
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-text-muted-foreground text-center mt-1 md:mt-2 max-w-xl text-base md:text-lg leading-relaxed">
                {t("cantDecideSubtitle")}
            </MotionP>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-6 mt-12 mx-auto max-w-300">
                {bundles.map((bundle, i) => (
                    <BundleCard key={bundle.title} index={i} bundle={bundle} />
                ))}
            </div>

            <button
                onClick={() => { router.push("/categories/bundles") }}
                className="bg-gray-900 text-white cursor-pointer px-4 md:px-6 py-2.5 md:py-3 rounded-full text-base md:text-lg font-medium md:font-semibold mt-8 md:mt-12 transition">
                {t("viewAllBundles")}
            </button>
        </div>
    )
};


type BundleCardProps = {
    bundle: {
        title: string,
        tag: string,
        icon: string,
        desc: string,
        image: string
    };
    index: number
};

const BundleCard = ({ bundle, index }: BundleCardProps) => {
    const t = useTranslations("Home");
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white relative overflow-hidden rounded-xl text-left h-90 w-full md:h-100 md:w-90 shadow-lg flex flex-col justify-between">
                <span className="text-sm font-medium bg-black text-white rounded-full px-2 py-0.5 top-2 left-2 absolute z-10">{bundle.tag}</span>
                <div className="relative w-full h-full bg-violet-500 cursor-pointer hover:[&_img]:scale-[103%]">
                    <Image src={bundle.image} alt="" fill className="absolute w-full h-full object-cover transition-all duration-200 ease-in"/>
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-medium text-text">{bundle.title}</h3>
                    <p className="text-text-brown mt-1 text-sm">{bundle.desc}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex ml-4">
                            <img src={"/images/school-bundle.png"} alt="" className="w-12 h-12 bg-green-400 block rounded-full border-3 border-white -ml-4 object-cover"/>
                            <img src={"/images/school-bundle.png"} alt="" className="w-12 h-12 bg-green-400 block rounded-full border-3 border-white -ml-4 object-cover"/>
                            <img src={"/images/school-bundle.png"} alt="" className="w-12 h-12 bg-green-400 block rounded-full border-3 border-white -ml-4 object-cover"/>
                        </div>
                        <p className="text-sm text-text-brown">+3 itmes</p>
                    </div>

                    <div className="flex gap-2 items-start mt-2 justify-between">
                        <span className="block">
                            <p className="text-xs text-text-brown line-through">60 EGP</p>
                            <p className="text-xl font-semibold text-primary">45 EGP</p>
                        </span>
                        <button className="flex items-center justify-center gap-2 text-base cursor-pointer font-medium bg-primary hover:bg-amber-600 transition text-white rounded-xl py-2 px-3">
                            <ShoppingCartIcon size={20} />
                            <p>{t("addBundle")}</p>
                        </button>
                    </div>
                </div>
        </MotionDiv>
    )
};

export default Bundles
