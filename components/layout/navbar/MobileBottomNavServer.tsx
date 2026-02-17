import { fetchCurrentUserApi } from "@/features/auth/authAPI";
import MobileBottomNav from "./MobileBottomNav";
import { getCartApi } from "@/features/cart/cartAPI";
import { getLocale } from "next-intl/server";

export default async function MobileBottomNavServer() {
    const lang = await getLocale();
    const currentUser = await fetchCurrentUserApi();
    const getCart = await getCartApi(lang as typeLang);
    return (
        <>
            <MobileBottomNav user={currentUser?.user} cartCount={getCart.totalQuantity}/>
        </>
    )
}