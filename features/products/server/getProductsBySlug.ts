import i18n from "@/i18n/i18n"

export async function getProductBySlug(slug: string, lang: typeLang) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
    },
    cache: "no-cache" //next revalidate :300
  })

  if (!res.ok) {
    throw new Error("Product not found")
  }

  return res.json()
}

export async function getProductsReviews(productId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/reviews/${productId}`, {
    headers: {
      "Accept-Language": i18n.language,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error("Product reviews not found")
  }

  return res.json()
}

export async function  getRelatedBySlug(slug: string, limit: number, lang: typeLang) {
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
