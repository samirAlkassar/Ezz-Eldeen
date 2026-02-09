export async function getProductBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    next: {revalidate: 300},
  })

  if (!res.ok) {
    throw new Error("Product not found")
  }

  return res.json()
}

export async function getProductsReviews(productId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/reviews/${productId}`, {
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error("Product reviews not found")
  }

  return res.json()
}

export async function  getRelatedBySlug(slug: string, limit: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/related?slug=${slug}&limit=${limit}`,{
      next: {revalidate: 300}
    })

    if (!res.ok) {
        throw new Error("Related not found")
    }

    return res.json()
}
