import { motion } from "motion/react"
import Image from "next/image";

type ReviewProps = {
    name: {en: string, ar: string},
    description: {en: string, ar: string}, 
    price: number | "", 
    slug: string,
    discountPrice: number | "", 
    stock: number | "", 
    category: {en: string, ar: string}, 
    subcategory: {en: string, ar: string}, 
    tags: {en: string, ar: string}, 
    previews: string[]
}

const Review = ({name, description, price, slug, discountPrice, stock, category, subcategory, tags, previews}: ReviewProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Review Your Product</h4>

            <div className="bg-slate-50 rounded-lg p-4">
                <div className="space-y-3 grid grid-cols-3 mb-2">
                    <div>
                        <p className="text-base text-slate-700 font-medium">Product Name</p>
                        <p className="text-base text-slate-800 font-medium">{name.en}</p>
                        <p className="text-base text-slate-800 font-medium">{name.ar}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Slug</p>
                        <p className="text-base text-slate-800">{slug}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Description</p>
                        <p className="text-base text-slate-800 line-clamp-2">{description.en || "No description"}</p>
                        <p className="text-base text-slate-800 line-clamp-2">{description.ar || "No description"}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Price</p>
                        <p className="text-base text-slate-800 font-medium">{price} EGP</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Discount</p>
                        <p className="text-base text-slate-800">{discountPrice || "None"} {discountPrice && "EGP"}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Stock</p>
                        <p className="text-base text-slate-800">{stock}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Category</p>
                        <p className="text-base text-slate-800">{category.en}</p>
                        <p className="text-base text-slate-800">{category.ar}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Subcategory</p>
                        <p className="text-base text-slate-800">{subcategory.en || "None"}</p>
                        <p className="text-base text-slate-800">{subcategory.ar || "None"}</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-700 font-medium">Tags</p>
                        <p className="text-base text-slate-800">{tags.en || "No tags"}</p>
                        <p className="text-base text-slate-800">{tags.ar || "No tags"}</p>
                    </div>
                </div>
                {previews.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                        {previews.map((src, i) => (
                            <Image
                                key={i}
                                src={src}
                                alt="Product"
                                width={160}
                                height={160}
                                className="w-40 h-40 object-cover rounded-lg border border-slate-200"
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Review;