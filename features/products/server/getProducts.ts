import { ProductType } from "../types";

type ProductQuery = {
  page?: number
  limit?: number
  category?: string
  subCategory?: string
  search?: string
  sort?: "rating" | "price" | "new"
}

export async function getProducts(query: ProductQuery, lang: typeLang) {
  try {
    const params = new URLSearchParams()

    if (query.page) params.set("page", query.page.toString())
    if (query.limit) params.set("limit", query.limit.toString())
    if (query.category) params.set("category", query.category)
    if (query.subCategory) params.set("subCategory", query.subCategory)
    if (query.sort) params.set("sort", query.sort)
    if (query.search) params.set("search", query.search)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`, {
      headers: {
        "Accept-Language": lang,
        "Content-Type": "application/json",
      },
      cache: "no-cache"
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    return res.json()
  } catch (error){
    console.log(error)
  }

}


export type HomeSectionType = {
    id: "categories" | "rating" | "new" | "games" | "school",
    title: string,
    query?: {sort?: string, limit?: string}
    products: ProductType[]
}

export const HOME_SECTIONS = [
  {
    id: "rating",
    title: "Best Sellers",
    query: { sort: "rating", limit: 12 },
  },
  {
    id: "games",
    title: "Games",
    query: { category: "Toys & Games", limit: 12 },
  },
  {
    id: "school",
    title: "School Supplies",
    query: { category: "School Supplies", limit: 12 },
  },
] as const
