import { Check } from "lucide-react";
import { motion } from "motion/react"

type FeaturesProps = {
    activeTab: "description" | "features" | "reviews" | "add-review";
    features:  string[];
}

const FeaturesTab = ({features, activeTab}:FeaturesProps) => {
    return (
        <>
        {activeTab === "features" && (
            features.length < 0 ?
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {features.map((feature, index) => (
            <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 text-gray-700 text-lg bg-orange-50/80 p-4 rounded-xl"
            >
                <Check className="h-5 w-5 text-green-500 mt-1" />
                <p>{feature}</p>
            </motion.li>
            ))}
        </ul> :
        <p className="text-2xl text-gray-600 text-center">No Features Avaliable</p>
        )}
        </>
    );
}

export default FeaturesTab;