import { ProductType } from "@/features/products/types";

type DescriptionProps = {
    activeTab: "description" | "features" | "reviews" | "add-review";
    product:  ProductType | null;
}

const Description = ({activeTab, product}:DescriptionProps) => {
    return (
        <>
        {activeTab === "description" && (
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed max-w-4xl">
                {product?.description}
            </p>
            )}
        </>
    )
};

export default Description;