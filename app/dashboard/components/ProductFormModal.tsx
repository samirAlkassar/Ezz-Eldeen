import { ChevronLeft, Pencil, Rocket, X } from "lucide-react";
import { Product, ProductUpdatePayload } from "../page";
import { useState } from "react";
import React from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/components/Toast";
import Image from "next/image";

type ProductFormModalProps = {
    onClose: () => void;
    onSaved: () => void;
    existing: Product | null;
    createProduct: (payload: FormData) => Promise<void>;
    patchProduct: (id: string, payload: ProductUpdatePayload | FormData) => Promise<void>;
};

function ProductFormModal({ onClose, onSaved, existing, createProduct, patchProduct }: ProductFormModalProps) {
    const isEdit = !!existing;
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
        1: false,
        2: false,
    });
    const [redAlert, setRedAlert] = useState<boolean>(false);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState(existing?.name ?? "");
    const [slug, setSlug] = useState(existing?.slug ?? "");
    const [description, setDescription] = useState(existing?.description ?? "");
    const [price, setPrice] = useState<number | "">(existing?.price ?? "");
    const [discountPrice, setDiscountPrice] = useState<number | "">(existing?.discountPrice ?? "");
    const [stock, setStock] = useState<number | "">(existing?.stock ?? "");
    const [tags, setTags] = useState(existing?.tags?.join(", ") ?? "");
    const [category, setCategory] = useState(existing?.category ?? "");
    const [subcategory, setSubcategory] = useState(existing?.subcategory ?? "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(existing?.images?.[0]?.url ?? null);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const validateStep = (step: number) => {
        if (step === 1) {
            return name.trim() !== "" && slug.trim() !== "" && stock !== "";
        }
        if (step === 2) {
            return price !== "" && category.trim() !== "";
        }
        return true;
    };

    const parseTags = (tags: string): string[] => tags.split(",").map(tag => tag.trim()).filter(Boolean);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEdit) {
                if (imageFile) {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("slug", slug);
                    formData.append("description", description);
                    formData.append("price", String(price));
                    formData.append("discountPrice", String(discountPrice));
                    formData.append("stock", String(stock));
                    formData.append("tags", tags);
                    formData.append("category", category);
                    formData.append("subcategory", subcategory);
                    formData.append("images", imageFile);
                    await patchProduct(existing._id, formData);
                } else {
                    const payload: ProductUpdatePayload = {
                        name, slug, description,
                        price: Number(price),
                        discountPrice: Number(discountPrice),
                        stock: Number(stock),
                        tags: parseTags(tags),
                        category,
                        subcategory,
                    };
                    await patchProduct(existing._id, payload);
                }
                toast({title: "Product edited", description: "Product is Updated Successfully",variant:"default", icon: <Pencil />, position: "bottom-right"})
            
            } else {
                const formData: FormData = new FormData();
                formData.append("name", name);
                formData.append("slug", slug);
                formData.append("description", description);
                formData.append("price", String(price));
                formData.append("discountPrice", String(discountPrice));
                formData.append("stock", String(stock));
                const tagArray = parseTags(tags);
                formData.append("tags", JSON.stringify(tagArray));
                formData.append("category", category);
                formData.append("subcategory", subcategory);
                if (imageFile) formData.append("images", imageFile);
                await createProduct(formData);
                toast({title: "New Product", description: "New Product created Successfully",variant: "success" ,icon: <Rocket />, position: "bottom-right"})
            }
            onSaved();
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Save failed");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.6 , transition: {duration: 0.1}}} 
                transition={{duration: 0.2}}
                className="bg-white rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-800">{isEdit ? "Edit Product" : "Add New Product"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-150 cursor-pointer">
                        <X size={20} className="text-slate-600" />
                    </button>
                </div>

                {/* Steps Navigation */}
                <div className="w-full px-6 py-4 pb-8 flex items-center justify-center border-b border-slate-100">
                    {[1, 2, 3].map((step) => (
                        <React.Fragment key={step}>
                            <div
                                onClick={() => {
                                    if (completedSteps[step - 1] || step === 1) {
                                        setCurrentStep(step);
                                        setRedAlert(false);
                                    }
                                }}
                                className={twMerge(
                                    "relative rounded-full w-10 h-10 flex items-center border-2 justify-center font-semibold transition-all duration-200",
                                    currentStep === step
                                        ? "bg-blue-500 text-white border-blue-500 scale-110"
                                        : completedSteps[step]
                                            ? "bg-green-500 text-white border-green-500 cursor-pointer hover:scale-105"
                                            : "bg-white border-slate-300 text-slate-400 cursor-default"
                                )}
                            >
                                {completedSteps[step] ? (
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </motion.svg>
                                ) : (
                                    step
                                )}
                                <span className={twMerge(
                                    "absolute -bottom-6 text-base font-medium whitespace-nowrap",
                                    currentStep === step ? "text-blue-600" : "text-slate-400"
                                )}>
                                    {step === 1 ? "Basic Info" : step === 2 ? "Pricing" : "Review"}
                                </span>
                            </div>
                            {step !== 3 && (
                                <div className={twMerge(
                                    "h-0.5 w-24 rounded-full transition-all duration-300",
                                    completedSteps[step] ? "bg-green-500" : "bg-slate-200"
                                )} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form Content */}
                <div className="overflow-y-auto flex-1 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-between">
                        <div>
                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">
                                                Product Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={twMerge(
                                                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                                                    redAlert && !name.trim() ? "border-red-400 bg-red-50" : "border-slate-200"
                                                )}
                                            />
                                            {redAlert && !name.trim() && (
                                                <p className="text-base text-red-600 mt-1">Required field</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Slug *</label>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                className={twMerge(
                                                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                                                    redAlert && !slug.trim() ? "border-red-400 bg-red-50" : "border-slate-200"
                                                )}
                                            />
                                            {redAlert && !slug.trim() && (
                                                <p className="text-base text-red-600 mt-1">Required field</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-slate-700 mb-2">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Stock *</label>
                                            <input
                                                type="number"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value ? Number(e.target.value) : "")}
                                                className={twMerge(
                                                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                                                    redAlert && stock === "" ? "border-red-400 bg-red-50" : "border-slate-200"
                                                )}
                                            />
                                            {redAlert && stock === "" && (
                                                <p className="text-base text-red-600 mt-1">Required field</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Tags</label>
                                            <input
                                                type="text"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                                placeholder="Comma separated"
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Pricing & Category */}
                            {currentStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Price (EGP) *</label>
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                                                className={twMerge(
                                                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                                                    redAlert && price === "" ? "border-red-400 bg-red-50" : "border-slate-200"
                                                )}
                                            />
                                            {redAlert && price === "" && (
                                                <p className="text-base text-red-600 mt-1">Required field</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Discount Price (EGP)</label>
                                            <input
                                                type="number"
                                                value={discountPrice}
                                                onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : "")}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Category *</label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className={twMerge(
                                                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                                                    redAlert && !category ? "border-red-400 bg-red-50" : "border-slate-200"
                                                )}
                                            >
                                                <option value="">Select Category</option>
                                                <option value="School Supplies">School Supplies</option>
                                                <option value="Toys & Games">Toys & Games</option>
                                                <option value="Gifts">Gifts</option>
                                            </select>
                                            {redAlert && !category && (
                                                <p className="text-base text-red-600 mt-1">Required field</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-base font-medium text-slate-700 mb-2">Subcategory</label>
                                            <select
                                                value={subcategory}
                                                onChange={(e) => setSubcategory(e.target.value)}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select Subcategory</option>
                                                <option value="notebooks">Notebooks</option>
                                                <option value="pens">Pens & Pencils</option>
                                                <option value="rulers">Rulers</option>
                                                <option value="backpacks">Backpacks</option>
                                                <option value="board_games">Board Games</option>
                                                <option value="puzzles">Puzzles</option>
                                                <option value="action_figures">Action Figures</option>
                                                <option value="dolls">Dolls</option>
                                                <option value="gift_sets">Gift Sets</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-slate-700 mb-2">Product Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {preview && (
                                            <Image src={preview} alt="Preview" fill className="mt-3 w-32 h-32 object-cover rounded-lg border border-slate-200" />
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Review */}
                            {currentStep === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-3"
                                >
                                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Review Your Product</h4>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <div className="space-y-3 grid grid-cols-3 mb-2">
                                            <div>
                                                <p className="text-base text-slate-700 font-medium">Product Name</p>
                                                <p className="text-base text-slate-800 font-medium">{name}</p>
                                            </div>
                                            <div>
                                                <p className="text-base text-slate-700 font-medium">Slug</p>
                                                <p className="text-base text-slate-800">{slug}</p>
                                            </div>
                                            <div>
                                                <p className="text-base text-slate-700 font-medium">Description</p>
                                                <p className="text-base text-slate-800 line-clamp-2">{description || "No description"}</p>
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
                                                <p className="text-base text-slate-800">{category}</p>
                                            </div>
                                            <div>
                                                <p className="text-base text-slate-700 font-medium">Subcategory</p>
                                                <p className="text-base text-slate-800">{subcategory || "None"}</p>
                                            </div>
                                            <div>
                                                <p className="text-base text-slate-700 font-medium">Tags</p>
                                                <p className="text-base text-slate-800">{tags || "No tags"}</p>
                                            </div>
                                        </div>
                                        {preview && (
                                            <div>
                                                <p className="text-base text-slate-700 font-medium mb-2">Product Image</p>
                                                <Image src={preview} alt="Product" fill className="w-40 h-40 object-cover rounded-lg border border-slate-200" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentStep > 1) {
                                        setCurrentStep(currentStep - 1);
                                        setRedAlert(false);
                                    } else {
                                        onClose();
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150 cursor-pointer"
                            >
                                {currentStep > 1 && <ChevronLeft size={18} />}
                                {currentStep === 1 ? "Cancel" : "Previous"}
                            </button>

                            {currentStep < 3 ? (
                                <div
                                    onClick={() => {
                                        if (!validateStep(currentStep)) {
                                            setRedAlert(true);
                                        } else {
                                            setCompletedSteps(prev => ({ ...prev, [currentStep]: true }));
                                            setCurrentStep(currentStep + 1);
                                            setRedAlert(false);
                                        }
                                    }}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 cursor-pointer"
                                >
                                    Next Step
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
                                >
                                    {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default ProductFormModal;