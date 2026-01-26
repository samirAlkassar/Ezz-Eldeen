const LogoutSettings = () => {
    return (
        <div className="flex gap-6 mt-8">
            <button className="bg-red-200 w-full text-sm md:text-base md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Delete Accound</button>
            <button className="bg-red-400 w-full text-sm md:text-base md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Logout</button>
        </div>
    )
};

export default LogoutSettings;