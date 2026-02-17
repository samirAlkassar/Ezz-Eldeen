"use client";

import { Heart, ShoppingCart, ChevronDown, Settings, User, LogOut, LayoutDashboard, LogIn, LogOutIcon, Menu } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const MotionButton = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.button), {ssr: false,}
);
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div), {ssr: false,}
);
const MotionUl = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.ul), {ssr: false,}
);
const MotionLi = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.li), {ssr: false,}
);
const MotionNav = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.nav), {ssr: false,}
);

const AnimatePresence = dynamic(
  () =>
    import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);
import { fetchCurrentUser, logout } from "../../../features/auth/authSlice";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { fetchCart} from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import Image from "next/image";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User as UserType } from "@/features/auth/types";
import LocalSwitcher from "@/components/LocalSwitcher";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Navbar = ({user}:{user?: UserType}) => {
    const tNavbar = useTranslations("Navbar");
    const tCommon = useTranslations("Common");
    const lang = useLocale();
    const dispatch = useDispatch<AppDispatch>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBottomMenu, setShowBottomMenu] = useState(true);
    const menuRef = useRef<HTMLUListElement>(null);
    const imageRef = useRef<HTMLButtonElement>(null);
    const { toast } = useToast();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname.endsWith("/en") || pathname.endsWith("/ar");

    const handleScroll = useCallback(() => {
        const scrollThreshold = 420;
        if (!isHomePage) {
            setIsScrolled(true)
        } else {setIsScrolled(window.scrollY > scrollThreshold);}
    },[isHomePage]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        if (isScrolled) {
            setShowBottomMenu(false)
        } else {setShowBottomMenu(true)}
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll, isScrolled]);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCart(lang as typeLang));
    }, [dispatch, lang]);

    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                imageRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !imageRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <NavbarWrapper isScrolled={isScrolled}>
            <div className="w-full max-w-7xl mx-auto px-4 py-3.5 md:py-4 md:min-h-[76px] md:px-8 flex justify-between text-white">
                {
                isScrolled ? 
                    <div className="flex items-center justify-start gap-2 md:gap-4">
                        <MotionButton
                            initial={{ scale: 0.1, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.2, ease: "easeIn" }}
                            onClick={()=>setShowBottomMenu(prev => !prev)}
                            className="cursor-pointer">
                            <Menu size={28} className={twMerge("scale-90 md:scale-100",isScrolled? "text-gray-800" : "text-white")}/>
                        </MotionButton>
                        <MotionDiv
                            initial={{x: -50 }}
                            whileInView={{x:0 }}
                            transition={{ delay: 0, duration: 0.3, ease: "easeIn" }}>
                            <Link href={`/`} className={twMerge("text-2xl md:text-3xl text-yellow-200 font-bold", isScrolled? "text-orange-400" : "text-yellow-200")}>
                                {tNavbar("storeTitle")}
                            </Link>
                        </MotionDiv>
                    </div>: 
                    <MotionDiv
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0, duration: 0.2, ease: "easeIn" }}
                        className="flex items-center justify-start gap-4">
                        <Link href={`/`} className={twMerge("text-2xl md:text-3xl text-yellow-200 font-bold", isScrolled? "text-orange-400" : "text-yellow-200")}>
                            {tNavbar("storeTitle")}
                        </Link>
                    </MotionDiv>
                }




                <div className="flex gap-2 items-center relative">
                    <LocalSwitcher isScrolled={isScrolled}/>

                    <button 
                        title={tNavbar("wishlist")}  
                        aria-label={tNavbar("wishlist")}  
                        onClick={() => {router.push( user ? `/wishlist` : `/register`); !user && 
                                toast({ title: "Create account!", description: "You need to login before accessing your wishlist" ,variant: "default", position: "bottom-right", icon: <LogIn size={20}/> })
                        }} 
                        className={twMerge("p-2 rounded-full transition-all duration-100 ease-in cursor-pointer active:scale-[97%]",
                        isScrolled? "text-black hover:bg-gray-500/20" : "hover:bg-red-500/40"
                    )}>
                        <Heart />
                    </button>
                    <button 
                        title={tNavbar("cart")} 
                        aria-label={tNavbar("cart")} 
                        onClick={() => {router.push(user ? `/cart` : `/register`); !user && 
                                toast({ title: "Create account!", description: "You need to login before accessing your cart", variant: "default", position: "bottom-right", icon: <LogIn size={20}/> })
                        }} 
                        className={twMerge("p-2 relative rounded-full transition-all duration-100 ease-in cursor-pointer active:scale-[97%]",
                        isScrolled? "text-black hover:bg-gray-500/20" : "hover:bg-orange-500/40"
                    )}>     
                        <ShoppingCart/>
                        {user && !(cart?.totalPrice === 0) && <span className="absolute bg-red-500 text-white text-xs w-5 h-5 top-5 right-0 rounded-full flex items-center justify-center">{cart?.totalQuantity}</span>}
                    </button>
                    

                    {user ? (
                        <div className="relative">
                            <button
                                ref={imageRef}
                                onClick={() => {setMenuOpen((prev) => !prev)}}
                                className={twMerge("flex items-center gap-1 md:gap-2 p-1  active:scale-95 rounded-lg cursor-pointer",
                                    isScrolled? "hover:bg-gray-500/20" : "hover:bg-orange-300/20"
                                )}>
                                {user?.picturePath ? 
                                 <div className="relative h-9 w-9 rounded-full">
                                    <Image 
                                        src={user?.picturePath || "/images/placeholder.jpg"} 
                                        alt={`${2}`}
                                        fill
                                        quality={40}
                                        className="absolute object-cover rounded-full"/>
                                </div>:
                                <span className={twMerge("text-lg font-medium rounded-full w-9 h-9 flex items-center justify-center",
                                    isScrolled? "bg-gray-800" : "bg-yellow-800"
                                )}>
                                    {user.firstName[0]}
                                </span>}
                               
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform hidden md:block ${menuOpen ? "rotate-180" : "rotate-0"} ${isScrolled && "text-black"}`}/>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {menuOpen && (
                                    <MotionUl
                                        ref={menuRef}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className={twMerge("absolute mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden px-2 py-4 space-y-3", 
                                           lang === "ar" ? "left-0" : "right-0"
                                        )}>
                                        <li>
                                            <Button onClick={()=>{setMenuOpen(false); router.push(`/profile/${user.firstName}_${user.lastName}`)}} variant={'game'} size={'small'} color={'blue'} className="w-full active:w-[95%] mx-auto">
                                                <div className="flex gap-2 items-center justify-center">
                                                    <User size={18}/>
                                                    <span>
                                                        {tNavbar("profileTabs.profile")}
                                                    </span>
                                                </div>
                                            </Button>
                                        </li>
                                        <li><Button onClick={()=>{setMenuOpen(false);}} variant={'game'} size={'small'} color={'blue'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><Settings size={18}/><span>
                                                            {tNavbar("profileTabs.settings")}
                                                        </span>
                                                    </div>
                                                </Button>
                                            </li>
                                        {user?.role === "admin" && <li><Button onClick={()=>{router.push(`/dashboard`); setMenuOpen(false);}} variant={'game'} size={'small'} color={'orange'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><LayoutDashboard size={18}/><span>
                                            {tNavbar("profileTabs.dashboard")}
                                            </span></div> </Button></li>}
                                        <li><Button onClick={()=>{handleLogout(); setMenuOpen(false); 
                                            toast({ title: "Logged out", description: "You logged out of your account",variant: "default", position: "bottom-right", icon: <LogOutIcon size={20}/> })
                                        }} variant={'game'} size={'small'} color={'red'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><LogOut size={18}/><span>
                                            {tNavbar("profileTabs.logout")}
                                        </span></div></Button></li>

                                    </MotionUl>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-4 text-lg font-medium">
                            <Link
                                href={`/login`}
                                className="bg-white text-[#FF773C] text-base md:text-lg sm:py-0.5 sm:px-3 md:px-4 md:py-1 h-10 w-10 sm:h-fit flex sm:block items-center justify-center sm:w-fit rounded-full font-semibold shadow hover:bg-yellow-100 transition-colors">
                                <span className="hidden md:block">
                                    {tCommon("login")}
                                </span>
                                <User size={24} className="block sm:hidden"/>
                            </Link>
                            <Link href={`/register`} className={twMerge("py-1 hidden md:block", isScrolled ? "text-gray-800" : "text-white")}>
                                {tCommon("register")}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {isScrolled && <div className="bg-white w-full flex items-center justify-center shadow-sm">
                <SlideTabes isScrolled={isScrolled} showBottomMenu={showBottomMenu}/>
            </div>}
        </NavbarWrapper>
    );
};

type tabesPositionTypes = {
    left?: number;
    width?: number;
    opacity?: number;
    color?: string;
};

const SlideTabes = ({isScrolled, showBottomMenu}:{isScrolled:boolean, showBottomMenu: boolean}) => {
    const [position, setPosition] = useState<tabesPositionTypes>({
        left: 0,
        width: 0,
        opacity: 0,
        color: "",
    });
    const router = useRouter();
    return (
        <AnimatePresence>
        {showBottomMenu && 
            <MotionUl
                initial={isScrolled && { opacity: 0, height: 0, y: -10, x: -40 }}
                animate={{ opacity: 1, height: undefined, y: 0, x:0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                onMouseLeave={() => {
                    setPosition({ opacity: 0 });
                }}
                className={twMerge("flex items-center relative py-1 md:py-2 min-h-[50px] md:min-h-[60px] transition-al")}>
                <Tab onClick={()=>router.push(`/`)} isScrolled={isScrolled} setPosition={setPosition}>Home</Tab>
                <Tab onClick={()=>router.push(`/categories/Toys_&_Games`)} isScrolled={isScrolled}  setPosition={setPosition}>Toys</Tab>
                <Tab onClick={()=>router.push(`/categories/School_Supplies`)} isScrolled={isScrolled}  setPosition={setPosition}>School</Tab>
                <Tab onClick={()=>router.push(`/categories/Gifts`)}isScrolled={isScrolled}  setPosition={setPosition}>Gifts</Tab>
                <Cursor position={position} />
            </MotionUl>
        }
        </AnimatePresence>

    );
};

const Tab = ({
    children,
    setPosition,
    isScrolled,
    onClick
}: {
    children: React.ReactNode;
    setPosition: React.Dispatch<React.SetStateAction<tabesPositionTypes>>;
    isScrolled: boolean;
    onClick: () => void
}) => {
    const ref = useRef<HTMLLIElement>(null);
    return (
        <li
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => {
                if (!ref.current) return;
                const { width } = ref.current.getBoundingClientRect();
                setPosition({
                    width,
                    opacity: 1,
                    left: ref.current.offsetLeft,
                    color:
                        ref.current?.outerText === "Home"
                            ? "#ff8613"
                            : ref.current?.outerText === "Toys"
                            ? "#9D4EDD"
                            : ref.current?.outerText === "School"
                            ? "#6eCe7e"
                            : ref.current?.outerText === "Gifts"
                            ? "#ff4858"
                            : "#000000",
                });
            }}
            className={twMerge("relative z-10 block cursor-pointer px-2 py-1.5 text-lg active:scale-95 transition-all duration-100 ease-in",
                isScrolled ? "text-black" : "text-black")}>
            <div className="text-base md:text-lg px-2 py-2 transition-transform duration-200 hover:scale-105 hover:mix-blend-difference">
                {children}
            </div>
        </li>
    );
};

const Cursor = ({ position }: { position: tabesPositionTypes }) => {
    return (
        <MotionLi
            style={{ backgroundColor: `${position.color}` }}
            animate={position}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute z-0 h-8 rounded-full backdrop-blur-sm shadow-lg md:h-12"
        />
    );
};

const NavbarWrapper = ({children, isScrolled}:{children: React.ReactNode, isScrolled:boolean}) => {
    return (
    isScrolled ? 
        <MotionNav 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full z-50 bg-white sticky top-0 shadow-sm">{children}</MotionNav> :
        <nav className="w-full z-50 relative bg-[#FF773C]">{children}</nav>
    )
}

export default Navbar;
