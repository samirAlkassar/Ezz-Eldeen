// productsAPI.ts
import getCookies from "@/actions/getCookies";
import { Product } from "./types";
import { getLocale } from "next-intl/server";

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export async function getProductsAdminApi(filters: any): Promise<ProductsResponse> {
  const lang = await getLocale();
  const token = await getCookies("token");
  if (!token) throw new Error("Token not found");
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/admin?${params}`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.value}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products (Admin)");
  };

  return res.json();
};


export async function createProductsAdminApi(payload: FormData) {
  const lang = await getLocale();
  const token = await getCookies("token");
  if (!token) throw new Error("Token not found");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.value}`
    },
    body: payload,
  });

  if (!res.ok) {
    throw new Error("Failed to create product (Admin)");
  };

  return res;
}



const productsService = { getProductsAdminApi, createProductsAdminApi };
export default productsService;
