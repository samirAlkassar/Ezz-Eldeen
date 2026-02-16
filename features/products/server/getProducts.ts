import { ProductType } from "../types";
import { getTranslations } from "next-intl/server";

type ProductQuery = {
  page?: number;
  limit?: number;
  category?: string;
  subCategory?: string;
  search?: string;
  sort?: "rating" | "price" | "new";
};

export async function getProducts(query: ProductQuery, lang: string) {
  try {
    const params = new URLSearchParams();

    if (query.page) params.set("page", query.page.toString());
    if (query.limit) params.set("limit", query.limit.toString());
    if (query.category) params.set("category", query.category);
    if (query.subCategory) params.set("subCategory", query.subCategory);
    if (query.sort) params.set("sort", query.sort);
    if (query.search) params.set("search", query.search);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`, {
      headers: {
        "Accept-Language": lang,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type HomeSectionType = {
  id: "categories" | "rating" | "new" | "games" | "school";
  title: string;
  query?: Partial<ProductQuery>;
  products: ProductType[];
};

// Function to create HOME_SECTIONS dynamically with translations
export async function getHomeSections(lang: string) {
  const t = await getTranslations("Categories");

  return [
    {
      id: "rating",
      title: t("cards.School Supplies.title"),
      query: { sort: "rating", limit: 12 },
      products: [],
    },
    {
      id: "games",
      title: t("cards.Toys & Games.title") || "Games",
      query: { category: "Toys & Games", limit: 12 },
      products: [],
    },
    {
      id: "school",
      title: t("cards.School Supplies.title"),
      query: { category: "School Supplies", limit: 12 },
      products: [],
    },
  ] as const;
}
