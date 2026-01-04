import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface buttonClasses extends VariantProps<typeof buttonClasses> {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
     type?: "button" | "submit" | "reset"  | undefined;
    disabled?: boolean
}

const buttonClasses = cva("cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-primary text-background hover:bg-primary/90 ripple-primary",
            secondary: "text-primary hover:bg-secondary bg-background ripple-secondary",
            game: "text-center text-white rounded-lg block border-red-100 active:scale-[97%] transition-all duration-75 ease-in",
            danger: "bg-red-500 text-white hover:bg-red-700 ripple-danger",
        },
        size: {
            small: "px-4 py-0.5 font-bold",
            medium: "px-4 py-1 text-base font-bold",
            large: "px-6 py-3 text-lg",
        },
        color: {
            orange: "bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-500 shadow-[0_4px_0_0_#cc6115,0_8px_10px_0_rgba(0,0,0,0.2)]",
            blue: "bg-gradient-to-b from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0284C7] shadow-[0_4px_0_0_#0377b6,0_8px_10px_0_rgba(0,0,0,0.2)]",
            red: "bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 shadow-[0_4px_0_0_#bc2121,0_8px_10px_0_rgba(0,0,0,0.2)]"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "medium",
        color: "orange"
    },
}
)

export const  Button = ({children,type = "button" ,disabled=false, href, variant, color, size, onClick, className}: buttonClasses) => {
    if (href) {
        return (
            <Link href={href} className={twMerge(buttonClasses({ variant, size, color }), className)}>
            {children}
            </Link>
        );
    }
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={twMerge(buttonClasses({ variant, size, color }), className)}>
            {children}
        </button>
    );
}