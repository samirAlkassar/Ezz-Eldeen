import { CartItem } from "@/features/cart/types";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { ProductType } from "@/features/products/types";
import { useEffect, useState } from "react";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/features/wishlist/wishlistSlice"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { Trash } from "lucide-react";

const ProductCart = ({ cartItem, handleRemoveItem, handleUpdateItem, wishlist }: { cartItem: CartItem, handleRemoveItem: (id: string) => void, handleUpdateItem: (id: string, quantity: number) => void, wishlist: ProductType[] }) => {
    const [quantity, setQuantity] = useState<number>(cartItem?.quantity);
    const router = useRouter();
    const [optimisticUpdate, setOptimisticUpdate] = useState<boolean | null>(null);
    const postIsLiked = wishlist.some(item => item._id === cartItem?.product?._id);
    const isLiked = optimisticUpdate !== null ? optimisticUpdate : Boolean(postIsLiked);
    const dispatch = useDispatch<AppDispatch>();

    const toggleWishlist = () => {
        const nextLiked = !isLiked;
        setOptimisticUpdate(nextLiked);
        if (isLiked) {
            dispatch(removeFromWishlist(cartItem?.product?._id));
            dispatch(fetchWishlist());
        } else {
            dispatch(addToWishlist(cartItem?.product?._id));
            dispatch(fetchWishlist());
        }
    };

    useEffect(() => {
        setQuantity(cartItem?.quantity);
    }, [cartItem?.quantity]);

    const handleQuantityAdd = (id: string) => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        handleUpdateItem(id, newQuantity);
    }

    const handleQuantityMinus = (id: string) => {
        if (quantity <= 1) return;
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        handleUpdateItem(id, newQuantity);
    }

    const handleRemove = (id: string) => {
        handleRemoveItem(id);
    }

    return (
        <div key={cartItem?.product?._id} className="w-full bg-white rounded-xl shadow-sm p-2 md:p-4 flex gap-3 md:gap-4 border-gray-100 relative">
            <div onClick={()=>router.push(`/products/${cartItem?.product?.slug}`)} className="w-26 sm:w-30 md:w-40 sm:aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
                <Image
                    src={cartItem?.product?.images?.[0]?.url ?? "/images/placeholder.jpg"}
                    alt={cartItem?.product?.name ?? "Product Image"}
                    width={300}
                    height={300}
                    className="object-contain h-full w-full hover:scale-110 transition-transform duration-300"
                />
            </div>

            <div className="flex flex-col justify-between flex-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h1 className="text-base md:text-lg truncate max-w-[100px] sm:max-w-fit overflow-ellipsis font-medium text-gray-800 leading-normal">{cartItem?.product?.name}</h1>

                        <span className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 font-bold rounded-lg md:rounded-xl text-base shadow-inner">
                            {cartItem?.product?.price}
                        </span>
                    </div>

                    <div className="flex justify-between gap-4">
                        <p className="text-sm text-gray-500 w-full flex-4 line-clamp-1 sm:line-clamp-2 max-h-10 overflow-clip max-w-[10rem] sm:max-w-xs">
                            {cartItem?.product?.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-end justify-center gap-2">
                    <div className="flex items-center justify-between w-full flex-1 mt-4">
                        <div className="flex items-start gap-2 flex-row md:flex-col">
                            <p className="text-sm text-gray-700 font-medium hidden md:block">Quantity</p>

                            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl shadow-inner">
                                <button
                                    onClick={() => handleQuantityMinus(cartItem?.product?._id)}
                                    disabled={quantity <= 1}
                                    className="px-2 md:px-3 py-0.5 md:py-1 rounded-lg bg-gray-200 hover:bg-gray-200 text-gray-800 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                    -
                                </button>

                                <span className="font-semibold text-gray-800">{quantity}</span>

                                <button
                                    onClick={() => handleQuantityAdd(cartItem?.product?._id)}
                                    className="px-2 md:px-3 py-0.5 md:py-1 rounded-lg bg-gray-200 hover:bg-gray-200 text-gray-800 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                        <button
                            className="bg-gray-500 md:bg-red-400 h-8 md:h-10 px-3 gap-1 flex items-center justify-center rounded-lg text-white font-medium cursor-pointer hover:bg-red-500 active:scale-[97%] transition-all duration-75 ease-in"
                            onClick={() => handleRemove(cartItem?.product?._id)}>
                            <p className="font-medium text-white text-sm hidden md:block">remove</p>
                            <Trash size={20}/>
                        </button>
                        <button
                            className="flex items-center justify-center relative bg-gray-200 w-8 md:w-10 h-8 md:h-10 rounded-lg text-white font-medium cursor-pointer hover:bg-gray-300 active:scale-[97%] transition-all duration-75 ease-in"
                            onClick={() => { setOptimisticUpdate((prev) => !prev); toggleWishlist(); }}>
                            <span className="scale-[70%] heart absolute"
                                style={{ transitionDuration: `${isLiked ? "1s" : ""}`, backgroundPosition: `${isLiked ? "-2800px 0" : ""}` }} />
                        </button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCart;