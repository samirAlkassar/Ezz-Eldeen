const CartItemSkeleton = () => {
    return (
        <div className="w-full h-[192px] bg-orange-100 rounded-xl shadow-sm p-4 flex gap-4 border-gray-100 relative">
            <div className="w-full h-full bg-orange-200 rounded-md flex-1 animate-pulse" />
            <div className="flex-3 w-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <div className="w-50 h-6 bg-orange-200 rounded-md animate-pulse" />
                        <div className="w-16 h-6 bg-orange-200 rounded-md animate-pulse" />
                    </div>
                    <div className="flex justify-between mt-2">
                        <div className="w-54 h-6 bg-orange-200 rounded-md animate-pulse" />
                        <div className="w-24 h-10 bg-orange-200 rounded-md animate-pulse" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-full h-8 bg-orange-200 rounded-md animate-pulse" />
                    <div className="w-full h-8 bg-orange-200 rounded-md animate-pulse" />
                </div>
            </div>
        </div>
    )
}

export default CartItemSkeleton;''