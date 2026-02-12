"use client";

import React, { useEffect, useState, useCallback } from "react";
import getCookies from "@/actions/getCookies";
import Sidebar from "../components/Sidebar";
import ProductsTab from "../components/ProductsTab";
import UsersTab from "../components/UsersTab";
import StatusTab from "../components/StatusTab";
import SettingsTab from "../components/SettingsTab";
import ProductFormModal from "../components/ProductFormModal";
import DeleteConfirm from "../components/DeleteConfirm";
import { AnimatePresence } from "framer-motion"
import { useToast } from "@/components/Toast";
import { AlertTriangle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import handleResponse from "@/hooks/useProductActions";

export interface ProductUpdatePayload {
    name?: {
        ar: string,
        en: string
    };
    slug: string;
    description?: {
        ar: string,
        en: string
    };
    price: number;
    discountPrice?: number;
    stock: number;
    tags: {
        ar: string[],
        en: string[]
    };
    category: {
        ar: string,
        en: string
    };
    subcategory?: {
        ar: string,
        en: string
    };
}


export type Product = {
    _id: string;
    name: string,
    slug?: string;
    description?: string,
    price: number;
    discountPrice?: number;
    stock?: number;
    category?: string,
    subcategory?: string,
    tags?: string[],
    variants?: string[];
    images?: { url: string; alt?: string }[];
    createdAt?: string;
    updatedAt?: string;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
};

export type Order = {
    _id: string;
    orderNumber: string;
    customer: string;
    total: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    date: string;
};



const API_BASE = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_API_URL ?? "") : "";

export default function Dashboard({lang}:{lang: typeLang}) {
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
    const {toast} = useToast();
    const router = useRouter();
    
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.set("page", String(page));
            params.set("limit", String(limit));
            if (search) params.set("search", search);
            if (categoryFilter && categoryFilter !== "all") params.set("category", categoryFilter);
            if (minPrice !== "") params.set("minPrice", String(minPrice));
            if (maxPrice !== "") params.set("maxPrice", String(maxPrice));

            const url = `${API_BASE}/products?${params.toString()}`;
            const token = await getCookies("token");

            const res = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.value}`,
                    "Accept-Language": lang,
                },
            });

            if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
            const data = await res.json();

            if (Array.isArray(data)) {
                setProducts(data);
                setTotal(data.length);
            } else if (data.products) {
                setProducts(data.products);
                setTotal(data.pagination?.total ?? data.products.length);
            }
        } catch (err: unknown) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    },[page, limit, search, categoryFilter, minPrice, maxPrice]);

    useEffect(() => {
        if (activeTab === "products") {
            fetchProducts();
        }
    }, [page, activeTab, fetchProducts]);



    const createProduct = async (payload: FormData) => {
        try {
            const token = await getCookies("token");
            if (!token) throw new Error("Token not found");

            const res = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Accept-Language": lang,
            },
            body: payload,
            });

            const data = await handleResponse(res, "create product", lang=lang);

            toast({
            title: "Product created",
            description: "Product created successfully",
            variant: "default",
            icon: <Trash />,
            position: "bottom-right",
            });

            return data;
        } catch (error: unknown) {
            toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Unknown error",
            variant: "error",
            icon: <AlertTriangle />,
            position: "bottom-right",
            });
            throw error;
        }
    };

    const patchProduct = async (id: string, payload: ProductUpdatePayload | FormData) => {
        const token = await getCookies("token");
        if (!token) throw new Error("token not found");

        const isFormData = payload instanceof FormData;
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token.value}`,
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                "Accept-Language": lang,
            },
            body: isFormData ? payload : JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product");
        return res.json();
    };

    const deleteProduct = async (id: string) => {
        try {
            const token = await getCookies("token");
            const res = await fetch(`${API_BASE}/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.value}`,
                    "Accept-Language": lang,
                },
            });
            if (res.status === 403) {
                 toast({ 
                    title: "Not Authorized",
                    description: "Only admins can delete products",
                    variant: "error", 
                    icon: <AlertTriangle />,
                    position: "bottom-right" });
                    router.push(`/${lang}`)
                 return
            }

            if (res.status === 401) {
                toast({ 
                    title: "Login!",
                    description: "you need to login as admin to be able to delete products",
                    variant: "default", 
                    icon: <AlertTriangle />,
                    position: "bottom-right" });
                    router.push(`/${lang}/login`)
                 return
            }
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to delete");

            toast({ 
                title: "Product deleted", 
                description: "Product is deleted successfully", 
                variant: "default", 
                icon: <Trash />, 
                position: "bottom-right" });
            return res.json();

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unknown error";
            toast({ title: "Error", description: message, variant: "error"});
        }

    };

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <div className="flex bg-slate-50">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex-1 px-3 md:px-8 pt-4 md:pt-8 pb-2 md:pb-4 max-h-[calc(100vh-76px)] overflow-y-scroll">
                {activeTab === "products" && (
                    <ProductsTab
                        products={products}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onEdit={(p) => setEditingProduct(p)}
                        onDelete={(p) => setDeletingProduct(p)}
                        onAdd={() => { setShowAddModal(true); setEditingProduct(null); }}
                        onSearch={setSearch}
                        onFilterCategory={setCategoryFilter}
                        onFilterPrice={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
                    />
                )}

                {activeTab === "users" && <UsersTab />}
                {activeTab === "status" && <StatusTab />}
                {activeTab === "settings" && <SettingsTab />}
            </div>
            <AnimatePresence mode="popLayout">
                {(showAddModal || editingProduct) && (
                    <ProductFormModal
                        onClose={() => { setShowAddModal(false); setEditingProduct(null); }}
                        onSaved={() => { setShowAddModal(false); setEditingProduct(null); fetchProducts(); }}
                        existing={editingProduct}
                        createProduct={createProduct}
                        patchProduct={patchProduct}
                    />
                )}
            </AnimatePresence>
            {deletingProduct && (
                <DeleteConfirm
                    product={deletingProduct}
                    onCancel={() => setDeletingProduct(null)}
                    onConfirm={async () => {
                        try {
                            await deleteProduct(deletingProduct._id);
                            setDeletingProduct(null);
                            fetchProducts();
                        } catch (err) {
                            alert(`Delete failed ${err}`);
                        }
                    }}
                />
            )}
        </div>
    );
}