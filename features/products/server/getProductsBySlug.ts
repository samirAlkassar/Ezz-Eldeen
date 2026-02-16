import { getLocale } from "next-intl/server"

export async function getProductBySlug(slug: string) {
  const lang = await getLocale();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
    },
    next: {revalidate: 300}
  })

  if (!res.ok) {
    throw new Error("Product not found")
  }

  return res.json()
}

export async function getProductsReviews(productId: string) {
  const lang = await getLocale();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/reviews/${productId}`, {
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
    },
    next: {revalidate: 300}
  })

  if (!res.ok) {
    throw new Error("Product reviews not found")
  }

  return res.json()
}

export async function  getRelatedBySlug(slug: string, limit: number) {
  const lang = await getLocale();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/related?slug=${slug}&limit=${limit}`,{
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
    },
      next: {revalidate: 300}
    })

    if (!res.ok) {
        throw new Error("Related not found")
    }

    return res.json()
}
