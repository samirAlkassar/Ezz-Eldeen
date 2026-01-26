import { Product } from "../page";
import { useState } from "react";
import { Edit, Trash, Plus, Search, Filter } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type ProductsTabProps = {
    products: Product[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onAdd: () => void;
    onSearch: (search: string) => void;
    onFilterCategory: (category: string) => void;
    onFilterPrice: (min: number | "", max: number | "") => void;
};

function ProductsTab({ products, loading, page, totalPages, onPageChange, onEdit, onDelete, onAdd, onSearch, onFilterCategory, onFilterPrice }: ProductsTabProps) {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [toggleFilter, setToggleFilter] = useState<boolean>(false);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        onSearch(value);
    };

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        onFilterCategory(value);
    };

    const handlePriceChange = (min: number | "", max: number | "") => {
        setMinPrice(min);
        setMaxPrice(max);
        onFilterPrice(min, max);
    };

    const resetFilters = () => {
        setSearch("");
        setCategoryFilter("all");
        setMinPrice("");
        setMaxPrice("");
        onSearch("");
        onFilterCategory("all");
        onFilterPrice("", "");
    };

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Products</h2>
                    <p className="text-sm text-slate-500 md:mt-1">Manage your product inventory</p>
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 p-3 md:px-4 md:py-2 bg-blue-600 text-sm md:text-base text-white rounded-full hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    <Plus size={20} />
                    <p className="hidden md:block">Add Product</p>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-slate-200 p-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative flex gap-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-1.5 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button onClick={()=>setToggleFilter((prev)=>!prev)} className="bg-gray-200 p-2 md:p-3 cursor-pointer rounded-lg text-gray-700 flex items-center justify-center"><Filter size={18}/></button>
                    </div>

                    {toggleFilter && 
                    <>
                    <select
                        value={categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="px-2 md:px-4 py-1.5 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">All Categories</option>
                        <option value="School Supplies">School Supplies</option>
                        <option value="Toys & Games">Toys & Games</option>
                        <option value="Gifts">Gifts</option>
                    </select>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min price"
                            value={minPrice === "" ? "" : String(minPrice)}
                            onChange={(e) => handlePriceChange(e.target.value === "" ? "" : Number(e.target.value), maxPrice)}
                            className="w-full md:w-32 px-2 md:px-4 py-1.5 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        <input
                            type="number"
                            placeholder="Max price"
                            value={maxPrice === "" ? "" : String(maxPrice)}
                            onChange={(e) => handlePriceChange(minPrice, e.target.value === "" ? "" : Number(e.target.value))}
                            className="w-full md:w-32 px-2 md:px-4 py-1.5 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={resetFilters}
                        className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors duration-200">
                        Reset
                    </button>
                </>}
                </div>

            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading products...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No products found</td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50 transition-colors duration-150">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3 relative">
                                                <Image 
                                                    src={product.images?.[0]?.url ?? "/placeholder.jpg"} 
                                                    alt={product.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-12 h-12 rounded-lg object-contain border border-slate-200"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">{product.name}</p>
                                                    <p className="text-xs text-slate-500">{product.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-800 font-medium">{product.price} EGP</td>
                                        <td className="px-6 py-4">
                                            <span className={twMerge(
                                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                (product.stock ?? 0) > 10 ? "bg-green-50 text-green-700" :
                                                (product.stock ?? 0) > 0 ? "bg-orange-50 text-orange-700" :
                                                "bg-red-50 text-red-700"
                                            )}>
                                                {product.stock ?? 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onEdit(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(product)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-2 border-t border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Page {page} of {totalPages}</p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProductsTab;