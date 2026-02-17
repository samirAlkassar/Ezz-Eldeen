import getCookies from "@/actions/getCookies";
import { CartItem, CartResponse } from "./types";
// import i18n from "@/i18n/i18n";

export interface AddToCartRequest {
    productId: string;
    quantity?: number;
}

export interface UpdateCartRequest {
    productId: string;
    quantity: number;
}

export async function getCartApi(lang: typeLang): Promise<CartResponse> {
    const token = await getCookies("token");
    if (!token) {
        return {} as CartResponse;
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
            "Accept-Language": lang
        },
    });

    // if (!res.ok) throw new Error("Failed to fetch cart");
    return res.json();
}

export async function addToCartApi(body: AddToCartRequest): Promise<CartResponse> {
    const token = await getCookies("token");
    if (!token) {
        return {} as CartResponse;
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to add to cart");
    return res.json();
}

export async function updateCartItemApi(body: UpdateCartRequest): Promise<CartResponse> {
    const token = await getCookies("token");
    if (!token) {
        return {} as CartResponse;
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to update cart item");
    return res.json();
}

export async function removeFromCartApi(productId: string): Promise<CartResponse> {
    const token = await getCookies("token");
    if (!token) {
        return {} as CartResponse;
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
    });

    if (!res.ok) throw new Error("Failed to remove item from cart");
    return res.json();
}

export async function clearCartApi(): Promise<CartResponse> {
    const token = await getCookies("token");
    if (!token) {
        return {} as CartResponse;
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
    });

    if (!res.ok) throw new Error("Failed to clear cart");
    return res.json();
}

const cartService = { getCartApi, addToCartApi, updateCartItemApi, removeFromCartApi, clearCartApi };
export default cartService;
