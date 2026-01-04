"use client";

import { Heart, ShoppingCart, ChevronDown, Settings, User, LogOut, LayoutDashboard, LogIn, LogOutIcon } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCurrentUser, selectUser, logout } from "../../features/auth/authSlice";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { fetchCart} from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import Image from "next/image";
import { useToast } from "@/components/Toast";
import Link from "next/link";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const imageRef = useRef<HTMLButtonElement>(null);
    const { toast } = useToast();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const router = useRouter();
    const handleScroll = useCallback(() => {
    const scrollThreshold = 440;
        setIsScrolled(window.scrollY > scrollThreshold);
    }, []);
    

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

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
            <div className="w-full max-w-7xl mx-auto py-4 flex justify-between text-white px-8">
                <motion.div 
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0, duration: 0.2, ease: "easeIn" }}>
                    <Link href="/" className={twMerge("text-3xl text-yellow-200 font-bold", isScrolled? "text-orange-400" : "text-yellow-200")}>
                        Ezz-Eldeen
                    </Link>
                </motion.div>

                <SlideTabes isScrolled={isScrolled}/>

                <div className="flex gap-2 items-center relative">
                    <div onClick={() => {router.push( user ? '/wishlist' : '/register'); !user && 
                                toast({ title: "Create account!", description: "You need to login before accessing your wishlist",variant: "default", position: "bottom-right", icon: <LogIn size={20}/> })
                    }} className={twMerge("p-2 rounded-full transition-all duration-100 ease-in cursor-pointer active:scale-[97%]",
                        isScrolled? "text-black hover:bg-gray-500/20" : "hover:bg-red-500/40"
                    )}>
                        <Heart />
                    </div>
                    <div onClick={() => {router.push(user ? '/cart' : '/register'); !user && 
                                toast({ title: "Create account!", description: "You need to login before accessing your cart",variant: "default", position: "bottom-right", icon: <LogIn size={20}/> })
                    }} className={twMerge("p-2 relative rounded-full transition-all duration-100 ease-in cursor-pointer active:scale-[97%]",
                        isScrolled? "text-black hover:bg-gray-500/20" : "hover:bg-orange-500/40"
                    )}>     
                        <ShoppingCart/>
                        {user && !(cart?.totalPrice === 0) && <span className="absolute bg-red-500 text-white text-xs w-5 h-5 top-5 right-0 rounded-full flex items-center justify-center">{cart?.totalQuantity}</span>}
                    </div>
                    

                    {user ? (
                        <div className="relative">
                            <button
                                ref={imageRef}
                                onClick={() => {setMenuOpen((prev) => !prev)}}
                                className={twMerge("flex items-center gap-2 p-1  active:scale-95 rounded-lg cursor-pointer",
                                    isScrolled? "hover:bg-gray-500/20" : "hover:bg-orange-300/20"
                                )}
                            >
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
                                    className={`transition-transform ${menuOpen ? "rotate-180" : "rotate-0"} ${isScrolled && "text-black"}`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.ul
                                        ref={menuRef}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden px-2 py-4 space-y-3">
                                        <li><Button onClick={()=>{setMenuOpen(false); router.push(`/profile/${user.firstName}_${user.lastName}`)}} variant={'game'} size={'small'} color={'blue'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><User size={18}/> <span>Profile</span></div></Button></li>
                                        <li><Button onClick={()=>{setMenuOpen(false);}} variant={'game'} size={'small'} color={'blue'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><Settings size={18}/><span>Settings</span></div> </Button></li>
                                        {user?.role === "admin" && <li><Button onClick={()=>{router.push("/dashboard"); setMenuOpen(false);}} variant={'game'} size={'small'} color={'orange'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><LayoutDashboard size={18}/><span> Dashboard</span></div> </Button></li>}
                                        <li><Button onClick={()=>{handleLogout(); setMenuOpen(false); 
                                            toast({ title: "Logged out", description: "You logged out of your account",variant: "default", position: "bottom-right", icon: <LogOutIcon size={20}/> })
                                        }} variant={'game'} size={'small'} color={'red'} className="w-full active:w-[95%] mx-auto"><div className="flex gap-2 items-center justify-center"><LogOut size={18}/><span>Logout</span></div></Button></li>

                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-4 text-lg font-medium">
                            <a
                                href="/login"
                                className="bg-white text-[#FF773C] px-4 py-1 rounded-full font-semibold shadow hover:bg-yellow-100 transition-colors"
                            >
                                Login
                            </a>
                            <a href="/register" className={twMerge("py-1", isScrolled ? "text-gray-800" : "text-white")}>
                                Register
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </NavbarWrapper>
    );
};

type tabesPositionTypes = {
    left?: number;
    width?: number;
    opacity?: number;
    color?: string;
};

const SlideTabes = ({isScrolled}:{isScrolled:boolean}) => {
    const [position, setPosition] = useState<tabesPositionTypes>({
        left: 0,
        width: 0,
        opacity: 0,
        color: "",
    });
    const router = useRouter();
    return (
        <ul
            onMouseLeave={() => {
                setPosition({ opacity: 0 });
            }}
            className="hidden md:flex items-center relative"
        >
            <Tab onClick={()=>router.push('/')} isScrolled={isScrolled} setPosition={setPosition}>Home</Tab>
            <Tab onClick={()=>router.push('/categories/Toys_&_Games')} isScrolled={isScrolled}  setPosition={setPosition}>Toys</Tab>
            <Tab onClick={()=>router.push('/categories/School_Supplies')} isScrolled={isScrolled}  setPosition={setPosition}>School</Tab>
            <Tab onClick={()=>router.push('/categories/Gifts')}isScrolled={isScrolled}  setPosition={setPosition}>Gifts</Tab>
            <Tab onClick={()=>router.push('/contact')}isScrolled={isScrolled}  setPosition={setPosition}>Contact</Tab>
            <Tab onClick={()=>router.push('/about')}isScrolled={isScrolled}  setPosition={setPosition}>About</Tab>

            <Cursor position={position} />
        </ul>
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
                            : ref.current?.outerText === "Contact"
                            ? "#4D96FF"
                            : ref.current?.outerText === "About"
                            ? "#Fab93d"
                            : "",
                });
            }}
            className={twMerge("relative z-10 block cursor-pointer px-2 py-1.5 text-lg active:scale-95 transition-all duration-100 ease-in",
                isScrolled ? "text-black" : "text-white"
            )}
        >
            <a
                className="text-lg px-2 py-2 transition-transform duration-200 hover:scale-105 hover:mix-blend-difference"
            >
                {children}
            </a>
        </li>
    );
};

const Cursor = ({ position }: { position: tabesPositionTypes }) => {
    return (
        <motion.li
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
        <motion.nav 
            initial={{ translateY: -30  }}
            animate={{ translateY: 0}}
            transition={{ delay: 0, duration: 0.3, ease: "easeInOut" }}
            className="w-full z-50 bg-white sticky top-0 shadow-sm">{children}</motion.nav> :
        <nav
            className="w-full z-50 bg-[#FF773C] relative">{children}</nav>
    )
}

export default Navbar;
