import { motion } from "motion/react"
import { useRouter } from "next/navigation"

const bundles = [
    {
        title: "Gaming Fun Pack",
        desc: "Controllers, board games, puzzles & endless fun for kids and teens.",
        icon: "🎮",
        tag: "Best for Games",
    },
    {
        title: "School Essentials",
        desc: "Everything students need: notebooks, pens, backpacks & more.",
        icon: "📚",
        tag: "Back to School",
    },
    {
        title: "Ultimate Kids Bundle",
        desc: "A perfect mix of learning and play. Best value for families.",
        icon: "✨",
        tag: "Best Value",
    },
]


const Bundles = () => {
    const router = useRouter();

    return (
        <div id="bundles" className="bg-linear-30 from-orange-400/5 via-orange-500/5 to-orange-400/5 px-4 w-full mb-10 md:mb-20 mt-4 flex flex-col items-center justify-center py-12">
            <motion.h1
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-bold text-gray-800">
                {`Can’t Decide? Try Our Bundles!`}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-base md:text-lg text-gray-700 mt-2 max-w-2xl">
                Save more with curated bundles designed for fun, learning, and growing minds.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full mx-auto max-w-[75rem]">
                {bundles.map((bundle, i) => (
                    <BundleCard key={bundle.title} index={i} bundle={bundle}/>
                ))}
            </div>

            <button 
                onClick={()=>{router.push("/categories/bundles")}}
                className="bg-gray-900 text-white cursor-pointer px-6 py-3 rounded-full text-lg font-semibold mt-12 transition">
                View All Bundles
            </button>
        </div>
    )
};


type BundleCardProps = {
    bundle: {
        title: string,
        tag: string,
        icon: string,
        desc: string
    };
    index: number
};

const BundleCard = ({bundle, index}: BundleCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 text-left shadow-lg flex flex-col justify-between">
            <div>
                <span className="text-sm font-semibold text-amber-500">{bundle.tag}</span>
                <img src={"./images/school-bundle.jpg"} alt="" />
                <h3 className="text-xl font-bold mt-4 text-gray-800">{bundle.title}</h3>
                <p className="text-gray-600 mt-2">{bundle.desc}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
                <button className="mt-6 text-base cursor-pointer font-medium bg-red-500 hover:bg-red-600 transition text-white rounded-full py-3 w-full">
                    View Details
                </button>
                <button className="mt-6 text-base cursor-pointer font-medium bg-amber-500 hover:bg-amber-600 transition text-white rounded-full py-3 w-full">
                    Add to cart
                </button>
            </div>

        </motion.div>
    )
};

export default Bundles
