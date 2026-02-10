// productsAPI.ts
import getCookies from "@/actions/getCookies";
import { ProductType, ReviewData } from "./types";
import i18n from "@/i18n/i18n";

export interface ProductsResponse {
  products: ProductType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export async function getProductsApi(filters: any): Promise<ProductsResponse> {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params}`, {
    method: "GET",
    headers: {
      "Accept-Language": i18n.language,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  };

  return res.json();
}

export async function getProductBySlugApi(slug: string): Promise<ProductType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    headers: {
      "Accept-Language": i18n.language,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  };

  return res.json();
}

export async function addReviewApi(productId: string, reviewData: ReviewData): Promise<ProductType> {
  const token = await getCookies("token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language,
      "Authorization": `Bearer ${token?.value}`
      
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    throw new Error("Failed to add review");
  };

  return res.json();
}


export async function getRelatedProductsApi(slug: string, limit = 4): Promise<ProductsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/related?slug=${slug}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Accept-Language": i18n.language,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch related products");
  };

  return res.json();
}

const productsService = { getProductsApi, getProductBySlugApi, getRelatedProductsApi, addReviewApi };
export default productsService;
