"use client";

import { memo, useState } from "react";
import {
    Home,
    ShoppingCart,
    Heart,
    Search,
    User
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { User as UserType } from "@/features/auth/types";
import { useRouter } from "next/navigation";

function MobileBottomNav({user, cartCount}:{user: UserType, cartCount: number}) {
    const [selectedButton, setSelectedButton] = useState("Home");
    const router = useRouter();

    const navItems = [
        { icon: ShoppingCart, label: "Cart", url: "/cart"},
        { icon: Heart, label: "Wishlist", url: "/wishlist"},
        { icon: Home, label: "Home", url: "/"},
        { icon: Search, label: "Search", url: "/products/"},
        { icon: User, label: "Profile", url: `/profile/${user?.firstName}_${user?.lastName}`}
    ];
    return (
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
            <div className="flex justify-between items-center bg-white/95 backdrop-blur-sm text-white rounded-full px-6 py-3 shadow-xl">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            className={twMerge("flex relative flex-col items-center justify-center gap-1 text-xs transition-transform duration-200 text-text-muted",
                                selectedButton === item.label ? "bg-primary text-white p-2 rounded-full scale-135 -mt-4 shadow-lg shadow-primary/40 border-3 border-white" : "p-2"
                            )}
                            onClick={() => {setSelectedButton(item.label); router.push(
                                user ? item.url : (item.label === "Home" ? "/" : "/login")
                            )}}>
                            <Icon size={20} strokeWidth={2.5} />
                            {item.label === "Cart" && cartCount > 0 && 
                                <span className="bg-red-500 text-white absolute rounded-full text-xs w-4.5 h-4.5 flex items-center justify-center right-0 bottom-0">{cartCount}</span>
                            }
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default memo(MobileBottomNav);
