import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import React from "react";

type Translation = {
    en: string;
    ar: string;
};

type PrinceCategoriesProps = {
    price: number | "";
    setPrice: React.Dispatch<React.SetStateAction<number | "">>;
    redAlert: boolean;
    discountPrice: number | "";
    setDiscountPrice: React.Dispatch<React.SetStateAction<number | "">>;
    category: Translation;
    setCategory: React.Dispatch<React.SetStateAction<Translation>>;
    subcategory: Translation;
    setSubcategory: React.Dispatch<React.SetStateAction<Translation>>;
    previews: string[];
    setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setExistingImages: React.Dispatch<React.SetStateAction<string[]>>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PricingCategories = ({
    price,
    setPrice,
    redAlert,
    discountPrice,
    setDiscountPrice,
    category,
    setCategory,
    subcategory,
    setSubcategory,
    previews,
    setPreviews,
    setImageFiles,
    setExistingImages,
    handleFileChange
}: PrinceCategoriesProps) => {

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4">
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
                    <label className="block text-base font-medium text-slate-700 mb-2">Category (English) *</label>
                    <select
                        value={category.en}
                        onChange={(e) => setCategory((prev) => ({ ...prev, en: e.target.value }))}
                        className={twMerge(
                            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                            redAlert && !category.en ? "border-red-400 bg-red-50" : "border-slate-200"
                        )}
                    >
                        <option value="">Select Category</option>
                        <option value="School Supplies">School Supplies</option>
                        <option value="Toys & Games">Toys & Games</option>
                        <option value="Gifts">Gifts</option>
                    </select>
                    {redAlert && !category.en && (
                        <p className="text-base text-red-600 mt-1">Required field</p>
                    )}
                </div>
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">Category (Arabic) *</label>
                    <select
                        value={category.ar}
                        onChange={(e) => setCategory((prev) => ({ ...prev, ar: e.target.value }))}
                        className={twMerge(
                            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                            redAlert && !category.ar ? "border-red-400 bg-red-50" : "border-slate-200"
                        )}>
                        <option value="">اختر التصنيف</option>
                        <option value="School Supplies">أدوات مدرسية</option>
                        <option value="Toys & Games">ألعاب</option>
                        <option value="Gifts">هدايا</option>
                    </select>
                    {redAlert && !category.ar && (
                        <p className="text-base text-red-600 mt-1">Required field</p>
                    )}
                </div>
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">Subcategory (English)</label>
                    <select
                        value={subcategory.en}
                        onChange={(e) => setSubcategory((prev) => ({ ...prev, en: e.target.value }))}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">Subcategory (Arabic)</label>
                    <select
                        value={subcategory.ar}
                        onChange={(e) => setSubcategory((prev) => ({ ...prev, ar: e.target.value }))}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">اختر التصنيف الثانوي</option>
                        <option value="notebooks">دفاتر</option>
                        <option value="pens">اقلام</option>
                        <option value="rulers">مساطر</option>
                        <option value="backpacks">حقاءب </option>
                        <option value="board_games">العاب</option>
                        <option value="puzzles">الغاز</option>
                        <option value="action_figures">مجسمات</option>
                        <option value="dolls">عرائس</option>
                        <option value="gift_sets">هدايا</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-base font-medium text-slate-700 mb-2">Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
                {previews.length > 0 && (
                    <div className="flex gap-3 flex-wrap mt-3">
                        {previews.map((src, index) => (
                            <div key={src} className="relative">
                                <Image
                                    src={src}
                                    alt={`Preview ${index}`}
                                    width={120}
                                    height={120}
                                    className="w-32 h-32 object-cover rounded-lg border border-slate-200" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const isExistingImage = src.startsWith("http");

                                        setPreviews((prev) => prev.filter((_, i) => i !== index));

                                        if (isExistingImage) {
                                            setExistingImages((prev) =>
                                                prev.filter((url) => url !== src)
                                            );
                                        } else {
                                            setImageFiles((prev) =>
                                                prev.filter((_, i) => i !== index)
                                            );
                                        }
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </motion.div>
    )
};

export default PricingCategories;
