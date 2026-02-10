// productsAPI.ts
import getCookies from "@/actions/getCookies";
import { WishlistType } from "./types";
import i18n from "@/i18n/i18n";

export async function getWishlist(): Promise<WishlistType> {
  const token = await getCookies("token");
  if (!token) {
    throw new Error("No token found");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        "Accept-Language": i18n.language,
      },
    });

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return res.json();
}


export async function addToWishlist(productId: string): Promise<WishlistType> {
  const token = await getCookies("token");
  if (!token) {
    throw new Error("No token found");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
      "Accept-Language": i18n.language,
    },
    body: JSON.stringify({ productId: productId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add to wishlist");
  }

  return res.json();
}


export async function removeFromWishlist(productId: string): Promise<WishlistType> {
  const token = await getCookies("token");
  if (!token) {
    throw new Error("No token found");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
      "Accept-Language": i18n.language,
    },
    body: JSON.stringify({ productId: productId }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to remove from wishlist");
  }

  return res.json();
}

const wishlistService = { getWishlist, addToWishlist, removeFromWishlist };
export default wishlistService;
