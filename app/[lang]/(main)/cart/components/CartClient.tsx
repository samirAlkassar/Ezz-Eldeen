'use client'

import { motion } from "motion/react"
import { fetchCart, updateCartItem, removeFromCart } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import { useToast } from "@/components/Toast";
import { Plus, Rocket, Trash, TriangleAlert } from "lucide-react";
import ProductCart from "./ProductCart";
import CartItemSkeleton from "./CartItemSkeleton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const CartClient = ({lang}: {lang: typeLang}) => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const loadingCart = useSelector((state: RootState) => state.cart.loading);
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const { toast } = useToast();
    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchCart());
        dispatch(fetchWishlist());
    }, [dispatch]);

    const handleRemoveItem = async (productId: string) => {
        try {
            await dispatch(removeFromCart(productId));
            dispatch(fetchCart());
            toast({ title: "Removed from cart", description: "Item is removed from your cart successfully", variant: "default", position: "bottom-right", icon: <Trash size={20} /> })
        } catch (error) {
            toast({ title: "Error", description: `${error}`, variant: "error", position: "bottom-right", icon: <TriangleAlert size={20} /> })
        }
    };

    const handleUpdateItem = async (productId: string, quantity: number) => {
        await dispatch(updateCartItem({ productId, quantity }));
        dispatch(fetchCart());
        toast({ title: "Item count increase", description: "You increased the order count successfully", variant: "default", position: "bottom-right", icon: <Plus size={20} /> })
    };

    return (
        <main className="bg-background pb-15 md:pb-20">
            <motion.h1
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl md:text-4xl font-extrabold text-[#FF791A] pt-2 md:pt-4 max-w-7xl mx-auto px-4 text-center">
                {t("cart.title")}
            </motion.h1>
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs currentPage={t("cart.title")} lang={lang}/>
            </div>
            <div className="mx-auto max-w-7xl flex flex-col-reverse md:flex-row gap-4 md:gap-8 px-2 md:px-4">
                <section className="flex-2">
                    <div className="my-4 space-y-5">
                        {loadingCart ?
                            Array.from({ length: cart?.items?.length || 3 }).map((_, index) => (
                                <CartItemSkeleton key={index} />))
                            :
                            cart?.items?.length !== 0
                            && cart?.items.map((cartItem) => (
                                <ProductCart
                                    key={cartItem?.product?._id ?? cartItem.product}
                                    cartItem={cartItem}
                                    handleRemoveItem={handleRemoveItem}
                                    handleUpdateItem={handleUpdateItem}
                                    wishlist={wishlist}
                                    lang={lang}
                                />
                            ))
                        }
                        {cart?.items?.length === 0 && 
                            <div className="w-full flex items-center flex-col h-[calc(100vh-570px)]">
                                <h4 className="text-center text-xl text-text">{t("cart.empty.title")}</h4>
                                <p className="text-center text-lg text-text-muted mt-1">{t("cart.empty.description")}</p>
                                <button 
                                    onClick={()=>router.push(`/${lang}/products`)}
                                    className="bg-black text-white px-5 py-3 rounded-full mt-6 cursor-pointer text-base active:scale-95 duration-75 transition-all">
                                    {t("cart.empty.cta")}
                                </button>
                            </div>
                        }

                    </div>
                </section>
                {cart?.items?.length !== 0 && <section className="flex-1 w-full h-fit mt-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <h2 className="text-lg md:text-xl font-semibold md:font-bold text-gray-800 mb-2 md:mb-4">{t("cart.checkoutBox.title")}</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-700">
                            <span>{t("cart.checkoutBox.subTotal")}</span>
                            <span className="font-semibold">{cart?.totalPrice} EGP</span>
                        </div>

                        <div className="flex justify-between text-gray-700">
                            <span>{t("cart.checkoutBox.delivery")}</span>
                            <span className="font-semibold">0 EGP</span>
                        </div>

                        <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-800">{t("cart.checkoutBox.total")}</span>
                            <span className="px-3 py-1 bg-orange-100 text-gray-800 font-bold rounded-xl shadow-inner text-base">
                                {cart?.totalPrice} EGP
                            </span>
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="block text-sm text-gray-600 mb-1">{t("cart.checkoutBox.haveCoupon")}</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t("cart.checkoutBox.enterCode")}
                                className="flex-1 px-3 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                            />
                            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-medium hover:bg-blue-200 transition shadow-sm">
                                {t("cart.checkoutBox.apply")}
                            </button>
                        </div>
                    </div>

                    <div className="flex itmes-center justify-center">
                    <button 
                        onClick={()=>toast({title: "Order Placed", description: "Your order is on the way", icon: <Rocket />, variant: "success", position: "bottom-right"})}
                        className="w-full mt-4 text-sm md:text-base mb-2 py-2 md:py-3 active:w-[98%] mx-auto bg-primary text-white font-medium rounded-full cursor-pointer transition-all duration-75 ease-in hover:bg-primary/80">
                        {t("cart.checkoutBox.confirmOrder")}
                    </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-3">
                        {t("cart.checkoutBox.terms")}
                    </p>
                </section>}
            </div>
        </main>
    )
}

export default CartClient;




