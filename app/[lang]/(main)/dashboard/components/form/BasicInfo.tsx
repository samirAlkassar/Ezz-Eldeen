import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

type BasicInfoProps = {
    setName: (value: {en: string, ar: string}) => void, 
    name: {en: string, ar: string}, 
    redAlert: boolean, 
    setSlug: (value: string) => void, 
    slug: string, 
    setStock: (vlue: number) => void, 
    stock: number | string, 
    description: {en: string, ar: string}, 
    setDescription: (value: {en: string, ar: string}) => void, 
    setTags: (value: {en: string, ar: string}) => void, 
    tags: {en: string, ar: string}
}

const BasicInfo = ({setName, name, redAlert, setSlug, slug, setStock, stock, description, setDescription, setTags, tags}: BasicInfoProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2 md:space-y-4">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">
                        Product Name (English) *
                    </label>
                    <input
                        type="text"
                        value={name.en}
                        onChange={(e) => setName({ ...name, en: e.target.value })}
                        className={twMerge(
                            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                            redAlert && !name.en.trim() ? "border-red-400 bg-red-50" : "border-slate-200"
                        )} />
                    {redAlert && !name.en.trim() && (
                        <p className="text-base text-red-600 mt-1">Required field</p>
                    )}
                </div>
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">
                        Product Name (Arabic) *
                    </label>
                    <input
                        type="text"
                        value={name.ar}
                        onChange={(e) => setName({ ...name, ar: e.target.value })}
                        className={twMerge(
                            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                            redAlert && !name.ar.trim() ? "border-red-400 bg-red-50" : "border-slate-200"
                        )} />
                    {redAlert && !name.ar.trim() && (
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
                        )} />
                    {redAlert && !slug.trim() && (
                        <p className="text-base text-red-600 mt-1">Required field</p>
                    )}
                </div>
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">Stock *</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value ? Number(e.target.value) : 0)}
                        className={twMerge(
                            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
                            redAlert && stock === 0 ? "border-red-400 bg-red-50" : "border-slate-200"
                        )} />
                    {redAlert && stock === 0 && (
                        <p className="text-base text-red-600 mt-1">Required field</p>
                    )}
                </div>
            </div>



            <div>
                <label className="block text-base font-medium text-slate-700 mb-2">Description (English)</label>
                <textarea
                    value={description.en}
                    onChange={(e) => setDescription({ ...description, en: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <label className="block text-base font-medium text-slate-700 mb-2 mt-2">Description (Arabic)</label>
                <textarea
                    value={description.ar}
                    onChange={(e) => setDescription({ ...description, ar: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="gap-2 grid grid-cols-2">
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">Tags (English)</label>
                    <input
                        type="text"
                        value={tags.en}
                        onChange={(e) => setTags({ ...tags, en: e.target.value })}
                        placeholder="Comma separated"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-base font-medium text-slate-700 mb-2">Tags (Arabic)</label>
                    <input
                        type="text"
                        value={tags.ar}
                        onChange={(e) => setTags({ ...tags, ar: e.target.value })}
                        placeholder="Comma separated"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
        </motion.div>
    )
};

export default BasicInfo;