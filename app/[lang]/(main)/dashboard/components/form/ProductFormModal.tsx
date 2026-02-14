import { Pencil, Rocket, X } from "lucide-react";
import { useState } from "react";
import React from "react";
import { motion } from "motion/react";
import { useToast } from "@/components/Toast";
import { Product, ProductUpdatePayload } from "@/features/admin/types";
import FormNavigation from "./formNavigation";
import BasicInfo from "./BasicInfo";
import PricingCategories from "./PricingCategories";
import Review from "./Review";
import NavigationButtons from "./NavigationButtons";

type ProductFormModalProps = {
    onClose: () => void;
    onSaved: () => void;
    existing: Product | null;
    createProduct: (payload: FormData) => Promise<void>;
    patchProduct: (id: string, payload: ProductUpdatePayload | FormData) => Promise<void>;
};

function ProductFormModal({ onClose, onSaved, existing, createProduct, patchProduct }: ProductFormModalProps) {
    console.log("🟦 Existing product in modal:", existing);
    const isEdit = !!existing;
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
        1: false,
        2: false,
    });

    const [redAlert, setRedAlert] = useState<boolean>(false);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState<{ar: string, en: string}>({
        ar: existing?.name.ar ?? "",
        en: existing?.name.en ?? ""
    });
    const [slug, setSlug] = useState(existing?.slug ?? "");
    const [description, setDescription] = useState({
        ar: existing?.description?.ar ?? "",
        en: existing?.description?.en ?? ""
    });
    const [price, setPrice] = useState<number | "">(existing?.price ?? "");
    const [discountPrice, setDiscountPrice] = useState<number | "">(existing?.discountPrice ?? "");
    const [stock, setStock] = useState<number | "">(existing?.stock ?? "");
    const [tags, setTags] = useState({
        ar: existing?.tags?.ar.join(", ") ?? "",
        en: existing?.tags?.en.join(", ") ?? ""
    });
    const [category, setCategory] = useState({
        ar: existing?.category?.ar ?? "",
        en: existing?.category?.en ?? ""
    });
    const [subcategory, setSubcategory] = useState({
        ar: existing?.subcategory?.ar ?? "",
        en: existing?.subcategory?.en ?? ""
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(
        existing?.images?.map(img => img.url) ?? []
    );
    console.log("⭐existing images:", existing?.images?.length);
    console.log("☀️existing images:", existingImages?.length);

    console.log("🟠 Existing images:", existingImages);
    const [previews, setPreviews] = useState<string[]>([
        ...(existing?.images?.map(img => img.url) ?? [])
    ]);
    const { toast } = useToast();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
        setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };




    const validateStep = (step: number) => {
        if (step === 1) {
            return name.ar.trim() !== "" && name.en.trim() !== "" && slug.trim() !== "" && stock !== "";
        }
        if (step === 2) {
            return price !== "" && category.en.trim() !== "" && category.ar.trim() !== "";
        }
        return true;
    };

    const parseTags = (tags: string): string[] => tags.split(",").map(tag => tag.trim()).filter(Boolean);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (isEdit) {
                // ✅ Check if there are NEW images uploaded
                if ((imageFiles.length > 0) || (existingImages.length !== existing?.images?.length)) {
                    const formData = new FormData();
                    formData.append("name", JSON.stringify(name));
                    formData.append("slug", slug);
                    formData.append("description", JSON.stringify(description));
                    formData.append("price", String(price));
                    formData.append("discountPrice", String(discountPrice));
                    formData.append("stock", String(stock));
                    formData.append("tags", JSON.stringify(tags));
                    formData.append("category", JSON.stringify(category));
                    formData.append("subcategory", JSON.stringify(subcategory));

                    // Append existing image URLs
                    formData.append("existingImages", JSON.stringify(existingImages));


                    // Append new files if any
                    imageFiles.forEach(file => {
                        formData.append("images", file);
                    });

                    console.log("🟩 FormData entries:");
                    for (const [key, value] of formData.entries()) {
                        try {
                            const parsed = JSON.parse(value as string);
                            console.log(`🟥${key}:`, parsed);
                        } catch {
                            console.log(`🟥${key}:`, value);
                        }
                    }

                    await patchProduct(existing._id, formData);
                } else {
                    // No new  - send JSON payload
                    console.log("🔫 no new image entery:");
                    const payload: ProductUpdatePayload = {
                        name,
                        slug,
                        description,
                        price: Number(price),
                        discountPrice: Number(discountPrice),
                        stock: Number(stock),
                        tags: {
                            ar: parseTags(tags.ar),
                            en: parseTags(tags.en)
                        },
                        category,
                        subcategory,
                        existingImages,
                    };

                    await patchProduct(existing._id, payload);
                }

                toast({
                    title: "Product edited",
                    description: "Product updated successfully",
                    variant: "default",
                    icon: <Pencil />,
                    position: "bottom-right"
                });
            } else {
                // Create new product logic (unchanged)
                const formData = new FormData();
                formData.append("name", JSON.stringify({ ar: name.ar, en: name.en }));
                formData.append("slug", slug);
                formData.append("description", JSON.stringify(description));
                formData.append("price", String(price));
                formData.append("stock", String(stock));

                if (discountPrice !== "") {
                    formData.append("discountPrice", String(discountPrice));
                }

                formData.append("tags", JSON.stringify({
                    en: parseTags(tags.en),
                    ar: parseTags(tags.ar),
                }));
                formData.append("category", JSON.stringify({ar: category.ar, en: category.en}));
                formData.append("subcategory", JSON.stringify({ar: subcategory.ar, en: subcategory.en}));

                imageFiles.forEach(file => {
                    formData.append("images", file);
                });
                console.log("🟨 FormData entries:");
                    for (const [key, value] of formData.entries()) {
                        try {
                            const parsed = JSON.parse(value as string);
                            console.log(`🟥${key}:`, parsed);
                        } catch {
                            console.log(`🟥${key}:`, value);
                        }
                    };

                await createProduct(formData);


                toast({
                    title: "New Product",
                    description: "New product created successfully",
                    variant: "success",
                    icon: <Rocket />,
                    position: "bottom-right"
                });
            }

            onSaved();
        } catch (err: unknown) {
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
                exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.1 } }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-4 md:px-6 py-2 md:py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-medium md:font-bold text-slate-800">{isEdit ? "Edit Product" : "Add New Product"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-150 cursor-pointer">
                        <X size={20} className="text-slate-600" />
                    </button>
                </div>

                <FormNavigation 
                    completedSteps={completedSteps} 
                    setCurrentStep={setCurrentStep} 
                    setRedAlert={setRedAlert} 
                    currentStep={currentStep}/>

                <div className="overflow-y-auto flex-1 p-4 md:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-between">
                        <div>
                            {currentStep === 1 && (
                                <BasicInfo 
                                    setName={setName} 
                                    name={name} 
                                    redAlert={redAlert} 
                                    setSlug={setSlug} 
                                    slug={slug} 
                                    setStock={setStock} 
                                    stock={stock} 
                                    description={description} 
                                    setDescription={setDescription} 
                                    setTags={setTags} 
                                    tags={tags}/>
                            )}

                            {currentStep === 2 && (
                                <PricingCategories 
                                    price={price}
                                    setPrice={setPrice} 
                                    redAlert={redAlert} 
                                    discountPrice={discountPrice}
                                    setDiscountPrice={setDiscountPrice}
                                    category={category}
                                    setCategory={setCategory} 
                                    subcategory={subcategory}
                                    setSubcategory={setSubcategory}
                                    previews={previews}
                                    setPreviews={setPreviews} 
                                    setImageFiles={setImageFiles}
                                    setExistingImages={setExistingImages}
                                    handleFileChange={handleFileChange}
                                />
                            )}

                            {currentStep === 3 && (
                                <Review 
                                    name={name}
                                    description={description}
                                    price={price}
                                    slug={slug}
                                    discountPrice={discountPrice}
                                    stock={stock}
                                    category={category}
                                    subcategory={subcategory}
                                    tags={tags}
                                    previews={previews}
                                />
                            )}
                        </div>

                        <NavigationButtons 
                            currentStep={currentStep}  
                            setCurrentStep={setCurrentStep}
                            setRedAlert={setRedAlert}
                            onClose={onClose}
                            validateStep={validateStep}
                            setCompletedSteps={setCompletedSteps}
                            saving={saving}
                            isEdit={isEdit}
                        />
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default ProductFormModal;